# this file contains functions that handle the CRUD operations (Create, Read, Update, Delete) for interacting with the database. 

from sqlalchemy.orm import Session, joinedload
from models import Report, Vulnerability, Result
from schema import ReportData
from fastapi import HTTPException
from datetime import datetime

# upload the report to the database, this including adding data into all 3 tables: report, vulnerability, and report_vulnerability
def upload_report(db: Session, report_data: dict):
    vulnerabilities_data = report_data.pop('vulnerabilities_details', [])

    try:
        submission_date = datetime.strptime(report_data['submission_date'], "%d-%m-%Y").date()
        report_data['submission_date'] = submission_date

        submission_time = datetime.strptime(report_data['submission_time'], "%I:%M %p").time()
        report_data['submission_time'] = submission_time

        number_of_vulnerabilities = len(vulnerabilities_data)
        report_data['number_of_vulnerabilities'] = number_of_vulnerabilities

        report = create_report(db, report_data)

        for vuln_data in vulnerabilities_data:
            vulnerability_type = vuln_data.get('vulnerability_type')
            existing_vuln = db.query(Vulnerability).filter(Vulnerability.vulnerability_type == vulnerability_type).first()

            if existing_vuln:
                vuln_id = existing_vuln.vulnerability_id
            else:
                new_vuln = create_vulnerability(db, vuln_data)
                vuln_id = new_vuln.vulnerability_id

            create_result(db, vuln_data, report.report_id, vuln_id)

        return report
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        db.close()

# Function to create a new report and save it to the database Report table
def create_report(db: Session, report_data: dict):
    try:
        report = Report(**report_data)
        db.add(report)
        db.commit()
        db.refresh(report)
        return report
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        db.close()

# Function to save a new vulnerability to the database Vulnerability table
def create_vulnerability(db: Session, vuln_data: dict):
    try:
        results_data = vuln_data.pop('results', [])
        
        new_vuln = Vulnerability(**vuln_data)
        db.add(new_vuln)
        db.commit()
        db.refresh(new_vuln)
        return new_vuln
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        db.close()


# Function to create a new result and save it to the database Result table
def create_result(db: Session, vuln_data: dict, report_id: int, vulnerability_id: int):
    try:
        for result_data in vuln_data.pop('results', []):
            result = Result(
                description=result_data['description'],
                location=result_data['location'],
                report_id=report_id,
                vulnerability_id=vulnerability_id
            )
            db.add(result)
            db.commit()
            db.refresh(result)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        db.close()

# function to retrieves a list of reports from the database with pagination.
def get_all_reports(db: Session, skip: int = 0, limit: int = 10):
    try:
        # query the database to get a list of reports with pagination
        reports = db.query(Report).offset(skip).limit(limit).all()

        # check if there are no reports
        if not reports:
            return {
                "message": "No reports found. Please upload a report to view details."
            }

        # initialise the result list with selected information from each report
        result = []
        for report in reports:
            result.append({
                "report_id": report.report_id,
                "contract_name": report.contract_name,
                # convert the date object to a string with format dd-mm-yyyy
                "submission_date": report.submission_date.strftime('%d-%m-%Y'), 
                # convert the time object to a string with format HH:MM AM/PM
                "submission_time": report.submission_time.strftime('%I:%M %p'),
                "number_of_vulnerabilities": report.number_of_vulnerabilities  
            })

        # return the result list containing all the reports
        return result
    except Exception as e:
        # raise an HTTPException with a 500 status code and error details
        raise HTTPException(status_code=500, detail=f"Internal server error. Please try again.")
    finally:
        # ensure that the database session is closed no matter what
        db.close()

# function to retrieve a specific report from a database along with its associated vulnerabilities.

def get_report(db: Session, report_id: int):
    try:
        # query the database to get a specific report with associated vulnerabilities
        # this is equivalent to joining Report and Result tables using the report_id FK query
        report = (
            db.query(Report)
            .filter(Report.report_id == report_id)
            .options(joinedload(Report.vulnerabilities).joinedload(Result.vulnerability))
            .first()
        )

        # check if the report exists
        if report is None:
            raise HTTPException(status_code=404, detail="Report not found")

        # extract details from the report and its associated vulnerabilities
        vulnerabilities_details = []
        for result in report.vulnerabilities:
            vuln = result.vulnerability

            vulnerabilities_details.append({
                "vulnerability_type": vuln.vulnerability_type,
                "impact": vuln.impact,
                "confidence": vuln.confidence,
                "description": vuln.description,
                "recommendation": vuln.recommendation,
                "results": [
                    {
                        "description": result.description,
                        "location": result.location
                    }
                ]
            })

        # prepare the result with selected information
        result = {
            "contract_name": report.contract_name,
            "submission_date": report.submission_date.strftime('%d-%m-%Y'),
            "submission_time": report.submission_time.strftime('%I:%M %p'),
            "number_of_vulnerabilities": report.number_of_vulnerabilities,
            "vulnerabilities_details": vulnerabilities_details
        }

        # return the result
        return result
    except HTTPException as e:
        # raise HTTPException if exists
        raise e
    except Exception as e:
        # raise an HTTPException with a 500 status code and error details if there are other errors
        raise HTTPException(status_code=500, detail=f"Internal server error. Please try again.")
    finally:
        # ensure that the database session is closed no matter what
        db.close()
  
  
# function to delete a speicific report from the database by its report_id
def delete_report(db: Session, report_id: int):
    try:
        # check if the report exists
        report = db.query(Report).filter(Report.report_id == report_id).first()

        # if the report is not found, raise a 404 error
        if report is None:
            raise HTTPException(status_code=404, detail="Report not found")

        # delete associated vulnerabilities first
        db.query(Result).filter(Result.report_id == report_id).delete()

        # then delete the report itself
        db.query(Report).filter(Report.report_id == report_id).delete()
        db.commit() # commit the changes
        
        # return a success message
        return {"message": "Report deleted successfully"}
    except HTTPException as e:
        # raise HTTPException if exists
        raise e
    except Exception as e: # other errors handle
        # if an error occurs, rollback the changes and raise an HTTPException
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        # ensure that the database session is closed no matter what
        db.close()

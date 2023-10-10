# define crud functions to interact with the db

from sqlalchemy.orm import Session, joinedload
from models import Report, Vulnerability, ReportVulnerability
from schema import ReportData
from fastapi import HTTPException
from datetime import datetime

# upload the report to the database
def upload_report(db: Session, report_data: ReportData):
    vulnerabilities_data = report_data.pop('vulnerabilities_details', [])

    try:
        # convert the date string to a datetime.date object
        submission_date = datetime.strptime(report_data['submission_date'], "%d-%m-%Y").date()
        report_data['submission_date'] = submission_date

        # convert the time string to a datetime.time object
        submission_time = datetime.strptime(report_data['submission_time'], "%I:%M %p").time()
        report_data['submission_time'] = submission_time

        # Calculate the number of vulnerabilities
        number_of_vulnerabilities = len(vulnerabilities_data)

        # Add the number_of_vulnerabilities field to the report_data dictionary
        report_data['number_of_vulnerabilities'] = number_of_vulnerabilities

        # Create a report by calling the create_report function
        report = create_report(db, report_data)

        # iterate over vulnerabilities_data and associate them with the report
        for vuln_data in vulnerabilities_data:
            vulnerability_type = vuln_data.get('vulnerability_type')

            # check if the vulnerability already exists in the database
            existing_vuln = db.query(Vulnerability).filter(Vulnerability.vulnerability_type == vulnerability_type).first()

            # if the vulnerability exists, use its ID
            if existing_vuln:
                vuln_id = existing_vuln.vulnerability_id
            else:
                # if the vulnerability doesn't exist, create a new one and use its ID
                new_vuln = create_vulnerability(db, vuln_data)
                vuln_id = new_vuln.vulnerability_id

            # create a link between the report and the vulnerability
            create_report_vulnerability(db, report.report_id, vuln_id)

        # return the created report
        return report

    except Exception as e:
        # if an error occurs, rollback the changes and raise an HTTPException
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        # ensure that the database session is closed
        db.close()

def create_report(db: Session, report_data: dict):
    try:
        # create a new Report object with the provided data
        report = Report(**report_data)
        
        # add the report to the database
        db.add(report)
        
        # commit the changes to the database
        db.commit()
        
        # refresh the report object to reflect changes made in the database
        db.refresh(report)
        
        # return the created report
        return report
    except Exception as e:
        # handle other exceptions
        db.rollback()
        
        # raise an HTTPException with a 500 status code and error details
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        # ensure that the database session is closed, regardless of success or failure
        db.close()

def create_vulnerability(db: Session, vuln_data: dict):
    try:
        # create a new Vulnerability object with the provided data
        new_vuln = Vulnerability(**vuln_data)
        
        # add the vulnerability to the database
        db.add(new_vuln)
        
        # add the vulnerability to the database
        db.commit()
        
        # refresh the vulnerability object to reflect changes made in the database
        db.refresh(new_vuln)
        
        # return the created vulnerability
        return new_vuln
    except Exception as e:
        # handle other exceptions
        db.rollback()
        
        # raise an HTTPException with a 500 status code and error details
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        # ensure that the database session is closed, regardless of success or failure
        db.close()

def create_report_vulnerability(db: Session, report_id: int, vulnerability_id: int):
    try:
        # create a new ReportVulnerability object with the provided data
        report_vuln = ReportVulnerability(report_id=report_id, vulnerability_id=vulnerability_id)
        
        # add the report vulnerability association to the database
        db.add(report_vuln)
        
        # commit the changes to the database
        db.commit()
        
        # refresh the report vulnerability object to reflect changes made in the database
        db.refresh(report_vuln)
        
        # return the created report vulnerability
        return report_vuln
    except Exception as e:
        # handle other exceptions
        db.rollback()
        
        # raise an HTTPException with a 500 status code and error details
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        
        # ensure that the database session is closed, regardless of success or failure
        db.close()

def get_all_reports(db: Session, skip: int = 0, limit: int = 10):
    try:
        # query the database to get a list of reports with pagination
        reports = db.query(Report).offset(skip).limit(limit).all()

        # check if there are no reports
        if not reports:
            return {
                "message": "No reports found. Please upload a report to view details."
            }

        # prepare the result list with selected information from each report
        result = []
        for report in reports:
            result.append({
                "report_id": report.report_id,
                "contract_name": report.contract_name,
                "submission_date": report.submission_date.strftime('%d-%m-%Y'),
                "submission_time": report.submission_time.strftime('%I:%M %p'),
                "number_of_vulnerabilities": report.number_of_vulnerabilities  
            })

        # return the result list
        return result
    except Exception as e:
        
        # print the error for debugging (consider removing in production)
        print(e)
        
        # raise an HTTPException with a 500 status code and error details
        raise HTTPException(status_code=500, detail=f"Internal server error. Please try again.")
    finally:
        # ensure that the database session is closed
        db.close()

def get_report(db: Session, report_id: int):
    try:
        # query the database to get a specific report with associated vulnerabilities
        report = (
            db.query(Report)
            .filter(Report.report_id == report_id)
            .options(joinedload(Report.vulnerabilities).joinedload(ReportVulnerability.vulnerability))
            .first()
        )

        # check if the report is not found
        if report is None:
            raise HTTPException(status_code=404, detail="Report not found")

        # extract details from the report and its associated vulnerabilities
        vulnerabilities_details = []
        for report_vuln in report.vulnerabilities:
            vuln = report_vuln.vulnerability
            vulnerabilities_details.append({
                "vulnerability_type": vuln.vulnerability_type,
                "impact": vuln.impact,
                "confidence": vuln.confidence,
                "description": vuln.description,
                "recommendation": vuln.recommendation,
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
        # raise an HTTPException with a 500 status code and error details if have other errors
        raise HTTPException(status_code=500, detail=f"Internal server error. Please try again.")
    finally:
        # ensure that the database session is closed
        db.close()

def delete_report(db: Session, report_id: int):
    try:
        # check if the report exists
        report = db.query(Report).filter(Report.report_id == report_id).first()

        # if the report is not found, raise a 404 error
        if report is None:
            raise HTTPException(status_code=404, detail="Report not found")

        # delete associated vulnerabilities
        db.query(ReportVulnerability).filter(ReportVulnerability.report_id == report_id).delete()

        # delete the report
        db.query(Report).filter(Report.report_id == report_id).delete()

        # commit the changes
        db.commit()
        
        # return a success message
        return {"message": "Report deleted successfully"}
    except HTTPException as e:
        # raise HTTPException if exists
        raise e
    except Exception as e:
        # if an error occurs, rollback the changes and raise an HTTPException
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        # ensure that the database session is closed
        db.close()

# this file contains functions that handle the CRUD operations (Create, Read, Update, Delete) for interacting with the database. 

from sqlalchemy.orm import Session, joinedload
from models import Report, Vulnerability, ReportVulnerability
from schema import ReportData
from fastapi import HTTPException
from datetime import datetime

# upload the report to the database, this including adding data into all 3 tables: report, vulnerability, and report_vulnerability
def upload_report(db: Session, report_data: ReportData):
    # extract vulnerabilities details from input report_data, or set an empty list if not present
    # this is to check if the vulnerability is present in the database or not at later stages
    vulnerabilities_data = report_data.pop('vulnerabilities_details', [])

    try:
        # convert the date string to a datetime.date object so it can be added to the database
        submission_date = datetime.strptime(report_data['submission_date'], "%d-%m-%Y").date()
        report_data['submission_date'] = submission_date

        # convert the time string to a datetime.time object so it can be added to the database
        submission_time = datetime.strptime(report_data['submission_time'], "%I:%M %p").time()
        report_data['submission_time'] = submission_time

        # calculate the number of vulnerabilities
        number_of_vulnerabilities = len(vulnerabilities_data)

        # update the number_of_vulnerabilities field in the report_data dictionary
        report_data['number_of_vulnerabilities'] = number_of_vulnerabilities

        # create/upload the report data to the db
        report = create_report(db, report_data)

        # iterate over vulnerabilities_data and associate them with the report
        for vuln_data in vulnerabilities_data:
            vulnerability_type = vuln_data.get('vulnerability_type')

            # check if the vulnerability already exists in the database, this is to ensure the same vulnerability is not added to the db twice
            existing_vuln = db.query(Vulnerability).filter(Vulnerability.vulnerability_type == vulnerability_type).first()

            # if the vulnerability exists, get its ID 
            if existing_vuln:
                vuln_id = existing_vuln.vulnerability_id
            else:
                # if the vulnerability doesn't exist, create a new one and use its ID
                new_vuln = create_vulnerability(db, vuln_data)
                # get the vulnerability ID to insert into the junction table
                vuln_id = new_vuln.vulnerability_id 

            # create a link between the report and the vulnerability by adding to the junction table
            create_report_vulnerability(db, report.report_id, vuln_id)

        # return the created report
        return report
    except Exception as e:
        # if an error occurs, rollback the changes and raise an HTTPException
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
       # ensure that the database session is closed no matter what
        db.close()

# function to create a new report and save it to the database Report table.
def create_report(db: Session, report_data: dict):
    try:
        # create a new Report object with the provided data
        report = Report(**report_data)
        db.add(report) # add the report to the database
        db.commit() # commit the changes to the database
        
        # refresh the report object so it contains new data from the database
        db.refresh(report)
        
        # return the created report
        return report
    except Exception as e: # handle exceptions
        db.rollback()
        # raise an HTTPException with a 500 status code and error details
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        # ensure that the database session is closed no matter what
        db.close()

# function to save a new vulnerability to the database Vulnerability table
def create_vulnerability(db: Session, vuln_data: dict):
    try:
        new_vuln = Vulnerability(**vuln_data) # create a new Vulnerability object with the provided data
        db.add(new_vuln) # add the vulnerability to the database
        db.commit() # commit the changes
        db.refresh(new_vuln) # refresh the vulnerability object so it contains new data from the database
        
        # return the created vulnerability
        return new_vuln
    except Exception as e: # handle other exceptions
        # rollback the changes if an error occurs
        db.rollback()
        
        # raise an HTTPException with a 500 status code and error details
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        # ensure that the database session is closed no matter what
        db.close()

# function to create a new report vulnerability association in the junction table
def create_report_vulnerability(db: Session, report_id: int, vulnerability_id: int):
    try:
        # create a new ReportVulnerability object with the provided data
        report_vuln = ReportVulnerability(report_id=report_id, vulnerability_id=vulnerability_id)
        db.add(report_vuln) # add the report vulnerability association to the database
        db.commit() # commit the changes to the database
        db.refresh(report_vuln) # refresh the vulnerability object so it contains new data from the database
        
        # return the created report vulnerability
        return report_vuln
    except Exception as e: # handle other exceptions
        # rollback the changes if an error occurs
        db.rollback()
        
        # raise an HTTPException with a 500 status code and error details
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        # ensure that the database session is closed no matter what
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
        # this is equivalent to joining Report and ReportVulnerability tables using the report_id FK query
        report = (
            db.query(Report)
            .filter(Report.report_id == report_id)
            .options(joinedload(Report.vulnerabilities).joinedload(ReportVulnerability.vulnerability))
            .first()
        )

        # check if the report exists
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
        db.query(ReportVulnerability).filter(ReportVulnerability.report_id == report_id).delete()

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
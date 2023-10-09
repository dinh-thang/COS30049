# define functions to interact with the db
from sqlalchemy.orm import Session, joinedload
from models import Report, Vulnerability, Result
from schema import ReportCreate
from fastapi import HTTPException

# def upload_report(db: Session, report_data: ReportCreate):
#     try:
#         report = Report(
#             contract_name=report_data["contract_name"],
#             submission_date=report_data["submission_date"],
#             submission_time=report_data["submission_time"],
#         )
#         db.add(report)
#         db.commit()

#         for vuln_data in report_data["vulnerabilities_details"]:
#             vulnerability = Vulnerability(
#                 vulnerability_type=vuln_data["vulnerability_type"],
#                 impact=vuln_data["impact"],
#                 confidence=vuln_data["confidence"],
#                 recommendation=vuln_data["recommendation"],
#                 report_id=report.report_id,
#             )
#             db.add(vulnerability)
#             db.commit()

#             for result_data in vuln_data["results"]:
#                 result = Result(
#                     ID=result_data["ID"],
#                     description=result_data["description"],
#                     location=result_data["location"],
#                     vuln_id=vulnerability.vuln_id,
#                 )
#                 db.add(result)
#                 db.commit()

#     except Exception as e:
#         db.rollback()
#         raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
#     finally:
#         db.close()

def upload_report(db: Session, report_data: ReportCreate):
    try:
        report = Report(
            contract_name=report_data.contract_name,
            submission_date=report_data.submission_date,
            submission_time=report_data.submission_time,
        )
        db.add(report)
        db.commit()

        for vuln_data in report_data.vulnerabilities_details:
            vulnerability = Vulnerability(
                vulnerability_type=vuln_data.vulnerability_type,
                impact=vuln_data.impact,
                confidence=vuln_data.confidence,
                recommendation=vuln_data.recommendation,
                report_id=report.report_id,
            )
            db.add(vulnerability)
            db.commit()

            for result_data in vuln_data.results:
                result = Result(
                    ID=result_data.ID,
                    description=result_data.description,
                    location=result_data.location,
                    vuln_id=vulnerability.vuln_id,
                )
                db.add(result)
                db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    finally:
        db.close()


def get_all_reports(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Report).offset(skip).limit(limit).all()


def get_report(db: Session, report_id: int):
    try:
        report = (
            db.query(Report)
            .filter(Report.report_id == report_id)
            .options(joinedload(Report.vulnerabilities).joinedload(Vulnerability.results))
            .first()
        )

        if report is None:
            raise HTTPException(status_code=404, detail="Report not found")

        return report
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Internal server error {str(e)}. Please try again.")

    

def delete_report(db: Session, report_id: int):
    report = db.query(Report).filter(Report.report_id == report_id).first()
    if report:
        db.delete(report)
        db.commit()
        raise HTTPException(status_code=200, detail="Report and associated data deleted successfully.")
    else:
        raise HTTPException(status_code=404, detail="Report not found")
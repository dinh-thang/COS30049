# define db models for ORM
from sqlalchemy import Column, ForeignKey, Integer, String, Date, Time, text
from sqlalchemy.orm import relationship

from .database import Base

"""
NAMING CONVENTION
(1) table name is in plural form
(2) column name is in singular form
(3) name with 2 words above should use underscore "_"
"""

""" NOTE: the model field below is based on assignment 1's website and CAN BE MODIFIED """


# TODO: change and add this
class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)

    contract_name = Column(text, index=True)
    uploaded_date = Column(Date)
    uploaded_time = Column(Time)

    res_vul = relationship("reports_vulnerabilities", back_populates="report")


class ReportVulnerability(Base):
    __tablename__ = "reports_vulnerabilities"

    id = Column(Integer, primary_key=True, index=True)

    report_id = Column(Integer, ForeignKey("reports.id"))
    vul_id = Column(Integer, ForeignKey("vulnerabilities"))

    report = relationship("reports", back_populates="res_vul")
    vul = relationship("vulnerabilities", back_populates="vul_res")


class Vulnerability(Base):
    __tablename__ = "vulnerabilities"

    id = Column(Integer, primary_key=True, index=True)

    report_id = Column(Integer, ForeignKey("reports.id"))
    report = relationship("reports", back_populates="vuls")

    name = Column(String)
    impact = Column(String)
    confidence = Column(String)
    recommendation = Column(String(512))

    vul_res = relationship("reports_vulnerabilities", back_populates="vul")





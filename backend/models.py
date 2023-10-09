# define db models for ORM
from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

"""
NAMING CONVENTION
(1) table name is in plural form
(2) column name is in singular form
(3) name with 2 words above should use underscore "_"
"""

Base = declarative_base()

class Report(Base):
    __tablename__ = "reports"
    report_id = Column(Integer, primary_key=True, index=True)
    contract_name = Column(String(255), index=True)
    submission_date = Column(String(255))
    submission_time = Column(String(255))
    vulnerabilities = relationship("Vulnerability", back_populates="report", cascade="all, delete")

class Vulnerability(Base):
    __tablename__ = "vulnerabilities"
    vuln_id = Column(Integer, primary_key=True, index=True)
    vulnerability_type = Column(String(255))
    impact = Column(String(255))
    confidence = Column(String(255))
    recommendation = Column(Text)
    report_id = Column(Integer, ForeignKey("reports.report_id"))
    results = relationship("Result", back_populates="vulnerability", cascade="all, delete")
    report = relationship("Report", back_populates="vulnerabilities", cascade="all, delete")

class Result(Base):
    __tablename__ = "results"
    results_id = Column(Integer, primary_key=True, index=True)
    vuln_id = Column(Integer, ForeignKey("vulnerabilities.vuln_id"))
    ID = Column(Integer)
    description = Column(Text)
    location = Column(String(255))
    vulnerability = relationship("Vulnerability", back_populates="results", cascade="all, delete")

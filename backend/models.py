# define db models for ORM
from sqlalchemy import Column, Integer, String, Text, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

"""
NAMING CONVENTION
(1) table name is in plural form
(2) column name is in singular form
(3) name with 2 words above should use underscore "_"
"""

Base = declarative_base()

# Vulnerabilities table
class Vulnerability(Base):
    __tablename__ = 'vulnerabilities'

    vulnerability_id = Column(Integer, primary_key=True, autoincrement=True)
    vulnerability_type = Column(String(255))
    impact = Column(String(255))
    confidence = Column(String(255))
    description = Column(Text)
    recommendation = Column(Text)
    
    reports = relationship('ReportVulnerability', back_populates='vulnerability')

# Reports table
class Report(Base):
    __tablename__ = 'reports'

    report_id = Column(Integer, primary_key=True, autoincrement=True)
    contract_name = Column(String(255))
    submission_date = Column(Date)
    submission_time = Column(Time)
    number_of_vulnerabilities = Column(Integer, default=0)
    
    # Establishing a relationship with ReportVulnerability table
    vulnerabilities = relationship('ReportVulnerability', back_populates='report')


# ReportVulnerability table
class ReportVulnerability(Base):
    __tablename__ = 'reports_vulnerabilities'

    report_vulnerability_id = Column(Integer, primary_key=True, autoincrement=True)
    report_id = Column(Integer, ForeignKey('reports.report_id'))
    vulnerability_id = Column(Integer, ForeignKey('vulnerabilities.vulnerability_id'))

    # Establishing relationships with Reports and Vulnerabilities tables
    report = relationship('Report', back_populates='vulnerabilities')
    vulnerability = relationship('Vulnerability', back_populates='reports')
# this file defines the database models/tables using SQLAlchemy's declarative base.
from sqlalchemy import Column, Integer, String, Text, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

"""
NAMING CONVENTION
(1) table name is in plural form
(2) column name is in singular form
(3) name with 2 words above should use underscore "_"
"""

Base = declarative_base() # SQLalchemy base class

# Vulnerabilities table
class Vulnerability(Base):
    __tablename__ = 'vulnerabilities'

    vulnerability_id = Column(Integer, primary_key=True, autoincrement=True)
    vulnerability_type = Column(String(255))
    impact = Column(String(255))
    confidence = Column(String(255))
    description = Column(Text)
    recommendation = Column(Text)
    
    # establishing a one-to-many relationship with Result table
    reports = relationship('Result', back_populates='vulnerability')

# Reports table
class Report(Base):
    __tablename__ = 'reports'

    report_id = Column(Integer, primary_key=True, autoincrement=True)
    contract_name = Column(String(255))
    submission_date = Column(Date)
    submission_time = Column(Time)
    number_of_vulnerabilities = Column(Integer, default=0)
    
    # one-to-many relationship with Result table
    vulnerabilities = relationship('Result', back_populates='report')

# Result table
class Result(Base):
    __tablename__ = 'results'

    result_id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(Text)
    location = Column(String(255))
    report_id = Column(Integer, ForeignKey('reports.report_id'))
    vulnerability_id = Column(Integer, ForeignKey('vulnerabilities.vulnerability_id'))

    # one-to-many relationships with Reports and Vulnerabilities tables as this is a junction table
    report = relationship('Report', back_populates='vulnerabilities')
    vulnerability = relationship('Vulnerability', back_populates='reports')  # Fixed back_populates value

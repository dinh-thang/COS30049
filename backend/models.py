# this file defines the database models/tables using SQLAlchemy's declarative base.

from sqlalchemy import Column, Integer, String, Text, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Vulnerability(Base):
    """
    Table to store information about vulnerabilities.
    """
    __tablename__ = 'vulnerabilities'

    vulnerability_id = Column(Integer, primary_key=True, autoincrement=True)
    vulnerability_type = Column(String(255))
    impact = Column(String(255))
    confidence = Column(String(255))
    description = Column(Text)
    recommendation = Column(Text)
    
    reports = relationship('Result', back_populates='vulnerability')

class Report(Base):
    """
    Table to store information about reports.
    """
    __tablename__ = 'reports'

    report_id = Column(Integer, primary_key=True, autoincrement=True)
    contract_name = Column(String(255))
    submission_date = Column(Date)
    submission_time = Column(Time)
    number_of_vulnerabilities = Column(Integer, default=0)
    
    vulnerabilities = relationship('Result', back_populates='report')

class Result(Base):
    """
    Table to store information about results and the relationship between reports and vulnerabilities.
    """
    __tablename__ = 'results'

    result_id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(Text)
    location = Column(String(255))
    report_id = Column(Integer, ForeignKey('reports.report_id'))
    vulnerability_id = Column(Integer, ForeignKey('vulnerabilities.vulnerability_id'))

    report = relationship('Report', back_populates='vulnerabilities')
    vulnerability = relationship('Vulnerability', back_populates='reports')

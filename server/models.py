# define db models for ORM
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

"""
NAMING CONVENTION
(1) table name is in plural form
(2) column name is in singular form
(3) name with 2 words above should use underscore "_"
"""


# TODO: change and add this
class Report(Base):
    __tablename__ = "reports"

    # changed id -> report_id since id might be a reserved keyword
    report_id = Column(Integer, primary_key=True, index=True)
    contract_name = Column(String, index=True)


class DetailReport(Base):
    __tablename__ = "detail_reports"


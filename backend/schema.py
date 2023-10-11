# define the pydantic models - validation schema
# ! no need this file

# Yes we don't need schemas since no extra config needed

from typing import List
from pydantic import BaseModel

class VulnerabilityDetails(BaseModel):
    vulnerability_type: str
    impact: str
    confidence: str
    description: str
    recommendation: str

    class Config:
        orm_mode = True

class ReportData(BaseModel):
    contract_name: str
    submission_date: str
    submission_time: str
    vulnerabilities_details: List[VulnerabilityDetails]

    class Config:
        orm_mode = True

# define the pydantic models - validation schema
# ! no need this file
from typing import List
from pydantic import BaseModel

class VulnerabilityDetails(BaseModel):
    vulnerability_type: str
    impact: str
    confidence: str
    description: str
    recommendation: str

class ReportData(BaseModel):
    contract_name: str
    submission_date: str
    submission_time: str
    vulnerabilities_details: List[VulnerabilityDetails]


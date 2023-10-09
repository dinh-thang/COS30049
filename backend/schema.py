# define the pydantic models - validation schema
from pydantic import BaseModel
from typing import List

class ResultCreate(BaseModel):
    ID: int
    description: str
    location: str

    class Config:
        orm_mode = True


class VulnerabilityCreate(BaseModel):
    vulnerability_type: str
    impact: str
    confidence: str
    recommendation: str
    results: List[ResultCreate]
    
    class Config:
        orm_mode = True


class ReportCreate(BaseModel):
    contract_name: str
    submission_date: str
    submission_time: str
    vulnerabilities_details: List[VulnerabilityCreate]
    
    class Config:
        orm_mode = True

class ReportResponse(BaseModel):
    message: str

    class Config:
        orm_mode = True


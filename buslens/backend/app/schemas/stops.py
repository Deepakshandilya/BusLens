from pydantic import BaseModel 

class StopOut(BaseModel):
    id: int 
    name: str

class StopResponse(BaseModel):
    query: str
    results: list[StopOut]

from pydantic import BaseModel

class UploadUrlRequest(BaseModel):
    content_type: str
    filename: str
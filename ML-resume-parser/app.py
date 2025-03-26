from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import logging
from io import BytesIO
from extract_text import extract_text_from_pdf, extract_text_from_docx, extract_skills

app = FastAPI()
logging.basicConfig(level=logging.INFO)

class FileUrlRequest(BaseModel):
    fileUrl: str

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/extract-skills/")
async def extract_skills_from_url(file_data: FileUrlRequest):
    try:
        file_url = file_data.fileUrl
        logging.info(f"Received request body: {file_data}")

        # Download the file from the URL
        response = requests.get(file_url)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Unable to download the file")

        content_type = response.headers.get('Content-Type')
        logging.info(f"Downloaded file content type: {content_type}")

        # Store the file in memory
        file_bytes = BytesIO(response.content)

        # Determine file type and extract text
        if content_type == "application/pdf":
            text = extract_text_from_pdf(file_bytes)
        elif content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            text = extract_text_from_docx(file_bytes)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        # Extract skills
        skills = extract_skills(text)

        return {"skills": skills}

    except Exception as e:
        logging.error(f"Error extracting skills: {e}")
        raise HTTPException(status_code=500, detail=str(e))

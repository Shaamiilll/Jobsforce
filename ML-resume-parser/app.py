from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import os
import requests
import logging
from extract_text import extract_text_from_pdf, extract_text_from_docx, extract_skills
from extract_fields import extract_phone_number, extract_email_address

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
        logging.info(f"Received file URL: {file_url}")

        # Download the file from the URL
        response = requests.get(file_url)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Unable to download the file")

        content_type = response.headers.get('Content-Type')
        logging.info(f"Downloaded file content type: {content_type}")

        # Extract the file extension
        file_extension = ""
        if content_type == "application/pdf":
            file_extension = ".pdf"
        elif content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            file_extension = ".docx"
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        # Save the file temporarily
        temp_filename = f"temp_file{file_extension}"
        with open(temp_filename, "wb") as temp_file:
            temp_file.write(response.content)
            logging.info(f"File saved as {temp_filename}")

        # Perform processing based on the file type
        if file_extension == ".pdf":
            text = extract_text_from_pdf(temp_filename)
        else:
            text = extract_text_from_docx(temp_filename)

        skills = extract_skills(text)

        # Clean up temporary files
        os.remove(temp_filename)

        return {"skills": skills}

    except Exception as e:
        logging.error(f"Error extracting skills: {e}")
        raise HTTPException(status_code=500, detail=str(e))

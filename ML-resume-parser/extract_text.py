from pdfminer.high_level import extract_text as extract_pdf_text
import docx2txt
import re

def extract_text_from_pdf(pdf_path):
    return extract_pdf_text(pdf_path)

def extract_text_from_docx(docx_path):
    return docx2txt.process(docx_path)

def extract_skills(text):
    # Expand this list based on your needs
    skills = [
        'Python', 'Java', 'JavaScript', 'React', 'Node.js', 'AWS', 
        'SQL', 'MongoDB', 'Express.js', 'Angular', 'Machine Learning', 
        'NLP', 'Django', 'Flask', 'TensorFlow', 'Keras', 'Git', 
        'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'Firebase', 'Docker'
    ]
    
    # Perform case-insensitive search for skills
    found_skills = [skill for skill in skills if re.search(r'\b' + re.escape(skill) + r'\b', text, re.IGNORECASE)]
    
    return list(set(found_skills))  # Remove duplicates

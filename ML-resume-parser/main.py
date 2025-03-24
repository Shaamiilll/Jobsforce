from extract_text import extract_text_from_pdf, extract_text_from_docx , extract_skills
from extract_fields import extract_phone_number, extract_email_address
file_path = 'D:/Coding/Task/Job force.ai/ML-resume-parser/sample_resume.pdf'
file_type = 'pdf' 


def parse_resume(file_path, file_type):
    if file_type == 'pdf':
        text = extract_text_from_pdf(file_path)
    elif file_type == 'docx':
        text = extract_text_from_docx(file_path)
    else:
        raise ValueError('Unsupported file type')

    phone_number = extract_phone_number(text)
    email_address = extract_email_address(text)

  # Extract Skills
    skills = extract_skills(text)

    return {
        "skills" : skills
    }

if __name__ == '__main__':
    file_path = r'D:\Coding\Task\Job force.ai\ML-resume-parser\sample.pdf'
    file_type = 'pdf'  # or 'docx'
    parsed_data = parse_resume(file_path, file_type)
    print(parsed_data)

import re

PHONE_REGEX = re.compile(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]')
EMAIL_REGEX = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')

def extract_phone_number(text):
    matches = PHONE_REGEX.findall(text)
    return matches[0] if matches else None

def extract_email_address(text):
    matches = EMAIL_REGEX.findall(text)
    return matches[0] if matches else None

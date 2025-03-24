from pdfminer.high_level import extract_text as extract_pdf_text
import docx2txt
import re

def extract_text_from_pdf(pdf_path):
    return extract_pdf_text(pdf_path)

def extract_text_from_docx(docx_path):
    return docx2txt.process(docx_path)

def extract_skills(text):
    # generated from deepseek ai
    skills = [
    # Programming Languages
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'C', 'Go', 'Rust', 
    'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'R', 'Perl', 'Dart', 'Elixir', 
    'Haskell', 'Clojure', 'Groovy', 'Lua', 'Objective-C', 'Julia', 'Bash', 'Shell',
    
    # Frontend Technologies
    'React', 'Angular', 'Vue.js', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby', 
    'HTML', 'CSS', 'Sass', 'Less', 'Tailwind CSS', 'Bootstrap', 'Material UI', 
    'Chakra UI', 'Ant Design', 'Styled Components', 'Redux', 'MobX', 'GraphQL',
    'Apollo', 'Webpack', 'Babel', 'Vite', 'Parcel', 'Jest', 'Cypress', 'Storybook',
    
    # Backend Technologies
    'Node.js', 'Express.js', 'NestJS', 'Django', 'Flask', 'FastAPI', 'Spring Boot',
    'Micronaut', 'Quarkus', 'Ruby on Rails', 'Laravel', 'Symfony', 'ASP.NET', 
    'Phoenix', 'Gin', 'Fiber', 'Koa', 'Hapi', 'Socket.io', 'WebSockets',
    
    # Mobile Development
    'React Native', 'Flutter', 'SwiftUI', 'Android SDK', 'Kotlin Multiplatform',
    'Xamarin', 'Ionic', 'Cordova', 'Capacitor', 'Jetpack Compose',
    
    # Database Technologies
    'SQL', 'PostgreSQL', 'MySQL', 'SQLite', 'Microsoft SQL Server', 'Oracle',
    'MongoDB', 'Redis', 'Cassandra', 'Elasticsearch', 'Neo4j', 'DynamoDB',
    'Firebase Realtime Database', 'Firestore', 'Cosmos DB', 'MariaDB', 'CouchDB',
    
    # DevOps & Cloud
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Ansible',
    'Jenkins', 'GitHub Actions', 'GitLab CI/CD', 'CircleCI', 'ArgoCD', 'Helm',
    'Prometheus', 'Grafana', 'ELK Stack', 'Splunk', 'New Relic', 'Datadog',
    'Serverless', 'Lambda', 'EC2', 'S3', 'RDS', 'CloudFormation', 'VPC', 'IAM',
    
    # Machine Learning & Data Science
    'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'TensorFlow',
    'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn',
    'OpenCV', 'NLTK', 'spaCy', 'Hugging Face', 'MLflow', 'PySpark', 'Dask',
    'Tableau', 'Power BI', 'Looker', 'Apache Beam', 'Airflow', 'Kubeflow',
    
    # Blockchain
    'Solidity', 'Ethereum', 'Hyperledger', 'Web3.js', 'Smart Contracts', 'IPFS',
    
    # Testing
    'JUnit', 'TestNG', 'Mockito', 'Jest', 'Mocha', 'Chai', 'Jasmine', 'Cypress',
    'Selenium', 'Playwright', 'Puppeteer', 'Postman', 'SoapUI', 'JMeter',
    
    # Version Control & Tools
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Mercurial', 'Jira', 'Confluence',
    'Trello', 'Asana', 'Slack', 'Microsoft Teams', 'Zoom', 'Docker Compose',
    'Kafka', 'RabbitMQ', 'ActiveMQ', 'Nginx', 'Apache', 'HAProxy',
    
    # Other Technologies
    'Linux', 'Unix', 'Windows Server', 'Bash Scripting', 'PowerShell', 'REST API',
    'SOAP', 'OAuth', 'JWT', 'OAuth2', 'OpenID Connect', 'SAML', 'WebRTC', 'gRPC',
    'Microservices', 'Monolithic Architecture', 'Clean Architecture', 'DDD',
    'TDD', 'BDD', 'Agile', 'Scrum', 'Kanban', 'SAFe', 'CI/CD', 'DevSecOps',
    'OWASP', 'Penetration Testing', 'Ethical Hacking', 'Cybersecurity',
    
    # CMS & E-commerce
    'WordPress', 'Drupal', 'Joomla', 'Shopify', 'Magento', 'WooCommerce', 'BigCommerce',
    
    # Game Development
    'Unity', 'Unreal Engine', 'Godot', 'CryEngine', 'OpenGL', 'DirectX',
    
    # Embedded & IoT
    'Arduino', 'Raspberry Pi', 'Embedded C', 'RTOS', 'MQTT', 'CoAP',
    
    # Quantum Computing
    'Qiskit', 'Cirq', 'Quantum Machine Learning',
    
    # Functional Programming
    'F#', 'Erlang', 'OCaml', 'Scheme', 'Racket',
    
    # Legacy Systems
    'COBOL', 'Fortran', 'Pascal', 'Ada', 'VB.NET', 'Delphi',
    
    # Design & Multimedia
    'Photoshop', 'Illustrator', 'Figma', 'Sketch', 'Adobe XD', 'Blender', 'Maya',
    'AutoCAD', 'SolidWorks', 'Premiere Pro', 'After Effects',
    
    # Office & Productivity
    'Microsoft Office', 'Google Workspace', 'Notion', 'Airtable', 'Zapier',
    
    # Languages
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean',
    'Portuguese', 'Russian', 'Arabic', 'Hindi'
]
    
    # Perform case-insensitive search for skills
    found_skills = [skill for skill in skills if re.search(r'\b' + re.escape(skill) + r'\b', text, re.IGNORECASE)]
    
    return list(set(found_skills))  # Remove duplicates


import { uploadToS3 } from '../service/awsService.js';
import axios from 'axios';

export const uploadResume = async (req, res) => {
    try {
        const file = req.file;
        console.log(file)

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Upload to AWS S3
        const fileUrl = await uploadToS3(file);

        // Call ML API to extract skills (using FastAPI)
        const mlResponse = await axios.post('http://localhost:8000/extract-skills', {
            fileUrl,
        });

        const skills = mlResponse.data.skills;

        res.status(200).json({ message: 'Resume uploaded successfully', fileUrl, skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



import User from '../models/User.js';
import { uploadToS3 } from '../service/awsService.js';
import axios from 'axios';

export const uploadResume = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        ;
        // Upload to AWS S3
        let fileUrl = await uploadToS3(file);

        // Call ML API to extract skills (using FastAPI)
        const mlResponse = await axios.post(`${process.env.ML_HOST}/extract-skills/`, {
            fileUrl,
        });

        // extract the skills 
        let skills = mlResponse.data.skills;
        await User.findByIdAndUpdate(req.user.id, { resumeUrl: fileUrl, skills });

        // send the skills to the front end
        res.status(200).json({ message: 'Resume uploaded successfully', skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


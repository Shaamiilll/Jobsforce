import Job from "../models/job.js";
import User from "../models/User.js";

// Get all jobs
export const jobs = async (req, res) => {
    try {
        const jobDatabase = await Job.find(); // Corrected Job.find()
        console.log("Fetching all jobs");
        res.status(200).json(jobDatabase);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

// Search jobs by skills
export const getRecommendedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user?.skills?.length) {
            return res.status(400).json({ message: "No skills found. Please upload a resume." });
        }

        // Ensure skillsRequired is indexed in the Job model
        await Job.collection.createIndex({ skillsRequired: 1 });

        const recommendedJobs = await Job.find({ skillsRequired: { $in: user.skills } });

        res.status(200).json({ jobs: recommendedJobs });
    } catch (error) {
        console.error("Error fetching job recommendations:", error);
        res.status(500).json({ message: "Error fetching job recommendations", error });
    }
};

// Get job by ID
export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id); // Fixed findById()

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

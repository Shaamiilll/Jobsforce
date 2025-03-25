import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/job.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleJobs = [
  {
    title: "Frontend Developer",
    company: "Tech Solutions",
    description: "Develop and maintain UI components using React.",
    skillsRequired: ["JavaScript", "React", "CSS", "HTML"],
    location: "New York",
    remote: true,
    url: "https://techsolutions.com/jobs/frontend",
    source: "Manual Entry",
  },
  {
    title: "Backend Engineer",
    company: "Cloudify",
    description: "Build and scale backend systems using Node.js and MongoDB.",
    skillsRequired: ["Node.js", "MongoDB", "Express.js", "AWS"],
    location: "San Francisco",
    remote: false,
    url: "https://cloudify.com/jobs/backend",
    source: "Manual Entry",
  },
  {
    title: "Data Scientist",
    company: "AI Labs",
    description: "Analyze data and develop machine learning models.",
    skillsRequired: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    location: "Remote",
    remote: true,
    url: "https://ailabs.com/jobs/datascientist",
    source: "Manual Entry",
  },
];

// Function to insert sample jobs
const seedDatabase = async () => {
  try {
    await Job.deleteMany(); // Clear existing jobs
    await Job.insertMany(sampleJobs);
    console.log("✅ Sample Jobs Inserted Successfully!");
    mongoose.connection.close(); // Close connection after insertion
  } catch (error) {
    console.error("❌ Error inserting sample jobs:", error);
  }
};

// Run seeding function
seedDatabase();

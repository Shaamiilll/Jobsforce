import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  skillsRequired: [String],
  location: String,
  remote: Boolean,
  url: String, // Link to the job posting
  source: String, // Source of job (API, scraper)
});

const Job = mongoose.model("Job", jobSchema);

export default Job;

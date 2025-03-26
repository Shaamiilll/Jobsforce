import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: { type: [String], index: true }, // Added index for efficient lookups
  location: String,
  remote: Boolean,
  url: String, // Link to the job posting
  source: String, // Source of job (API, scraper)
});

// Create an index on skillsRequired to optimize skill-based searches
jobSchema.index({ skillsRequired: 1 });

const Job = mongoose.model("Job", jobSchema);

export default Job;

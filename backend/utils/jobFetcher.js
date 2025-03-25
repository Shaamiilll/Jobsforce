import axios from "axios";
import Job from "../models/job.js";

export const fetchJobsFromAPI = async () => {
  try {
    const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: { query: "Software Engineer", page: "1" },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    const jobs = response.data.data.map((job) => ({
      title: job.job_title,
      company: job.employer_name,
      description: job.job_description,
      skillsRequired: job.job_highlights?.Qualifications || [],
      location: job.job_city || "Remote",
      remote: job.job_is_remote,
      url: job.job_apply_link,
      source: "JSearch API",
    }));

    await Job.insertMany(jobs);
    console.log("✅ Jobs Fetched and Stored Successfully");
  } catch (error) {
    console.error("❌ Error Fetching Jobs:", error.message);
  }
};

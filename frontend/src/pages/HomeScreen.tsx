import React, { useState } from 'react';
import { uploadResume } from '../api/apiService';
import toast from 'react-hot-toast';

type UploadResult = {
  skills: string[];
};

type Job = {
  title: string;
  company: string;
  location: string;
  link: string;
};

const ResumeDashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    try {
      const result: UploadResult = await uploadResume(file);
      setSkills(result.skills);
      if (result.skills) {
        toast.success("Skills Extracted")
        setMessage('Resume uploaded successfully!');
      } else {
        toast.error("Error while fetching skills")
      }

      const jobsResponse = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: result.skills }),
      });
      const jobsData: Job[] = await jobsResponse.json();

      setJobs(jobsData);
      setMessage('Resume uploaded successfully!');
    } catch (error) {
      setMessage('Error processing resume');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 p-8 bg-white shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Resume Upload</h1>
          <p className="text-gray-600">Extract skills from your resume</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer block"
            >
              <span className="text-gray-700">
                {file ? file.name : 'Choose Resume File (PDF or DOCX)'}
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!file || isLoading}
            className="w-full bg-[#1a1134] hover:bg-[#2a1f44] text-white py-2 rounded transition 
                       disabled:bg-[#1a1134] disabled:cursor-not-allowed hover:cursor-pointer"
          >
            {isLoading ? 'Processing...' : 'Upload Resume'}
          </button>
        </form>

        {message && (
          <div className="text-center text-sm text-gray-600 mt-4">
            {message}
          </div>
        )}

        {skills.length > 0 && (
          <div className="bg-gray-50 p-4 rounded mt-6">
            <h3 className="font-semibold mb-2">Extracted Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-1/2  bg-gray-100">
        <div className="bg-white rounded-lg  h-full overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Matched Jobs</h2>
            {jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition"
                  >
                    <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                    <p className="text-gray-600 mb-1">{job.company}</p>
                    <p className="text-gray-500 text-sm mb-2">{job.location}</p>
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-block"
                    >
                      View Job Details
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                {skills.length > 0
                  ? 'No matching jobs found'
                  : 'Upload a resume to find matching jobs'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDashboard;
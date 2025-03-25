import React, {  useState } from 'react';
import { findJobsBySkill, uploadResume } from '../api/apiService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const userEmail = localStorage.getItem('user');

  


  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success('Logged out successfully');
    navigate('/login')
  };

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

      const jobsData = await findJobsBySkill(result.skills);
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">

          <div>
            <p className="font-medium">{userEmail? `Welcome, ${userEmail}`: "Welcome"}</p>
            <p className="text-xs text-gray-500">Resume Dashboard</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white text-sm px-3 py-2 rounded flex items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span>Logout</span>
        </button>
      </header>

      <div className="flex flex-1">
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

        <div className="w-1/2 bg-gray-100">
          <div className="bg-white rounded-lg h-full overflow-y-auto">
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
    </div>
  );
};

export default ResumeDashboard;
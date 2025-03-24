import React, { useState } from 'react';
import { uploadResume } from '../api/apiService';

type UploadResult = {
  skills: string[];
};

const UploadResume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    try {
      const result: UploadResult = await uploadResume(file);
      setSkills(result.skills);
      setMessage('Resume uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading resume');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg  max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Upload Your Resume</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-lg p-2 hover:cursor-pointer"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
        {skills.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Extracted Skills:</h3>
            <ul className="list-disc pl-5">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadResume;

'use client';

import { useEffect, useState } from 'react';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
// import html2pdf from 'html2pdf.js';
import dynamic from 'next/dynamic';

const html2pdf = typeof window !== 'undefined' ? require('html2pdf.js') : null;

const Preview = () => {
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('resumeData');
    if (data) {
      setResumeData(JSON.parse(data));
    }
  }, []);

  if (!resumeData) return <p>Loading...</p>;

  const downloadResume = () => {
    if (html2pdf && typeof window !== 'undefined') {
      const element = document.getElementById('resume-preview');
      if (element) {
        const opt = {
          margin: 1,
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 4 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf().from(element).set(opt).save();
      } else {
        console.error('Preview element not found.');
      }
    } else {
      console.error('html2pdf is not available.');
    }
  };
  return (
    <div className="md:p-8 max-w-3xl mx-auto p-4">
      <div className="flex border rounded-lg" id="resume-preview">
        {/* Left Side: Profile Info */}
        <div className="w-1/3 p-4 bg-sky-400 rounded-l-lg space-y-4">
          {resumeData.profileImage && (
            <img
              src={resumeData.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
          )}
          <h1 className="text-xl text-center font-bold">{resumeData.name}</h1>
          <p className="text-gray-600 text-xs mx-auto">{resumeData.profileDescription}</p>

          <div className="text-gray-600 text-xs flex items-center justify-center text-justify space-x-2">
            <EnvelopeIcon className="w-5 h-5 text-gray-600" />
            <span>{resumeData.email}</span>
          </div>
          <div className="text-gray-600 text-xs flex items-center justify-center space-x-2">
            <PhoneIcon className="w-5 h-5 text-gray-600" />
            <span>{resumeData.contact}</span>
          </div>
          <div className="text-gray-600 text-xs flex items-center justify-center space-x-2">
            <MapPinIcon className="w-5 h-5 text-gray-600" />
            <span>{resumeData.location}</span>
          </div>
        </div>

        {/* Right Side: Resume Details */}
        <div className="w-2/3 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Experience</h2>
            {resumeData.experiences.map((experience: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center">
                  <h3 className="text-md font-bold">{experience.title}</h3>
                  <p className="text-gray-500 text-xs ml-auto">
                    {experience.startDate} -- {experience.endDate}
                  </p>
                </div>
                <p>{experience.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Education</h2>
            {resumeData.educations.map((education: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className=" flex items-center">
                  <h3 className="text-md font-bold">{education.degree}</h3>
                  <p className="text-gray-500 text-xs ml-auto">
                    {education.startDate} -- {education.endDate}
                  </p>
                </div>
                <p>{education.school}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills</h2>
            <ul className="list-disc list-inside text-black text-sm space-y-1">
              {resumeData.skills.split(',').map((skill: string, index: number) => (
                <li key={index}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center space-x-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Print
        </button>
        <button
          onClick={downloadResume}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Download
        </button>
        <button
          onClick={downloadResume}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default Preview;

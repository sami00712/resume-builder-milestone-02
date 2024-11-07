'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Create = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    profileDescription: '',
    location: '',
    contact: '',
    email: '',
    profileImage: '',
    skills: '',
    experiences: [{ title: '', description: '', startDate: '', endDate: '' }],
    educations: [{ school: '', degree: '', startDate: '', endDate: '' }],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, index: number, type: 'experience' | 'education') => {
    const value = e.target.value;
    if (type === 'experience') {
      const updatedExperiences = [...formData.experiences];
      updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
      setFormData({ ...formData, experiences: updatedExperiences });
    } else if (type === 'education') {
      const updatedEducations = [...formData.educations];
      updatedEducations[index] = { ...updatedEducations[index], [field]: value };
      setFormData({ ...formData, educations: updatedEducations });
    }
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { title: '', description: '', startDate: '', endDate: '' },
      ],
    });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      educations: [
        ...formData.educations,
        { school: '', degree: '', startDate: '', endDate: '' },
      ],
    });
  };

  const handleSubmit = () => {
    localStorage.setItem('resumeData', JSON.stringify(formData));
    router.push('/preview');
  };

  return (
    <div className='bg-gradient-to-tr from-green-400 to-yellow-200'>
    <div className="p-8 max-w-md mx-auto border-2 shadow-md shadow-black">
      <h1 className="text-2xl font-bold mb-6">Create Your Resume</h1>

      {/* Profile Section */}
      <div className="space-y-4">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
        {formData.profileImage && (
          <img
            src={formData.profileImage}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="profileDescription"
          placeholder="Profile Description"
          value={formData.profileDescription}
          onChange={(e) => setFormData({ ...formData, profileDescription: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="skills"
          placeholder="Skills (use comma ,)"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Experience Form */}
      <div className="mt-6 space-y-6">
        <h2 className="text-xl font-bold">Experience</h2>
        {formData.experiences.map((experience, index) => (
          <div key={index} className="space-y-4">
            <input
              name="title"
              placeholder="Job Title"
              value={experience.title}
              onChange={(e) => handleChange(e, 'title', index, 'experience')}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="description"
              placeholder="Job Description"
              value={experience.description}
              onChange={(e) => handleChange(e, 'description', index, 'experience')}
              className="w-full p-2 border rounded"
            />
            <div className="flex space-x-4">
              <input
                type="date"
                name="startDate"
                placeholder="Start Date"
                value={experience.startDate}
                onChange={(e) => handleChange(e, 'startDate', index, 'experience')}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="endDate"
                placeholder="End Date"
                value={experience.endDate}
                onChange={(e) => handleChange(e, 'endDate', index, 'experience')}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleAddExperience}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Another Experience
        </button>
      </div>

      {/* Education Form */}
      <div className="mt-6 space-y-6">
        <h2 className="text-xl font-bold">Education</h2>
        {formData.educations.map((education, index) => (
          <div key={index} className="space-y-4">
            <input
              name="school"
              placeholder="School Name"
              value={education.school}
              onChange={(e) => handleChange(e, 'school', index, 'education')}
              className="w-full p-2 border rounded"
            />
            <input
              name="degree"
              placeholder="Degree"
              value={education.degree}
              onChange={(e) => handleChange(e, 'degree', index, 'education')}
              className="w-full p-2 border rounded"
            />
            <div className="flex space-x-4">
              <input
                type="date"
                name="startDate"
                placeholder="Start Date"
                value={education.startDate}
                onChange={(e) => handleChange(e, 'startDate', index, 'education')}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="endDate"
                placeholder="End Date"
                value={education.endDate}
                onChange={(e) => handleChange(e, 'endDate', index, 'education')}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleAddEducation}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Another Education
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Generate Resume
      </button>
    </div>
    </div>
  );
};

export default Create;

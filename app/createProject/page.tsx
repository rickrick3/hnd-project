'use client'
import React, { useState } from 'react';

interface Project {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: string; // Add status field
}

const ProjectForm: React.FC = () => {
  const [project, setProject] = useState<Project>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: 0,
    status: ''
  });

  const [errors, setErrors] = useState<Partial<Project>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prevProject => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors: Partial<Project> = {};
    if (!project.name) {
      formErrors.name = 'Project name is required';
    }
    if (!project.startDate) {
      formErrors.startDate = 'Start date is required';
    }
    if (!project.endDate) {
      formErrors.endDate = 'End date is required';
    }
    if (new Date(project.startDate) > new Date(project.endDate)) {
      formErrors.endDate = 'End date should be after start date';
    }
    if (!project.budget || project.budget <= 1000) {
      formErrors.budget = 'Budget should be greater than $1000';
    }
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      // Determine status
      const currentDate = new Date();
      const startDate = new Date(project.startDate);
      const status = startDate <= currentDate ? 'ACTIVE' : 'INACTIVE';
      
      // Submit the form data (e.g., send to backend)
      console.log('Form submitted:', { ...project, status });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            className="form-input w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="form-textarea w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
            className="form-input w-full"
          />
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
          <input
            type="date"
            name="endDate"
            value={project.endDate}
            onChange={handleChange}
            className="form-input w-full"
          />
          {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Budget</label>
          <input
            type="number"
            name="budget"
            value={project.budget}
            onChange={handleChange}
            className="form-input w-full"
          />
          {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <input
            type="text"
            name="status"
            value={project.status}
            readOnly={true}
            className="form-input w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;

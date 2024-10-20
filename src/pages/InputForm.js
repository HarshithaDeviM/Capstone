import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useAuthenticatedApi } from '../utils/api';

const InputForm = () => {
  const { user } = useUser();
  const history = useHistory();
  const authenticatedApi = useAuthenticatedApi();
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    company: '',
    role: '',
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        userId: user.id,
        name: user.fullName || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const pollQuestionStatus = useCallback(async () => {
    try {
      const result = await authenticatedApi.checkQuestionStatus(formData.userId);
      console.log('Question status result:', result); // Debugging line
      if (result.success && result.questionsGenerated === 1) { // Check for 1 instead of true
        setLoading(false); // Stop loading when questions are generated
        history.push('/dashboard'); // Redirect to dashboard
      } else {
        setTimeout(() => pollQuestionStatus(), 5000); // Poll every 5 seconds
      }
    } catch (error) {
      console.error('Error checking question status:', error);
      setError('Failed to check question status. Please try again.');
      setLoading(false); // Stop loading on error
    }
  }, [formData.userId, history, authenticatedApi]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading when form is submitted

    const formDataToSend = new FormData();
    formDataToSend.append('userId', formData.userId);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', user.primaryEmailAddress?.emailAddress);
    formDataToSend.append('company', formData.company);
    formDataToSend.append('role', formData.role);

    if (resume) {
      formDataToSend.append('resume', resume, resume.name);
    }

    try {
      await authenticatedApi.submitUserInput(formDataToSend);
      pollQuestionStatus(); // Start polling for question generation status
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred while submitting the form. Please try again.');
      setLoading(false); // Stop loading on error
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-xl font-semibold">Generating questions...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Enter Your Information</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume (PDF, DOC, DOCX)</label>
        <input
          type="file"
          id="resume"
          name="resume"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generate Questions
      </button>
    </form>
  );
};

export default InputForm;
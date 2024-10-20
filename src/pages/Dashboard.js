import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Layout from '../components/Layout';
import { Clock, BarChart, AlertCircle, FileText, PlayCircle, Star } from 'lucide-react';
import { useAuthenticatedApi } from '../utils/api';

const Dashboard = () => {
  const { user } = useUser();
  const authenticatedApi = useAuthenticatedApi();
  const [questionCounts, setQuestionCounts] = useState({
    resume: 0,
    role: 0,
    company: 0,
  });
  const [timeSpent, setTimeSpent] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [areaToImprove, setAreaToImprove] = useState('');
  const [resumeScore, setResumeScore] = useState(0);

  useEffect(() => {
    const storedTimeSpent = parseInt(localStorage.getItem('totalTimeSpent')) || 0;
    setTimeSpent(storedTimeSpent);
    setTimeout(() => {
      setSuccessRate(75);
      setAreaToImprove('Technical Skills');
    }, 1000);

    const updateQuestionCounts = () => {
      const storedResumeCount = parseInt(localStorage.getItem('resumeAnsweredCount')) || 0;
      const storedRoleCount = parseInt(localStorage.getItem('roleAnsweredCount')) || 0;
      const storedCompanyCount = parseInt(localStorage.getItem('companyAnsweredCount')) || 0;
      setQuestionCounts({
        resume: storedResumeCount,
        role: storedRoleCount,
        company: storedCompanyCount
      });
    };

    updateQuestionCounts();

    window.addEventListener('resumeAnsweredCountUpdated', updateQuestionCounts);
    window.addEventListener('roleAnsweredCountUpdated', updateQuestionCounts);
    window.addEventListener('companyAnsweredCountUpdated', updateQuestionCounts);

    const fetchResumeScore = async () => {
      try {
        const response = await authenticatedApi.getResumeAnalysis(user.id);
        if (response.success) {
          setResumeScore(response.analysis.score);
        }
      } catch (error) {
        console.error('Error fetching resume score:', error);
      }
    };

    fetchResumeScore();

    return () => {
      window.removeEventListener('resumeAnsweredCountUpdated', updateQuestionCounts);
      window.removeEventListener('roleAnsweredCountUpdated', updateQuestionCounts);
      window.removeEventListener('companyAnsweredCountUpdated', updateQuestionCounts);
    };
  }, [user]);

  const getProgressWidth = (count) => `${(count / 10) * 100}%`;

  return (
    <Layout>
      <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Dashboard</h1>
        
        {/* Performance Analytics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Performance Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
              <div className="text-blue-500 dark:text-blue-400 p-3 rounded-full mb-4"><Clock /></div>
              <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Time Spent</h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{timeSpent} minutes</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
              <div className="text-blue-500 dark:text-blue-400 p-3 rounded-full mb-4"><BarChart /></div>
              <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Resume Score</h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{resumeScore}%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
              <div className="text-blue-500 dark:text-blue-400 p-3 rounded-full mb-4"><AlertCircle /></div>
              <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Areas to Improve</h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{areaToImprove}</p>
            </div>
          </div>
        </div>

        {/* Recommended Resources Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Recommended Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex flex-col items-center">
              <div className="text-blue-500 dark:text-blue-400 p-3 rounded-full mb-4">
                <FileText size={24} />
              </div>
              <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">10 Tips for Acing Your Interview</h3>
              <Link to="/tips">
                <button className="bg-blue-500 dark:bg-blue-600 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-600 dark:hover:bg-blue-500">View</button>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex flex-col items-center">
              <div className="text-blue-500 dark:text-blue-400 p-3 rounded-full mb-4">
                <PlayCircle size={24} />
              </div>
              <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">How to Answer Behavioral Questions</h3>
              <Link to="/behavioral">
                <button className="bg-blue-500 dark:bg-blue-600 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-600 dark:hover:bg-blue-500">View</button>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex flex-col items-center">
              <div className="text-blue-500 dark:text-blue-400 p-3 rounded-full mb-4">
                <Star size={24} />
              </div>
              <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Mastering the STAR Method</h3>
              <Link to="/star-method">
                <button className="bg-blue-500 dark:bg-blue-600 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-600 dark:hover:bg-blue-500">View</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Question Tracker Section */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Question Tracker</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/resume-qa" className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="bg-blue-100 dark:bg-gray-700 p-3 rounded-full mb-4">
                <FileText size={24} className="text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Resume Based Questions</h3>
              <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">Questions Answered: {questionCounts.resume} / 10</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: getProgressWidth(questionCounts.resume) }}></div>
              </div>
            </Link>
            <Link to="/role-qa" className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="bg-green-100 dark:bg-gray-700 p-3 rounded-full mb-4">
                <BarChart size={24} className="text-green-500 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Role Based Questions</h3>
              <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">Questions Answered: {questionCounts.role} / 10</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: getProgressWidth(questionCounts.role) }}></div>
              </div>
            </Link>
            <Link to="/company-qa" className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="bg-yellow-100 dark:bg-gray-700 p-3 rounded-full mb-4">
                <AlertCircle size={24} className="text-yellow-500 dark:text-yellow-400" />
              </div>
              <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Company Based Questions</h3>
              <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">Questions Answered: {questionCounts.company} / 10</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: getProgressWidth(questionCounts.company) }}></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
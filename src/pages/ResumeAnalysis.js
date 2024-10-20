import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useAuthenticatedApi } from '../utils/api';
import Layout from '../components/Layout';
import { CheckCircle, AlertCircle } from 'lucide-react'; // Icons

const ResumeAnalysis = () => {
  const { user } = useUser();
  const authenticatedApi = useAuthenticatedApi();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (user && user.id) {
        try {
          let response = await authenticatedApi.getResumeAnalysis(user.id);
          if (response.status === 'pending') {
            // Poll every 5 seconds if the analysis is pending
            const intervalId = setInterval(async () => {
              response = await authenticatedApi.getResumeAnalysis(user.id);
              if (response.status !== 'pending') {
                clearInterval(intervalId);
                if (response.success && response.analysis) {
                  setAnalysis(response.analysis);
                } else {
                  setError(response.error || 'Failed to fetch resume analysis.');
                }
                setLoading(false);
              }
            }, 5000);
          } else if (response.success && response.analysis) {
            setAnalysis(response.analysis);
            setLoading(false);
          } else {
            setError(response.error || 'Failed to fetch resume analysis.');
            setLoading(false);
          }
        } catch (err) {
          console.error('Error fetching resume analysis:', err);
          setError('An error occurred while fetching the analysis.');
          setLoading(false);
        }
      }
    };

    fetchAnalysis();
  }, [user, authenticatedApi]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 dark:border-blue-300"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className="text-red-500 dark:text-red-300 text-center mt-10">{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-colors duration-500">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Resume Analysis</h2>
        
        {/* Resume Score */}
        {analysis ? (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Resume Score</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div className="bg-blue-600 dark:bg-blue-400 h-4 rounded-full" style={{ width: `${analysis.score}%` }}></div>
              </div>
              <p className="mt-2 text-right text-gray-600 dark:text-gray-300 font-semibold">{analysis.score}%</p>
            </div>

            {/* Strengths Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Strengths</h3>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {analysis.strengths && analysis.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-50 dark:bg-gray-700 p-4 rounded-lg shadow hover:scale-105 transition transform duration-300"
                  >
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={24} /> {/* Constant icon size */}
                    <span className="text-gray-700 dark:text-gray-200">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Areas for Improvement</h3>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {analysis.improvements && analysis.improvements.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-red-50 dark:bg-gray-700 p-4 rounded-lg shadow hover:scale-105 transition transform duration-300"
                  >
                    <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={24} /> {/* Constant icon size */}
                    <span className="text-gray-700 dark:text-gray-200">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center dark:text-gray-200">No analysis data available.</p>
        )}
      </div>
    </Layout>
  );
};

export default ResumeAnalysis;

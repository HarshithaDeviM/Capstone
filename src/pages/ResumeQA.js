import React, { useEffect, useState } from 'react';
import { useAuthenticatedApi } from '../utils/api';
import { useUser } from '@clerk/clerk-react';
import QACard from '../components/QACard';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { List, CheckCircle, HelpCircle } from 'lucide-react'; // Import lucide-react icons

const ResumeQA = () => {
  const { user } = useUser();
  const authenticatedApi = useAuthenticatedApi();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answeredCount, setAnsweredCount] = useState(0);
  const [filter, setFilter] = useState('all'); // 'all', 'answered', 'unanswered'

  useEffect(() => {
    const fetchQuestions = async () => {
      if (user && user.id) {
        try {
          const response = await authenticatedApi.getQuestions(user.id, 'resume');
          if (response.success) {
            setQuestions(response.questions);
            const initialAnsweredCount = response.questions.filter(q => q.answer).length;
            setAnsweredCount(initialAnsweredCount);
            localStorage.setItem('resumeAnsweredCount', initialAnsweredCount.toString());
          } else {
            setError(response.error || 'Failed to fetch questions.');
          }
        } catch (err) {
          console.error('Error fetching resume questions:', err);
          setError('An error occurred while fetching questions.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuestions();
  }, [user, authenticatedApi]);

  const handleAnswerGenerated = () => {
    const newCount = answeredCount + 1;
    setAnsweredCount(newCount);
    localStorage.setItem('resumeAnsweredCount', newCount.toString());
    window.dispatchEvent(new Event('resumeAnsweredCountUpdated'));
  };

  const filteredQuestions = questions.filter((question) => {
    if (filter === 'answered') return question.answer;
    if (filter === 'unanswered') return !question.answer;
    return true; // 'all'
  });

  const progress = (answeredCount / questions.length) * 100;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        <p className="ml-4 text-xl font-semibold dark:text-white">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 dark:text-red-400 text-center mt-10">{error}</p>;
  }

  return (
    <Layout>
      <motion.div 
        className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-700 dark:text-white">Resume Based Questions</h2>

        {/* Progress Bar with animation */}
        <div className="relative w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
          <motion.div
            className="bg-blue-500 dark:bg-blue-600 h-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
        <p className="text-center mb-6 text-lg font-semibold text-gray-700 dark:text-white">{answeredCount} of {questions.length} questions answered</p>

        {/* Filter Buttons with icons from lucide-react */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            className={`px-4 py-2 mx-2 rounded-lg flex items-center text-white ${filter === 'all' ? 'bg-blue-500 dark:bg-blue-600' : 'bg-blue-400 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600'}`}
            onClick={() => setFilter('all')}
          >
            <List className="mr-2" /> 
            All <span className="bg-white text-blue-500 dark:text-blue-600 rounded-full px-2 py-1 text-sm ml-2">{questions.length}</span>
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-lg flex items-center text-white ${filter === 'answered' ? 'bg-blue-600 dark:bg-blue-700' : 'bg-blue-400 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-700'}`}
            onClick={() => setFilter('answered')}
          >
            <CheckCircle className="mr-2" />
            Answered <span className="bg-white text-blue-600 dark:text-blue-700 rounded-full px-2 py-1 text-sm ml-2">{questions.filter(q => q.answer).length}</span>
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-lg flex items-center text-white ${filter === 'unanswered' ? 'bg-blue-700 dark:bg-blue-800' : 'bg-blue-400 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-800'}`}
            onClick={() => setFilter('unanswered')}
          >
            <HelpCircle className="mr-2" />
            Unanswered <span className="bg-white text-blue-700 dark:text-blue-800 rounded-full px-2 py-1 text-sm ml-2">{questions.filter(q => !q.answer).length}</span>
          </button>
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No questions found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredQuestions.map((question) => (
              <motion.div 
                key={question.id} 
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3 }}
              >
                <QACard 
                  question={question} 
                  onAnswerGenerated={handleAnswerGenerated}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default ResumeQA;

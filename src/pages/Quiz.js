import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useAuthenticatedApi } from '../utils/api';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const Quiz = () => {
  const { user } = useUser();
  const authenticatedApi = useAuthenticatedApi();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      if (user && user.id) {
        try {
          const response = await authenticatedApi.generateQuizQuestions(user.id);
          if (response.success && response.questions.length > 0) {
            setQuestions(response.questions.slice(0, 10)); // Limit to 10 questions
            setLoading(false);
          } else {
            setError('Failed to fetch quiz questions.');
            setLoading(false);
          }
        } catch (err) {
          console.error('Error fetching quiz questions:', err);
          setError('An error occurred while fetching quiz questions.');
          setLoading(false);
        }
      }
    };

    fetchQuizQuestions();
  }, [user, authenticatedApi]);

  const handleAnswerSubmit = (optionKey) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(optionKey);
      setIsAnswerSubmitted(true);

      const currentQ = questions[currentQuestion];
      if (optionKey === currentQ.correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (loading) {
    return (
      <Layout>
        <motion.div 
          className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <p className="text-center mt-10">Generating quiz questions... This may take a moment.</p>
        </motion.div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <motion.div 
          className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-500 text-center mt-10">{error}</p>
        </motion.div>
      </Layout>
    );
  }

  if (showScore) {
    return (
      <Layout>
        <motion.div 
          className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Quiz Completed!</h2>
          <p className="text-xl text-center mb-6">You scored {score} out of {questions.length}</p>
          <h3 className="text-2xl font-bold mb-4">Review Your Answers</h3>
          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={q.id} className="p-4 border rounded-lg">
                <p className="font-semibold">Question {index + 1}: {q.question}</p>
                <p className="text-green-600">Correct Answer: {q.correctAnswer}. {q.options[q.correctAnswer]}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div 
        className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Interview Preparation Quiz</h2>
        <div>
          <h3 className="text-xl font-semibold mb-4">Question {currentQuestion + 1} of {questions.length}</h3>
          <p className="mb-6">{questions[currentQuestion].question}</p>

          <div className="grid grid-cols-1 gap-4">
            {Object.entries(questions[currentQuestion].options).map(([optionKey, optionValue]) => (
              <button
                key={optionKey}
                onClick={() => handleAnswerSubmit(optionKey)}
                disabled={isAnswerSubmitted}
                className={`py-2 px-4 rounded-lg text-left transition duration-200 
                  ${isAnswerSubmitted && optionKey === questions[currentQuestion].correctAnswer 
                    ? 'bg-green-100 border-green-400 text-green-700' 
                    : isAnswerSubmitted && optionKey === selectedOption 
                    ? 'bg-red-100 border-red-400 text-red-700' 
                    : 'bg-white border-gray-300 hover:bg-gray-100'}`}
              >
                {optionKey}. {optionValue}
              </button>
            ))}
          </div>

          {isAnswerSubmitted && (
            <button
              onClick={handleNextQuestion}
              className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Next Question
            </button>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Quiz;

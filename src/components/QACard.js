import React, { useState } from 'react';
import { useAuthenticatedApi } from '../utils/api';

const QACard = ({ question, isDarkMode }) => {
  const authenticatedApi = useAuthenticatedApi();
  const [answer, setAnswer] = useState(question.answer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAnswer, setShowAnswer] = useState(!!question.answer); // Only show answer if it exists initially

  const handleGenerateAnswer = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await authenticatedApi.generateAnswer(question.id);
      setAnswer(response.answer);
      setShowAnswer(true); // Show the answer after generation
    } catch (err) {
      setError(err.message || 'Failed to generate answer.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswerVisibility = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className={`p-6 border rounded-lg shadow mb-4 transition-all transform hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Question */}
      <p className="mb-4 text-lg font-semibold">
        {question.question}
      </p>

      {/* Show answer if generated */}
      {answer && (
        <>
          <div className="flex items-center justify-between">
            <button
              onClick={toggleAnswerVisibility}
              className="text-sm text-blue-500 hover:underline focus:outline-none"
            >
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
          </div>
          {showAnswer && <p className="mt-2 text-base leading-relaxed">{answer}</p>}
        </>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Generate Answer Button */}
      {!answer && (
        <button
          onClick={handleGenerateAnswer}
          disabled={loading}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Answer'}
        </button>
      )}
    </div>
  );
};

export default QACard;

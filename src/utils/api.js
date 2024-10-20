import { useAuth } from '@clerk/clerk-react';
export const useAuthenticatedApi = () => {
  const { getToken } = useAuth();

  const submitUserInput = async (formData) => {
    try {
      const token = await getToken();
      const response = await fetch('/api/user-input', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit user input');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting user input:', error);
      throw error;
    }
  };

  const checkQuestionStatus = async (userId) => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/question-status?userId=${encodeURIComponent(userId)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to check question status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking question status:', error);
      throw error;
    }
  };

  const checkUserProfile = async (userId, email) => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/user-profile?userId=${encodeURIComponent(userId)}&email=${encodeURIComponent(email)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to check user profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking user profile:', error);
      throw error;
    }
  };

  const getQuestions = async (userId, questionType) => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/questions/${encodeURIComponent(questionType)}?userId=${encodeURIComponent(userId)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch ${questionType} questions`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${questionType} questions:`, error);
      throw error;
    }
  };

  const generateAnswer = async (questionId) => {
    try {
      const token = await getToken();
      const response = await fetch('/api/generate-answer', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate answer');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating answer:', error);
      throw error;
    }
  };

  const getResumeAnalysis = async (userId) => {
    const response = await fetch(`/api/resume-analysis?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await getToken()}`,
      },
    });
    return response.json();
  };

  const generateQuizQuestions = async (userId) => {
    try {
      const response = await fetch(`/api/generate-quiz-questions?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await getToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error generating quiz questions:', error);
      throw error;
    }
  };

  return { submitUserInput, checkQuestionStatus, checkUserProfile, getQuestions, generateAnswer, getResumeAnalysis, generateQuizQuestions };
};
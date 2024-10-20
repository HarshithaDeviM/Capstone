import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useHistory } from 'react-router-dom';
import { useAuthenticatedApi } from '../utils/api';
 // Ensure correct import

const LoadingPage = () => {
  const { user, isLoaded } = useUser();
  const history = useHistory();
  const [status, setStatus] = useState('Generating questions...');
  const [error, setError] = useState(null);
  const authenticatedApi = useAuthenticatedApi();

  useEffect(() => {
    let isMounted = true; // To avoid state updates on unmounted component

    const checkQuestionStatus = async () => {
      try {
        if (!isLoaded || !user || !user.id) {
          throw new Error('User information is missing or not loaded yet.');
        }

        console.log('Checking question status for user:', user.id);
        const data = await authenticatedApi.fetchQuestionStatus();

        console.log('Question Status Response:', data);

        if (data.success && data.questionsGenerated) {
          console.log('Questions generated, redirecting to dashboard');
          if (isMounted) {
            history.push('/dashboard');
          }
        } else if (data.success) {
          console.log('Questions not yet generated, checking again in 5 seconds');
          setStatus('Generating questions... Please wait.');
          setTimeout(checkQuestionStatus, 5000);
        } else {
          console.error('Unexpected response:', data);
          if (isMounted) {
            setError(data.error || 'Failed to check question status.');
          }
        }
      } catch (error) {
        console.error('Error checking question status:', error);
        if (isMounted) {
          setError(`Error occurred: ${error.message}. Please try again.`);
        }
      }
    };

    checkQuestionStatus();

    return () => {
      isMounted = false; // Cleanup flag on unmount
    };
  }, [isLoaded, user, history, authenticatedApi]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-500">{error}</h1>
          <button
            onClick={() => history.push('/input-form')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{status}</h1>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
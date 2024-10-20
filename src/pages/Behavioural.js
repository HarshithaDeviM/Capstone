import React from 'react';
import { PlayCircle, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Behavioral = () => {
  return (
    <Layout>
      <div className="p-8 bg-gray-100 dark:bg-gray-900 rounded-lg max-w-5xl mx-auto shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 flex items-center justify-center">
          <PlayCircle size={32} className="mr-3 text-blue-500 dark:text-blue-300" />
          How to Answer Behavioral Questions
        </h1>

        {/* Question 1 - Using STAR Method */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 transition-all duration-300">
          <div className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <CheckCircle size={24} className="mr-3 text-blue-500 dark:text-blue-300" />
            Question 1: Tell me about a time when you faced a challenge.
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <p className="mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Situation:</span> 
              <span className="text-gray-700 dark:text-white"> During my internship, I was tasked with redesigning a legacy system under tight deadlines.</span>
            </p>
            <p className="mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Task:</span> 
              <span className="text-gray-700 dark:text-white"> I had to gather user requirements, propose a new solution, and ensure seamless operation.</span>
            </p>
            <p className="mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Action:</span> 
              <span className="text-gray-700 dark:text-white"> I collaborated with the development team and introduced agile practices to manage tasks efficiently.</span>
            </p>
            <p className="mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Result:</span> 
              <span className="text-gray-700 dark:text-white"> The project was delivered on time, reducing downtime by 20% and improving system performance.</span>
            </p>
          </div>
        </div>

        {/* Question 2 - Using PAR Method */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 transition-all duration-300">
          <div className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <CheckCircle size={24} className="mr-3 text-blue-500 dark:text-blue-300" />
            Question 2: Give me an example of how you resolved a problem.
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <p className="mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Problem:</span> 
              <span className="text-gray-700 dark:text-white"> Our team was facing delays due to unclear communication about task dependencies.</span>
            </p>
            <p className="mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Action:</span> 
              <span className="text-gray-700 dark:text-white"> I introduced a clearer task assignment system with daily stand-ups to improve transparency.</span>
            </p>
            <p className="mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Result:</span> 
              <span className="text-gray-700 dark:text-white"> This led to a 25% increase in efficiency, and the project met its deadlines without further issues.</span>
            </p>
          </div>
        </div>

        {/* Question 3 - Using CAR Method */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 transition-all duration-300">
          <div className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <CheckCircle size={24} className="mr-3 text-blue-500 dark:text-blue-300" />
            Question 3: Describe a situation where you had to take initiative.
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <p className="mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Challenge:</span> 
              <span className="text-gray-700 dark:text-white"> We were falling behind on a project due to resource limitations.</span>
            </p>
            <p className="mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Action:</span> 
              <span className="text-gray-700 dark:text-white"> I created a revised schedule and personally took over some of the tasks to ensure the team stayed on track.</span>
            </p>
            <p className="mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Result:</span> 
              <span className="text-gray-700 dark:text-white"> As a result, we caught up on the project timeline and successfully delivered to the client.</span>
            </p>
          </div>
        </div>

        {/* Back to Dashboard button */}
        <Link
          to="/dashboard"
          className="block mt-8 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white text-center py-3 px-6 rounded-md w-48 mx-auto transition-all duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
    </Layout>
  );
};

export default Behavioral;

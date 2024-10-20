import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const MasteringSTAR = () => {
  return (
    <Layout>
      <div className="p-8 bg-gray-100 dark:bg-gray-900 rounded-lg max-w-5xl mx-auto shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 flex items-center justify-center">
          <Star size={32} className="mr-3 text-blue-500 dark:text-blue-300" />
          Mastering the STAR Method
        </h1>

        {/* Card 1: What is the STAR Method? */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 transition-all duration-300">
          <div className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <CheckCircle size={24} className="mr-3 text-blue-500 dark:text-blue-300" />
            What is the STAR Method?
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-gray-700 dark:text-white">
            The STAR method is a structured approach to answering behavioral interview questions by describing the Situation, Task, Action, and Result. It's a great way to effectively communicate your past experiences and how you handled challenges.
          </div>
        </div>

        {/* Card 2: Why is the STAR Method Effective? */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 transition-all duration-300">
          <div className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <CheckCircle size={24} className="mr-3 text-blue-500 dark:text-blue-300" />
            Why is the STAR Method Effective?
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-gray-700 dark:text-white">
            The STAR method allows you to give concise and complete answers while focusing on your direct role in solving the problem. It helps interviewers understand your thought process, problem-solving skills, and the outcomes you achieved.
          </div>
        </div>

        {/* Card 3: How to Use STAR? */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 transition-all duration-300">
          <div className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <CheckCircle size={24} className="mr-3 text-blue-500 dark:text-blue-300" />
            How to Use STAR?
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-gray-700 dark:text-white">
            <p><span className="font-bold text-blue-600 dark:text-blue-400">Situation:</span> Set the context for your story, explaining the situation you were in.</p>
            <p><span className="font-bold text-blue-600 dark:text-blue-400">Task:</span> Explain the challenge or task you faced, focusing on what needed to be done.</p>
            <p><span className="font-bold text-blue-600 dark:text-blue-400">Action:</span> Describe the specific steps you took to address the task. Highlight your contributions.</p>
            <p><span className="font-bold text-blue-600 dark:text-blue-400">Result:</span> Share the outcome of your actions, and whenever possible, quantify the results.</p>
          </div>
        </div>

        {/* Card 4: STAR Method in Action (Example) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 transition-all duration-300">
          <div className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <CheckCircle size={24} className="mr-3 text-blue-500 dark:text-blue-300" />
            STAR Method in Action (Example)
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-gray-700 dark:text-white">
            <p><span className="font-bold text-blue-600 dark:text-blue-400">Situation:</span> During my last project, our team faced a tight deadline to deliver a feature.</p>
            <p><span className="font-bold text-blue-600 dark:text-blue-400">Task:</span> As the lead, I had to manage team priorities and ensure smooth delivery.</p>
            <p><span className="font-bold text-blue-600 dark:text-blue-400">Action:</span> I implemented daily standups and reallocated resources to keep everyone on track.</p>
            <p><span className="font-bold text-blue-600 dark:text-blue-400">Result:</span> The project was delivered on time, and the client was impressed with the efficiency.</p>
          </div>
        </div>

        {/* Back to Dashboard Button */}
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

export default MasteringSTAR;

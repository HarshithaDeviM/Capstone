import React from 'react';
import Layout from '../components/Layout';
import { Search, Edit3, Shirt, Clock, ThumbsUp, FileText, Smile, Ear, HelpCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const tipsData = [
  "Research the company thoroughly.",  // Research icon
  "Practice common interview questions.",  // Edit icon
  "Dress appropriately for the interview.",  // Shirt icon
  "Be punctual and arrive early.",  // Clock icon
  "Be confident but not arrogant.",  // ThumbsUp icon
  "Bring multiple copies of your resume.",  // FileText icon
  "Maintain good body language throughout the interview.",  // Smile icon
  "Listen actively and don’t interrupt the interviewer.",  // Ear icon
  "Ask thoughtful questions at the end of the interview.",  // HelpCircle icon
  "Follow up with a thank-you email after the interview."  // Mail icon
];

const Tips = () => {
  const iconArray = [
    <Search size={25} />,      // Research the company thoroughly
    <Edit3 size={25} />,       // Practice common interview questions
    <Shirt size={25} />,       // Dress appropriately for the interview
    <Clock size={25} />,       // Be punctual and arrive early
    <ThumbsUp size={25} />,    // Be confident but not arrogant
    <FileText size={25} />,    // Bring multiple copies of your resume
    <Smile size={25} />,       // Maintain good body language
    <Ear size={25} />,         // Listen actively and don’t interrupt
    <HelpCircle size={25} />,  // Ask thoughtful questions
    <Mail size={25} />         // Follow up with a thank-you email
  ];

  return (
    <Layout>
      <div className="p-8 flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-6xl w-full">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Top 10 Tips for Acing Your Interview</h1>
          
          {/* Grid for Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {tipsData.map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="mb-4 text-blue-500 dark:text-blue-300">
                  {iconArray[index]}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tip {index + 1}</h3>
                <p className="text-gray-600 dark:text-gray-300">{tip}</p>
              </div>
            ))}
          </div>

          {/* Back to Dashboard button */}
          <Link
            to="/dashboard"
            className="block mt-8 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white text-center py-3 px-6 rounded-md w-48 mx-auto transition-all duration-300"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Tips;

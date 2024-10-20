import React, { useState } from 'react';
import './index.css';
import homebg from './background/homebg.jpg';
//import test from './background/test.jpg';
import eImage from './background/e1.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronDown, Menu } from 'lucide-react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
//import 'https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap';


// Import other images for the slider
import featureImage2 from './background/image2.png';
import featureImage3 from './background/image3.png';

function LandingPage() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentLines, setCurrentLines] = useState([]);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lines = [
    'Unlock Your Dream Job with',
    'AI-Powered Interview Prep',
    'Tailored Questions for Success',
  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const { isSignedIn } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (lineIndex < lines.length) {
      if (charIndex < lines[lineIndex].length) {
        const timeout = setTimeout(() => {
          setCurrentLines((prev) => {
            const updatedLines = [...prev];
            if (updatedLines[lineIndex]) {
              updatedLines[lineIndex] += lines[lineIndex][charIndex];
            } else {
              updatedLines[lineIndex] = lines[lineIndex][charIndex];
            }
            return updatedLines;
          });
          setCharIndex((prevIndex) => prevIndex + 1);
        }, 50); // Adjust to control the speed of typing each character
        return () => clearTimeout(timeout);
      } else {
        const lineTimeout = setTimeout(() => {
          setLineIndex((prevIndex) => prevIndex + 1);
          setCharIndex(0);
        }, 100); // Delay before moving to the next line
        return () => clearTimeout(lineTimeout);
      }
    } else {
      setButtonVisible(true);
    }
  }, [charIndex, lineIndex]);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn, history]);

  const typingAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });


  // FAQ data
  const faqs = [
    { question: "How much does it cost to use the platform?", answer: "Our pricing varies based on the plan you choose. Please refer to our Plans section for detailed information." },
    { question: "Can I use the platform for multiple job applications?", answer: "Yes, you can use our platform for multiple job applications. Our service is designed to help you prepare for various positions." },
    { question: "How long does it take to receive the resume modifications and questions?", answer: "Typically, you'll receive your tailored resume modifications and interview questions within 24-48 hours of submission." },
    { question: "What kind of interview questions can I expect?", answer: "You can expect a mix of role-specific, behavioral, and situational questions tailored to the job description and your resume." },
    { question: "Is my data secure?", answer: "Yes, we take data security very seriously. All your information is encrypted and stored securely. We never share your data with third parties." },
    { question: "Can I cancel my service or get a refund?", answer: "Yes, you can cancel your subscription at any time. Refund policies vary depending on your plan. Please contact our support team for specific details." },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-[#687494] text-white fixed w-full top-0 z-10 px-1 font-bold">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <Menu className="h-8 w-8" />
            </button>
          </div>

          {/* Left side: Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-8 px-10">
            <a href="#home" className="hover:text-gray-300 uppercase ">Home</a>
            <a href="#about" className="hover:text-gray-300 uppercase">About</a>
            <a href="#features" className="hover:text-gray-300">FEATURES</a>
            <a href="#plans" className="hover:text-gray-300 uppercase">Plans</a>
            <a href="#faqs" className="hover:text-gray-300 uppercase">FAQs</a>
          </div>

          {/* Right side: Sign In/Sign Up Buttons (Always visible and aligned to the right) */}
          <div className="flex space-x-6 px-1 ml-auto justify-end">
            <SignInButton mode="modal">
              <button className="bg-transparent hover:bg-gray-600 text-white font-bold py-2 px-4 border border-white rounded">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-transparent hover:bg-gray-600 text-white font-bold py-2 px-4 border border-white rounded">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>

        {/* Mobile Menu (Shown when Hamburger is clicked) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1a202c] text-white px-2 py-4 space-y-2">
            <a href="#home" className="block py-2 hover:bg-gray-700">Home</a>
            <a href="#about" className="block py-2 hover:bg-gray-700">About</a>
            <a href="#features" className="block py-2 hover:bg-gray-700">Features</a>
            <a href="#plans" className="block py-2 hover:bg-gray-700">Plans</a>
            <a href="#faqs" className="block py-2 hover:bg-gray-700">FAQs</a>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <div>
      {/* Home Section */}
      <section
        id="home"
        className={`h-screen flex flex-col justify-center items-center bg-cover bg-center px-4 ${isMobile ? 'px-2' : 'px-6'}`}
        style={{ backgroundImage: `url(${homebg})` }}
      >
        {/* Container/Card for Text and Button */}
        <div className="text-container bg-white bg-opacity-20 p-8 rounded-lg shadow-lg text-center ">
          {currentLines.map((line, index) => (
            <div key={index} className="text-line flex justify-center mb-4">
              {line.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={`text-${index === 0 ? '6xl' : index === 1 ? '5xl' : '3xl'} sm:text-${index === 0 ? '6xl' : index === 1 ? '5xl' : '3xl'} ${index === 2 ? 'font-normal' : 'font-bold'} text-white transition-colors duration-300 ${char === ' ' ? 'mr-0.5' : ''}`}                  style={{
                    fontFamily: index < 2 ? 'Lora, serif' : 'Lato',
                    WebkitTextFillColor: 'white',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    if (char !== ' ') {
                      e.target.style.backgroundImage = 'linear-gradient(to right, #6a11cb, #4a90e2, #ff0080)';
                      e.target.style.transform = 'translateY(-5px)';
                      e.target.style.WebkitBackgroundClip = 'text';
                      e.target.style.WebkitTextFillColor = 'transparent';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.target.style.WebkitTextFillColor = 'white';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </div>
          ))}

          {isButtonVisible && (
            <SignInButton mode="modal">
              <button className="button-container px-6 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-200 mt-6">
                Get Started For Free!
              </button>
            </SignInButton>
          )}
        </div>
      </section>
    </div>

      {/* About Section */}
      <section id="about" className="h-screen flex flex-col justify-center items-center bg-[#011a2e] py-20">
        <div className="container mx-auto flex flex-col lg:flex-row p-10 space-x-8">
          <div className="flex-1 text-left mb-8 text-white pl-10">
            <h2 className="text-7xl font-bold mb-4">About Our</h2>
            <h2 className="text-7xl font-bold mb-4">Website</h2>
            <p className="text-lg">
              Our AI-powered platform revolutionizes interview preparation,
              offering tailored questions and insights to help you succeed
              in landing your dream job. We analyze your resume and the job
              description to provide the most relevant and impactful
              interview practice experience.
            </p>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section id="features" className="min-h-screen flex justify-center items-center bg-[#011a2e] py-20">
        <div className="container mx-auto px-4 sm:px-2 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Slider {...sliderSettings} className="feature-slider">
              {/* Slide 1 */}
              <div className="p-4 md:px-2 w-full">
                <div className="h-[50vh] md:h-[60vh] flex flex-col justify-between relative rounded-3xl overflow-hidden bg-[#dbeafe]">
                  <div className="flex-1 flex items-center justify-center overflow-hidden rounded-3xl">
                    <img
                      src={eImage}
                      alt="Feature 1"
                      className="w-full h-auto object-contain p-4"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue m-4 md:m-8 absolute top-0 left-0">
                    Resume Based Questions
                  </h3>
                  <SignInButton mode="modal">
                    <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full absolute bottom-4 right-[calc(4rem+37.8px)] md:bottom-8 hover:bg-blue-700 transform hover:scale-105 transition-transform duration-300 ">
                      Try it now!
                    </button>

                  </SignInButton>
                </div>
              </div>
              {/* Slide 2 */}
              <div className="p-4 md:px-2 w-full">
                <div className="h-[50vh] md:h-[60vh] flex flex-col justify-between relative rounded-3xl overflow-hidden bg-[#dbeafe]">
                  <div className="flex-1 flex items-center justify-center overflow-hidden rounded-3xl">
                    <img
                      src={featureImage2}
                      alt="Feature 2"
                      className="w-full h-auto object-contain p-4"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue m-4 md:m-8 absolute top-0 left-0">
                    Role Based Questions
                  </h3>
                  <SignInButton mode="modal">
                    <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full absolute bottom-4 right-[calc(4rem+37.8px)] md:bottom-8 hover:bg-blue-700 transform hover:scale-105 transition-transform duration-300">
                      Try it now!
                    </button>

                  </SignInButton>
                </div>
              </div>
              {/* Slide 3 */}
              <div className="p-4 md:px-2 w-full">
                <div className="h-[50vh] md:h-[60vh] flex flex-col justify-between relative rounded-3xl overflow-hidden bg-[#dbeafe]">
                  <div className="flex-1 flex items-center justify-center overflow-hidden rounded-3xl">
                    <img
                      src={featureImage3}
                      alt="Feature 3"
                      className="w-full h-auto object-contain p-4"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue m-4 md:m-8 absolute top-0 left-0">
                    Company Specific Questions
                  </h3>
                  <SignInButton mode="modal">
                    <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full absolute bottom-4 right-[calc(4rem+37.8px)] md:bottom-8 hover:bg-blue-700 transform hover:scale-105 transition-transform duration-300">
                      Try it now!
                    </button>

                  </SignInButton>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>



      {/* Plans Section */}
      <section id="plans" className="min-h-screen flex flex-col justify-center items-center bg-[#011a2e] py-16">
        {/* Heading for Plans */}
        <h2 className="text-5xl text-white text-center font-semibold mb-10">Our Plans</h2>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 w-full px-4">
          {/* Basic Plan */}
          <div className="bg-gradient-to-b from-[#363d4f] to-[#7a8db5] rounded-3xl text-white p-8 w-full md:w-80 h-auto flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:from-[#2c4a88] hover:to-[#0c1323]">
            <center>
              <h2 className="text-4xl font-semibold mb-2">Basic Plan</h2>
              <p className="text-7xl font-bold mt-8">$19</p>
            </center>
            <p className="mb-4 mt-8">• Resume modification based on job description<br />
              • Job description-based interview questions</p>
            <center>
              <SignInButton mode="modal">
                <button className="bg-[#0a4272] text-white px-4 py-2 rounded-full">
                  Select Plan
                </button>
              </SignInButton>
            </center>
          </div>

          {/* Standard Plan */}
          <div className="bg-gradient-to-b from-[#363d4f] to-[#7a8db5] rounded-3xl text-white p-8 w-full md:w-80 h-auto flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:from-[#2c4a88] hover:to-[#0c1323]">
            <center>
              <h2 className="text-4xl font-semibold mb-2">Standard Plan</h2>
              <p className="text-7xl font-bold mt-8">$39</p>
            </center>
            <p className="mb-4 mt-8">• All Basic Plan features<br />
              • Personalized interview strategies<br />
              • 24/7 AI chat support</p>
            <center>
              <SignInButton mode="modal">
                <button className="bg-[#0a4272] text-white px-4 py-2 rounded-full">
                  Select Plan
                </button>
              </SignInButton>
            </center>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-b from-[#363d4f] to-[#7a8db5] rounded-3xl text-white p-8 w-full md:w-80 h-auto flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:from-[#2c4a88] hover:to-[#0c1323]">
            <center>
              <h2 className="text-4xl font-semibold mb-2">Premium Plan</h2>
              <p className="text-7xl font-bold mt-8">$59</p>
            </center>
            <p className="mb-4 mt-8">• All Standard Plan features<br />
              • Mock interviews with AI<br />
              • Performance analysis and feedback</p>
            <center>
              <SignInButton mode="modal">
                <button className="bg-[#0a4272] text-white px-4 py-2 rounded-full">
                  Select Plan
                </button>
              </SignInButton>
            </center>
          </div>
        </div>
      </section>




      {/* FAQ Section */}
      <section id="faqs" className="min-h-screen flex flex-col justify-center items-center bg-[#011a2e] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h1>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="w-full bg-white text-left p-4 rounded-md flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {activeIndex === index && (
                  <div className="bg-gray-100 p-4 mt-2 rounded-md">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 bg-gray-200 text-center p-6 rounded-full max-w-5xl mx-auto">
          <p className="sm:text-xl font-semibold px-5">
            Unlock tailored interview questions and expert insights designed to help you land your dream job.
            <br></br>Prepare smarter, not harder.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
import React, { useState } from 'react';
import './index.css';
import homebg from './background/homebg.png';
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
import { useTypewriter } from 'react-simple-typewriter';
// Import other images for the slider
import featureImage2 from './background/image2.png';
import featureImage3 from './background/image3.png';
import mobileImage1 from './background/mobileFeature1.jpg';
import mobileImage2 from './background/mobileFeature2.jpg';
import mobileImage3 from './background/mobileFeature3.jpg';
import About from './Aboutsection';






function LandingPage() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    // Function to handle the typewriter animation with async/await
    const startTyping = async () => {
      await typeSentence('Unlock Your Dream Job With', setText1, 60);
      await wait(100); // Wait half a second before starting the next sentence
      await typeSentence('AI-Powered Interview Prep', setText2, 60);
      await wait(100); // Wait again before starting the next sentence
      await typeSentence('Tailored Questions for Success', setText3, 60);
      await wait(500);
      setShowButton(true);
    };

    startTyping(); // Trigger the typing animation
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener to handle resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Utility function to create a delay
  const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Function to type out each sentence letter by letter
  const typeSentence = async (sentence, setText, speed) => {
    for (let i = 0; i <= sentence.length; i++) {
      await wait(speed);
      setText(sentence.slice(0, i));
    }
  };

  const wrapEachWord = (text) => {
    return text.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="word" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {word.split("").map((char, charIndex) => (
          <span
            key={charIndex}
            className="letter"
            style={{ display: "inline-block" }} // Keeps each character inline
          >
            {char}
          </span>
        ))}
        {/* Add a space after each word */}
        <span className="letter" style={{ display: "inline-block" }}>&nbsp;</span>
      </span>
    ));
  };

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
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn, history]);

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

      <div>
        {/* Home Section */}
        <section
          id="home"
          className="h-screen flex justify-center items-center bg-cover bg-center px-4"
          style={{ backgroundImage: `url(${homebg})` }}
        >
          {/* Container to wrap content */}
          <div className="container mx-auto flex justify-center items-center">
            {/* Card */}
            <div className=" text-white p-10 rounded-3xl shadow-lg w-full max-w-3xl lg:max-w-5xl flex flex-col justify-center items-center text-center mx-4 container-glow">              <div className="flex flex-col items-center justify-center h-full w-full">
              {/* Typewriter effect for the text */}
              <h1 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text">
                {wrapEachWord(text1)}
              </h1>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4 gradient-text">
                {wrapEachWord(text2)}
              </h2>
              <p className="text-lg sm:text-2xl mb-6 gradient-text">
                {wrapEachWord(text3)}
              </p>
              {showButton && (
                <SignInButton mode="modal">
                  <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-200 button-gradient">
                    Get Started For Free!
                  </button>
                </SignInButton>
              )}
            </div>
            </div>
          </div>
        </section>
      </div>


      {/* About Section */}
      <About />



      {/* Features Section */}
      <section id="features" className="min-h-screen flex justify-center items-center bg-[#011a2e] py-20">
        <div className="container mx-auto px-4 sm:px-2 lg:px-8">
          <div className="max-w-6xl mx-auto rounded-3xl ">
            <Slider {...sliderSettings} className="feature-slider rounded-3xl">
              {/* Slide 1 */}
              <div className="p-4 md:px-2 w-full ">
                <SignInButton mode="modal">
                  <div className="h-[50vh] md:h-[60vh] flex flex-col justify-between relative rounded-3xl overflow-hidden bg-[#dbeafe] cursor-pointer card-glow">
                    <div className="flex-1 flex items-center justify-center overflow-hidden rounded-3xl  ">
                      <img
                        src={isMobile ? mobileImage1 : eImage}
                        alt="Feature 1"
                        className={isMobile ? "w-full h-full object-cover" : "responsive-image"}
                      />
                    </div>
                    <h3
                      className="absolute top-4 w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue"
                    >
                      Resume Based Questions
                    </h3>
                  </div>
                </SignInButton>
              </div>

              {/* Slide 2 */}
              <div className="p-4 md:px-2 w-full">
                <SignInButton mode="modal">
                  <div className="h-[50vh] md:h-[60vh] flex flex-col justify-between relative rounded-3xl overflow-hidden bg-[#dbeafe] cursor-pointer card-glow">
                    <div className="flex-1 flex items-center justify-center overflow-hidden rounded-3xl">
                      <img
                        src={isMobile ? mobileImage2 : featureImage2}
                        alt="Feature 2"
                        className={isMobile ? "w-full h-full object-cover" : "responsive-image"}
                      />
                    </div>
                    <h3
                      className="absolute top-4 w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue"
                    >
                      Role Based Questions
                    </h3>
                  </div>
                </SignInButton>
              </div>

              {/* Slide 3 */}
              <div className="p-4 md:px-2 w-full">
                <SignInButton mode="modal">
                  <div className="h-[50vh] md:h-[60vh] flex flex-col justify-between relative rounded-3xl overflow-hidden bg-[#dbeafe] cursor-pointer card-glow">
                    <div className="flex-1 flex items-center justify-center overflow-hidden rounded-3xl">
                      <img
                        src={isMobile ? mobileImage3 : featureImage3}
                        alt="Feature 3"
                        className={isMobile ? "w-full h-full object-cover" : "responsive-image"}
                      />
                    </div>
                    <h3
                      className="absolute top-4 w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue"
                    >
                      Company Specific Questions
                    </h3>
                  </div>
                </SignInButton>
              </div>
            </Slider>
          </div>
        </div>
      </section >



      {/* Plans Section */}
      <section id="plans" className="min-h-screen flex flex-col justify-center items-center bg-[#011a2e] py-16">
        {/* Heading for Plans */}
        <h2 className="text-5xl text-white text-center font-semibold mb-10">Our Plans</h2>

        <div className="flex flex-col md:flex-row justify-center space-x-6 space-y-6 md:space-y-0 overflow-hidden relative w-full">
          {/* For mobile view, add swiper functionality */}
          <div className="flex md:hidden w-full snap-x overflow-x-auto scrollbar-hide">
            {/* Basic Plan */}
            <div className="bg-gradient-to-b from-[#363d4f] to-[#7a8db5] rounded-3xl text-white p-8 w-80 h-96 flex-shrink-0 snap-center mx-4 transition-transform duration-300 hover:scale-105 hover:from-[#2c4a88] hover:to-[#0c1323]">
              <center>
                <h2 className="text-4xl font-semibold mb-2 p-5px">Basic Plan</h2>
                <p className="text-7xl mb-2 font-bold p-5px mt-8">$19</p>
              </center>
              <p className="mb-4 mt-8">• Resume modification based on job description<br />
                • Job description-based interview questions</p>
              <center>
                <SignInButton mode="modal">
                  <button className="bg-[#0a4272] text-white px-4 py-2 rounded-full ">
                    Select Plan
                  </button>
                </SignInButton>
              </center>
            </div>

            {/* Standard Plan */}
            <div className="bg-gradient-to-b from-[#363d4f] to-[#7a8db5] rounded-3xl text-white p-8 w-80 h-96 flex-shrink-0 snap-center mx-4 transition-transform duration-300 hover:scale-105 hover:from-[#2c4a88] hover:to-[#0c1323]">
              <center>
                <h2 className="text-4xl font-semibold mb-2 p-5px">Standard Plan</h2>
                <p className="text-7xl mb-2 font-bold p-5px mt-8">$39</p>
              </center>
              <p className="mb-4 mt-8">• All Basic Plan features<br />
                • Personalized interview strategies<br />
                • 24/7 AI chat support</p>
              <center>
                <SignInButton mode="modal">
                  <button className="bg-[#0a4272] text-white px-4 py-2 rounded-full ">
                    Select Plan
                  </button>
                </SignInButton>
              </center>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-b from-[#363d4f] to-[#7a8db5] rounded-3xl text-white p-8 w-80 h-96 flex-shrink-0 snap-center mx-4 transition-transform duration-300 hover:scale-105 hover:from-[#2c4a88] hover:to-[#0c1323]">
              <center>
                <h2 className="text-4xl font-semibold mb-2 p-5px">Premium Plan</h2>
                <p className="text-7xl mb-2 font-bold p-5px mt-8">$59</p>
              </center>
              <p className="mb-4 mt-8">• All Standard Plan features<br />
                • Mock interviews with AI<br />
                • Performance analysis and feedback</p>
              <center>
                <SignInButton mode="modal">
                  <button className="bg-[#0a4272] text-white px-4 py-2 rounded-full ">
                    Select Plan
                  </button>
                </SignInButton>
              </center>
            </div>
          </div>

          {/* Desktop view remains unchanged */}
          <div className="hidden md:flex flex-col md:flex-row justify-center space-x-8 space-y-4 md:space-y-0 w-full">
            {/* Basic Plan */}
            <div className="bg-gradient-to-b from-[#363d4f] to-[#7a8db5] rounded-3xl text-white p-8 w-80 h-96 flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:from-[#2c4a88] hover:to-[#0c1323]">
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
            <div className="bg-gradient-to-b from-[#363d4f] to-[#7a8db5] rounded-3xl text-white p-8 w-80 h-96 flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:from-[#2c4a88] hover:to-[#0c1323]">
              <center>
                <h2 className="text-4xl font-semibold mb-2 p-5px">Standard Plan</h2>
                <p className="text-7xl mb-2 font-bold p-5px mt-8">$39</p>
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
            <div className="bg-gradient-to-b from-[#363d4f] to-[#7a8db5] rounded-3xl text-white p-8 w-80 h-96 flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:from-[#2c4a88] hover:to-[#0c1323]">
              <center>
                <h2 className="text-4xl font-semibold mb-2 p-5px">Premium Plan</h2>
                <p className="text-7xl mb-2 font-bold p-5px mt-8">$59</p>
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
        </div>
      </section>




      {/* FAQ Section */}
      < section id="faqs" className="min-h-screen flex flex-col justify-center items-center bg-[#011a2e] py-20" >
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
      </section >
    </div >
  );
}

export default LandingPage;

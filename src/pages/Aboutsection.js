import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, UserCheck, Zap, BookOpen } from 'lucide-react'
import { wrapEachWord } from './LandingPage';


const AboutUsTimeline = () => {
    const features = [
        {
            icon: Search,
            title: "AI-Powered Analysis",
            description: "Our cutting-edge AI analyzes your resume and job descriptions to provide tailored interview questions and insights."
        },
        {
            icon: UserCheck,
            title: "Personalized Experience",
            description: "Get a customized interview prep experience based on your unique career path and goals."
        },
        {
            icon: Zap,
            title: "Expert Feedback",
            description: "Receive instant, constructive feedback on your interview responses to help you improve and succeed."
        },
        {
            icon: BookOpen,
            title: "Continuous Learning",
            description: "Our AI evolves to stay current with industry trends and the latest interview techniques."
        }
    ]

    const controls = useAnimation()
    const [ref, inView] = useInView()

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    }

    return (
        <section id="about" className="min-h-screen bg-[#011a2e] text-white py-16 px-4 md:px-8 lg:px-16">

            <div className="max-w-4xl mx-auto pt-10">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {wrapEachWord("About Us")}
                </motion.h2>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="relative"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex items-start mb-12"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#687494' }}>
                                <feature.icon className="w-6 h-6" />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </div>
                            {index < features.length - 1 && (
                                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-blue-600" style={{ height: 'calc(100% - 3rem)' }} />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default AboutUsTimeline
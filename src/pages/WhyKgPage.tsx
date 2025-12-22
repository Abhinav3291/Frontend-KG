// Updated WhyKgPage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/container';
import { Section } from '../components/ui/section';
// import { Button } from '../components/ui/button';
import IndustryNetworkCarousel from '../components/IndustryNetworkCarousel';
import InstructorSection from '../components/InstructorSection';
import {
    GraduationCap,
    Users,
    Award,
    Target,
    Shield,
    Zap,
} from 'lucide-react';

const WhyKgPage = () => {
    const [activeTab, setActiveTab] = useState<'students' | 'corporates'>('students');

    const studentFeatures = [
        {
            icon: <GraduationCap className="w-6 h-6 text-yellow-500" />,
            title: 'Comprehensive Training',
            description:
                'From basic to advanced banking knowledge and skillset required for Bank or NBFC roles.',
        },
        {
            icon: <Users className="w-6 h-6 text-green-500" />,
            title: 'Expert Trainers',
            description:
                'Learn from ex-bankers who understand real industry requirements and help you succeed.',
        },
        {
            icon: <Award className="w-6 h-6 text-blue-500" />,
            title: 'Strong Network',
            description:
                'Build your industry network through our expert lecture schemes and alumni connections.',
        },
    ];

    const corporateFeatures = [
        {
            icon: <Target className="w-6 h-6 text-purple-500" />,
            title: 'Industry-Ready Talent',
            description:
                'Pre-screened candidates with practical knowledge and understanding of banking roles.',
        },
        {
            icon: <Shield className="w-6 h-6 text-orange-500" />,
            title: 'Quality Assurance',
            description:
                'Pre-interviewed passionate candidates helping you control attrition and build strong teams.',
        },
        {
            icon: <Zap className="w-6 h-6 text-teal-500" />,
            title: 'Hassle-Free Hiring',
            description:
                'Single-step solution for all hiring needs from executive to manager level positions.',
        },
    ];

    const features = activeTab === 'students' ? studentFeatures : corporateFeatures;

    return (
        <div className="flex flex-col gap-0 bg-white">
            <Section className="py-16 md:py-24 overflow-hidden">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT COLUMN: Stacked Images */}
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative flex flex-col gap-4"
                                >
                                    {/* Main large image */}
                                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                        <img
                                            src={
                                                activeTab === 'students'
                                                    ? 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800' // Students
                                                    : 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800' // Corporate
                                            }
                                            alt={activeTab === 'students' ? 'Students learning' : 'Corporate meeting'}
                                            className="w-full h-64 md:h-96 object-cover"
                                        />
                                    </div>

                                    {/* Decorative secondary images/elements for visual distinctiveness */}
                                    <div className="absolute -bottom-10 -right-10 md:-right-16 z-20 w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-white hidden md:block">
                                        <img
                                            src={
                                                activeTab === 'students'
                                                    ? 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600' // Students group
                                                    : 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600' // Handshake
                                            }
                                            alt="Secondary visual"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                     {/* Abstract styling element */}
                                    <div className="absolute top-10 -left-10 w-full h-full border-2 border-blue-500/20 rounded-3xl -z-10 transform -rotate-3" />
                                     <div className="absolute -bottom-5 -right-5 w-full h-full bg-blue-50 rounded-3xl -z-20 transform rotate-3" />
                                </motion.div>
                            </AnimatePresence>
                        </div>


                        {/* RIGHT COLUMN: Content */}
                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                    Why KG Training & Placements 

                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Why Choose <span className="text-blue-600">KG?</span>
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Discover the benefits that set us apart and propel your 
                                    {activeTab === 'students' ? ' career ' : ' hiring strategy '} 
                                    forward.
                                </p>

                                {/* Tabs */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    <button
                                        onClick={() => setActiveTab('students')}
                                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                            activeTab === 'students'
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        For Students
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('corporates')}
                                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                            activeTab === 'corporates'
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        For Corporates
                                    </button>
                                </div>

                                {/* Feature List (Vertical) */}
                                <div className="space-y-2 mb-10">
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-4"
                                        >
                                           <div className={`mt-1 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 border border-gray-100 shadow-sm`}>
                                                {feature.icon}
                                           </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                                <p className="text-gray-800 leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                {/* <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all w-full md:w-auto">
                                    {activeTab === 'students' ? 'Start Your Journey' : 'Partner With Us'}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button> */}
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Industry network section */}
            <IndustryNetworkCarousel />

            {/* Instructor section */}
            <InstructorSection />
        </div>
    );
};

export default WhyKgPage;
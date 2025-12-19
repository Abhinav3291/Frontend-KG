import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Container } from './ui/container';
import { Quote } from 'lucide-react';

const successStoriesData = [
    {
        name: 'Hanish Sharma',
        role: 'Placed at',
        company: 'Yes Bank Chandigarh',
        image: '/images/successStories/hanish_pic.png',
    },
    {
        name: 'Param',
        role: 'Placed at',
        company: 'Yes Bank Chandigarh',
        image: '/images/successStories/param.jpg'
    },
    {
        name: 'Mohit',
        role: 'Placed at',
        company: 'SK Finance Mansa',
        image: '/images/successStories/mohit.jpg'
    },
    {
        name: 'Mandeep',
        role: 'Placed at',
        company: 'Axis Bank Sangrur',
        image: '/images/successStories/mandeep.jpg'
    },
    {
        name: 'Vishal',
        role: 'Placed at',
        company: 'Yes Bank Chandigarh',
        image: '/images/successStories/vishal.jpg'
    },
    {
        name: 'Munish',
        role: 'Placed at',
        company: 'Tata Capital Chandigarh',
        image: '/images/successStories/munish.jpg'
    },
    {
        name: 'Sampann',
        role: 'Placed at',
        company: 'Cholamandalam Bathinda',
        image: '/images/successStories/sampann.jpg'
    },
    {
        name: 'Kushaldeep Duggal',
        role: 'Placed at',
        company: 'Cholamandalam Bathinda',
        image: '/images/successStories/kushaldeep.jpg'
    },
];

const SuccessStoryCard = ({ story }: { story: typeof successStoriesData[0] }) => {
    return (
        <div className="flex-shrink-0 w-[280px] sm:w-[320px] px-4 group py-4">
            <div className="relative bg-white rounded-2xl p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 border border-gray-100/50 hover:-translate-y-2 h-full flex flex-col items-center overflow-hidden">
                
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-50/50 to-blue-100/50 rounded-t-2xl z-0" />
                <div className="absolute top-4 right-4 z-10 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <Quote className="w-12 h-12 text-blue-600 rotate-180" />
                </div>

                {/* Profile Image */}
                <div className="relative z-10 mb-4 mt-2">
                    <div className="w-24 h-24 rounded-full p-1 bg-white shadow-lg ring-1 ring-black/5">
                        <img 
                            src={story.image} 
                            alt={story.name} 
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(story.name)}&background=1944AB&color=fff`
                            }}
                        />
                    </div>
                    
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center w-full">
                    <h3 className="font-bold text-gray-900 text-xl mb-1 text-center line-clamp-1">
                        {story.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-3 bg-blue-50/80 px-4 py-2 rounded-full border border-blue-100/50 group-hover:bg-blue-50 transition-colors duration-300">
                        <div className="text-center">
                            <span className="text-blue-900/60 text-xs font-semibold uppercase tracking-wider block text-[10px] leading-tight mb-0.5">
                                {story.role}
                            </span>
                            <span className="text-blue-800 font-bold text-sm">
                                {story.company}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
        </div>
    );
};

const SuccessStories = () => {
    useEffect(() => {
        const keyframes = `
            @keyframes slideStories {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }

            .animate-stories-slide {
                animation: slideStories 50s linear infinite;
            }
        `;
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <Section className="bg-gray-50 to-white overflow-hidden -mt-16">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-16 px-4">
                    
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Success Stories
                    </motion.h2>
                    
                    <motion.p 
                        className="text-lg text-gray-600 leading-relaxed"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Meet our achievers who transformed their careers with our expert guidance and placement support.
                    </motion.p>
                </div>

                <div className="relative -mx-4 sm:mx-0">

                    <div className="flex animate-stories-slide w-max py-4">
                        {[...successStoriesData, ...successStoriesData].map((story, index) => (
                            <SuccessStoryCard key={`${index}-${story.name}`} story={story} />
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default SuccessStories;

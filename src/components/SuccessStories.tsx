import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Container } from './ui/container';

const successStoriesData = [
    {
        name: 'Hanish Sharma',
        quote: '35 year old guy who was working part time with a government and lost job unexpectedly. Now working as a Sales Officer at YES BANK.',
        image: '/images/successStories/hanish_pic.png',
    },
    {
        name: 'Vishal Verma',
        quote: 'A delivery guy from Swiggy turned into a banker. Now Working as a Sales & Field Officer at Cholamandalam.',
        image: '/images/successStories/Vishal_kumar_pic.png',
    },
    {
        name: 'Sampan Ahuja',
        quote: 'A sales officer with 6 years of experience got promoted as relationship manager at Tata Capital.',
        image: '/images/successStories/sampan_ahuja_pic.png',
    },
    {
        name: 'Test Sarah W.',
        quote: 'Coursera\'s reputation for high-quality content, paired with its flexible structure, made it possible for me to dive into data analytics while managing family, health, and everyday life.',
        image: '/images/successStories/hanish_pic.png', // Placeholder - replace with actual image
    },
];

const SuccessStoryCard = ({ story }: { story: typeof successStoriesData[0] }) => {
    return (
        <div className="flex-shrink-0 w-72 sm:w-80 lg:w-72 px-3">
            <div className=" rounded-lg shadow-md p-6 h-full flex flex-col items-center bg-gradient-to-br from-blue-400/70 via-gray-200 to-blue-200">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 flex-shrink-0">
                    <img 
                        src={story.image} 
                        alt={story.name} 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-3 text-center">
                    {story.name}
                </h3>
                <p className="text-gray-800/60 text-sm leading-relaxed text-center flex-grow">
                    "{story.quote}"
                </p>
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
                animation: slideStories 20s linear infinite;
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
        <Section className="bg-white overflow-hidden -mt-16">
            <Container>
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        Our Success Stories
                    </h2>
                    <p className="text-md text-black/80 max-w-3xl mx-auto font-medium">
                        Hear from our students about their learning journey and career growth
                    </p>
                </motion.div>

                <div className="relative overflow-hidden">
                    <div className="flex gap-6 animate-stories-slide w-max">
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

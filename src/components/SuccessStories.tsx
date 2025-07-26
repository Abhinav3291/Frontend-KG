// c:\\Users\\abhin\\OneDrive\\Desktop\\freelance - Copy\\Frontend-KG-yaswant\\src\\components\\SuccessStories.tsx
import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Container } from './ui/container';

const successStoriesData = [
    {
        name: 'Hanish Sharma',
        story: '35 year old guy who was working part time with a government and lost job unexpectedly. Now working as a Sales Officer at',
        company: 'YES BANK',
        image: '/images/successStories/hanish_pic.png', // Replace with actual path
        companyLogo: '/images/partners/yes_bank_logo.png', // Replace with actual path
    },
    {
        name: 'Vishal Verma',
        story: 'A delivery guy from Swiggy turned into a banker. Now Working as a Sales & Field Officer at',
        company: 'cholamandalam',
        image: '/images/successStories/Vishal_kumar_pic.png', // Replace with actual path
        companyLogo: '/images/partners/chola_bank_logo.png', // Replace with actual path
    },
    {
        name: 'Sampan Ahuja',
        story: 'A sales officer with 6 years of experience got promoted as relationship manager at',
        company: 'Tata Capital',
        image: '/images/successStories/sampan_ahuja_pic.png', // Replace with actual path
        companyLogo: 'data:image/png;base64,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', // Replace with actual path
    },
];

const SuccessStoryCard = ({ story, index }: { story: typeof successStoriesData[0]; index: number }) => {
    const isEven = index % 2 === 0;

    const cardVariants = {
        hidden: { opacity: 0, x: isEven ? -100 : 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    };

    return (
        <motion.div
            className="flex items-center justify-center gap-8 my-12 flex-col md:flex-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
        >
            <div className={`relative w-48 h-48 flex-shrink-0 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                <img src={story.image} alt={story.name} className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white" />
            </div>
            <div className={`bg-gray-200 p-8 rounded-lg shadow-xl text-black max-w-md ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                <p className="text-lg mb-4">{story.story} <span className="font-bold">{story.company.toUpperCase()}</span></p>
                {story.companyLogo && <img src={story.companyLogo} alt={`${story.company} logo`} className="h-8 mt-2 bg-white p-1 rounded" />}
            </div>
        </motion.div>
    );
};

const SuccessStories = () => {
    return (
        <Section className="bg-white py-16 overflow-hidden -mb-10">
            <Container>
                <motion.h2
                    className="text-4xl font-bold text-center text-[#004449] mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Success Stories
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
                        Hear from our students about their learning journey and career growth
                    </p>
                </motion.h2>
                <div className="relative">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full bg-[#007981] -z-10 transform -skew-y-6"
                    ></div>
                    {
                        successStoriesData.map((story, index) => (
                            <SuccessStoryCard key={index} story={story} index={index} />
                        ))
                    }
                </div>
            </Container>
        </Section>
    );
};

export default SuccessStories;

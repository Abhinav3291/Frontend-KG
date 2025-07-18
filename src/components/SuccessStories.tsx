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
        company: 'YES BANK',
        image: '/images/successStories/sampan_ahuja_pic.png', // Replace with actual path
        companyLogo: '/images/partners/yes_bank_logo.png', // Replace with actual path
    },
];

const SuccessStoryCard = ({ story, index }: { story: typeof successStoriesData[0]; index: number }) => {
    const isEven = index % 2 === 0;

    const cardVariants = {
        hidden: { opacity: 0, x: isEven ? -100 : 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
        <Section className="bg-white py-16 overflow-hidden">
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
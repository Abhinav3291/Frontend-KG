import { motion } from 'framer-motion';

const networkData = [
    {
        name: 'Mr Pankaj Bajaj',
        title: 'CEO and Founder - Refinserv Pvt Ltd',
        subtitle: 'Ex Director - Beep Kart',
        image: '/images/successStories/hanish_pic.png',
    },
    {
        name: 'Mr Ankush Gupta',
        title: 'COO and Co founder - Refinserv Pvt Ltd',
        subtitle: '',
        image: '/images/successStories/hanish_pic.png',
    },
    {
        name: 'Mr Manik Garg',
        title: 'Cluster Head - Bajaj Finserv Pvt Ltd',
        subtitle: '',
        image: '/images/successStories/hanish_pic.png',
    },
    {
        name: 'Mr Amit Dua',
        title: 'Regional Head - IDFC First Bank',
        subtitle: '',
        image: '/images/successStories/hanish_pic.png',
    },
    {
        name: 'Mr Hitesh Sharma',
        title: 'State Head - Cholamandalam',
        subtitle: 'Group Used Car PV',
        image: '/images/successStories/hanish_pic.png',
    },
];

const NetworkCard = ({ member, index }: { member: typeof networkData[0]; index: number }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
    };

    return (
        <motion.div
            className="relative w-full max-w-sm mx-auto"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
        >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <img src={member.image} alt={member.name} className="w-20 h-20 object-cover rounded-full border-4 border-white bg-gray-200 shadow-md" />
            </div>
            <div className="bg-gray-50 text-black rounded-2xl p-6 pt-12 text-center shadow-lg h-full flex flex-col justify-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-800 mt-1 text-sm">{member.title}</p>
                {member.subtitle && <p className="text-gray-900 text-sm">{member.subtitle}</p>}
            </div>
        </motion.div>
    );
};

const IndustryNetwork = () => {
    return (
        <section className="relative bg-transparent py-20 overflow-hidden">

            <div className="relative container mx-auto px-4 z-10">
                <motion.h2
                    className="text-4xl font-extrabold text-center text-gray-800 mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    INDUSTRY NETWORK
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20 max-w-4xl mx-auto">
                    {networkData.map((member, index) => (
                        <div
                            key={index}
                            className={`flex justify-center ${index % 2 !== 0 ? 'md:mt-16' : ''}`}>
                            <NetworkCard member={member} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IndustryNetwork;
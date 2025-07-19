import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Container } from './ui/container';
import { Building2, Award, Star, TrendingUp } from 'lucide-react';

const networkData = [
    {
        name: 'Mr Pankaj Bajaj',
        title: 'CEO and Founder',
        company: 'Refinserv Pvt Ltd',
        subtitle: 'Ex Director - Beep Kart',
        image: '/images/network/pankajBajaj.jpg',
        icon: Building2,
        gradient: 'from-blue-500 to-purple-600'
    },
    {
        name: 'Mr Ankush Gupta',
        title: 'COO and Co founder',
        company: 'Refinserv Pvt Ltd',
        subtitle: '',
        image: '/images/network/ankushGupta.jpg',
        icon: TrendingUp,
        gradient: 'from-green-500 to-teal-600'
    },
    {
        name: 'Mr Manik Garg',
        title: 'Cluster Head',
        company: 'Bajaj Finserv Pvt Ltd',
        subtitle: '',
        image: '/images/network/manikGarg.jpg',
        icon: Award,
        gradient: 'from-orange-500 to-red-600'
    },
    {
        name: 'Mr Amit Dua',
        title: 'Regional Head',
        company: 'IDFC First Bank',
        subtitle: '',
        image: '/images/network/amitDua.jpg',
        icon: Star,
        gradient: 'from-indigo-500 to-purple-600'
    },
    {
        name: 'Mr Hitesh Sharma',
        title: 'State Head',
        company: 'Cholamandalam',
        subtitle: 'Group Used Car PV',
        image: '/images/network/hiteshSharma.jpg',
        icon: Building2,
        gradient: 'from-pink-500 to-rose-600'
    },
];


const NetworkCard = ({ member, index }: { member: typeof networkData[0]; index: number }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                type: "spring" as const,
                stiffness: 100
            }
        },
    };

    const IconComponent = member.icon;

    return (
        <motion.div
            className="group relative w-full max-w-sm mx-auto cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
            {/* Gradient Background Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                {/* Gradient Header */}
                <div className={`h-28 bg-gradient-to-r ${member.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/10 rounded-full"></div>
                </div>

                {/* Profile Image */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                            <IconComponent className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-16 pb-6 px-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                        {member.title}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        {member.company}
                    </p>
                    {member.subtitle && (
                        <p className="text-xs text-gray-500 italic">
                            {member.subtitle}
                        </p>
                    )}

                    {/* Decorative line */}
                    <div className={`w-12 h-1 bg-gradient-to-r ${member.gradient} rounded-full mx-auto mt-4 group-hover:w-16 transition-all duration-300`}></div>
                </div>
            </div>
        </motion.div>
    );
};

const IndustryNetwork = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    return (
        <Section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20 overflow-hidden -mb-16">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
            </div>

            <Container className="relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Header Section */}
                    <motion.div
                        className="text-center mb-16"
                        variants={titleVariants}
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Award className="w-4 h-4" />
                            Industry Network
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                Industry Network
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Meet our distinguished alumni who are now leading top organizations across the industry
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-6"></div>
                    </motion.div>

                    {/* Network Cards Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
                        variants={containerVariants}
                    >
                        {networkData.map((member, index) => (
                            <NetworkCard key={index} member={member} index={index} />
                        ))}
                    </motion.div>
                </motion.div>
            </Container>
        </Section>
    );
};

export default IndustryNetwork;

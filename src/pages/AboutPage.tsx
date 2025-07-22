import { motion } from 'framer-motion';
import { Section } from '../components/ui/section';
import { Container } from '../components/ui/container';
import { Briefcase, Target } from 'lucide-react';
import IndustryNetwork from '../components/IndustoryNetwork';
import TechnicalHead from '../components/ui/TechnicalHead';

const AboutPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Section className="bg-gray-50 mb-10">
      <Container>
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16 -mt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl mt-2 md:text-5xl font-bold text-gray-800 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <span className="font-bold text-blue-600">KG Training & Placements</span> is a premier institution dedicated to bridging the gap between students and the corporate world. We provide specialized training to equip aspiring professionals with the skills needed for the banking sector, while offering a streamlined talent pipeline for companies. Our platform emphasizes quality education, practical skills, and genuine placement support, making career advancement accessible and efficient.
          </p>
        </motion.div>

        {/* --- Vision & Mission Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-700 text-lg">
              We envision ourselves as a doorway to opportunities for students and a single-point solution for corporates to find perfect talent.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-700 text-lg">
              To work as a bridge between students and corporates, ensuring companies get skilled talent while students secure promising careers with well-paying jobs.
            </p>
          </motion.div>
        </div>

        <div className='mt-5'>
          <TechnicalHead />
          <IndustryNetwork />
        </div>

      </Container>
    </Section>
  );
};

export default AboutPage;
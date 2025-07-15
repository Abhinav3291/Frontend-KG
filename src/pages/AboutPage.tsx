
import { motion } from 'framer-motion';
import { FaCertificate, FaHandshake, FaUsers } from 'react-icons/fa';


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">


      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              About KG Training & Placements
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Bridging the gap between aspiring candidates and the banking sector
            </motion.p>
          </div>

          {/* Mission Statement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              <p className="text-lg text-gray-600">
                At KG Training & Placements, we work as a bridge between students and corporates, ensuring that companies get skilled, quality talent while students secure promising careers with well-paying jobs.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <FaCertificate className="text-4xl text-blue-500" />
                <div>
                  <h3 className="font-semibold text-gray-800">Certified Training</h3>
                  <p className="text-gray-600">Training programs designed by ex-bankers and certified trainers</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-800">Our Impact</h2>
              <p className="text-lg text-gray-600">
                Founded and led by industry professionals, we have successfully placed over 200 students in leading banks across North India.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <FaHandshake className="text-4xl text-green-500" />
                <div>
                  <h3 className="font-semibold text-gray-800">Industry Connections</h3>
                  <p className="text-gray-600">Strong network with leading banks in North India</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Commitment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center p-6"
              >
                <FaUsers className="text-4xl text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Student Success</h3>
                <p className="text-gray-600">We build confidence and enhance employability for every candidate</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center p-6"
              >
                <FaCertificate className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Training</h3>
                <p className="text-gray-600">Recognized certifications that add value to every candidate's profile</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center p-6"
              >
                <FaHandshake className="text-4xl text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Industry Partnership</h3>
                <p className="text-gray-600">Strong relationships with leading banks and financial institutions</p>
              </motion.div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-500 text-white rounded-lg py-6 px-8 inline-block hover:bg-blue-600 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">Join Our Journey</h3>
              <p className="text-gray-200">Together, let's shape bright futures</p>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutPage;

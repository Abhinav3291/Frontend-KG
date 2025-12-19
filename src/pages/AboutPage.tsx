import { motion } from 'framer-motion';
import { Section } from '../components/ui/section';
import { Container } from '../components/ui/container';
import { BookOpen, Users, Handshake } from 'lucide-react';

const AboutPage = () => {
  return (
    <Section className="bg-white py-20 md:py-28 text-gray-900 border-t border-gray-100">
      <Container>
        {/* --- Top Section: Company Profile --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          
          {/* Left Column: Heading & Image */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold leading-tight text-gray-900"
            >
              Campus to, <br /> 
              <span className="text-blue-600">Corporate.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative w-full aspect-[4/3] bg-blue-50 overflow-hidden rounded-2xl shadow-lg"
            >
              <img 
                src="/images/about.png" 
                alt="KG Training Team"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
               <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
            </motion.div>
          </div>

          {/* Right Column: About Text */}
          <div className="lg:col-span-7 pt-4 lg:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                 <span className="w-8 h-1 bg-blue-600 rounded-full" />
                 About KG Training & Placements
              </h2>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  <strong className="text-gray-900">KG Training & Placements</strong> is a premier institute dedicated to bridging the gap between ambitious students and the corporate banking world.
                </p>
                <p>
                  We noticed a common problem: many students have degrees but lack the specific practical skills that banks and NBFCs are looking for. On the other side, companies struggle to find ready-to-work talent.
                </p>
                <p>
                  That's where we come in. We offer specialized training programs designed by industry experts. We don't just teach theory; we prepare you for the real job. 
                </p>
                <p>
                  From interview preparation to understanding core banking concepts, we are with you at every step. Our goal is to make sure every student we train walks into their interview with confidence and walks out with a job offer.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className="w-full h-px bg-gray-100 mb-20" />

        {/* --- Bottom Section: 3 Columns --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          
          {/* Column 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative p-6 -m-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl border border-transparent hover:border-blue-100"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-200">
                <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">Our Beginning</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              We started recently with a clear focus: to fix the employment gap in the banking sector. What began as a small initiative has quickly grown into a trusted name for quality banking education.
            </p>
          </motion.div>

          {/* Column 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="group relative p-6 -m-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl border border-transparent hover:border-blue-100"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-200">
                <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              To be the "Gateway to Success" for students. We envision a future where every motivated student has access to the right training and the right opportunities to build a stable career.
            </p>
          </motion.div>

          {/* Column 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="group relative p-6 -m-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl border border-transparent hover:border-blue-100"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-200">
                <Handshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">Our Promise</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              We stick by our values of quality and honesty. We don't just provide courses; we provide careers. We promise to support our students until they achieve their professional goals.
            </p>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
};

export default AboutPage;;
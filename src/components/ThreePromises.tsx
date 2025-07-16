import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Container } from './ui/container';

const promises = [
  {
    id: 1,
    title: 'Knowledge',
    description: 'We deliver comprehensive and practical knowledge that will empower you to excel in your chosen field.',
    icon: (
      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Certificate',
    description: 'Earn a recognized certificate upon course completion to enhance your professional credentials.',
    icon: (
      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Placements',
    description: 'Access our extensive industry network to secure meaningful job opportunities after course completion.',
    icon: (
      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

const ThreePromises = () => {
  return (
    <Section className="bg-gray-50">
      <Container>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Promises</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            We're committed to your success with these fundamental guarantees
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promises.map((promise) => (
              <motion.div
                key={promise.id}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6">
                  {promise.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{promise.title}</h3>
                <p className="text-gray-600">{promise.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default ThreePromises;

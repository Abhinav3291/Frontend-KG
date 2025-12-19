import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Container } from './ui/container';
import { Building2, Award, Star, TrendingUp } from 'lucide-react';

const industryNetworkData = [
  {
    name: 'Mr Pankaj Bajaj',
    title: 'CEO and Founder',
    company: 'Refinserv Pvt Ltd',
    subtitle: 'Ex Director - Beep Kart',
    image: '/images/network/pankajBajaj.jpg',
    icon: Building2,
  },
  {
    name: 'Mr Ankush Gupta',
    title: 'COO and Co-Founder', 
    company: 'Refinserv Pvt Ltd',
    subtitle: 'COO and Co-Founder',
    image: '/images/network/ankushGupta.jpg',
    icon: TrendingUp,
  },
  {
    name: 'Mr Manik Garg',
    title: 'Cluster Head',
    company: 'Bajaj Finserv Pvt Ltd',
    subtitle: 'Cluster Head',
    image: '/images/network/manikGarg.jpg',
    icon: Award,
  },
  {
    name: 'Mr Amit Dua',
    title: 'Regional Head',
    company: 'IDFC First Bank',
    subtitle: 'Regional Head',
    image: '/images/network/amitDua.jpg',
    icon: Star,
  },
  {
    name: 'Mr Hitesh Sharma',
    title: 'State Head',
    company: 'Cholamandalam',
    subtitle: 'Group Used Car PV',
    image: '/images/network/hiteshSharma.jpg',
    icon: Building2,
  },
  {
        name: 'Mr Ravi Jha',
        title: 'Chartered Accountant',
        company: 'Bhattacharya and associates',
        subtitle: 'Chartered Accountant',
        image: '/images/network/ravi.jpg',
        icon: Building2
    },
    {
        name: 'Mr Tinku Sharma',
        title: 'Chartered Accountant',
        company: 'Mahindra and Mahindra',
        subtitle: 'Chartered Accountant',
        image: '/images/network/tinku.jpg',
        icon: Building2
    },
     {
        name: 'Mr Gaurav Garg',
        title: 'Area Manager',
        company: 'Cholamandalam Bank',
        subtitle: 'Area Manager',
        image: '/images/network/gaurav.jpg',
        icon: Building2
    },
    
];

const IndustryNetworkCard = ({ member }: { member: (typeof industryNetworkData)[0] }) => {
  return (
    <div className="group relative rounded-2xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-blue-50 overflow-hidden h-full flex flex-col items-center max-w-[260px] mx-auto">
      {/* Decorative gradient blob - lighter */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 transition-opacity" />
      
      {/* Icon watermark - smaller */}
      <member.icon className="absolute top-3 right-3 text-blue-50 w-8 h-8 opacity-40 rotate-12" />

      {/* Profile Image - Reduced size, removed badge icon entirely */}
      <div className="relative mb-3 z-10 mt-1">
        <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-r from-blue-400 to-indigo-400 shadow-sm">
           <img
            src={member.image}
            alt={member.name}
            className="w-full h-full rounded-full object-cover border-2 border-white bg-white"
          />
        </div>
      </div>

      {/* Text Content - Compact */}
      <div className="text-center z-10 flex-grow flex flex-col justify-center w-full">
        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-0.5">
          {member.name}
        </h3>
        <p className="text-xs font-semibold text-blue-600 mb-2">{member.title}</p>
        
        {/* Removed the divider line causing the 'weird div' look */}
        
        <p className="text-sm font-medium text-gray-700">{member.company}</p>
        {member.subtitle && (
          <p className="text-[10px] text-gray-500 italic mt-0.5">{member.subtitle}</p>
        )}
      </div>

       {/* Bottom accent */}
       <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};

const IndustryNetworkCarousel = () => {
  useEffect(() => {
    const keyframes = `
      @keyframes slideIndustryNetwork {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .animate-industry-network-slide {
        animation: slideIndustryNetwork 30s linear infinite;
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
    // Reduced py-24 to py-12 and added -mt to reduce gap further if needed
    <Section className="relative bg-gray-50 overflow-hidden -mt-16 md:-mt-32">
       {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2" />
          <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl translate-x-1/2" />
      </div>

      <Container>
        <motion.div
          className="text-center mb-10 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-4 shadow-sm">
            <Award className="w-3 h-3" />
            Our Mentors
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Industry Network</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Gain insights from seasoned leaders across top banks and NBFCs.
          </p>
        </motion.div>

        <div className="relative z-10">

            
            <div className="flex gap-6 animate-industry-network-slide w-max py-2">
            {[...industryNetworkData, ...industryNetworkData].map((member, index) => (
                // Reduced width of container
                <div key={`${index}-${member.name}`} className="flex-shrink-0 w-64">
                <IndustryNetworkCard member={member} />
                </div>
            ))}
            </div>
        </div>
      </Container>
    </Section>
  );
};

export default IndustryNetworkCarousel;



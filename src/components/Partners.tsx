import { useEffect } from 'react';
import { Section } from './ui/section';
import { Container } from './ui/container';

const partners = [
  {
    name: 'Cholamandalam',
    logo: '/images/partners/chola_bank_logo.png',
    alt: 'Cholamandalam Logo'
  },
  {
    name: 'HDFC Bank',
    logo: '/images/partners/hdfc_bank_logo.png',
    alt: 'HDFC Bank Logo'
  },
  {
    name: 'Axis Bank',
    logo: '/images/partners/axis_bank.png',
    alt: 'Axis Bank Logo'
  },
  {
    name: 'AU Small Finance Bank',
    logo: '/images/partners/au_bank_logo.png',
    alt: 'AU Bank Logo'
  },
  {
    name: 'Kotak Mahindra Bank',
    logo: '/images/partners/Kotak_Mahindra_Bank_logo.png',
    alt: 'Kotak Logo'
  },
  {
    name: 'Yes Bank',
    logo: '/images/partners/yes_bank_logo.png',
    alt: 'Yes Bank Logo'
  }
];

const Partners = () => {
  useEffect(() => {
    const keyframes = `
      @keyframes slide {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .animate-slide {
        animation: slide 20s linear infinite;
      }

      .partner-logo {
        transition: transform 0.3s ease;
      }

      .partner-logo:hover {
        transform: scale(1.1);
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
    <Section className="bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Our Alumni's Placed in Top Organizations
        </h2>

        <div className="relative overflow-hidden py-6">
          <div className="flex gap-12 animate-slide w-max">
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-48 h-24 flex flex-col items-center justify-center"
              >
                <img
                  src={partner.logo}
                  alt={partner.alt || partner.name}
                  className="partner-logo max-h-12 object-contain"
                />
                <span className="mt-2 text-xs text-gray-700">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Partners;

import React from 'react';
import '../../styles/CourseSales.css';

import { Section } from '../ui/section';
import { Container } from '../ui/container';
import { cn } from '../../lib/utils';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export interface InstructorStats {
    students: number;
    courses: number;
    yearsExperience: number;
}

export interface SocialLink {
    platform: 'linkedin' | 'twitter' | 'email';
    url: string;
    label: string;
}

export interface InstructorSectionProps {
    name: string;
    role: string;
    bio: string[];
    image: {
        src: string;
        alt: string;
    };
    stats: InstructorStats;
    socialLinks: SocialLink[];
    className?: string;
}

const socialIcons: Record<string, React.ReactNode> = {
    linkedin: <Linkedin className="w-5 h-5" />,
    twitter: <Twitter className="w-5 h-5" />,
    email: <Mail className="w-5 h-5" />,
};

const TechnicalHead = () => {
    const name = 'Gaurav Garg';
    const role = 'Technical Head';
    const bio = [
        'Gaurav Garg, an ambitious man who loves to teach and learn.Post Graduate Diploma holder in Marketing and Data Analytics from XIME Bangalore, India.An attendee of Design Thinking course at Audencia Business School, Paris.Vast experience of 5+ years in Core Banking Sales.'
    ];
    const image = {
        src: '/gaurav.jpg',
        alt: `${name}, ${role} at our institution`
    };
    const socialLinks = [
        {
            platform: 'email',
            url: 'mailto:contact@example.com',
            label: 'Send an email',
        },
    ];

    return (
        <Section className={cn('bg-gray-50 -mb-16')}>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Instructor Image */}
                    <motion.div
                        className="lg:col-span-5 relative group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="sm:block md:hidden text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Meet Our {role}
                        </h2>
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-auto h-auto object-fit transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white text-2xl font-bold">{name}</h3>
                                    <p className="text-blue-200 font-medium">{role}</p>
                                    <div className="flex space-x-3 pt-2">
                                        {socialLinks.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={link.label}
                                                className="text-white hover:text-blue-300 transition-colors"
                                            >
                                                {socialIcons[link.platform]}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Instructor Info */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="max-w-3xl">
                            <h2 className="hidden sm:block text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Meet Our {role}
                            </h2>
                            <h3 className="text-xl text-blue-600 font-semibold mb-6">{name}</h3>

                            <div className="space-y-4 text-gray-700 mb-8">
                                {bio.map((paragraph, index) => (
                                    <p key={index} className="leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
};

export default TechnicalHead;   

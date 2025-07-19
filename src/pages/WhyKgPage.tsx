// Updated WhyKgPage.tsx
import { useState } from 'react';
import { Container } from '../components/ui/container';
import { Button } from '../components/ui/button';
import {
    GraduationCap,
    Users,
    Award,
    Target,
    Shield,
    Zap,
    CheckCircle,
    ArrowRight,
} from 'lucide-react';

const WhyKgPage = () => {
    const [activeTab, setActiveTab] = useState<'students' | 'corporates'>('students');

    const studentFeatures = [
        {
            icon: <GraduationCap className="w-8 h-8 text-yellow-500" />,
            title: 'Comprehensive Training',
            description:
                'From basic to advanced banking knowledge and skillset required for Bank or NBFC roles.',
            border: 'border-yellow-400',
        },
        {
            icon: <Users className="w-8 h-8 text-green-500" />,
            title: 'Expert Trainers',
            description:
                'Learn from ex-bankers who understand real industry requirements and help you succeed.',
            border: 'border-green-400',
        },
        {
            icon: <Award className="w-8 h-8 text-blue-500" />,
            title: 'Certified Program',
            description:
                'Get a recognized KG training certificate that boosts your profile and resume significantly.',
            border: 'border-blue-400',
        },
    ];

    const corporateFeatures = [
        {
            icon: <Target className="w-8 h-8 text-purple-500" />,
            title: 'Industry-Ready Talent',
            description:
                'Pre-screened candidates with practical knowledge and understanding of banking roles.',
            border: 'border-purple-400',
        },
        {
            icon: <Shield className="w-8 h-8 text-orange-500" />,
            title: 'Quality Assurance',
            description:
                'Pre-interviewed passionate candidates helping you control attrition and build strong teams.',
            border: 'border-orange-400',
        },
        {
            icon: <Zap className="w-8 h-8 text-teal-500" />,
            title: 'Hassle-Free Hiring',
            description:
                'Single-step solution for all hiring needs from executive to manager level positions.',
            border: 'border-teal-400',
        },
    ];

    const features = activeTab === 'students' ? studentFeatures : corporateFeatures;

    return (
        <div className="bg-white text-center py-16">
            <Container>
                {/* Title and Description */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">WHY KG?</h1>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    <span className="text-blue-600 font-semibold">KG</span> simplifies banking education by offering tailored
                    training for students and efficient hiring for corporates. We ensure seamless onboarding, career prep, and
                    zero-placement fee hiring with expert support.
                </p>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    <Button
                        onClick={() => setActiveTab('students')}
                        className={`px-6 py-2 font-medium ${activeTab === 'students' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                            }`}
                    >
                        For Students
                    </Button>
                    <Button
                        onClick={() => setActiveTab('corporates')}
                        className={`px-6 py-2 font-medium ${activeTab === 'corporates' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                            }`}
                    >
                        For Corporates / HR
                    </Button>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-xl shadow-md border-t-4 ${feature.border} p-6 transition-transform hover:-translate-y-1`}
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="max-w-4xl mx-auto text-left mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                        {activeTab === 'students' ? 'Additional Benefits for Students' : 'Why Partner With Us'}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {activeTab === 'students' ? (
                            <>
                                <BenefitItem
                                    title="Industry Expert Network"
                                    description="Weekly sessions with 10+ years experienced banking professionals"
                                />
                                <BenefitItem
                                    title="Dedicated Placement Support"
                                    description="Close collaboration with HR teams for successful placements"
                                />
                            </>
                        ) : (
                            <>
                                <BenefitItem
                                    title="Zero Placement Fees"
                                    description="We don't charge students any placement commission or fees"
                                />
                                <BenefitItem
                                    title="Quality Education Focus"
                                    description="We believe in quality education that makes students placement-ready"
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* CTA */}
                <div className=" text-gray-400 py-12 rounded-xl px-6 md:px-12 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-3">
                        {activeTab === 'students' ? 'Ready to Start Your Banking Career?' : 'Looking for Quality Banking Professionals?'}
                    </h3>
                    <p className="mb-6">
                        {activeTab === 'students'
                            ? 'Join our comprehensive training program and get placed in top banks and NBFCs.'
                            : 'Partner with us for hassle-free hiring of industry-ready candidates.'}
                    </p>
                    <Button className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-2 font-semibold">
                        {activeTab === 'students' ? 'Enroll Now' : 'Partner With Us'}
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </Container>
        </div>
    );
};

// Subcomponent
const BenefitItem = ({ title, description }: { title: string; description: string }) => (
    <div className="flex items-start gap-3">
        <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
        <div>
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);

export default WhyKgPage;
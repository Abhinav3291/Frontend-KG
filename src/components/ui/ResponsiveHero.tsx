import React, { useState, useEffect, type JSX } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Menu,
    X
} from "lucide-react";

// TypeScript interfaces
interface Slide {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    description: string;
    btnText: string;
    redirectTo: string;
}

export default function ResponsiveHero(): JSX.Element {

    const [currentSlide, setCurrentSlide] = useState<number>(0);


    // Slides with placeholder images
    const slides: Slide[] = [
        {
            id: 1,
            image: "https://img.freepik.com/free-photo/man-getting-his-hair-cut-barber-shop4_23-2149186461.jpg?ga=GA1.1.1264861903.1717471952&semt=ais_hybrid&w=740",
            title: "Welcome to PMC Barber",
            subtitle: "Professional Haircuts & Styling",
            description: "Experience premium haircuts and grooming services for men",
            btnText: "Book Now",
            redirectTo: "#contact"
        },
        {
            id: 2,
            image: "https://img.freepik.com/premium-photo/portrait-handsome-model-man-barber-shop-generative-by-ai_894067-13676.jpg?ga=GA1.1.1264861903.1717471952&semt=ais_hybrid&w=740",
            title: "Classic & Modern Styles",
            subtitle: "From traditional to trendy",
            description: "Our skilled barbers can deliver any look you desire",
            btnText: "View Services",
            redirectTo: "#services"
        },
        {
            id: 3,
            image: "https://img.freepik.com/free-photo/man-barbershop-salon-doing-haircut-beard-trim_1303-20952.jpg?ga=GA1.1.1264861903.1717471952&semt=ais_hybrid&w=740",
            title: "Premium Products",
            subtitle: "Quality hair care",
            description: "We use only the finest products for your hair and skin",
            btnText: "Learn More",
            redirectTo: "#barbers"
        },
    ];

    // Next / Prev slide
    const nextSlide = (): void =>
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = (): void =>
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    // Auto-rotate
    useEffect(() => {
        const interval: NodeJS.Timeout = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white ">


            {/* HERO SLIDER */}
            <section id="home" className="pt-16 h-screen overflow-hidden">
                {slides.map((slide: Slide, index: number) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-opacity duration-1000 ease-in-out ${index === currentSlide
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0 pointer-events-none"
                            }`}
                        style={{
                            backgroundImage: url(${ slide.image }),
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                        <div className="relative z-20 max-w-xl">
                            <p className="text-amber-500 text-sm sm:text-lg mb-2">
                                {slide.subtitle}
                            </p>
                            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                                {slide.title}
                            </h1>
                            <p className="text-base sm:text-lg mb-6">{slide.description}</p>
                            <button className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-6 py-2 rounded-md transition">
                                <a href={slide.redirectTo} >{slide.btnText}</a>
                            </button>
                        </div>
                    </div>
                ))}

                {/* Prev / Next Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full z-30"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full z-30"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 w-full flex justify-center gap-2 z-30">
                    {slides.map((_: Slide, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-3 h-3 rounded-full ${idx === currentSlide
                                    ? "bg-amber-500"
                                    : "bg-white bg-opacity-50"
                                }`}
                            aria-label={Go to slide ${idx + 1}}
            />
          ))}
                </div>
            </section>
        </div>
    );
}
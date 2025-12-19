import { useRef, useState, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Card {
  title: string;
  subtitle: string;
  buttonText: string;
  bgColor: string;
  image?: string;
  logos?: string[];
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const cards: Card[] = [
  {
    title: "Banking Career Readiness",
    subtitle:
      "Master essential skills, certifications, and interview preparation to secure jobs in public and private sector banks.",
    buttonText: "Explore Banking Careers",
    bgColor: "bg-[#E8F1FF]",
    image: "/images/hero/kg_t_and_p_1.png"
  },
  {
    title: "Banking Partner Program",
    subtitle:
      "Build entrepreneurial skills to become an authorized Banking Partner and launch your own financial services venture.",
    buttonText: "Start Your Venture",
    bgColor: "bg-[#FFF1E6]",
    image:"/images/hero/handshake.png"
  },
  {
    title: "Financial & Policy Advisory Track",
    subtitle:
      "Develop expertise to work as a financial consultant or government policy advisor, supporting individuals and institutions with informed decision-making.",
    buttonText: "Become an Advisor",
    bgColor: "bg-[#add6f7]",
    image:"/images/hero/policy.png",
  },
  {
    title: "Wealth Creation & Investment Mastery",
    subtitle:
      "Learn fundamental and technical analysis to confidently analyze stocks, invest smartly, and pursue careers in trading and market research.",
    buttonText: "Learn Stock Market",
    bgColor: "bg-[#E7DDD6]",
    image:"/images/hero/stock.jpg", 
  },
];



  const calculateViews = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 1.35;
    return 1.75; // desktop
  };

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current || !trackRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const cardsPerView = calculateViews();
      const cardWidth = containerWidth / cardsPerView;

      setSlideWidth(cardWidth);

      const totalTrackWidth =
        cards.length * cardWidth + (cards.length - 1) * 24; // gap = 24px

      const maxScrollDistance = Math.max(
        0,
        totalTrackWidth - containerWidth
      );

      setMaxScroll(maxScrollDistance);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [cards.length]);

  const gap = 24;

  // ✅ Calculated scroll (CLAMPED — never overshoot)
  const translateX = Math.min(
    currentIndex * (slideWidth + gap),
    maxScroll
  );

  const scrollLeft = () => {
    setCurrentIndex((x) => Math.max(0, x - 1));
  };

  const scrollRight = () => {
    if (translateX < maxScroll) {
      setCurrentIndex((x) => x + 1);
    }
  };

  return (
    <section className="bg-white pt-10 pb-4 px-4">
      <div
        ref={containerRef}
        className="max-w-7xl relative px-4 sm:px-6 overflow-hidden"
      >
        {/* TRACK */}
        <div
          ref={trackRef}
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{ width: `${slideWidth}px` }}
              className="shrink-0 "
            >
              <div
                className={`${card.bgColor}
                rounded-3xl
                h-[280px] sm:h-[320px] lg:h-[340px]
                p-6 sm:p-8 lg:p-10
                flex relative overflow-hidden shadow-sm ${i === cards.length - 1 ? 'mr-10' : ''}`}
              >
                <div className="w-1/2 z-10 flex flex-col justify-center">
                  <h2 className="text-lg sm:text-xl lg:text-[32px] font-bold text-gray-900 mb-3">
                    {card.title}
                  </h2>

                  <p className="text-xs sm:text-base lg:text-lg mb-5 sm:mb-6 text-gray-700 max-w-md">
                    {card.subtitle}
                  </p>

                  {/* <button className="bg-[#0056d2] hover:bg-[#0045a3] text-white px-6 py-3 rounded-xl font-semibold w-fit">
                    {card.buttonText} →
                  </button> */}

                  {card.logos && (
                    <div className="flex gap-4 mt-6">
                      {card.logos.map((logo, idx) => (
                        <div
                          key={idx}
                          className="w-10 h-10 bg-white rounded-full shadow border flex items-center justify-center"
                        >
                          <img src={logo} className="w-6 object-contain" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="absolute right-0 top-0 h-full w-1/2">
                  <img
                    src={card.image}
                    className="w-full h-full object-cover rounded-l-[80px] lg:rounded-l-[120px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          disabled={currentIndex === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1
            bg-transparent border border-black rounded-full text-black shadow
            disabled:opacity-40 lg:p-3 lg:bg-white"
        >
          <ChevronLeft />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          disabled={translateX >= maxScroll}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1
            bg-transparent border border-black rounded-full text-black shadow
            disabled:opacity-40 lg:p-3 lg:bg-white"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}

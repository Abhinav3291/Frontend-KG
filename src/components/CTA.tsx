import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Section } from './ui/section';
import { cn } from '../lib/utils'; // ✅ adjust path if not using alias

export interface CTAProps {
  title: string;
  description: string;
  primaryAction: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  background?: string;
  className?: string;
  visualElements?: {
    decorative?: React.ReactNode;
    main?: React.ReactNode;
  };
}

export function CTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  background = 'bg-gradient-to-r from-blue-600 to-blue-800',
  className = '',
  visualElements = {},
}: CTAProps) {
  return (
    <Section className={cn('relative overflow-hidden', background, className)}>
      {/* Background visuals */}
      {visualElements.decorative && (
        <div className="absolute inset-0 z-0">
          {visualElements.decorative}
        </div>
      )}

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
          <div className="text-center">
            <motion.h2
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                size="lg"
                onClick={primaryAction.onClick}
                className="px-8 py-3 text-base font-medium bg-white text-blue-700 hover:bg-blue-50"
              >
                {primaryAction.icon && <span className="mr-2">{primaryAction.icon}</span>}
                {primaryAction.text}
              </Button>

              {secondaryAction && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={secondaryAction.onClick}
                  className="px-8 py-3 text-base font-medium text-white border-white hover:bg-white/10"
                >
                  {secondaryAction.icon && <span className="mr-2">{secondaryAction.icon}</span>}
                  {secondaryAction.text}
                </Button>
              )}
            </motion.div>

            {visualElements.main && (
              <motion.div
                className="mt-12 md:mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {visualElements.main}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default CTA;

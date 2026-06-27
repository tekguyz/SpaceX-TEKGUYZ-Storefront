"use client";

import { motion, useScroll, useReducedMotion } from "motion/react";
import { GradientMesh } from "./gradient-mesh";
import { ProductImage } from "./product-image";
import { PriceCounter } from "./price-counter";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const STAGGER_DELAY = 0.08;

function AnimatedHeadline({ text }: { text: string }) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: prefersReducedMotion ? 0 : 0.1 + i * STAGGER_DELAY
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] pt-20 pb-6 md:pt-24 md:pb-8 overflow-hidden flex flex-col justify-center">
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--color-accent)] z-[100]"
      />
      <GradientMesh />
      
      <div className="container relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-6 md:gap-8 items-center">
          
          <div className="flex flex-col items-start order-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            >
              <Badge variant="outline" className="mb-2 md:mb-4 border-foreground text-foreground bg-transparent rounded-none text-[10px] tracking-[0.18em] uppercase font-mono px-3 py-1">
                Complete Student Bundle
              </Badge>
            </motion.div>
            
            <h1 className="font-display text-3xl xs:text-4xl md:text-4xl lg:text-[2.5rem] xl:text-[3rem] font-black tracking-[0.08em] text-[var(--color-text)] leading-[1.0] uppercase mb-3 md:mb-4 flex flex-col gap-1">
              <AnimatedHeadline text="DOWNEY VOICE WRITING" />
              <AnimatedHeadline text="STUDENT BUNDLE" />
            </h1>
            
            <motion.p 
              className="text-sm md:text-base text-[var(--color-text-muted)] max-w-[480px] mb-4 md:mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              A complete, ready-to-use package featuring a business-class 14-inch laptop optimized for voice writers, Eclipse Student Software, professional voice writing equipment, training resources, and support.
            </motion.p>
            
            <div className="flex flex-col gap-0.5 mb-5 md:mb-6">
              <PriceCounter />
              <motion.span 
                className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-mono mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.7, duration: prefersReducedMotion ? 0 : 0.4 }}
              >
                or pay over time with PayPal
              </motion.span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-auto"
            >
              <Button 
                size="lg" 
                className="w-full md:w-auto h-12 md:h-14 bg-transparent border-2 border-foreground hover:bg-foreground hover:text-background text-foreground rounded-full px-8 font-bold text-xs tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
                onClick={() => {
                  const el = document.getElementById("paypal-button-container");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
              >
                Buy with PayPal &rarr;
              </Button>
            </motion.div>
            
          </div>

          <div className="order-2 w-full flex justify-center items-center mt-8 md:mt-0">
            <ProductImage />
          </div>

        </div>
      </div>
    </section>
  );
}

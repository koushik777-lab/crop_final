import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

interface TrailLeaf {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  driftX: number;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<TrailLeaf[]>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Spawn bigger trail leaves more frequently
      if (dist > 25) {
        const id = Date.now() + Math.random();
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        setTrail(prev => [...prev.slice(-12), { 
          id, 
          x: e.clientX, 
          y: e.clientY, 
          rotate: angle + 90,
          scale: Math.random() * 0.8 + 0.6, // Bigger leaves
          driftX: (Math.random() - 0.5) * 50 // Random drift
        }]);
        
        setTimeout(() => setTrail(prev => prev.filter(l => l.id !== id)), 1200);
        
        lastX.current = e.clientX;
        lastY.current = e.clientY;
      }

      const target = e.target as HTMLElement;
      if (target) {
        setIsPointer(window.getComputedStyle(target).cursor === "pointer" || 
                    target.tagName === "A" || 
                    target.tagName === "BUTTON");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);

  const leafPath = "M12,2 C12,2 10,5 6,9 C2,13 2,19 8,21 C12,23 14,22 14,22 L14,26 M12,2 C12,2 14,5 18,9 C22,13 22,19 16,21 C12,23 10,22 10,22";

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Enhanced Wind-Blown Trail */}
      <AnimatePresence>
        {trail.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{ opacity: 0, scale: 0, rotate: leaf.rotate - 30 }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              scale: leaf.scale, 
              rotate: leaf.rotate + 60,
              x: leaf.driftX,
              y: 40 // Drift down
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute"
            style={{
              left: leaf.x,
              top: leaf.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 28" fill="none" className="drop-shadow-md">
              <path 
                d={leafPath} 
                fill="url(#trail-grad)" 
                stroke="#166534" 
                strokeWidth="1" 
                strokeOpacity="0.5"
                fillOpacity="0.4"
              />
              <defs>
                <linearGradient id="trail-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#86EFAC" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Minimal Seed Pointer (Instead of the big leaf) */}
      <motion.div
        className="absolute w-2 h-2 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(22,163,74,0.5)]"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 4 : 1,
          backgroundColor: isPointer ? "rgba(63, 107, 42, 0.2)" : "#3F6B2A",
          border: isPointer ? "1px solid #3F6B2A" : "none"
        }}
      />
    </div>
  );
}

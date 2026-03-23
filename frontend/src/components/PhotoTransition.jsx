// SimplePhotoTransition.jsx
import React, { useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  assets.t1, // sample
  assets.t2,
  assets.t3,
  assets.t4,
];

export default function PhotoTransition({
  images = IMAGES,
  interval = 4500,
  className = "",
}) {
  // normalize images to strings
  const imgs = (images || IMAGES).map((i) => (typeof i === "string" ? i : i.src || i));

  // start at a random index
  const initialIndex = () => {
    return imgs.length ? Math.floor(Math.random() * imgs.length) : 0;
  };

  const [index, setIndex] = useState(initialIndex);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // preload images (simple)
  useEffect(() => {
    imgs.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imgs]);

  useEffect(() => {
    if (!imgs.length) return;
    if (paused) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % imgs.length);
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [imgs.length, interval, paused]);

  if (!imgs.length) {
    return (
      <div className={`w-full sm:w-1/2 ${className}`}>
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500">No images</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full sm:w-1/2 relative overflow-hidden  ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-full min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={imgs[index]}
            alt={`slide-${index + 1}`}
            className="w-full h-full object-cover block"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ pointerEvents: "none" }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

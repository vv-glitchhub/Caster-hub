'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function HeroMotion() {
  return (
    <motion.div
      id="top"
      className="relative z-10 mx-auto max-w-6xl text-center"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1 className="hero-title" variants={item}>CASTER</motion.h1>
      <motion.p className="hero-statement" variants={item}>
        Intelligence<br />Engineered For Decisions
      </motion.p>
      <motion.p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-white/72 md:text-2xl" variants={item}>
        Intelligent tech ecosystem for sports, markets and human decision-making.
      </motion.p>
      <motion.div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row" variants={item}>
        <motion.a className="primary-button" href="#apps" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Explore Ecosystem
        </motion.a>
        <motion.a className="secondary-button" href="#core" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          View Intelligence Core
        </motion.a>
      </motion.div>
    </motion.div>
  )
}

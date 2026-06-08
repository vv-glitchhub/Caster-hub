'use client'

import { motion } from 'framer-motion'

const signals = [
  ['SPORTS', 'NHL EDGE +7.2%', 'Model probability above market implied.'],
  ['MARKETS', 'AAPL MOMENTUM ↑', 'News quality and trend pressure improving.'],
  ['HUMAN', 'DECISION MODE ACTIVE', 'Impulse shield and clarity loop online.'],
  ['CORE', 'SIGNAL ENGINE READY', 'Risk, probability and behavior layers connected.'],
]

export default function LiveSignalFeed() {
  return (
    <motion.aside
      className="live-signal-feed"
      initial={{ opacity: 0, x: 28, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay: 1.1, ease: 'easeOut' }}
    >
      <div className="live-feed-header">
        <span />
        LIVE SIGNALS
      </div>
      <div className="live-feed-list">
        {signals.map(([tag, title, text], index) => (
          <motion.div
            className="live-feed-item"
            key={title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.35 + index * 0.16 }}
          >
            <p>{tag}</p>
            <strong>{title}</strong>
            <span>{text}</span>
          </motion.div>
        ))}
      </div>
    </motion.aside>
  )
}

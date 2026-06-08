'use client'

import { motion } from 'framer-motion'

const states = [
  'Monitoring Markets',
  'Scanning Opportunities',
  'Evaluating Signals',
  'Learning Patterns',
]

export default function AIStatus() {
  return (
    <motion.div
      className="ai-status"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 1.45, ease: 'easeOut' }}
    >
      <div className="ai-status-dot" />
      <div>
        <p>AI STATUS</p>
        <div className="ai-status-rotator">
          {states.map((state, index) => (
            <span key={state} style={{ animationDelay: `${index * 2.2}s` }}>{state}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'

export default function CounterCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="dashboard-preview min-h-0"
    >
      <div className="text-5xl font-bold tracking-tight">{value}</div>
      <div className="mt-4 text-white/60">{label}</div>
    </motion.div>
  )
}

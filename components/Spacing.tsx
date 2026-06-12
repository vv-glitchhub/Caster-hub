import type { ReactNode } from 'react'

type SpacingProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: '1.5rem',
  md: '2rem',
  lg: '3.5rem',
}

export default function Spacing({ children, size = 'lg', className = '' }: SpacingProps) {
  return (
    <div className={className} style={{ marginTop: sizes[size] }}>
      {children}
    </div>
  )
}

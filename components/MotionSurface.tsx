import type { ReactNode } from 'react'

type MotionSurfaceProps = {
  children: ReactNode
  className?: string
  href?: string
}

export default function MotionSurface({ children, className = '', href }: MotionSurfaceProps) {
  const classes = `motion-surface ${className}`

  if (href) {
    return <a href={href} className={classes}>{children}</a>
  }

  return <div className={classes}>{children}</div>
}

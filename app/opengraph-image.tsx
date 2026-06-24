import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Caster OS - Personal AI Operating System'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 76,
          background: 'radial-gradient(circle at 50% 20%, #1d4ed8 0%, #020207 45%, #000000 100%)',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 10, color: '#bfdbfe', textTransform: 'uppercase' }}>
          Caster OS
        </div>
        <div style={{ marginTop: 36, fontSize: 104, lineHeight: 0.9, letterSpacing: -8, fontWeight: 700 }}>
          Personal AI
          <br />
          Operating System
        </div>
        <div style={{ marginTop: 36, maxWidth: 780, fontSize: 30, lineHeight: 1.35, color: 'rgba(255,255,255,0.72)' }}>
          Decision intelligence for life, wealth, health, gaming and focused action.
        </div>
      </div>
    ),
    size,
  )
}

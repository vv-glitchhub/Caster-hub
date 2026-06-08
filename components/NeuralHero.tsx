'use client'

const nodes = [
  { x: 12, y: 24 },
  { x: 28, y: 14 },
  { x: 44, y: 28 },
  { x: 60, y: 16 },
  { x: 78, y: 26 },
  { x: 88, y: 48 },
  { x: 68, y: 58 },
  { x: 48, y: 48 },
  { x: 30, y: 62 },
  { x: 14, y: 52 },
  { x: 38, y: 78 },
  { x: 62, y: 80 },
]

const lines = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  [6, 7], [7, 8], [8, 9], [2, 7], [7, 10], [6, 11], [8, 10], [7, 11]
]

const flows = [
  [0, 1, 2, 3, 4, 5],
  [9, 8, 7, 6, 11],
  [2, 7, 10],
  [4, 5, 6, 7, 8],
]

function pointsToPath(path: number[]) {
  return path
    .map((nodeIndex, index) => {
      const node = nodes[nodeIndex]
      return `${index === 0 ? 'M' : 'L'} ${node.x} ${node.y}`
    })
    .join(' ')
}

export default function NeuralHero() {
  return (
    <div className="neural-hero" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="neural-svg">
        <defs>
          {flows.map((flow, index) => (
            <path key={`flow-path-${index}`} id={`flow-path-${index}`} d={pointsToPath(flow)} />
          ))}
        </defs>

        {lines.map(([a, b], index) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            className="neural-line"
            style={{ animationDelay: `${index * 0.18}s` }}
          />
        ))}

        {flows.map((_, index) => (
          <circle key={`signal-${index}`} r="1.05" className="neural-signal">
            <animateMotion
              dur={`${5.2 + index * 0.8}s`}
              repeatCount="indefinite"
              begin={`${index * 0.7}s`}
            >
              <mpath href={`#flow-path-${index}`} />
            </animateMotion>
          </circle>
        ))}

        {nodes.map((node, index) => (
          <circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r="0.75"
            className="neural-node"
            style={{ animationDelay: `${index * 0.22}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

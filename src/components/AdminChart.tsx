export function AdminChart({
  title,
  note,
  points,
}: {
  title: string;
  note: string;
  points: { label: string; axis: string; value: number }[];
}) {
  const width = 640;
  const height = 200;
  const pad = { left: 28, right: 8, top: 16, bottom: 32 };
  const innerWidth = width - pad.left - pad.right;
  const innerHeight = height - pad.top - pad.bottom;
  const max = Math.max(4, ...points.map((point) => point.value));
  const gap = 8;
  const barWidth = points.length ? (innerWidth - gap * (points.length - 1)) / points.length : 0;
  const ticks = [0, Math.round(max / 2), max];

  return (
    <section className="admin-chart">
      <div>
        <h2 className="heading-6">{title}</h2>
        <p className="body-sm muted mt-1">{note}</p>
      </div>
      <svg className="admin-chart-svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        {ticks.map((tick) => {
          const y = pad.top + innerHeight - (tick / max) * innerHeight;
          return (
            <g key={tick}>
              <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} className="admin-chart-grid" />
              <text x={pad.left - 8} y={y + 4} textAnchor="end" className="admin-chart-tick">
                {tick}
              </text>
            </g>
          );
        })}
        {points.map((point, index) => {
          const barHeight = (point.value / max) * innerHeight;
          const x = pad.left + index * (barWidth + gap);
          const y = pad.top + innerHeight - barHeight;
          return (
            <g key={`${point.label}-${index}`}>
              <rect x={x} y={y} width={barWidth} height={Math.max(barHeight, point.value ? 2 : 0)} rx="4" className="admin-chart-bar">
                <title>{`${point.label}: ${point.value}`}</title>
              </rect>
              <text x={x + barWidth / 2} y={height - 8} textAnchor="middle" className="admin-chart-label">
                {point.axis}
              </text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

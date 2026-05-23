import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
}

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-line bg-panel/95 px-3 py-2 shadow-xl surface-blur">
      <p className="mb-1 text-[11px] text-faint">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2 font-mono text-[12px] font-medium text-fg">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          {p.value.toLocaleString('es-419')}
        </p>
      ))}
    </div>
  )
}

export function AreaTrend({
  data,
  dataKey,
  color = 'var(--color-accent)',
  height = 240,
}: {
  data: any[]
  dataKey: string
  color?: string
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.32} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="mes"
          tick={{ fill: 'var(--color-faint)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          dy={8}
        />
        <YAxis tick={{ fill: 'var(--color-faint)', fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.12)' }} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#grad-${dataKey})`}
          animationDuration={1100}
          dot={false}
          activeDot={{ r: 4, fill: color, stroke: 'var(--color-bg)', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

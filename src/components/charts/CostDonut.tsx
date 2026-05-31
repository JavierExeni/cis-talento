import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { fmtMoneyUSD } from '@/lib/format'

export interface CostNode {
  cc: string
  depto: string
  total: number
  headcount: number
  [key: string]: string | number
}

/** Paleta cohesiva para dark premium — distinta por centro, ámbar de marca para el mayor. */
export const COST_COLORS = ['#ffb224', '#74a8ff', '#46d88f', '#c084fc', '#fb7185', '#38bdf8', '#fb923c']

function DonutTooltip({ active, payload, hidden, grand }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  if (!d?.cc) return null
  const share = grand ? Math.round((d.total / grand) * 100) : 0
  return (
    <div className="rounded-lg border border-line bg-panel/95 px-3 py-2 shadow-xl surface-blur">
      <p className="flex items-center gap-2 text-[12.5px] font-semibold text-fg">
        <span className="size-2 rounded-full" style={{ background: payload[0]?.color }} />
        {d.depto}
      </p>
      <p className="mb-1.5 font-mono text-[10.5px] text-faint">
        {d.cc} · {d.headcount} personas
      </p>
      <p className="font-mono text-[13.5px] font-semibold text-fg">{hidden ? '••••••' : fmtMoneyUSD(d.total)}</p>
      <p className="mt-0.5 font-mono text-[10.5px] text-faint">{share}% de la nómina</p>
    </div>
  )
}

export function CostDonut({ data, hidden = false, height = 236 }: { data: CostNode[]; hidden?: boolean; height?: number }) {
  const grand = data.reduce((s, d) => s + d.total, 0)
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="depto"
            innerRadius="64%"
            outerRadius="94%"
            paddingAngle={2.5}
            cornerRadius={4}
            stroke="var(--color-bg)"
            strokeWidth={3}
            startAngle={90}
            endAngle={-270}
            isAnimationActive={false}
          >
            {data.map((d, i) => (
              <Cell key={d.cc} fill={COST_COLORS[i % COST_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<DonutTooltip hidden={hidden} grand={grand} />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Total al centro */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[9.5px] tracking-[0.16em] text-faint uppercase">Neto total</span>
        <span className="mt-1 font-display text-[19px] leading-none font-semibold tabular text-fg sm:text-[21px]">
          {hidden ? '••••••' : fmtMoneyUSD(grand)}
        </span>
        <span className="mt-1 text-[10.5px] text-faint">{data.length} centros de costo</span>
      </div>
    </div>
  )
}

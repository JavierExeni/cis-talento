import { useState } from 'react'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/cn'

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[]
  data: T[]
  globalFilter?: string
  onRowClick?: (row: T) => void
  /** Ancho mínimo de la tabla: por debajo, el contenedor hace scroll horizontal (móvil). */
  minWidth?: number
}

export function DataTable<T>({ columns, data, globalFilter, onRowClick, minWidth = 640 }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="-mx-px overflow-x-auto">
      <table className="w-full border-collapse text-sm" style={{ minWidth }}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b border-line">
              {hg.headers.map((header) => {
                const sortable = header.column.getCanSort()
                const sorted = header.column.getIsSorted()
                return (
                  <th
                    key={header.id}
                    className="bg-panel/40 px-4 py-3 text-left text-[12px] font-medium tracking-wide text-faint whitespace-nowrap uppercase"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        disabled={!sortable}
                        onClick={header.column.getToggleSortingHandler()}
                        className={cn(
                          'inline-flex items-center gap-1.5',
                          sortable && 'transition-colors hover:text-muted',
                        )}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortable &&
                          (sorted === 'asc' ? (
                            <ChevronUp size={13} className="text-accent" />
                          ) : sorted === 'desc' ? (
                            <ChevronDown size={13} className="text-accent" />
                          ) : (
                            <ChevronsUpDown size={13} className="opacity-40" />
                          ))}
                      </button>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              className={cn(
                'group border-b border-line-soft transition-colors',
                onRowClick && 'cursor-pointer hover:bg-white/[0.025]',
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 align-middle whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.getRowModel().rows.length === 0 && (
        <div className="py-16 text-center text-sm text-faint">Sin resultados para la búsqueda.</div>
      )}
    </div>
  )
}

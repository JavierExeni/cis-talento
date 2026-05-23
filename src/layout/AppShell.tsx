import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { NotificationsPanel } from './NotificationsPanel'
import { pageTransition } from '@/lib/motion'

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onToggleNotifications={() => setNotifOpen((o) => !o)} />
        <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
              className="mx-auto max-w-[1400px] px-5 py-7 sm:px-7"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

import { Link, NavLink } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle.jsx'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-base font-medium transition-all duration-200 ${
      isActive 
        ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20' 
        : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-soft">
      <div className="container-px mx-auto h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-slate-100">BusLens</span>
            <div className="text-xs text-slate-500 dark:text-slate-400 -mt-1">Tricity Transit</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/insights" className={linkClass}>Insights</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <button 
            className="md:hidden p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" 
            onClick={() => setOpen(v => !v)} 
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200/70 dark:border-slate-800/70 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="container-px py-4 flex flex-col gap-2">
            <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>Home</NavLink>
            <NavLink to="/insights" onClick={() => setOpen(false)} className={linkClass}>Insights</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}

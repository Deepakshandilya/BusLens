import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="container-px mx-auto section-y">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-xl text-slate-900 dark:text-slate-100">BusLens</span>
                <div className="text-xs text-slate-500 dark:text-slate-400 -mt-1">Tricity Transit</div>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-md leading-relaxed">
              Your go-to platform for finding local buses in the Tricity region. 
              Comprehensive information about 65+ bus routes and 700+ stops.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">Product</h3>
            <ul className="space-y-3 text-base">
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors">Home</Link></li>
              <li><Link to="/insights" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors">Insights</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">Connect</h3>
            <ul className="space-y-3 text-base">
              <li><a href="https://github.com/deepakshandilya" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors">GitHub</a></li>
              <li><a href="https://linkedin.com/in/deepakshandilyaa" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            © 2024 BusLens. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-500">
            <a href="#" className="hover:text-brand-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

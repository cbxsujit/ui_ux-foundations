import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Search, Menu, User, Settings, LogOut, ChevronDown, 
  Heart, Share2, MessageCircle, Bookmark, MoreHorizontal,
  Home, Compass, PlayCircle, Library, Plus, Layout, AppWindow,
  ChevronRight, CheckSquare, Square, ToggleRight, CircleDot,
  Circle, Info, Loader2, AlertCircle, X, ChevronLeft, Image as ImageIcon,
  BarChart, Users, CheckCircle, Edit, Trash2, CheckCircle2, Check
} from 'lucide-react';

interface Annotation {
  id: string;
  title: string;
  description: string;
}

const ANNOTATIONS: Annotation[] = [
  {
    id: 'app-bar',
    title: 'App Bar / Header',
    description: 'Provides top-level navigation, branding, and global actions.',
  },
  {
    id: 'sidebar',
    title: 'Sidebar / Drawer',
    description: 'Primary navigation menu for switching between main sections.',
  },
  {
    id: 'search-bar',
    title: 'Search Input',
    description: 'A text field with a leading icon indicating search functionality.',
  },
  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    description: 'Shows the current page location within a hierarchy.',
  },
  {
    id: 'avatar-dropdown',
    title: 'Avatar & Dropdown Trigger',
    description: 'Represents the user and triggers a contextual menu.',
  },
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Collapsible sections in the sidebar to hide/show nested links.',
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'Switches between different views within the same context.',
  },
  {
    id: 'bento-grid',
    title: 'Bento Grid Layout',
    description: 'A modern grid layout with varying sized cards.',
  },
  {
    id: 'progress-bar',
    title: 'Progress Bar',
    description: 'Indicates completion status of a task or metric.',
  },
  {
    id: 'data-table',
    title: 'Data Table',
    description: 'Displays structured data in rows and columns.',
  },
  {
    id: 'checkboxes',
    title: 'Checkboxes',
    description: 'Allows selecting multiple options in the table.',
  },
  {
    id: 'pagination',
    title: 'Pagination',
    description: 'Navigates through multiple pages of table content.',
  },
  {
    id: 'carousel',
    title: 'Carousel / Slider',
    description: 'Scrollable list of items or images.',
  },
  {
    id: 'form-controls',
    title: 'Form Controls (Toggles, Radios)',
    description: 'Inputs for user settings and preferences.',
  },
  {
    id: 'tooltip',
    title: 'Tooltip Trigger',
    description: 'Provides extra information on hover.',
  },
  {
    id: 'fab',
    title: 'Floating Action Button (FAB)',
    description: 'Primary action floating above the content.',
  },
  {
    id: 'toast',
    title: 'Toast / Snackbar',
    description: 'Brief, temporary feedback message.',
  },
  {
    id: 'spinner',
    title: 'Spinner / Loader',
    description: 'Indicates a loading state.',
  },
  {
    id: 'modal',
    title: 'Modal / Dialog',
    description: 'An overlay that requires user interaction before returning to the main app.',
  },
  {
    id: 'empty-state',
    title: 'Empty State',
    description: 'What users see when there is no data to display.',
  },
  {
    id: 'stepper',
    title: 'Stepper / Wizard',
    description: 'Guides users through a multi-step process.',
  },
  {
    id: 'dropdown-menu',
    title: 'Dropdown Menu',
    description: 'A contextual list of options that appears upon interaction.',
  },
  {
    id: 'text-input',
    title: 'Text Input',
    description: 'Standard field for short text entry. Includes label, placeholder, and optional help text or error state.',
  },
  {
    id: 'select-input',
    title: 'Select / Dropdown',
    description: 'Allows users to choose one option from a list. Best for 5+ options.',
  },
  {
    id: 'checkbox-group',
    title: 'Checkbox Group',
    description: 'Allows users to select multiple options from a list.',
  },
  {
    id: 'radio-group',
    title: 'Radio Group',
    description: 'Allows users to select exactly one option from a list. Best for 2-4 options.',
  },
  {
    id: 'file-upload',
    title: 'File Upload / Drag & Drop',
    description: 'Area for users to upload files, often supporting drag and drop functionality.',
  },
  {
    id: 'slider',
    title: 'Slider / Range',
    description: 'Allows users to select a value or range from a continuous or discrete set.',
  },
  {
    id: 'form-actions',
    title: 'Form Actions',
    description: 'Primary and secondary buttons to submit or cancel the form.',
  }
];

export function AnnotatedMockupLesson() {
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [annotationRects, setAnnotationRects] = useState<Record<string, { top: number, left: number, width: number, height: number }>>({});
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [currentView, setCurrentView] = useState<'dashboard' | 'overlays' | 'forms'>('dashboard');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateRects = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: containerRect.width, height: containerRect.height });
      
      const elements = containerRef.current.querySelectorAll('[data-annotation-id]');
      const newRects: Record<string, { top: number, left: number, width: number, height: number }> = {};
      
      elements.forEach((el) => {
        const id = el.getAttribute('data-annotation-id');
        if (id) {
          const rect = el.getBoundingClientRect();
          newRects[id] = {
            top: rect.top - containerRect.top,
            left: rect.left - containerRect.left,
            width: rect.width,
            height: rect.height
          };
        }
      });
      setAnnotationRects(newRects);
    };

    // Initial update and on view change
    setTimeout(updateRects, 50); 
    setTimeout(updateRects, 200); // Double check after animations
    
    window.addEventListener('resize', updateRects);
    return () => window.removeEventListener('resize', updateRects);
  }, [currentView]);

  return (
    <div className="w-full h-full bg-gray-100 relative overflow-hidden flex flex-col">
      {/* Header instructions */}
      <div className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center z-50 shadow-md">
        <div>
          <h2 className="font-bold text-lg">Full Page UI Anatomy Mockup</h2>
          <p className="text-indigo-100 text-sm">Hover over different highlighted areas to learn about common UI components and layout patterns.</p>
        </div>
        <div className="flex bg-indigo-700 p-1 rounded-lg">
          <button 
            onClick={() => setCurrentView('dashboard')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${currentView === 'dashboard' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-100 hover:text-white'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('overlays')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${currentView === 'overlays' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-100 hover:text-white'}`}
          >
            Overlays
          </button>
          <button 
            onClick={() => setCurrentView('forms')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${currentView === 'forms' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-100 hover:text-white'}`}
          >
            Forms & Inputs
          </button>
        </div>
      </div>

      <div ref={containerRef} className="relative flex-1 w-full h-full overflow-hidden bg-gray-50">
        
        {/* --- MOCKUP UI --- */}
        
        {currentView === 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            {/* App Bar */}
            <header data-annotation-id="app-bar" className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <Menu className="w-5 h-5" />
            </button>
            <div className="font-bold text-xl text-indigo-600 tracking-tight flex items-center gap-2">
              <Layout className="w-6 h-6" />
              NexusUI
            </div>
          </div>
          
          {/* Search */}
          <div data-annotation-id="search-bar" className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96 border border-transparent focus-within:border-indigo-500 focus-within:bg-white transition-colors">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-sm w-full"
              disabled
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div data-annotation-id="avatar-dropdown" className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-700 font-semibold cursor-pointer">
              JD
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <aside data-annotation-id="sidebar" className="absolute top-16 left-0 bottom-0 w-60 bg-white border-r border-gray-200 py-4 flex flex-col z-10 overflow-y-auto">
          <nav className="flex-1 px-3 space-y-1">
            {[
              { icon: Home, label: 'Dashboard', active: true },
              { icon: BarChart, label: 'Analytics' },
              { icon: Users, label: 'Customers' },
            ].map((item, i) => (
              <div 
                key={i}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer ${
                  item.active ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}

            {/* Accordion in Sidebar */}
            <div data-annotation-id="accordion" className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium">Settings</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="pl-11 pr-3 py-1 space-y-1">
                <div className="text-sm text-gray-600 hover:text-indigo-600 py-1.5 cursor-pointer">Profile</div>
                <div className="text-sm text-gray-600 hover:text-indigo-600 py-1.5 cursor-pointer">Preferences</div>
                <div className="text-sm text-gray-600 hover:text-indigo-600 py-1.5 cursor-pointer">Security</div>
              </div>
            </div>
          </nav>
          
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center gap-3 text-gray-600 hover:text-red-600 cursor-pointer">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Log out</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="absolute top-16 left-60 right-0 bottom-0 overflow-auto p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto pb-20">
            
            {/* Breadcrumbs */}
            <div data-annotation-id="breadcrumbs" className="flex items-center text-sm text-gray-500 mb-4 w-fit">
              <span className="hover:text-indigo-600 cursor-pointer">Home</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="hover:text-indigo-600 cursor-pointer">Dashboard</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-gray-900 font-medium">Overview</span>
            </div>

            {/* Page Header */}
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
                  <Info data-annotation-id="tooltip" className="w-5 h-5 text-gray-400 cursor-help" />
                </div>
                <p className="text-gray-600 mt-1">Welcome back, John. Here's what's happening today.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
                  Export
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
                  Create Report
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div data-annotation-id="tabs" className="border-b border-gray-200 mb-6 w-fit">
              <nav className="flex gap-6">
                <button className="border-b-2 border-indigo-600 py-3 text-sm font-medium text-indigo-600">
                  General
                </button>
                <button className="border-b-2 border-transparent py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Audience
                </button>
                <button className="border-b-2 border-transparent py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Behavior
                </button>
              </nav>
            </div>
            
            {/* Bento Grid */}
            <div data-annotation-id="bento-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Stats Card with Progress */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm col-span-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">$45,231.89</div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Goal</span>
                    <span className="font-medium text-gray-900">75%</span>
                  </div>
                  {/* Progress Bar */}
                  <div data-annotation-id="progress-bar" className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              {/* Data Table Card */}
              <div data-annotation-id="data-table" className="bg-white rounded-2xl border border-gray-200 shadow-sm col-span-1 md:col-span-2 flex flex-col">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
                  <Loader2 data-annotation-id="spinner" className="w-4 h-4 text-gray-400 animate-spin" />
                </div>
                <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th data-annotation-id="checkboxes" className="px-4 py-3 w-10"><Square className="w-4 h-4 text-gray-400" /></th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Acme Corp', status: 'Completed', amount: '$1,200.00', checked: true },
                        { name: 'Global Tech', status: 'Pending', amount: '$850.00', checked: false },
                        { name: 'Stark Ind.', status: 'Completed', amount: '$3,400.00', checked: false },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="px-4 py-3">
                            {row.checked ? <CheckSquare className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4 text-gray-300" />}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              row.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-gray-600">{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div data-annotation-id="pagination" className="p-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                  <span>Showing 1-3 of 24</span>
                  <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-gray-100"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="px-2 py-1 rounded bg-indigo-50 text-indigo-600 font-medium">1</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-100">2</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-100">3</button>
                    <button className="p-1 rounded hover:bg-gray-100"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              {/* Carousel / Media Card */}
              <div data-annotation-id="carousel" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden col-span-1 md:col-span-1.5">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Featured Templates</h3>
                </div>
                <div className="p-4">
                  <div className="relative bg-gray-100 rounded-xl h-32 flex items-center justify-center mb-3 group cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                    <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium">Preview</button>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>

              {/* Form Controls Card */}
              <div data-annotation-id="form-controls" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm col-span-1 md:col-span-1.5">
                <h3 className="font-semibold text-gray-900 mb-4">Preferences</h3>
                
                <div className="space-y-4">
                  {/* Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Email Notifications</div>
                      <div className="text-xs text-gray-500">Receive daily updates</div>
                    </div>
                    <ToggleRight className="w-8 h-8 text-indigo-600" />
                  </div>
                  
                  <div className="h-px bg-gray-100 w-full"></div>
                  
                  {/* Radio Buttons */}
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Theme</div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <CircleDot className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-700">Light</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">Dark</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* FAB */}
        <button data-annotation-id="fab" className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 hover:scale-105 transition-all z-20">
          <Plus className="w-6 h-6" />
        </button>

            {/* Toast / Snackbar */}
            <div data-annotation-id="toast" className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 z-20">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Report generated successfully.</span>
              <button className="ml-4 text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}

        {currentView === 'overlays' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full h-full bg-[#F3F4F6] relative z-10 overflow-hidden"
          >
            {/* Modal */}
            <div data-annotation-id="modal" className="absolute top-12 left-12 w-[440px] bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] z-20 flex flex-col overflow-hidden">
              <div className="p-6 pb-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Confirm Deletion</h3>
                <X className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
              </div>
              <div className="px-6 pb-8">
                <p className="text-gray-600 text-[15px] leading-relaxed">Are you sure you want to delete this item? This action cannot be undone.</p>
              </div>
              <div className="px-6 pb-6 flex justify-end gap-4 items-center">
                <button className="text-[15px] font-semibold text-gray-700 hover:text-gray-900 transition-colors px-2">Cancel</button>
                <button className="px-5 py-2.5 text-[15px] font-semibold text-white bg-[#E10000] hover:bg-red-700 rounded-lg transition-colors">Delete</button>
              </div>
            </div>

            {/* Empty State */}
            <div data-annotation-id="empty-state" className="absolute top-12 right-12 w-[380px] bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-10 flex flex-col items-center justify-center text-center z-10">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No results found</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8 px-4">We couldn't find anything matching your search criteria. Try adjusting your filters.</p>
              <button className="px-6 py-2.5 bg-indigo-50 text-indigo-600 font-semibold text-[15px] rounded-xl hover:bg-indigo-100 transition-colors">Clear Filters</button>
            </div>

            {/* Stepper */}
            <div data-annotation-id="stepper" className="absolute bottom-12 left-12 w-[440px] bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-8 z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-8">Checkout Process</h3>
              <div className="flex items-start justify-between relative px-2">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                    <Check className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span className="text-[13px] font-semibold text-indigo-600">Cart</span>
                </div>
                
                {/* Line 1 */}
                <div className="flex-1 h-0.5 bg-indigo-600 mt-5 mx-4"></div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">2</div>
                  <span className="text-[13px] font-semibold text-indigo-600">Shipping</span>
                </div>
                
                {/* Line 2 */}
                <div className="flex-1 h-0.5 bg-gray-200 mt-5 mx-4"></div>
                
                {/* Step 3 */}
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white text-gray-400 flex items-center justify-center font-bold text-base">3</div>
                  <span className="text-[13px] font-semibold text-gray-400">Payment</span>
                </div>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div data-annotation-id="dropdown-menu" className="absolute bottom-12 right-12 w-64 bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 py-3 z-30">
              <div className="px-5 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">OPTIONS</div>
              <button className="w-full text-left px-5 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                <Edit className="w-4 h-4 text-gray-500" /> Edit Item
              </button>
              <button className="w-full text-left px-5 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                <Share2 className="w-4 h-4 text-gray-500" /> Share
              </button>
              <div className="h-px bg-gray-100 my-2"></div>
              <button className="w-full text-left px-5 py-2.5 text-[15px] font-medium text-[#E10000] hover:bg-red-50 flex items-center gap-3 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </motion.div>
        )}

        {currentView === 'forms' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full h-full bg-gray-50 relative z-10 overflow-y-auto p-8"
          >
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
                <p className="text-gray-500 mt-1">Fill out the details below to start a new workspace.</p>
              </div>

              <div className="space-y-8">
                {/* Text Input */}
                <div data-annotation-id="text-input" className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Project Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g. Q3 Marketing Campaign" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" disabled />
                  <p className="text-xs text-gray-500">This will be the public name of your project.</p>
                </div>

                {/* Select Input */}
                <div data-annotation-id="select-input" className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" disabled>
                      <option>Design</option>
                      <option>Development</option>
                      <option>Marketing</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Checkbox Group */}
                <div data-annotation-id="checkbox-group" className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Features</label>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="flex items-center justify-center w-5 h-5 rounded border border-gray-300 bg-white group-hover:border-indigo-500 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-indigo-600 opacity-0" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Enable Analytics</div>
                        <div className="text-xs text-gray-500">Track user behavior and metrics.</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="flex items-center justify-center w-5 h-5 rounded border-indigo-600 bg-indigo-600 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Public Access</div>
                        <div className="text-xs text-gray-500">Allow anyone with the link to view.</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Radio Group */}
                <div data-annotation-id="radio-group" className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Visibility</label>
                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center gap-3 p-4 border border-indigo-600 rounded-xl bg-indigo-50 cursor-pointer">
                      <div className="w-4 h-4 rounded-full border-4 border-indigo-600 bg-white"></div>
                      <span className="text-sm font-medium text-indigo-900">Private</span>
                    </label>
                    <label className="flex-1 flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <div className="w-4 h-4 rounded-full border border-gray-300 bg-white"></div>
                      <span className="text-sm font-medium text-gray-700">Team</span>
                    </label>
                  </div>
                </div>

                {/* File Upload */}
                <div data-annotation-id="file-upload" className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3">
                      <ImageIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="text-sm font-medium text-indigo-600 mb-1">Click to upload <span className="text-gray-500 font-normal">or drag and drop</span></div>
                    <div className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</div>
                  </div>
                </div>

                {/* Slider */}
                <div data-annotation-id="slider" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">Priority Level</label>
                    <span className="text-sm font-medium text-indigo-600">High</span>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full">
                    <div className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full" style={{ width: '75%' }}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-indigo-600 rounded-full shadow-sm cursor-grab" style={{ left: '75%', transform: 'translate(-50%, -50%)' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                    <span>Urgent</span>
                  </div>
                </div>

                {/* Form Actions */}
                <div data-annotation-id="form-actions" className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                  <button className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                  <button className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors">Create Project</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- ANNOTATION OVERLAYS --- */}
        {ANNOTATIONS.map((ann) => {
          const rect = annotationRects[ann.id];
          if (!rect) return null;
          
          // Determine if the tooltip should be shown above or below the element
          // to prevent it from being cut off by the container bounds
          const showAbove = rect.top + (rect.height / 2) > containerSize.height / 2;
          
          return (
            <div
              key={ann.id}
              className={`absolute border-2 border-dashed border-indigo-400/0 hover:border-indigo-500 bg-indigo-500/0 hover:bg-indigo-500/10 transition-all duration-200 cursor-help ${activeAnnotation === ann.id ? 'z-[9999]' : 'z-30'}`}
              style={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
              }}
              onMouseEnter={() => setActiveAnnotation(ann.id)}
              onMouseLeave={() => setActiveAnnotation(null)}
            >
              <AnimatePresence>
                {activeAnnotation === ann.id && (
                  <motion.div
                    initial={{ opacity: 0, y: showAbove ? 10 : -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: showAbove ? 10 : -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute left-1/2 -translate-x-1/2 w-64 bg-gray-900 text-white p-4 rounded-xl shadow-xl z-[10000] pointer-events-none ${showAbove ? 'bottom-full mb-3' : 'top-full mt-3'}`}
                    style={{
                      // Adjust position if tooltip goes off screen horizontally
                      marginLeft: rect.left < 128 ? `${128 - rect.left}px` : 
                                  rect.left > containerSize.width - 128 ? `-${rect.left - (containerSize.width - 128)}px` : '0px'
                    }}
                  >
                    <div 
                      className={`absolute border-8 border-transparent ${showAbove ? '-bottom-4 border-t-gray-900' : '-top-4 border-b-gray-900'}`}
                      style={{
                        left: `calc(50% - ${rect.left < 128 ? 128 - rect.left : rect.left > containerSize.width - 128 ? -(rect.left - (containerSize.width - 128)) : 0}px)`,
                        transform: 'translateX(-50%)'
                      }}
                    ></div>
                    <h4 className="font-bold text-sm mb-1 text-indigo-300">{ann.title}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{ann.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

      </div>
    </div>
  );
}

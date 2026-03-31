import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Table, ChevronLeft, ChevronRight, ArrowUpDown, Info, MoreHorizontal, Download, Filter, Eye } from 'lucide-react';

export function DataHandlingLesson() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'name' | 'status' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const itemsPerPage = 5;
  const totalItems = 25;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const allData = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    name: `Project ${String.fromCharCode(65 + i)}`,
    status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Completed',
    date: `2024-03-${String(i + 1).padStart(2, '0')}`,
    progress: Math.floor(Math.random() * 100),
  }));

  const sortedData = [...allData].sort((a, b) => {
    const factor = sortOrder === 'asc' ? 1 : -1;
    if (a[sortField] < b[sortField]) return -1 * factor;
    if (a[sortField] > b[sortField]) return 1 * factor;
    return 0;
  });

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: 'name' | 'status' | 'date') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Handling large amounts of data requires a balance between <strong>information density</strong> and <strong>usability</strong>.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Table className="w-4 h-4 text-indigo-500" />
            Interactive Tables
          </h4>
          <p className="text-sm">Tables are the workhorse of enterprise UI. They should support sorting, filtering, and bulk actions.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-pink-500" />
            Pagination vs. Scroll
          </h4>
          <p className="text-sm">Use pagination when users need to find specific items or refer back to a location. Use infinite scroll for discovery-based content.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Principles</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Sticky Headers:</strong> Keep column headers visible when scrolling through long tables.</li>
          <li><strong>Visual Indicators:</strong> Use badges or progress bars to make status data scannable.</li>
          <li><strong>Contextual Actions:</strong> Don't clutter the row; use "More" menus or hover actions for secondary tasks.</li>
        </ul>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <h4 className="font-bold text-indigo-900 mb-2">Ready to experiment?</h4>
        <p className="text-sm text-indigo-700 mb-4">Try sorting the table columns and navigating through the pages in the lab.</p>
        <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all lg:hidden">
          Open Interactive Lab
        </button>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900">Data Management Lab</h3>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden flex flex-col">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                      Project Name <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <button onClick={() => toggleSort('status')} className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                      Status <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Progress
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <button onClick={() => toggleSort('date')} className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                      Date <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-400">ID: #{item.id.toString().padStart(4, '0')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Active' ? 'bg-green-100 text-green-700' :
                        item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                          <span>{item.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Interactive tables should feel alive. Sorting and pagination should happen instantly without full page reloads. Visual cues like progress bars and status badges help users scan data faster than raw text.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Complex Data Handling"
      description="Design efficient ways to manage, sort, and navigate large datasets."
      theory={theory}
      playground={playground}
    />
  );
}

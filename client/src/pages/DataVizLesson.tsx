import React, { useState, useMemo } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { PieChart, BarChart3, LineChart, Info, TrendingUp, Users, DollarSign, Target } from 'lucide-react';

export function DataVizLesson() {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [dataDensity, setDataDensity] = useState<'low' | 'high'>('low');

  const data = useMemo(() => {
    if (dataDensity === 'low') {
      return [
        { label: 'Jan', value: 45, color: '#6366f1' },
        { label: 'Feb', value: 52, color: '#8b5cf6' },
        { label: 'Mar', value: 38, color: '#ec4899' },
        { label: 'Apr', value: 65, color: '#f43f5e' },
      ];
    } else {
      return Array.from({ length: 12 }, (_, i) => ({
        label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        value: Math.floor(Math.random() * 50) + 20,
        color: i % 2 === 0 ? '#6366f1' : '#8b5cf6',
      }));
    }
  }, [dataDensity]);

  const maxValue = Math.max(...data.map(d => d.value));

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Data visualization is the art of turning raw numbers into <strong>actionable insights</strong>. It's not just about making pretty pictures; it's about reducing the cognitive load required to understand complex information.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-500" />
            Comparison
          </h4>
          <p className="text-sm">Use <strong>Bar Charts</strong> to compare discrete categories or values at a single point in time.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <LineChart className="w-4 h-4 text-pink-500" />
            Trends
          </h4>
          <p className="text-sm">Use <strong>Line Charts</strong> to show how data changes over a continuous period of time.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Principles</h3>
        <ul className="list-disc pl-5 space-y-2 mb-8">
          <li><strong>Clarity over Decoration:</strong> Avoid 3D effects or unnecessary "chart junk" that distracts from the data.</li>
          <li><strong>Color with Purpose:</strong> Use color to highlight important data points, not just for variety.</li>
          <li><strong>Context is King:</strong> Always provide labels, legends, and scales so the user knows what they are looking at.</li>
        </ul>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-2">Ready to experiment?</h4>
          <p className="text-sm text-indigo-700 mb-4">Jump into the interactive lab to see how different chart types and data densities affect user comprehension.</p>
          <button 
            onClick={() => {
              const playgroundSection = document.querySelector('[role="main"]');
              if (playgroundSection) playgroundSection.scrollTop = 0;
              // On mobile, we need to trigger the tab change. 
              // Since we can't easily access the state here without lifting it, 
              // the mobile tabs I just added are the primary solution.
            }}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all lg:hidden"
          >
            Open Interactive Lab
          </button>
          <p className="hidden lg:block text-xs text-indigo-500 font-medium italic">
            ← Look to the right to find the Interactive Playground!
          </p>
        </div>
      </div>
    </div>
  );

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <div className="flex items-end justify-between h-64 gap-2 px-4">
            {data.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full rounded-t-lg transition-all duration-500 ease-out relative"
                  style={{ 
                    height: `${(d.value / maxValue) * 100}%`,
                    backgroundColor: d.color
                  }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {d.value} units
                  </div>
                </div>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">{d.label}</span>
              </div>
            ))}
          </div>
        );
      case 'line':
        return (
          <div className="relative h-64 px-4">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path
                d={`M ${data.map((d, i) => `${(i / (data.length - 1)) * 400},${200 - (d.value / maxValue) * 180}`).join(' L ')}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-700"
              />
              {data.map((d, i) => (
                <circle
                  key={i}
                  cx={(i / (data.length - 1)) * 400}
                  cy={200 - (d.value / maxValue) * 180}
                  r="4"
                  fill="white"
                  stroke="#6366f1"
                  strokeWidth="2"
                  className="transition-all duration-700"
                />
              ))}
            </svg>
            <div className="flex justify-between mt-2">
              {data.filter((_, i) => data.length > 6 ? i % 2 === 0 : true).map((d, i) => (
                <span key={i} className="text-[10px] font-medium text-gray-500 uppercase">{d.label}</span>
              ))}
            </div>
          </div>
        );
      case 'pie':
        return (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="relative w-48 h-48 rounded-full border-8 border-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Total Share</div>
              </div>
              {/* Simplified CSS Pie visualization */}
              <div className="absolute inset-0 rounded-full border-8 border-indigo-500 border-t-transparent border-r-transparent rotate-45"></div>
            </div>
            <div className="flex gap-4 mt-6">
              {data.slice(0, 3).map((d, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-[10px] font-bold text-gray-600 uppercase">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900">Interactive Chart Lab</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button 
              onClick={() => setChartType('bar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${chartType === 'bar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <BarChart3 className="w-3 h-3" /> Bar
            </button>
            <button 
              onClick={() => setChartType('line')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${chartType === 'line' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LineChart className="w-3 h-3" /> Line
            </button>
            <button 
              onClick={() => setChartType('pie')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${chartType === 'pie' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <PieChart className="w-3 h-3" /> Pie
            </button>
          </div>

          <div className="h-6 w-px bg-gray-200"></div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Density</span>
            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button 
                onClick={() => setDataDensity('low')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${dataDensity === 'low' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Low
              </button>
              <button 
                onClick={() => setDataDensity('high')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${dataDensity === 'high' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                High
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-3xl border border-gray-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Performance Analytics</h4>
              <p className="text-xs text-gray-500">Real-time data stream • Updated 2m ago</p>
            </div>
            <div className="flex gap-2">
              <div className="p-2 bg-indigo-50 rounded-lg"><TrendingUp className="w-4 h-4 text-indigo-600" /></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Users className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Users</span>
              </div>
              <div className="text-xl font-bold text-gray-900">12.4k</div>
              <div className="text-[10px] text-green-600 font-bold">+12%</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <DollarSign className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Revenue</span>
              </div>
              <div className="text-xl font-bold text-gray-900">$4.2k</div>
              <div className="text-[10px] text-green-600 font-bold">+8%</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Target className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Goal</span>
              </div>
              <div className="text-xl font-bold text-gray-900">84%</div>
              <div className="text-[10px] text-indigo-600 font-bold">On Track</div>
            </div>
          </div>

          <div className="relative">
            {renderChart()}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> {chartType === 'bar' ? "Bar charts are best for comparing values across different categories." : 
          chartType === 'line' ? "Line charts are ideal for showing trends over time as they emphasize the connection between data points." : 
          "Use pie charts sparingly. They are only effective when showing how parts make up a whole, and work best with 5 or fewer categories."}
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Data Visualization"
      description="Master the art of presenting complex data clearly and effectively."
      theory={theory}
      playground={playground}
    />
  );
}

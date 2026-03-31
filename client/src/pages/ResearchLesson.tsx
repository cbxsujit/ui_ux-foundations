import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Search, Users, FileText, CheckCircle, BarChart, LayoutGrid } from 'lucide-react';

export function ResearchLesson() {
  const [activeTab, setActiveTab] = useState<'methods' | 'sorting'>('methods');
  
  // Card Sorting Demo State
  const [unassigned, setUnassigned] = useState([
    'Contact Us', 'Our Story', 'Pricing Plans', 'FAQ', 'Blog', 'Careers', 'Terms of Service', 'Privacy Policy'
  ]);
  const [categories, setCategories] = useState<{ [key: string]: string[] }>({
    'About Company': [],
    'Support': [],
    'Legal': []
  });

  const handleDragStart = (e: React.DragEvent, item: string, source: string) => {
    e.dataTransfer.setData('item', item);
    e.dataTransfer.setData('source', source);
  };

  const handleDrop = (e: React.DragEvent, targetCategory: string) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('item');
    const source = e.dataTransfer.getData('source');

    if (source === targetCategory) return;

    // Remove from source
    if (source === 'unassigned') {
      setUnassigned(prev => prev.filter(i => i !== item));
    } else {
      setCategories(prev => ({
        ...prev,
        [source]: prev[source].filter(i => i !== item)
      }));
    }

    // Add to target
    if (targetCategory === 'unassigned') {
      setUnassigned(prev => [...prev, item]);
    } else {
      setCategories(prev => ({
        ...prev,
        [targetCategory]: [...prev[targetCategory], item]
      }));
    }
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>User Research</strong> is the systematic study of target users and their requirements, to add realistic contexts and insights to design processes.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualitative vs. Quantitative</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Qualitative:</strong> Answers "Why?" and "How?". Methods include user interviews, focus groups, and ethnographic studies.</li>
          <li><strong>Quantitative:</strong> Answers "How many?" and "How much?". Methods include surveys, analytics, and A/B testing.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Research Methods</h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <Users className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900">User Interviews:</strong> One-on-one sessions to understand user goals, pain points, and behaviors.
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900">Usability Testing:</strong> Observing users trying to complete tasks with your product to identify friction points.
            </div>
          </div>
          <div className="flex gap-3">
            <FileText className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900">Card Sorting:</strong> Asking users to organize topics into categories to help design information architecture.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex gap-2 bg-gray-50/50">
        <button
          onClick={() => setActiveTab('methods')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'methods' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Search className="w-4 h-4" /> Research Methods
        </button>
        <button
          onClick={() => setActiveTab('sorting')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'sorting' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <LayoutGrid className="w-4 h-4" /> Card Sorting Demo
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'methods' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Interviews</h4>
              <p className="text-sm text-gray-500 mb-4">Deep dive into user motivations and pain points.</p>
              <div className="text-xs font-semibold text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded">Qualitative</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Surveys</h4>
              <p className="text-sm text-gray-500 mb-4">Gather data from a large number of users quickly.</p>
              <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-1 rounded">Quantitative</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Usability Testing</h4>
              <p className="text-sm text-gray-500 mb-4">Observe users interacting with your prototype.</p>
              <div className="text-xs font-semibold text-purple-600 bg-purple-50 inline-block px-2 py-1 rounded">Behavioral</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Card Sorting</h4>
              <p className="text-sm text-gray-500 mb-4">Understand how users categorize information.</p>
              <div className="text-xs font-semibold text-orange-600 bg-orange-50 inline-block px-2 py-1 rounded">Structural</div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-sm">
              <strong>Interactive Demo:</strong> Drag and drop the unassigned cards into the categories below to simulate a closed card sorting exercise.
            </div>

            <div 
              className="bg-gray-100 p-4 rounded-xl min-h-[100px] border-2 border-dashed border-gray-300"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, 'unassigned')}
            >
              <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Unassigned Cards</h4>
              <div className="flex flex-wrap gap-2">
                {unassigned.map(item => (
                  <div
                    key={item}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, 'unassigned')}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:border-indigo-400 transition-colors"
                  >
                    {item}
                  </div>
                ))}
                {unassigned.length === 0 && (
                  <div className="text-sm text-gray-400 italic py-2">All cards assigned!</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(categories).map(([cat, items]) => (
                <div 
                  key={cat}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm min-h-[200px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, cat)}
                >
                  <h4 className="font-bold text-gray-900 mb-3 border-b pb-2">{cat}</h4>
                  <div className="space-y-2">
                    {(items as string[]).map(item => (
                      <div
                        key={item}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item, cat)}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm cursor-grab active:cursor-grabbing hover:border-indigo-400"
                      >
                        {item}
                      </div>
                    ))}
                    {(items as string[]).length === 0 && (
                      <div className="text-sm text-gray-400 italic text-center py-4 border-2 border-dashed border-gray-100 rounded-lg">
                        Drop cards here
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="User Research"
      description="Learn how to gather insights to build products users actually need."
      theory={theory}
      playground={playground}
    />
  );
}

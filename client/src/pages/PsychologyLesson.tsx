import React, { useState, useEffect } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Brain, Clock, MousePointer2, LayoutGrid } from 'lucide-react';

export function PsychologyLesson() {
  const [demoType, setDemoType] = useState<'hicks' | 'fitts'>('hicks');
  const [hicksMode, setHicksMode] = useState<'flat' | 'categorized'>('flat');
  const [targetItem, setTargetItem] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [fittsDistance, setFittsDistance] = useState(50);
  const [fittsSize, setFittsSize] = useState(40);

  // Hick's Law Data
  const allItems = [
    'Apple', 'Banana', 'Orange', 'Grapes', 'Strawberry',
    'Carrot', 'Broccoli', 'Spinach', 'Tomato', 'Potato',
    'Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream',
    'Bread', 'Bagel', 'Croissant', 'Muffin', 'Toast'
  ];

  const categories = {
    Fruits: ['Apple', 'Banana', 'Orange', 'Grapes', 'Strawberry'],
    Vegetables: ['Carrot', 'Broccoli', 'Spinach', 'Tomato', 'Potato'],
    Dairy: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream'],
    Bakery: ['Bread', 'Bagel', 'Croissant', 'Muffin', 'Toast']
  };

  const startHicksTest = () => {
    const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
    setTargetItem(randomItem);
    setReactionTime(null);
    setStartTime(Date.now());
  };

  const handleItemClick = (item: string) => {
    if (item === targetItem && startTime) {
      setReactionTime(Date.now() - startTime);
      setTargetItem('');
    }
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>UX Psychology</strong> is the study of how human behavior and cognitive processes influence how users interact with digital products.
      </p>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Core Laws of UX</h3>
        <p className="text-gray-500 leading-relaxed">
          These fundamental principles explain how human psychology dictates the success of a user interface:
        </p>
      </section>

      <div className="space-y-6 mt-8">
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-indigo-600" />
            Hick's Law
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            The time it takes to make a decision increases with the number and complexity of choices. 
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase tracking-wider">
            Takeaway: Simplify choices
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <MousePointer2 className="w-5 h-5 text-indigo-600" />
            Fitts's Law
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            The time to acquire a target is a function of the distance to and size of the target.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase tracking-wider">
            Takeaway: Make targets accessible
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            Cognitive Load
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            The amount of mental effort required to use a product. Keep it low by using familiar patterns and avoiding clutter.
          </p>
        </div>
      </div>

      <div className="bg-indigo-900 text-white p-6 rounded-2xl mt-10 shadow-xl shadow-indigo-200">
        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-300" />
          Gestalt Principles
        </h4>
        <p className="text-sm text-indigo-100 leading-relaxed">
          Users perceive elements as organized patterns rather than separate parts. Principles include Proximity, Similarity, and Continuity.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex gap-2 bg-gray-50/50">
        <button
          onClick={() => { setDemoType('hicks'); setReactionTime(null); setTargetItem(''); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            demoType === 'hicks' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <LayoutGrid className="w-4 h-4" /> Hick's Law
        </button>
        <button
          onClick={() => { setDemoType('fitts'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            demoType === 'fitts' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <MousePointer2 className="w-4 h-4" /> Fitts's Law
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {demoType === 'hicks' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div>
                <h3 className="font-semibold text-gray-900">Find the item:</h3>
                <p className="text-2xl font-bold text-indigo-600 h-8">
                  {targetItem || 'Click Start'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Reaction Time</div>
                <div className="text-xl font-mono font-semibold text-gray-900">
                  {reactionTime ? `${reactionTime}ms` : '---'}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => { setHicksMode('flat'); setTargetItem(''); setReactionTime(null); }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg border ${hicksMode === 'flat' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
              >
                Flat List (High Cognitive Load)
              </button>
              <button
                onClick={() => { setHicksMode('categorized'); setTargetItem(''); setReactionTime(null); }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg border ${hicksMode === 'categorized' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
              >
                Categorized (Low Cognitive Load)
              </button>
            </div>

            {!targetItem ? (
              <div className="flex justify-center py-12">
                <button
                  onClick={startHicksTest}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                >
                  Start Test
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                {hicksMode === 'flat' ? (
                  <div className="flex flex-wrap gap-2">
                    {allItems.sort().map(item => (
                      <button
                        key={item}
                        onClick={() => handleItemClick(item)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    {Object.entries(categories).map(([cat, items]) => (
                      <div key={cat} className="space-y-2">
                        <h4 className="font-semibold text-gray-700 border-b pb-1">{cat}</h4>
                        <div className="flex flex-col gap-2">
                          {items.map(item => (
                            <button
                              key={item}
                              onClick={() => handleItemClick(item)}
                              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-left hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 h-full flex flex-col">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Distance</label>
                <input 
                  type="range" min="10" max="90" value={fittsDistance} 
                  onChange={(e) => setFittsDistance(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Size</label>
                <input 
                  type="range" min="20" max="120" value={fittsSize} 
                  onChange={(e) => setFittsSize(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>

            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 relative overflow-hidden min-h-[300px]">
              <div className="absolute top-4 left-4 text-sm text-gray-500 flex items-center gap-2">
                <MousePointer2 className="w-4 h-4" /> Start here
              </div>
              
              <button
                className="absolute bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
                style={{
                  width: `${fittsSize}px`,
                  height: `${fittsSize}px`,
                  top: '50%',
                  left: `${fittsDistance}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => alert('Target acquired!')}
              >
                Click
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="UX Psychology"
      description="Understand how users think and behave to design better experiences."
      theory={theory}
      playground={playground}
    />
  );
}

import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { ChevronDown, ChevronUp, Info, List } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function AccordionLesson() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const items = [
    { title: 'What is an Accordion?', content: 'An accordion is a vertically stacked list of headers that reveal or hide associated sections of content.' },
    { title: 'When should I use it?', content: 'Use accordions when you have a lot of content but want to keep the page clean and scannable. They are great for FAQs or complex settings.' },
    { title: 'What are the best practices?', content: 'Ensure the headers clearly indicate what content is hidden. Use clear icons (like chevrons or plus/minus) to show the expand/collapse state. Avoid putting critical information inside an accordion if it needs to be seen immediately.' },
  ];

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      const newOpenItems = new Set(openItems);
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
      setOpenItems(newOpenItems);
    } else {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  const isOpen = (index: number) => {
    return allowMultiple ? openItems.has(index) : openIndex === index;
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Accordions</strong> are UI components that allow users to expand and collapse sections of content. They are excellent for managing large amounts of information on a single page.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Key Principles</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><List className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Scannability</strong>
            <span className="text-sm">Accordions make long pages easier to scan. Users can quickly read the headers and decide which sections they want to explore.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><ChevronDown className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Clear Affordance</strong>
            <span className="text-sm">Always use an icon (usually a chevron or +/-) to indicate that the header is clickable and will reveal more content.</span>
          </div>
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
        <h4 className="text-amber-900 font-semibold mb-2">UX Tip: Single vs. Multiple</h4>
        <p className="text-sm text-amber-800">
          Decide whether users should be able to open multiple sections at once. If the content is long, auto-closing other sections (single expand) can prevent excessive scrolling.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="p-6 border-b border-gray-200 bg-white flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input 
            type="checkbox" 
            checked={allowMultiple} 
            onChange={(e) => {
              setAllowMultiple(e.target.checked);
              if (e.target.checked) {
                setOpenItems(new Set(openIndex !== null ? [openIndex] : []));
              } else {
                setOpenIndex(openItems.size > 0 ? Array.from(openItems)[0] : null);
              }
            }} 
            className="rounded text-indigo-600" 
          />
          Allow Multiple Open
        </label>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex flex-col items-center justify-start ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div className={`w-full max-w-2xl bg-white ${isMobile ? '' : 'rounded-2xl shadow-xl border border-gray-200 p-6'}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleToggle(index)}
                      className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="font-semibold text-gray-900">{item.title}</span>
                      {isOpen(index) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                      )}
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen(index) ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
            
            <div className="mt-10 p-4 bg-indigo-50 rounded-xl border border-indigo-100 max-w-md flex gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              <p className="text-xs text-indigo-700 leading-relaxed">
                <strong>UX Insight:</strong> Ensure the entire header row is clickable, not just the icon or the text, to provide a larger touch target.
              </p>
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Accordion" description="Manage large amounts of content with collapsible sections." theory={theory} playground={playground} />;
}

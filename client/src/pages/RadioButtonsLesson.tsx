import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Circle, CheckCircle2, Info, CheckSquare } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function RadioButtonsLesson() {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [isCheckbox, setIsCheckbox] = useState(false);

  const options = [
    { id: 'option1', label: 'Standard Shipping', description: '3-5 business days' },
    { id: 'option2', label: 'Express Shipping', description: '1-2 business days' },
    { id: 'option3', label: 'Overnight Shipping', description: 'Next business day' },
  ];

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Radio Buttons</strong> are used when there is a list of two or more options that are mutually exclusive and the user must select exactly one choice.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Radio Buttons vs. Checkboxes</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><Circle className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Radio Buttons (Mutually Exclusive)</strong>
            <span className="text-sm">Use when only one option can be selected from a list. Selecting one deselects the others. They are always circular.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><CheckSquare className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Checkboxes (Independent)</strong>
            <span className="text-sm">Use when multiple options can be selected, or for a single yes/no choice. They are always square.</span>
          </div>
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
        <h4 className="text-amber-900 font-semibold mb-2">UX Tip: Default Selection</h4>
        <p className="text-sm text-amber-800">
          Always provide a default selection for radio button groups. If a user shouldn't be forced to choose, consider adding a "None" or "Not Applicable" option.
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
            checked={isCheckbox} 
            onChange={(e) => setIsCheckbox(e.target.checked)} 
            className="rounded text-indigo-600" 
          />
          Switch to Checkboxes (Incorrect Usage)
        </label>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex flex-col items-center justify-start ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div className={`w-full max-w-md bg-white ${isMobile ? '' : 'rounded-2xl shadow-xl border border-gray-200 p-8'}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Shipping Method</h2>
              
              <div className="space-y-3">
                {options.map((option) => (
                  <label 
                    key={option.id}
                    className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedOption === option.id && !isCheckbox ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center h-5 mt-0.5">
                      <input 
                        type={isCheckbox ? 'checkbox' : 'radio'} 
                        name="shipping" 
                        value={option.id} 
                        checked={selectedOption === option.id}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className={`w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ${isCheckbox ? 'rounded' : 'rounded-full'}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>

            </div>
            
            <div className="mt-10 p-4 bg-indigo-50 rounded-xl border border-indigo-100 max-w-md flex gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              <p className="text-xs text-indigo-700 leading-relaxed">
                <strong>UX Insight:</strong> Make the entire row (label and description) clickable, not just the small radio button circle, to increase the touch target size.
              </p>
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Radio Buttons" description="Allow users to select exactly one option from a list." theory={theory} playground={playground} />;
}

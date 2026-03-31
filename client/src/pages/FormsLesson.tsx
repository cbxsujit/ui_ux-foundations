import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { CheckCircle2, AlertCircle, Type, EyeOff, Info, Circle } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function FormsLesson() {
  const [uxMode, setUxMode] = useState<'bad' | 'good'>('good');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [agreed, setAgreed] = useState(false);

  const isValid = email.includes('@') && email.includes('.');
  const showError = touched && !isValid && email.length > 0;

  const isPasswordValid = password.length >= 8 && /\d/.test(password);
  const showPasswordError = passwordTouched && !isPasswordValid && password.length > 0;

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Forms are how users talk to a system, and they are notoriously easy to get wrong. A frustrating form is the fastest way to lose a user.
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Key Principles</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0"><Type className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Labels vs. Placeholders</strong>
            <span className="text-sm">Never use placeholders as a replacement for labels. Once the user starts typing, the placeholder disappears, and they might forget what field they are filling out.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Inline Validation</strong>
            <span className="text-sm">Show errors *as* the user types or immediately after they leave a field, rather than waiting until they hit "Submit."</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0"><EyeOff className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Clear Focus States</strong>
            <span className="text-sm">The user should always know exactly which input field is currently active.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0"><Info className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Helper Text</strong>
            <span className="text-sm">Provide clarification for fields with specific formats or requirements (e.g., password rules) to prevent errors before they happen.</span>
          </div>
        </li>
      </ul>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-col gap-4">
        <label className="text-sm font-medium text-gray-700">UX Mode</label>
        <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden max-w-xs">
          <button 
            onClick={() => { setUxMode('bad'); setEmail(''); setPassword(''); setTouched(false); setPasswordTouched(false); }}
            className={`flex-1 px-4 py-2 text-sm font-medium ${uxMode === 'bad' ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Bad UX
          </button>
          <button 
            onClick={() => { setUxMode('good'); setEmail(''); setPassword(''); setTouched(false); setPasswordTouched(false); }}
            className={`flex-1 px-4 py-2 text-sm font-medium border-l border-gray-300 ${uxMode === 'good' ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Good UX
          </button>
        </div>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex items-center justify-center ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div className={`bg-white w-full max-w-sm ${isMobile ? 'p-2' : 'p-8 rounded-2xl shadow-xl border border-gray-100'}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>
          
          {uxMode === 'bad' ? (
            <div className="space-y-4">
              {/* Bad UX: No label, generic placeholder, no focus ring, no inline validation */}
              <input 
                type="text" 
                placeholder="Email Address" 
                className="w-full p-3 bg-gray-100 border-none outline-none text-gray-700"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-3 bg-gray-100 border-none outline-none text-gray-700"
              />
              <button className="w-full py-3 bg-gray-800 text-white mt-4">Submit</button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Good UX: Clear label, focus ring, inline validation */}
              <div className="space-y-1.5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input 
                  id="username"
                  type="text" 
                  onFocus={() => setUsernameFocus(true)}
                  onBlur={() => setUsernameFocus(false)}
                  placeholder="johndoe" 
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                {usernameFocus && (
                  <p className="text-xs text-gray-500 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    <Info className="w-3 h-3" /> Use only lowercase letters and numbers.
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <input 
                    id="email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="you@example.com" 
                    className={`w-full p-3 border rounded-lg outline-none transition-all ${
                      showError 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                        : isValid && email.length > 0
                          ? 'border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                          : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                    }`}
                  />
                  {isValid && email.length > 0 && (
                    <CheckCircle2 className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
                  )}
                  {showError && (
                    <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />
                  )}
                </div>
                {showError && (
                  <p className="text-sm text-red-600 mt-1">Please enter a valid email address.</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input 
                    id="password"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    className={`w-full p-3 border rounded-lg outline-none transition-all ${
                      showPasswordError 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                        : isPasswordValid && password.length > 0
                          ? 'border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                          : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                    }`}
                  />
                  {isPasswordValid && password.length > 0 && (
                    <CheckCircle2 className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
                  )}
                  {showPasswordError && (
                    <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className={`text-xs flex items-center gap-1.5 ${password.length >= 8 ? 'text-green-600' : showPasswordError ? 'text-red-600' : 'text-gray-500'}`}>
                    {password.length >= 8 ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                    At least 8 characters
                  </p>
                  <p className={`text-xs flex items-center gap-1.5 ${/\d/.test(password) ? 'text-green-600' : showPasswordError ? 'text-red-600' : 'text-gray-500'}`}>
                    {/\d/.test(password) ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                    At least one number
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Select Plan</label>
                <div className="grid grid-cols-1 gap-3">
                  {['option1', 'option2'].map((opt) => (
                    <label 
                      key={opt}
                      className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                        selectedOption === opt ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="plan" 
                        value={opt} 
                        checked={selectedOption === opt}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-gray-900">{opt === 'option1' ? 'Basic Plan' : 'Pro Plan'}</div>
                        <div className="text-xs text-gray-500">{opt === 'option1' ? '$0/mo' : '$19/mo'}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center h-5">
                  <input 
                    id="terms"
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>
                <label htmlFor="terms" className="text-sm text-gray-500">
                  I agree to the <button className="text-indigo-600 font-medium hover:underline">Terms of Service</button> and <button className="text-indigo-600 font-medium hover:underline">Privacy Policy</button>.
                </label>
              </div>

              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors mt-2">
                Create Account
              </button>
            </div>
          )}
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Forms & Inputs" description="Design forms that are easy to understand and complete." theory={theory} playground={playground} />;
}

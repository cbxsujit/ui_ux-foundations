import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { LayoutGrid, Image as ImageIcon, Tag, MousePointerClick } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function CardsLesson() {
  const [showImage, setShowImage] = useState(true);
  const [showTags, setShowTags] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Cards are the standard way to group related information about a single subject (like a product, an article, or a user profile).
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Card Anatomy</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><ImageIcon className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Media (Optional)</strong>
            <span className="text-sm">An image or video that provides immediate visual context. Usually placed at the top.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><Tag className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Content</strong>
            <span className="text-sm">Title, subtitle, and a brief summary. Keep it concise.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><MousePointerClick className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Actions</strong>
            <span className="text-sm">Buttons or links to interact with the card. Should the whole card be clickable, or just the buttons? (Usually, making the whole card clickable is better for mobile).</span>
          </div>
        </li>
      </ul>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-6 border-b border-gray-200 bg-gray-50 grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input type="checkbox" checked={showImage} onChange={(e) => setShowImage(e.target.checked)} className="rounded text-indigo-600" />
          Show Image
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input type="checkbox" checked={showTags} onChange={(e) => setShowTags(e.target.checked)} className="rounded text-indigo-600" />
          Show Tags
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input type="checkbox" checked={showActions} onChange={(e) => setShowActions(e.target.checked)} className="rounded text-indigo-600" />
          Show Actions
        </label>
        <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden max-w-[120px]">
          <button onClick={() => setLayout('grid')} className={`flex-1 p-1 flex justify-center ${layout === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500'}`}><LayoutGrid className="w-4 h-4" /></button>
          <button onClick={() => setLayout('list')} className={`flex-1 p-1 flex justify-center border-l border-gray-300 ${layout === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500'}`}><div className="w-4 h-4 flex flex-col gap-1 justify-center"><div className="w-full h-0.5 bg-current rounded"/><div className="w-full h-0.5 bg-current rounded"/><div className="w-full h-0.5 bg-current rounded"/></div></button>
        </div>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4 bg-white' : 'p-8 bg-gray-50'}`}>
            <div className={`mx-auto ${isMobile ? 'flex flex-col gap-6' : (layout === 'grid' ? 'grid grid-cols-2 gap-6 max-w-4xl' : 'flex flex-col gap-4 max-w-3xl')}`}>
              {[1, 2].map((i) => (
                <div key={i} className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex ${layout === 'list' && !isMobile ? 'flex-row h-40' : 'flex-col'}`}>
                  {showImage && (
                    <div className={`${layout === 'list' && !isMobile ? 'w-40 shrink-0' : 'w-full h-48'} bg-gray-200 relative`}>
                  <img src={`https://picsum.photos/seed/${i + 10}/400/300`} alt="Card thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className={`flex flex-col flex-1 ${isMobile ? 'p-4' : 'p-5'}`}>
                {showTags && (
                  <div className="flex gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">Design</span>
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full">UI/UX</span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-1">Mastering Card Layouts</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">Learn how to structure information effectively using cards. They are versatile, responsive, and easy to digest.</p>
                
                {showActions && (
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Read More</button>
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-700 ml-auto">Save</button>
                  </div>
                )}
              </div>
            </div>
          ))}
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Cards & Grids" description="Organize content into digestible, scannable chunks." theory={theory} playground={playground} />;
}

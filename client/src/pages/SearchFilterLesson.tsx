import React, { useState, useMemo } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Search, Filter, X, Check, Info, SlidersHorizontal, Tag, LayoutGrid, List } from 'lucide-react';

export function SearchFilterLesson() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['Electronics', 'Furniture', 'Clothing', 'Books'];
  
  const items = [
    { id: 1, name: 'Smartphone X', category: 'Electronics', price: 899, image: 'https://picsum.photos/seed/phone/200/200' },
    { id: 2, name: 'Ergonomic Chair', category: 'Furniture', price: 299, image: 'https://picsum.photos/seed/chair/200/200' },
    { id: 3, name: 'Cotton T-Shirt', category: 'Clothing', price: 25, image: 'https://picsum.photos/seed/shirt/200/200' },
    { id: 4, name: 'JavaScript Guide', category: 'Books', price: 45, image: 'https://picsum.photos/seed/book/200/200' },
    { id: 5, name: 'Wireless Headphones', category: 'Electronics', price: 199, image: 'https://picsum.photos/seed/audio/200/200' },
    { id: 6, name: 'Oak Dining Table', category: 'Furniture', price: 599, image: 'https://picsum.photos/seed/table/200/200' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, minPrice, maxPrice]);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Search and filtering are the primary ways users navigate large content sets. A well-designed search experience reduces <strong>time-to-content</strong>.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-500" />
            Faceted Search
          </h4>
          <p className="text-sm">Allow users to narrow down results using multiple attributes (categories, price, ratings) simultaneously.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Search className="w-4 h-4 text-pink-500" />
            Predictive Patterns
          </h4>
          <p className="text-sm">Show results as the user types to provide immediate feedback and prevent "No Results Found" screens.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">UX Best Practices</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Visible Filters:</strong> Don't hide important filters behind a menu if space allows.</li>
          <li><strong>Active States:</strong> Clearly show which filters are currently applied.</li>
          <li><strong>Empty States:</strong> If no results match, suggest broader search terms or a "Clear All Filters" button.</li>
        </ul>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <h4 className="font-bold text-indigo-900 mb-2">Ready to experiment?</h4>
        <p className="text-sm text-indigo-700 mb-4">Try filtering the product list in the lab. Notice how the UI responds instantly to your changes.</p>
        <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all lg:hidden">
          Open Interactive Lab
        </button>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900">Search & Filter Lab</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        <div className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto hidden md:block">
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === null ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price Range</h4>
                <span className="text-sm font-bold text-indigo-600">${minPrice} - ${maxPrice}</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>Min</span>
                    <span>${minPrice}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="25"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Math.min(parseInt(e.target.value), maxPrice))}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>Max</span>
                    <span>${maxPrice}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="25"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Math.max(parseInt(e.target.value), minPrice))}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setMinPrice(0);
                setMaxPrice(1000);
              }}
              className="w-full py-2 border border-gray-200 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Active Filters (Mobile/Summary) */}
            {(selectedCategory || searchQuery || minPrice > 0 || maxPrice < 1000) && (
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory(null)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded-full">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {(minPrice > 0 || maxPrice < 1000) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                    ${minPrice} - ${maxPrice}
                    <button onClick={() => { setMinPrice(0); setMaxPrice(1000); }}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Grid/List */}
            {filteredItems.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredItems.map(item => (
                  <div 
                    key={item.id} 
                    className={`bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all ${viewMode === 'list' ? 'flex items-center p-4 gap-6' : ''}`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className={viewMode === 'list' ? 'w-20 h-20 rounded-xl object-cover' : 'w-full h-40 object-cover'} 
                      referrerPolicy="no-referrer"
                    />
                    <div className={viewMode === 'list' ? 'flex-1' : 'p-4'}>
                      <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">{item.category}</div>
                      <h5 className="font-bold text-gray-900 mb-1">{item.name}</h5>
                      <div className="text-lg font-black text-gray-900">${item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">No results found</h4>
                <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setMinPrice(0);
                    setMaxPrice(1000);
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Faceted search is most effective when users have a specific goal but aren't sure of the exact item. Instant feedback (filtering as you type) reduces the "pogo-sticking" effect of clicking back and forth.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Search & Filtering"
      description="Design powerful ways for users to find exactly what they need."
      theory={theory}
      playground={playground}
    />
  );
}

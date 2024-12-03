import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchQuery } from '../store/taskSlice';
import { RootState } from '../store/store';
import { Search } from 'lucide-react';

export default function TaskFilters() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const searchQuery = useSelector((state: RootState) => state.tasks.searchQuery);

  const filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-6 mb-6 animate-slideIn border border-white/20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 search-animation bg-white/90"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => dispatch(setFilter(filter.value as any))}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                currentFilter === filter.value
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white filter-active'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
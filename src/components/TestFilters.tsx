import React from 'react';
import { Filter } from 'lucide-react';

interface TestFiltersProps {
  statuses: string[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

const TestFilters: React.FC<TestFiltersProps> = ({ 
  statuses, 
  selectedStatus, 
  onStatusChange, 
  tags, 
  selectedTag, 
  onTagChange 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Filters</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedStatus === 'all'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => onStatusChange('all')}
              >
                All
              </button>
              
              {statuses.map((status) => (
                <button
                  key={status}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedStatus === status
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => onStatusChange(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {tags.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === 'all'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => onTagChange('all')}
                >
                  All
                </button>
                
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTag === tag
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => onTagChange(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestFilters;
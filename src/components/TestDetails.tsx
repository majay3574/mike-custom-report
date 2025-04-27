import React, { useState } from 'react';
import { Test } from '../types/playwrightReport';
import { formatDuration } from '../utils/formatters';
import TestStep from './TestStep';
import StatusBadge from './StatusBadge';
import TagBadge from './TagBadge';
import { Clock, Monitor } from 'lucide-react';

interface TestDetailsProps {
  test: Test;
}

const TestDetails: React.FC<TestDetailsProps> = ({ test }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
      <div 
        className="bg-white dark:bg-gray-800 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center">
            <StatusBadge status={test.status} />
            <h3 className="ml-3 text-base font-medium text-gray-800 dark:text-gray-200">{test.title}</h3>
          </div>
          
          <div className="flex items-center mt-2 sm:mt-0">
            <div className="mr-4 flex items-center text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{formatDuration(test.duration)}</span>
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Monitor className="h-4 w-4 mr-1" />
              <span className="text-sm">{test.projectName}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {test.annotations.map((annotation, i) => (
            <TagBadge key={i} tag={annotation.type} />
          ))}
        </div>
      </div>
      
      {expanded && (
        <div className="bg-gray-50 dark:bg-gray-850 border-t border-gray-200 dark:border-gray-700 p-4">
          {test.error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">Error</h4>
              <pre className="text-xs text-red-700 dark:text-red-300 overflow-x-auto whitespace-pre-wrap">
                {test.error.message}
                {test.error.stack && (
                  <>
                    <br /><br />
                    {test.error.stack}
                  </>
                )}
              </pre>
            </div>
          )}
          
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Steps</h4>
          <div className="border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
            {test.steps.map((step, i) => (
              <TestStep key={i} step={step} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDetails;
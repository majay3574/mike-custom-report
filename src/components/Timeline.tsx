import React, { useRef, useEffect, useState } from 'react';
import { Test } from '../types/playwrightReport';
import { formatTime, formatDuration } from '../utils/formatters';
import { getStatusColorClass } from '../utils/formatters';
import { Clock } from 'lucide-react';

interface TimelineProps {
  tests: Test[];
}

const Timeline: React.FC<TimelineProps> = ({ tests }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  
  if (tests.length === 0) {
    return <div className="p-4 text-gray-500 dark:text-gray-400">No tests to display</div>;
  }
  
  // Find the earliest start time and latest end time
  const minTime = Math.min(...tests.map(t => t.start));
  const maxTime = Math.max(...tests.map(t => t.end));
  const totalDuration = maxTime - minTime || 1; // Prevent division by zero
  
  // Sort tests by start time and ensure unique positions
  const sortedTests = [...tests]
    .sort((a, b) => a.start - b.start)
    .map((test, index) => ({
      ...test,
      row: index // Assign unique row numbers
    }));
  
  // Function to calculate position percentage with bounds checking
  const getPositionPercent = (time: number) => {
    const percent = ((time - minTime) / totalDuration) * 100;
    return Math.max(0, Math.min(100, percent)); // Clamp between 0 and 100
  };
  
  // Function to calculate width percentage with minimum width
  const getWidthPercent = (start: number, end: number) => {
    const width = ((end - start) / totalDuration) * 100;
    return Math.max(0.5, width); // Ensure minimum visible width
  };
  
  // Calculate time markers with proper intervals
  const timeMarkers = Array.from({ length: 6 }).map((_, i) => {
    const time = minTime + (totalDuration / 5) * i;
    return {
      time,
      position: (i * 20)
    };
  });
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [tests]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Execution Timeline</h2>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>Total Duration: {formatDuration(totalDuration)}</span>
          </div>
        </div>
        
        <div 
          ref={containerRef}
          className="overflow-x-auto pb-3"
        >
          {/* Timeline header */}
          <div className="flex mb-2 min-w-max">
            <div className="w-48 flex-shrink-0"></div>
            <div className="flex-grow relative h-6">
              {timeMarkers.map(({ time, position }, i) => (
                <div 
                  key={i} 
                  className="absolute text-xs text-gray-500 dark:text-gray-400"
                  style={{ left: `${position}%` }}
                >
                  {formatTime(time)}
                </div>
              ))}
            </div>
          </div>
          
          {/* Timeline grid */}
          <div className="relative min-w-max">
            {/* Grid lines */}
            <div className="absolute top-0 left-48 right-0 bottom-0 grid grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border-l border-gray-200 dark:border-gray-700 h-full"
                ></div>
              ))}
            </div>
            
            {/* Test rows */}
            {sortedTests.map((test) => (
              <div 
                key={test.id} 
                className={`flex items-center h-10 ${
                  test.row % 2 === 0 
                    ? 'bg-gray-50 dark:bg-gray-800/50' 
                    : 'bg-white dark:bg-gray-800'
                } ${
                  selectedTest === test.id
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
              >
                <div className="w-48 flex-shrink-0 px-4 truncate">
                  <span 
                    className="text-sm text-gray-700 dark:text-gray-300" 
                    title={test.title}
                  >
                    {test.title}
                  </span>
                </div>
                
                <div className="flex-grow relative h-6">
                  <div 
                    className={`absolute h-full rounded-md ${getStatusColorClass(test.status)} transition-all duration-200 cursor-pointer hover:opacity-90`}
                    style={{ 
                      left: `${getPositionPercent(test.start)}%`,
                      width: `${getWidthPercent(test.start, test.end)}%`
                    }}
                    title={`${test.title}\nStatus: ${test.status}\nDuration: ${formatDuration(test.end - test.start)}`}
                    onClick={() => setSelectedTest(selectedTest === test.id ? null : test.id)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedTest(selectedTest === test.id ? null : test.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedTest === test.id}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
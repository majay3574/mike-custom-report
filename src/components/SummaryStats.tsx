import React from 'react';
import { TestStats } from '../types/playwrightReport';
import { formatDuration } from '../utils/formatters';
import SummaryChart from './SummaryChart';
import { CheckCircle, XCircle, Clock, Timer } from 'lucide-react';

interface SummaryStatsProps {
  stats: TestStats;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ stats }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-6">Test Results Summary</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Passed</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.expected}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <XCircle className="h-6 w-6 text-red-500 dark:text-red-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Failed</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.unexpected}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Skipped</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.skipped}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <Timer className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{formatDuration(stats.duration)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <SummaryChart stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStats;
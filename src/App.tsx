import React from 'react';
import { mockReport } from './utils/mockData';
import SummaryStats from './components/SummaryStats';
import Timeline from './components/Timeline';
import TestList from './components/TestList';
import ProjectMetadata from './components/ProjectMetadata';
import DarkModeToggle from './components/DarkModeToggle';
import useDarkMode from './hooks/useDarkMode';
import { FileText } from 'lucide-react';

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  
  // Extract all tests for the timeline
  const allTests = mockReport.suites.flatMap(suite => 
    suite.specs.flatMap(spec => spec.tests)
  );
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">Mike Test Report</h1>
            </div>
            
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <SummaryStats stats={mockReport.stats} />
          
          <Timeline tests={allTests} />
          
          <ProjectMetadata config={mockReport.config} />
          
          <TestList suites={mockReport.suites} />
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Generated on {new Date().toLocaleString()} • Playwright Test Report
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
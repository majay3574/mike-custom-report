import React, { useState, useMemo } from 'react';
import { Test, TestSuite } from '../types/playwrightReport';
import TestDetails from './TestDetails';
import TestFilters from './TestFilters';
import { Search } from 'lucide-react';

interface TestListProps {
  suites: TestSuite[];
}

const TestList: React.FC<TestListProps> = ({ suites }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  
  // Extract all tests from all suites and specs
  const allTests = useMemo(() => {
    const tests: Test[] = [];
    suites.forEach(suite => {
      suite.specs.forEach(spec => {
        tests.push(...spec.tests);
      });
    });
    return tests;
  }, [suites]);
  
  // Extract unique statuses
  const statuses = useMemo(() => {
    return [...new Set(allTests.map(test => test.status))];
  }, [allTests]);
  
  // Extract unique tags
  const tags = useMemo(() => {
    const allTags = new Set<string>();
    allTests.forEach(test => {
      test.annotations.forEach(annotation => {
        allTags.add(annotation.type);
      });
    });
    return [...allTags];
  }, [allTests]);
  
  // Filter tests based on search query, status, and tag
  const filteredTests = useMemo(() => {
    return allTests.filter(test => {
      const matchesSearch = searchQuery === '' || 
        test.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || test.status === selectedStatus;
      
      const matchesTag = selectedTag === 'all' || 
        test.annotations.some(a => a.type === selectedTag);
      
      return matchesSearch && matchesStatus && matchesTag;
    });
  }, [allTests, searchQuery, selectedStatus, selectedTag]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <TestFilters 
          statuses={statuses}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          tags={tags}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
        />
      </div>
      
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Test Cases</h2>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-gray-100"
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              {filteredTests.length === 0 ? (
                <div className="py-10 text-center text-gray-500 dark:text-gray-400">
                  No tests found matching your criteria
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Showing {filteredTests.length} of {allTests.length} tests
                  </p>
                  <div>
                    {filteredTests.map(test => (
                      <TestDetails key={test.id} test={test} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestList;
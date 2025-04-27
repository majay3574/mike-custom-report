import React from 'react';
import { ReportConfig } from '../types/playwrightReport';
import { Cpu, Globe, Info, Server } from 'lucide-react';

interface ProjectMetadataProps {
  config: ReportConfig;
}

const ProjectMetadata: React.FC<ProjectMetadataProps> = ({ config }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-6">Environment Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.projects.map((project, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">{project.name}</h3>
              
              <div className="space-y-2">
                {project.metadata.browser && (
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-500 dark:text-gray-400 min-w-24">Browser:</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {project.metadata.browser}
                    </span>
                  </div>
                )}
                
                {project.metadata.platform && (
                  <div className="flex items-center text-sm">
                    <Server className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-500 dark:text-gray-400 min-w-24">Platform:</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {project.metadata.platform}
                    </span>
                  </div>
                )}
                
                {project.metadata.engine && (
                  <div className="flex items-center text-sm">
                    <Cpu className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-500 dark:text-gray-400 min-w-24">Engine:</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {project.metadata.engine}
                    </span>
                  </div>
                )}
                
                {project.metadata.os && (
                  <div className="flex items-center text-sm">
                    <Info className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-500 dark:text-gray-400 min-w-24">OS:</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {project.metadata.os}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectMetadata;
import React, { useState } from 'react';
import { TestStep as TestStepType } from '../types/playwrightReport';
import { formatDuration, getStatusTextColorClass } from '../utils/formatters';
import StatusBadge from './StatusBadge';
import { ChevronRight, ChevronDown, Image, FileText, FileJson, Video, AlertTriangle } from 'lucide-react';

interface TestStepProps {
  step: TestStepType;
  level?: number;
}

const TestStep: React.FC<TestStepProps> = ({ step, level = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [videoError, setVideoError] = useState<Record<string, boolean>>({});
  
  const hasChildren = step.steps && step.steps.length > 0;
  const hasAttachments = step.attachments && step.attachments.length > 0;
  const hasContent = hasChildren || hasAttachments || step.error;
  
  const paddingLeft = level * 16 + 8;
  const statusColor = getStatusTextColorClass(step.status);
  
  const handleImageError = (attachmentId: string) => {
    setImageError(prev => ({ ...prev, [attachmentId]: true }));
  };
  
  const handleVideoError = (attachmentId: string) => {
    setVideoError(prev => ({ ...prev, [attachmentId]: true }));
  };
  
  return (
    <div className="mb-1">
      <div 
        className={`py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
          expanded ? 'bg-gray-50 dark:bg-gray-800/50' : ''
        }`}
      >
        <div className="flex items-center">
          {hasContent ? (
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="mr-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
              aria-label={expanded ? "Collapse step" : "Expand step"}
              style={{ marginLeft: `${paddingLeft}px` }}
            >
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          ) : (
            <div style={{ width: '16px', marginLeft: `${paddingLeft}px` }} className="mr-2"></div>
          )}
          
          <div className="flex-grow">
            <div className="flex items-center text-sm">
              <span className={`font-medium ${statusColor}`}>{step.title}</span>
              <div className="ml-2">
                <StatusBadge status={step.status} small />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatDuration(step.duration)}
          </div>
        </div>
      </div>
      
      {expanded && hasContent && (
        <div className="pl-12 ml-2 border-l border-gray-200 dark:border-gray-700 mb-2">
          {/* Error message */}
          {step.error && (
            <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
              <div className="flex items-center text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Error:
              </div>
              <pre className="text-xs text-red-700 dark:text-red-300 overflow-x-auto whitespace-pre-wrap">
                {step.error.message}
                {step.error.stack && (
                  <>
                    <br /><br />
                    {step.error.stack}
                  </>
                )}
              </pre>
            </div>
          )}
          
          {/* Attachments */}
          {hasAttachments && (
            <div className="mt-2 space-y-3">
              {step.attachments?.map((attachment, i) => (
                <div key={i} className="rounded-md bg-gray-50 dark:bg-gray-800/30 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
                      {attachment.contentType.startsWith('image/') && <Image className="h-4 w-4 mr-1" />}
                      {attachment.contentType === 'text/plain' && <FileText className="h-4 w-4 mr-1" />}
                      {attachment.contentType === 'application/zip' && <FileJson className="h-4 w-4 mr-1" />}
                      {attachment.contentType.startsWith('video/') && <Video className="h-4 w-4 mr-1" />}
                      {attachment.name}
                    </h4>
                    
                    {attachment.path && (
                      <a
                        href={attachment.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Open
                      </a>
                    )}
                  </div>
                  
                  {attachment.contentType.startsWith('image/') && attachment.path && !imageError[i] && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                      <img 
                        src={attachment.path} 
                        alt={attachment.name}
                        className="max-w-full h-auto"
                        onError={() => handleImageError(i.toString())}
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  {attachment.contentType === 'text/plain' && attachment.body && (
                    <pre className="text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-2 rounded-md overflow-x-auto">
                      {attachment.body}
                    </pre>
                  )}
                  
                  {attachment.contentType.startsWith('video/') && attachment.path && !videoError[i] && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                      <video 
                        src={attachment.path}
                        controls
                        className="max-w-full h-auto"
                        onError={() => handleVideoError(i.toString())}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  
                  {(imageError[i] || videoError[i]) && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                      Failed to load media. Click 'Open' to view directly.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Nested steps */}
          {hasChildren && (
            <div className="mt-2">
              {step.steps?.map((childStep, i) => (
                <TestStep key={i} step={childStep} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestStep;
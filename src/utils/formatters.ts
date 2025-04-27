/**
 * Format milliseconds to a human-readable time string
 */
export const formatDuration = (ms: number): string => {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(2)}s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}m ${seconds}s`;
  }
};

/**
 * Format a date to a readable time string
 */
export const formatTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString();
};

/**
 * Format a timestamp to show time difference from now
 */
export const formatTimeDiff = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  if (diff < 60000) {
    return 'just now';
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}m ago`;
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}h ago`;
  } else {
    return `${Math.floor(diff / 86400000)}d ago`;
  }
};

/**
 * Get a color class based on test status
 */
export const getStatusColorClass = (status: string): string => {
  switch (status) {
    case 'passed':
      return 'bg-green-500';
    case 'failed':
      return 'bg-red-500';
    case 'skipped':
      return 'bg-gray-400';
    case 'timedOut':
      return 'bg-amber-500';
    default:
      return 'bg-blue-500';
  }
};

/**
 * Get a text color class based on test status
 */
export const getStatusTextColorClass = (status: string): string => {
  switch (status) {
    case 'passed':
      return 'text-green-600 dark:text-green-400';
    case 'failed':
      return 'text-red-600 dark:text-red-400';
    case 'skipped':
      return 'text-gray-500 dark:text-gray-400';
    case 'timedOut':
      return 'text-amber-600 dark:text-amber-400';
    default:
      return 'text-blue-600 dark:text-blue-400';
  }
};

/**
 * Convert status to a more readable format
 */
export const formatStatus = (status: string): string => {
  switch (status) {
    case 'timedOut':
      return 'Timed Out';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

/**
 * Get severity badge color
 */
export const getSeverityColorClass = (severity?: string): string => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'normal':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'low':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};
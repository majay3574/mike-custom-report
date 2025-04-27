import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { getStatusColorClass, formatStatus } from '../utils/formatters';

interface StatusBadgeProps {
  status: string;
  small?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, small = false }) => {
  const bgColorClass = getStatusColorClass(status);
  const iconSize = small ? "h-3 w-3" : "h-4 w-4";
  const textSize = small ? "text-xs" : "text-sm";
  const padding = small ? "px-1.5 py-0.5" : "px-2.5 py-1";
  
  return (
    <span className={`inline-flex items-center ${padding} rounded-full ${textSize} font-medium text-white ${bgColorClass}`}>
      {status === 'passed' && <CheckCircle className={`${iconSize} mr-1`} />}
      {status === 'failed' && <XCircle className={`${iconSize} mr-1`} />}
      {status === 'skipped' && <Clock className={`${iconSize} mr-1`} />}
      {status === 'timedOut' && <AlertTriangle className={`${iconSize} mr-1`} />}
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
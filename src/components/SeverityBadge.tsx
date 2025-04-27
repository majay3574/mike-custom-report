import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { getSeverityColorClass } from '../utils/formatters';

interface SeverityBadgeProps {
  severity?: string;
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity = 'normal' }) => {
  const colorClass = getSeverityColorClass(severity);
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {severity === 'critical' && <AlertCircle className="h-3 w-3 mr-1" />}
      {severity === 'normal' && <Info className="h-3 w-3 mr-1" />}
      {severity === 'low' && <AlertTriangle className="h-3 w-3 mr-1" />}
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
};

export default SeverityBadge;
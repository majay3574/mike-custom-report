import React from 'react';

interface TagBadgeProps {
  tag: string;
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
  let colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  
  if (tag.startsWith('@smoke')) {
    colorClass = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
  } else if (tag.startsWith('@regression')) {
    colorClass = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
  } else if (tag.startsWith('@e2e')) {
    colorClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {tag}
    </span>
  );
};

export default TagBadge;
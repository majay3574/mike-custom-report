import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { TestStats } from '../types/playwrightReport';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SummaryChartProps {
  stats: TestStats;
}

const SummaryChart: React.FC<SummaryChartProps> = ({ stats }) => {
  const { expected, unexpected, skipped } = stats;
  
  const data = {
    labels: ['Passed', 'Failed', 'Skipped'],
    datasets: [
      {
        data: [expected, unexpected, skipped],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 16,
          color: '#6B7280',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = Math.round((value / stats.total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '75%',
  };
  
  return (
    <div className="h-48 md:h-56 lg:h-64 relative">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold">{stats.total}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Total Tests</span>
      </div>
    </div>
  );
};

export default SummaryChart;
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type ActivityType = 'commit' | 'issue' | 'pull_request' | 'question' | 'meeting';

interface RecentActivityItemProps {
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  repository?: string;
}

const typeIcons: Record<ActivityType, string> = {
  commit: '📝',
  issue: '❗',
  pull_request: '🔄',
  question: '❓',
  meeting: '📹'
};

const typeColors: Record<ActivityType, string> = {
  commit: 'bg-blue-500',
  issue: 'bg-red-500',
  pull_request: 'bg-green-500',
  question: 'bg-purple-500',
  meeting: 'bg-yellow-500'
};

export default function RecentActivityItem({
  type,
  title,
  description,
  time,
  user,
  repository
}: RecentActivityItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start space-x-4 p-4 hover:bg-gray-800/50 rounded-lg transition-colors"
    >
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", typeColors[type])}>
        <span className="text-lg">{typeIcons[type]}</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-white truncate">{title}</h4>
          <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{time}</span>
        </div>
        
        <p className="mt-1 text-xs text-gray-300 line-clamp-2">{description}</p>
        
        <div className="mt-2 flex items-center">
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="w-5 h-5 rounded-full mr-1.5" 
          />
          <span className="text-xs text-gray-400">{user.name}</span>
          {repository && (
            <>
              <span className="mx-1.5 text-gray-500">•</span>
              <span className="text-xs text-gray-400">{repository}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
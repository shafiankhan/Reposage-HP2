import { motion } from 'framer-motion';
import { Star, GitFork, AlertCircle as CircleAlert, GitPullRequest } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  pullRequests: number;
  lastUpdated: string;
  languageColor: string;
}

export default function ProjectCard({
  id,
  name,
  description,
  language,
  stars,
  forks,
  issues,
  pullRequests,
  lastUpdated,
  languageColor
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="card h-full flex flex-col"
    >
      <Link to={`/projects/${id}`} className="flex-1">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white truncate">{name}</h3>
          <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">
            {lastUpdated}
          </span>
        </div>
        
        <p className="mt-2 text-gray-300 text-sm line-clamp-2">{description}</p>
        
        <div className="mt-4 flex items-center space-x-2">
          <span className="flex items-center text-sm">
            <span 
              className="w-3 h-3 rounded-full mr-1.5" 
              style={{ backgroundColor: languageColor }}
            />
            {language}
          </span>
        </div>
        
        <div className="mt-4 grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center p-2 rounded-md bg-gray-800/50">
            <Star className="h-4 w-4 text-yellow-500 mb-1" />
            <span className="text-xs font-medium">{stars}</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md bg-gray-800/50">
            <GitFork className="h-4 w-4 text-blue-500 mb-1" />
            <span className="text-xs font-medium">{forks}</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md bg-gray-800/50">
            <CircleAlert className="h-4 w-4 text-purple-500 mb-1" />
            <span className="text-xs font-medium">{issues}</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md bg-gray-800/50">
            <GitPullRequest className="h-4 w-4 text-green-500 mb-1" />
            <span className="text-xs font-medium">{pullRequests}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
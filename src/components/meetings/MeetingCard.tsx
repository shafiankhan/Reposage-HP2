import { motion } from 'framer-motion';
import { Clock, Calendar, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MeetingCardProps {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: string[];
  summary: string;
  tags: string[];
}

export default function MeetingCard({
  id,
  title,
  date,
  duration,
  participants,
  summary,
  tags
}: MeetingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card h-full flex flex-col"
    >
      <Link to={`/meetings/${id}`} className="flex-1">
        <h3 className="text-lg font-semibold text-white line-clamp-1">{title}</h3>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex items-center text-gray-300 text-sm">
            <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{duration}</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center text-gray-300 text-sm">
          <Users className="h-4 w-4 mr-1.5 text-gray-400" />
          <span>{participants.length} participants</span>
        </div>
        
        <div className="mt-4 flex items-start">
          <FileText className="h-4 w-4 mr-1.5 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-300 line-clamp-3">{summary}</p>
        </div>
        
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
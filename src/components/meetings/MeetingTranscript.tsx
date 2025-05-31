import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface TranscriptSegment {
  id: string;
  speaker: string;
  text: string;
  timestamp: string;
}

interface MeetingTranscriptProps {
  segments: TranscriptSegment[];
}

export default function MeetingTranscript({ segments }: MeetingTranscriptProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSegments, setExpandedSegments] = useState<string[]>([]);
  
  const filteredSegments = searchQuery
    ? segments.filter(segment => 
        segment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        segment.speaker.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : segments;
    
  const toggleSegment = (id: string) => {
    setExpandedSegments(prev =>
      prev.includes(id) ? prev.filter(segId => segId !== id) : [...prev, id]
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center rounded-md bg-gray-800 px-3 py-2">
        <Search className="mr-2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search transcript..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
      
      <div className="space-y-2">
        {filteredSegments.map((segment) => (
          <motion.div
            key={segment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-gray-800 rounded-lg overflow-hidden"
          >
            <div 
              className="flex items-center justify-between bg-gray-800 p-3 cursor-pointer"
              onClick={() => toggleSegment(segment.id)}
            >
              <div className="flex items-center">
                <span className="text-sm font-medium text-primary-400 mr-2">
                  {segment.speaker}
                </span>
                <span className="text-xs text-gray-400">
                  {segment.timestamp}
                </span>
              </div>
              <button className="text-gray-400 p-1 rounded-full hover:bg-gray-700">
                {expandedSegments.includes(segment.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
            
            <AnimatePresence>
              {expandedSegments.includes(segment.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 bg-gray-900"
                >
                  <p className="text-sm text-gray-300">{segment.text}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
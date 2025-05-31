import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Search } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import FileUploadZone from '../components/meetings/FileUploadZone';
import MeetingCard from '../components/meetings/MeetingCard';
import { mockMeetings } from '../mock/meetings';
import { cn } from '../utils/cn';

type ViewMode = 'grid' | 'list';

export default function MeetingHub() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  
  const filteredMeetings = searchQuery
    ? mockMeetings.filter(meeting => 
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : mockMeetings;
    
  const handleUpload = (files: File[]) => {
    console.log('Files to process:', files);
    // In a real app, this would send files to backend for processing
    setShowUpload(false);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Meeting Hub
          </motion.h1>
          <motion.button
            className="btn-primary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUpload(!showUpload)}
          >
            {showUpload ? 'Cancel Upload' : 'Upload Meeting'}
          </motion.button>
        </div>
        
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card"
          >
            <FileUploadZone onUpload={handleUpload} />
          </motion.div>
        )}
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search meetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-md",
                viewMode === 'grid' 
                  ? "bg-gray-700 text-white" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-md",
                viewMode === 'list' 
                  ? "bg-gray-700 text-white" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {filteredMeetings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">No meetings found matching your search.</p>
          </div>
        ) : (
          <div className={cn(
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
          )}>
            {filteredMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} {...meeting} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
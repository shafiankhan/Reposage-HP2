import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, CheckCircle, X } from 'lucide-react';

interface FileUploadZoneProps {
  onUpload: (files: File[]) => void;
}

export default function FileUploadZone({ onUpload }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const audioVideoFiles = droppedFiles.filter(file => 
      file.type.startsWith('audio/') || 
      file.type.startsWith('video/') || 
      file.name.endsWith('.mp3') || 
      file.name.endsWith('.mp4')
    );
    
    if (audioVideoFiles.length > 0) {
      setFiles(prev => [...prev, ...audioVideoFiles]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = () => {
    if (files.length > 0) {
      onUpload(files);
      setFiles([]);
    }
  };
  
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: 1,
          borderColor: isDragging ? 'rgb(59, 130, 246)' : 'rgb(55, 65, 81)'
        }}
        className="border-2 border-dashed rounded-lg p-8 text-center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Drag and drop audio/video files
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            Or click to browse from your computer
          </p>
          <label className="btn-primary cursor-pointer">
            <span>Browse files</span>
            <input
              type="file"
              className="hidden"
              accept="audio/*,video/*"
              multiple
              onChange={handleFileChange}
            />
          </label>
          <p className="mt-3 text-xs text-gray-400">
            Supported formats: MP3, MP4, WAV, M4A
          </p>
        </div>
      </motion.div>
      
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white">Selected Files</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between bg-gray-800 rounded-lg p-3"
              >
                <div className="flex items-center">
                  <File className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-white truncate max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-gray-400 hover:text-red-400 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="btn-success flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Process {files.length} {files.length === 1 ? 'file' : 'files'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Copy } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ChatMessageProps {
  isUser: boolean;
  content: ReactNode;
  timestamp: string;
  sources?: string[];
  codeSnippets?: string[];
}

export default function ChatMessage({
  isUser,
  content,
  timestamp,
  sources,
  codeSnippets
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    if (typeof content === 'string') {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "mb-4 flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "rounded-lg p-4 max-w-3xl",
        isUser 
          ? "bg-primary-700 text-white" 
          : "bg-gray-800 text-gray-100"
      )}>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-gray-300">
            {isUser ? 'You' : 'RepoSage AI'}
          </span>
          <div className="flex items-center">
            {!isUser && (
              <button 
                onClick={handleCopy}
                className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            )}
            <span className="text-xs text-gray-400 ml-2">{timestamp}</span>
          </div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          {content}
        </div>
        
        {codeSnippets && codeSnippets.length > 0 && (
          <div className="mt-3">
            {codeSnippets.map((snippet, index) => (
              <div key={index} className="mt-2 bg-gray-900 rounded-md p-3 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{snippet}</code>
                </pre>
              </div>
            ))}
          </div>
        )}
        
        {sources && sources.length > 0 && (
          <div className="mt-3 pt-2 border-t border-gray-700">
            <h4 className="text-xs font-medium text-gray-400 mb-1">Sources:</h4>
            <div className="flex flex-wrap gap-2">
              {sources.map((source, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-700 text-primary-300 px-2 py-1 rounded-md"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
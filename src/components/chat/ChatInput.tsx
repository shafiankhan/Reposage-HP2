import { useState, FormEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  isLoading = false,
  placeholder = "Ask something about your code..."
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex items-center"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="block w-full rounded-lg border border-gray-700 bg-gray-800 py-3 px-4 pr-12 text-white placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 disabled:opacity-75"
      />
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="absolute right-2 rounded-md p-2 text-gray-400 hover:text-primary-500 disabled:opacity-50 disabled:hover:text-gray-400"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </button>
    </form>
  );
}
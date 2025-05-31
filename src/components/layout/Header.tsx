import { BellRing, Search, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-gray-800 bg-background-dark/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center rounded-md bg-gray-800 px-3 py-1.5 w-64">
          <Search className="mr-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search repositories, meetings..."
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center px-3 py-1 rounded-full bg-primary-900/50 border border-primary-700/50"
            >
              <span className="text-xs font-medium text-primary-300">Credits:</span>
              <span className="ml-2 text-sm font-semibold text-white">{user.credits.toLocaleString()}</span>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-full p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <BellRing className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary-600 ring-2 ring-background-dark"></span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </motion.button>

          {user && (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium text-white">{user.name}</div>
                <div className="text-xs text-gray-400">{user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan</div>
              </div>
              <img 
                className="h-8 w-8 rounded-full ring-2 ring-primary-600"
                src={user.avatarUrl}
                alt={user.name}
              />
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
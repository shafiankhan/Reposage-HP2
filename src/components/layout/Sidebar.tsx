import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Code, 
  Home, 
  Video, 
  BarChart3, 
  Settings as SettingsIcon, 
  MessageSquare,
  Menu,
  X,
  Github,
  BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Projects', path: '/projects', icon: Github },
    { name: 'Recent Q&A', path: '/qa', icon: MessageSquare },
    { name: 'Meetings', path: '/meetings', icon: Video },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-3 left-3 z-50 md:hidden rounded-md bg-background-dark p-2 text-white"
      >
        {isCollapsed ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      <AnimatePresence>
        {(isCollapsed || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed md:sticky top-0 left-0 z-40 h-full w-64 flex-shrink-0 overflow-y-auto bg-gray-900 md:flex",
              isCollapsed && "block"
            )}
          >
            <div className="flex min-h-full w-full flex-col">
              <div className="flex h-16 items-center px-4">
                <div className="flex items-center">
                  <BrainCircuit className="h-8 w-8 text-primary-500" />
                  <span className="ml-2 text-xl font-bold text-white">RepoSage</span>
                </div>
              </div>
              
              <nav className="mt-4 flex-1 space-y-1 px-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive 
                        ? "bg-gray-800 text-white" 
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    )}
                    onClick={() => window.innerWidth < 768 && setIsCollapsed(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
              
              <div className="card-glass mx-3 my-4 p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-primary-400">Need Help?</h3>
                  <Code className="h-4 w-4 text-primary-400" />
                </div>
                <p className="text-xs text-gray-300">Ask questions about your codebase or meetings</p>
                <button className="btn-primary w-full mt-2 text-xs py-1 px-2">Ask AI</button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
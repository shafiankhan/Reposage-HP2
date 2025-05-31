import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import { 
  CreditCard, 
  UserCircle, 
  Shield, 
  Bell, 
  Github, 
  ExternalLink,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type SettingsTab = 'profile' | 'billing' | 'security' | 'notifications' | 'integrations';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { user } = useAuth();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Settings
        </motion.h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.div 
            className="w-full md:w-64 space-y-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'profile'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <UserCircle className="mr-3 h-5 w-5" />
              Profile
            </button>
            
            <button
              onClick={() => setActiveTab('billing')}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'billing'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <CreditCard className="mr-3 h-5 w-5" />
              Billing & Credits
            </button>
            
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'security'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Shield className="mr-3 h-5 w-5" />
              Security
            </button>
            
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'notifications'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </button>
            
            <button
              onClick={() => setActiveTab('integrations')}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'integrations'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Github className="mr-3 h-5 w-5" />
              Integrations
            </button>
          </motion.div>
          
          {/* Main content */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {activeTab === 'profile' && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-6">Profile Settings</h2>
                
                <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                  <div className="relative">
                    <img 
                      src={user?.avatarUrl} 
                      alt={user?.name} 
                      className="h-24 w-24 rounded-full object-cover" 
                    />
                    <button className="absolute bottom-0 right-0 bg-primary-600 rounded-full p-1.5 border-2 border-background-card">
                      <PlusCircle className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        defaultValue={user?.name}
                        className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue={user?.email}
                        className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="Senior Software Engineer with expertise in React, TypeScript, and Node.js."
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="btn-primary">Save Changes</button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
                  
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Pro Plan</h3>
                      <span className="badge-primary">Active</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Your plan renews on July 12, 2025
                    </p>
                    <div className="flex justify-between">
                      <button className="btn-outline text-sm">Change Plan</button>
                      <button className="text-sm text-red-400 hover:text-red-300">Cancel Subscription</button>
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-3">Plan Features</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs text-primary-300">✓</span>
                      </div>
                      <span className="text-gray-300">10 project connections</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs text-primary-300">✓</span>
                      </div>
                      <span className="text-gray-300">5,000 AI credits per month</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs text-primary-300">✓</span>
                      </div>
                      <span className="text-gray-300">10 hours of meeting processing</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs text-primary-300">✓</span>
                      </div>
                      <span className="text-gray-300">Email support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Credit Usage</h2>
                  
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Current Balance</h3>
                      <span className="text-lg font-semibold text-primary-400">
                        {user?.credits.toLocaleString()} credits
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400">
                      1,250 / 5,000 credits used this month (25%)
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <button className="btn-outline">View Usage History</button>
                    <button className="btn-primary">Purchase Additional Credits</button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'integrations' && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-6">Integrations</h2>
                
                <div className="space-y-4">
                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Github className="h-8 w-8 text-white mr-3" />
                        <div>
                          <h3 className="font-medium">GitHub</h3>
                          <p className="text-sm text-gray-400">Connect your repositories</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="badge-success mr-3">Connected</span>
                        <button className="btn-outline text-sm">Manage</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-8 w-8 text-white mr-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10s10-4.5 10-10c0-5.5-4.5-10-10-10zm-1 14.5v-5H9.5L13 7v5h1.5L11 16.5z"/>
                        </svg>
                        <div>
                          <h3 className="font-medium">Slack</h3>
                          <p className="text-sm text-gray-400">Receive notifications and summaries</p>
                        </div>
                      </div>
                      <button className="btn-primary text-sm">Connect</button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-8 w-8 text-white mr-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16.53 11.06L15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59 17l5.94-5.94zM19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                        </svg>
                        <div>
                          <h3 className="font-medium">Google Calendar</h3>
                          <p className="text-sm text-gray-400">Schedule and process meetings</p>
                        </div>
                      </div>
                      <button className="btn-primary text-sm">Connect</button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-8 w-8 text-white mr-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        <div>
                          <h3 className="font-medium">Zoom</h3>
                          <p className="text-sm text-gray-400">Automatically process meeting recordings</p>
                        </div>
                      </div>
                      <button className="btn-primary text-sm">Connect</button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="btn-outline flex items-center">
                    <ExternalLink className="mr-1.5 h-4 w-4" />
                    View All Integrations
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
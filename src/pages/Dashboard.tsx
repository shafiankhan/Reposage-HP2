import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import ProjectCard from '../components/dashboard/ProjectCard';
import RecentActivityItem from '../components/dashboard/RecentActivityItem';
import CreditUsageChart from '../components/dashboard/CreditUsageChart';
import { Plus, GitBranch, Code, MessageCircle } from 'lucide-react';
import { mockProjects } from '../mock/projects';
import { mockActivities } from '../mock/activities';
import { creditUsageData } from '../mock/chartData';

export default function Dashboard() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
            Dashboard
          </motion.h1>
          <motion.button
            className="btn-primary flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddProjectModalOpen(true)}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Add Project
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="card flex items-center space-x-4"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <div className="h-12 w-12 rounded-full bg-primary-900/50 flex items-center justify-center">
              <GitBranch className="h-6 w-6 text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Projects</p>
              <h3 className="text-2xl font-bold">{mockProjects.length}</h3>
            </div>
          </motion.div>
          
          <motion.div 
            className="card flex items-center space-x-4"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="h-12 w-12 rounded-full bg-success-900/50 flex items-center justify-center">
              <Code className="h-6 w-6 text-success-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Code Questions</p>
              <h3 className="text-2xl font-bold">124</h3>
            </div>
          </motion.div>
          
          <motion.div 
            className="card flex items-center space-x-4"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="h-12 w-12 rounded-full bg-warning-900/50 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-warning-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Meeting Summaries</p>
              <h3 className="text-2xl font-bold">28</h3>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your Projects</h2>
                <button className="text-sm text-primary-400 hover:text-primary-300">
                  View all
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockProjects.slice(0, 4).map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Credit Usage</h2>
                <div className="text-sm text-gray-400">
                  <span className="text-primary-400 font-medium">1,250</span> credits remaining
                </div>
              </div>
              
              <CreditUsageChart data={creditUsageData} />
            </motion.div>
          </div>
          
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <button className="text-sm text-primary-400 hover:text-primary-300">
                View all
              </button>
            </div>
            
            <div className="divide-y divide-gray-800">
              {mockActivities.slice(0, 5).map((activity) => (
                <RecentActivityItem key={activity.id} {...activity} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
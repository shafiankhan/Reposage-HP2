import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, 
  Users, 
  Clock, 
  MessageSquare, 
  Video, 
  GitCommit, 
  FileCode,
  Folder,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import { mockProjects } from '../mock/projects';

type TabType = 'chat' | 'meetings' | 'commits' | 'team';

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['src']);
  
  const project = mockProjects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">Project not found</p>
        </div>
      </MainLayout>
    );
  }
  
  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      isUser: true,
      content: message,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now() + 1}`,
        isUser: false,
        content: (
          <div>
            <p>
              Based on your repository, the authentication logic is implemented in <code>src/utils/auth.ts</code>. 
              It uses JWT for token handling and includes functions for login, signup, and session management.
            </p>
            <p className="mt-2">
              The main authentication flow is handled by the <code>authenticate()</code> function which validates credentials
              and returns a JWT token if successful.
            </p>
          </div>
        ),
        timestamp: new Date().toLocaleTimeString(),
        sources: ['src/utils/auth.ts:15-32', 'src/components/Login.tsx:67-89'],
        codeSnippets: [
          '// src/utils/auth.ts\nexport async function authenticate(email: string, password: string) {\n  const response = await api.post(\'/auth/login\', { email, password });\n  const { token } = response.data;\n  \n  if (token) {\n    localStorage.setItem(\'auth_token\', token);\n    return true;\n  }\n  return false;\n}'
        ]
      }]);
      setIsLoading(false);
    }, 2000);
  };
  
  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => 
      prev.includes(folder)
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    );
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Project header */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">{project.name}</h1>
              <p className="text-gray-300 mb-3">{project.description}</p>
              
              <div className="flex items-center space-x-4">
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-gray-300 hover:text-primary-400"
                >
                  <Github className="h-4 w-4 mr-1.5" />
                  View on GitHub
                </a>
                
                <div className="flex items-center text-sm text-gray-300">
                  <Clock className="h-4 w-4 mr-1.5" />
                  Last updated {project.lastUpdated}
                </div>
                
                <div className="flex items-center text-sm text-gray-300">
                  <Users className="h-4 w-4 mr-1.5" />
                  {project.teamMembers.length} members
                </div>
              </div>
            </div>
            
            <div className="flex -space-x-2 overflow-hidden">
              {project.teamMembers.map((member) => (
                <img
                  key={member.id}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background-dark"
                  src={member.avatarUrl}
                  alt={member.name}
                  title={member.name}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Tabs navigation */}
        <div className="border-b border-gray-800 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-3 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'chat'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Chat
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('meetings')}
              className={`py-3 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'meetings'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-2" />
                Meetings
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('commits')}
              className={`py-3 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'commits'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center">
                <GitCommit className="h-4 w-4 mr-2" />
                Commits
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('team')}
              className={`py-3 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'team'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Team
              </div>
            </button>
          </nav>
        </div>
        
        {/* Content with file browser sidebar */}
        <div className="flex-1 flex">
          <div className="w-64 flex-shrink-0 hidden md:block pr-4 border-r border-gray-800">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Repository Files</h3>
            
            <div className="space-y-1">
              <div 
                className="flex items-center py-1 px-2 rounded hover:bg-gray-800 cursor-pointer"
                onClick={() => toggleFolder('src')}
              >
                {expandedFolders.includes('src') ? (
                  <ChevronDown className="h-4 w-4 mr-1.5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-1.5 text-gray-400" />
                )}
                <Folder className="h-4 w-4 mr-1.5 text-yellow-400" />
                <span className="text-sm">src</span>
              </div>
              
              {expandedFolders.includes('src') && (
                <div className="ml-6 space-y-1">
                  <div 
                    className="flex items-center py-1 px-2 rounded hover:bg-gray-800 cursor-pointer"
                    onClick={() => toggleFolder('src/components')}
                  >
                    {expandedFolders.includes('src/components') ? (
                      <ChevronDown className="h-4 w-4 mr-1.5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 mr-1.5 text-gray-400" />
                    )}
                    <Folder className="h-4 w-4 mr-1.5 text-yellow-400" />
                    <span className="text-sm">components</span>
                  </div>
                  
                  {expandedFolders.includes('src/components') && (
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center py-1 px-2 rounded hover:bg-gray-800">
                        <FileCode className="h-4 w-4 mr-1.5 text-blue-400" />
                        <span className="text-sm">Login.tsx</span>
                      </div>
                      <div className="flex items-center py-1 px-2 rounded hover:bg-gray-800">
                        <FileCode className="h-4 w-4 mr-1.5 text-blue-400" />
                        <span className="text-sm">Signup.tsx</span>
                      </div>
                    </div>
                  )}
                  
                  <div 
                    className="flex items-center py-1 px-2 rounded hover:bg-gray-800 cursor-pointer"
                    onClick={() => toggleFolder('src/utils')}
                  >
                    {expandedFolders.includes('src/utils') ? (
                      <ChevronDown className="h-4 w-4 mr-1.5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 mr-1.5 text-gray-400" />
                    )}
                    <Folder className="h-4 w-4 mr-1.5 text-yellow-400" />
                    <span className="text-sm">utils</span>
                  </div>
                  
                  {expandedFolders.includes('src/utils') && (
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center py-1 px-2 rounded hover:bg-gray-800">
                        <FileCode className="h-4 w-4 mr-1.5 text-blue-400" />
                        <span className="text-sm">auth.ts</span>
                      </div>
                      <div className="flex items-center py-1 px-2 rounded hover:bg-gray-800">
                        <FileCode className="h-4 w-4 mr-1.5 text-blue-400" />
                        <span className="text-sm">api.ts</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center py-1 px-2 rounded hover:bg-gray-800">
                <FileCode className="h-4 w-4 mr-1.5 text-green-400" />
                <span className="text-sm">package.json</span>
              </div>
              
              <div className="flex items-center py-1 px-2 rounded hover:bg-gray-800">
                <FileCode className="h-4 w-4 mr-1.5 text-gray-400" />
                <span className="text-sm">README.md</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 pl-0 md:pl-6">
            {activeTab === 'chat' && (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-10">
                      <div className="flex justify-center mb-4">
                        <MessageSquare className="h-12 w-12 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        Ask questions about your codebase
                      </h3>
                      <p className="text-gray-400 max-w-md mx-auto">
                        Get insights about your code, implementation details, architecture,
                        or best practices for your project.
                      </p>
                    </div>
                  ) : (
                    messages.map(message => (
                      <ChatMessage key={message.id} {...message} />
                    ))
                  )}
                  
                  {isLoading && (
                    <div className="flex justify-center items-center py-4">
                      <div className="dot-typing"></div>
                    </div>
                  )}
                </div>
                
                <div className="mt-auto">
                  <ChatInput 
                    onSend={handleSendMessage} 
                    isLoading={isLoading}
                    placeholder="Ask something about your code..."
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'meetings' && (
              <div className="text-center py-10">
                <div className="flex justify-center mb-4">
                  <Video className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  No meetings for this project yet
                </h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  Upload meeting recordings to get AI-generated transcripts, summaries, and action items.
                </p>
                <button className="btn-primary">
                  Upload Meeting Recording
                </button>
              </div>
            )}
            
            {activeTab === 'commits' && (
              <div className="text-center py-10">
                <div className="flex justify-center mb-4">
                  <GitCommit className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Commit history
                </h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  Connect your GitHub repository to see commit history with AI-generated summaries.
                </p>
                <button className="btn-primary">
                  Sync with GitHub
                </button>
              </div>
            )}
            
            {activeTab === 'team' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Team Members</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.teamMembers.map((member) => (
                    <motion.div 
                      key={member.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center p-3 bg-gray-800 rounded-lg"
                    >
                      <img 
                        src={member.avatarUrl} 
                        alt={member.name} 
                        className="h-10 w-10 rounded-full mr-3" 
                      />
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
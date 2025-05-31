import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import MeetingTranscript from '../components/meetings/MeetingTranscript';
import ChatInput from '../components/chat/ChatInput';
import ChatMessage from '../components/chat/ChatMessage';
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  MessageSquare, 
  CheckSquare 
} from 'lucide-react';
import { mockMeetings } from '../mock/meetings';

type TabType = 'transcript' | 'summary' | 'qa' | 'action-items';

export default function MeetingDetail() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('transcript');
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const meeting = mockMeetings.find(m => m.id === meetingId);
  
  if (!meeting) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">Meeting not found</p>
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
              During the meeting, Sarah Chen suggested using OAuth 2.0 with support for multiple providers,
              specifically mentioning Google and GitHub as minimum requirements, with Apple Sign-in as a future possibility.
            </p>
            <p className="mt-2">
              Alex Kumar raised concerns about token refresh and secure storage, and Sarah emphasized following best practices
              for token storage, recommending HTTP-only cookies for refresh tokens and memory for access tokens.
            </p>
          </div>
        ),
        timestamp: new Date().toLocaleTimeString(),
        sources: ['Transcript 00:01:45', 'Transcript 00:04:10']
      }]);
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Meeting header */}
        <div className="card">
          <h1 className="text-2xl font-bold mb-3">{meeting.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center text-gray-300">
              <Calendar className="h-5 w-5 mr-2 text-gray-400" />
              <span>{meeting.date}</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Clock className="h-5 w-5 mr-2 text-gray-400" />
              <span>{meeting.duration}</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Users className="h-5 w-5 mr-2 text-gray-400" />
              <span>{meeting.participants.join(', ')}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {meeting.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-start">
            <FileText className="h-5 w-5 mr-2 text-gray-400 mt-1 flex-shrink-0" />
            <p className="text-gray-300">{meeting.summary}</p>
          </div>
        </div>
        
        {/* Tabs navigation */}
        <div className="border-b border-gray-800">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('transcript')}
              className={`py-3 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'transcript'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Transcript
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('summary')}
              className={`py-3 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'summary'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Summary
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('qa')}
              className={`py-3 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'qa'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Q&A
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('action-items')}
              className={`py-3 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'action-items'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2" />
                Action Items
              </div>
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div>
          {activeTab === 'transcript' && meeting.transcript && (
            <MeetingTranscript segments={meeting.transcript.segments} />
          )}
          
          {activeTab === 'summary' && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Meeting Summary</h2>
              <p className="text-gray-300">{meeting.summary}</p>
              
              <h3 className="text-md font-semibold mt-6 mb-3">Key Points</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs text-primary-300">1</span>
                  </div>
                  <span className="text-gray-300">
                    Team decided to implement OAuth 2.0 with support for Google and GitHub authentication providers.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs text-primary-300">2</span>
                  </div>
                  <span className="text-gray-300">
                    Secure token storage was discussed, with HTTP-only cookies for refresh tokens and memory for access tokens.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs text-primary-300">3</span>
                  </div>
                  <span className="text-gray-300">
                    Concerns about CSRF attacks were raised, with a plan to implement proper state parameter handling.
                  </span>
                </li>
              </ul>
            </div>
          )}
          
          {activeTab === 'qa' && (
            <div className="flex flex-col h-[calc(100vh-25rem)]">
              <div className="flex-1 overflow-y-auto mb-4">
                {messages.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="flex justify-center mb-4">
                      <MessageSquare className="h-12 w-12 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Ask questions about this meeting
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Get insights about discussion points, decisions made, or clarify details from the meeting.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map(message => (
                      <ChatMessage key={message.id} {...message} />
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-center items-center py-4">
                        <div className="dot-typing"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-auto">
                <ChatInput 
                  onSend={handleSendMessage} 
                  isLoading={isLoading}
                  placeholder="Ask about this meeting..."
                />
              </div>
            </div>
          )}
          
          {activeTab === 'action-items' && meeting.actionItems && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Action Items</h2>
              <ul className="space-y-3">
                {meeting.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start p-3 bg-gray-800 rounded-lg">
                    <CheckSquare className="h-5 w-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
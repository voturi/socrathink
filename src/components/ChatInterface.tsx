'use client';

import { useState } from 'react';
import { PanelLeft, MessageCircle, Send } from 'lucide-react';
import SimplifiedTopicSelector, { sections } from './SimplifiedTopicSelector';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatInterface() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setSelectedSection(null); // Reset section selection when topic changes
  };

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId);
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      // Add a welcome message when section is selected
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        content: `Let's dive into the ${section.name}. ${section.content}`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response (in real app, this would be an API call)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "That's an interesting point! Let me ask you this to help you think deeper about it...",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };


  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-border bg-sidebar`}>
        <div className="p-4 h-full overflow-y-auto">
          <div className="">
            {/* Topic Selector */}
            <SimplifiedTopicSelector
              selectedTopic={selectedTopic}
              selectedSection={selectedSection}
              onTopicSelect={handleTopicSelect}
              onSectionSelect={handleSectionSelect}
            />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <PanelLeft className="h-5 w-5 text-muted-foreground" />
              </button>
              
              {selectedSection ? (
                <div>
                  <h1 className="text-lg font-semibold text-card-foreground">
                    {sections.find(s => s.id === selectedSection)?.name}
                  </h1>
                  <p className="text-sm text-muted-foreground">Detailed Section View</p>
                </div>
              ) : (
                <div>
                  <h1 className="text-lg font-semibold text-card-foreground">Socrathink</h1>
                  <p className="text-sm text-muted-foreground">Choose a section to start learning</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <MessageCircle className="h-12 w-12 mb-4" />
              <p className="text-center">
                {selectedSection 
                  ? "Your learning session is ready to begin!"
                  : "Select a section from the sidebar to start your learning journey"
                }
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'bg-card border border-border text-card-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-sidebar-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        {selectedSection && (
          <div className="p-4 border-t border-border bg-card">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your response or question..."
                className="flex-1 input-field"
              />
              <button
                onClick={handleSendMessage}
                className="btn-primary px-3"
                disabled={inputMessage.trim() === ''}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


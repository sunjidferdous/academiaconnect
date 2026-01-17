'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  time: string;
  isOutgoing: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  status?: string;
}

export default function MessagingPage() {
  const [activeConversation, setActiveConversation] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hey, are you joining the study group today?', time: '10:30 AM', isOutgoing: false },
    { id: 2, text: 'Yes, I\'ll be there. What time is it starting?', time: '10:32 AM', isOutgoing: true },
    { id: 3, text: 'We\'re meeting at 3 PM in the library.', time: '10:33 AM', isOutgoing: false },
    { id: 4, text: 'Perfect. I\'ll bring the notes from last week\'s lecture.', time: '10:34 AM', isOutgoing: true },
    { id: 5, text: 'Great! Also, do you have the problem set for chapter 5? I missed that class.', time: '10:35 AM', isOutgoing: false },
    { id: 6, text: 'Yes, I have it. I\'ll make a copy for you.', time: '10:36 AM', isOutgoing: true },
    { id: 7, text: 'Thanks! You\'re a lifesaver! 😊', time: '10:37 AM', isOutgoing: false },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = [
    { id: 0, name: 'Sarah Anderson', avatar: 'SA', lastMsg: 'Hey, are you joining the study group today?', time: '10:30 AM', status: 'Online' },
    { id: 1, name: 'Mike Johnson', avatar: 'MJ', lastMsg: 'Can you share the notes from yesterday\'s lecture?', time: 'Yesterday' },
    { id: 2, name: 'Computer Science Club', avatar: 'CS', lastMsg: 'Meeting postponed to Friday', time: 'Wed' },
    { id: 3, name: 'Prof. Evans', avatar: 'EP', lastMsg: 'Please see me about your project proposal', time: 'Mon' },
    { id: 4, name: 'Lisa Davis', avatar: 'LD', lastMsg: 'Thanks for your help with the assignment!', time: 'Sep 20' },
    { id: 5, name: 'Robotics Team', avatar: 'RM', lastMsg: 'New components have arrived for the project', time: 'Sep 18' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      time: time,
      isOutgoing: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate a reply
    setTimeout(() => {
      const reply: Message = {
        id: messages.length + 2,
        text: 'Thanks for your message! I\'ll get back to you soon.',
        time: time,
        isOutgoing: false,
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const currentConversation = conversations[activeConversation];

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="page-title">Messages</h2>
        <div className="messaging-container">
          <div className="conversations-sidebar">
            <div className="conversations-header">
              <h3>Conversations</h3>
              <button className="new-chat-btn">
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <div className="search-conversations">
              <input type="text" placeholder="Search or start new chat" />
            </div>
            <div className="conversations-list">
              {conversations.map((conv, index) => (
                <div
                  key={conv.id}
                  className={`conversation-item ${activeConversation === index ? 'active' : ''}`}
                  onClick={() => setActiveConversation(index)}
                >
                  <div className="conversation-avatar">{conv.avatar}</div>
                  <div className="conversation-info">
                    <div className="conversation-name">
                      <span>{conv.name}</span>
                      <span className="conversation-time">{conv.time}</span>
                    </div>
                    <div className="conversation-lastmsg">{conv.lastMsg}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="chat-main">
            <div className="chat-header">
              <div className="chat-user-avatar">{currentConversation.avatar}</div>
              <div className="chat-user-info">
                <div className="chat-user-name">{currentConversation.name}</div>
                <div className="chat-user-status">{currentConversation.status || 'Last seen recently'}</div>
              </div>
              <div className="chat-actions">
                <button className="chat-action-btn">
                  <i className="fas fa-phone"></i>
                </button>
                <button className="chat-action-btn">
                  <i className="fas fa-video"></i>
                </button>
                <button className="chat-action-btn">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.isOutgoing ? 'outgoing' : 'incoming'}`}>
                  {!msg.isOutgoing && (
                    <div className="message-avatar">{currentConversation.avatar}</div>
                  )}
                  <div className="message-content">
                    <p>{msg.text}</p>
                    <div className="message-time">{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <button className="chat-action-btn">
                <i className="fas fa-paperclip"></i>
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="chat-send-btn" onClick={handleSendMessage}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

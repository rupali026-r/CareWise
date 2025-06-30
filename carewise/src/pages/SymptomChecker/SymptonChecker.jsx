// src/components/SymptomChecker/SymptomChecker.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useSymptomAnalysis } from '../../components/hooks/useSymptomAnalysis';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ResultCard from '../../components/common/ResultCard';
import './SymptomChecker.css';

const SymptomChecker = () => {
  const [userInput, setUserInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI health assistant. 👋 How can I help you today? Please describe any symptoms you're experiencing.",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { analyzeSymptoms, result, isLoading, error } = useSymptomAnalysis();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (result) {
      setMessages(prev => {
        const botMessage = {
          id: prev.length + 1,
          type: 'bot',
          content: `Based on your symptoms, here's my analysis:`,
          timestamp: new Date(),
          result: result
        };
        return [...prev, botMessage];
      });
      setIsTyping(false);
    }
  }, [result]);

  useEffect(() => {
    if (error) {
      setMessages(prev => {
        const botMessage = {
          id: prev.length + 1,
          type: 'bot',
          content: `I'm sorry, I encountered an error while analyzing your symptoms. Please try again.`,
          timestamp: new Date(),
          isError: true
        };
        return [...prev, botMessage];
      });
      setIsTyping(false);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Add typing indicator
    setIsTyping(true);
    setUserInput('');

    // Analyze symptoms
    await analyzeSymptoms(userInput, language);
  };

  const handleQuickQuestion = (question) => {
    setUserInput(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hello! I'm your AI health assistant. 👋 How can I help you today? Please describe any symptoms you're experiencing.",
        timestamp: new Date()
      }
    ]);
  };

  const quickQuestions = [
    "I have a fever",
    "I have a headache",
    "I have a cough",
    "I have stomach pain",
    "I feel tired"
  ];

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>🤖 AI Health Assistant</h2>
        <p>Your personal AI-powered symptom checker</p>
        <Button onClick={clearChat} className="clear-chat-btn">
          Clear Chat
        </Button>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.type}-message ${message.isError ? 'error-message' : ''}`}
          >
            <div className="message-content">
              {message.type === 'bot' && (
                <div className="bot-avatar">🤖</div>
              )}
              <div className="message-bubble">
                <p>{message.content}</p>
                {message.result && (
                  <div className="result-summary">
                    <ResultCard result={message.result} />
                  </div>
                )}
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="bot-avatar">🤖</div>
              <div className="message-bubble typing">
                <LoadingSpinner size="small" />
                <span>Analyzing your symptoms...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-questions">
        <p>Quick questions:</p>
        <div className="quick-buttons">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              className="quick-question-btn"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-group">
          <div className="language-selector">
            <label htmlFor="language">🌐</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Describe your symptoms..."
            className="chat-input"
            disabled={isLoading}
          />
          
          <Button 
            type="submit" 
            disabled={isLoading || !userInput.trim()}
            className="send-btn"
          >
            {isLoading ? '⏳' : '💬'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SymptomChecker;
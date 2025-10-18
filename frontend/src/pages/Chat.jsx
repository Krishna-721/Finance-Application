import { useState, useEffect, useRef } from 'react';
import { chatAPI } from '../services/api';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const response = await chatAPI.getHistory();
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(userMessage);
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '10px', maxWidth: '800px', margin: '0 auto', scrollBehavior:'unset' }}>
      <h1>Financial Assistant</h1>

      <div style={{ 
        height: '500px', 
        overflowY: 'auto', 
        backgroundColor: '#282424ff', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#453f3fff', marginTop: '50px' }}>
            <p>Ask me about your finances!</p>
            <p style={{ fontSize: '14px' }}>Try: "What's my balance?" or "How much did I spend on food?"</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div style={{ 
              backgroundColor: '#083565ff', 
              color: 'white', 
              padding: '10px 15px', 
              borderRadius: '8px',
              maxWidth: '70%',
              marginLeft: 'auto',
              marginBottom: '10px'
            }}>
              {msg.user_message}
            </div>
            <div style={{ 
              backgroundColor: 'black', 
              padding: '10px 15px', 
              borderRadius: '8px',
              maxWidth: '70%',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.bot_response}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: 'center', color: '#ffffffff' }}>
            Bot is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your finances..."
          disabled={loading}
          style={{ 
            flex: 1, 
            padding: '12px', 
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #0e0d0dff'
          }}
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()}
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.6 : 1
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
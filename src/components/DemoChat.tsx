import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function DemoChat() {
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isBot: boolean; isTyping?: boolean }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const startDemo = () => {
    setChatMessages([{ text: 'Привет! Хочу узнать цену', isBot: false }]);
    
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setChatMessages(prev => [
          ...prev,
          { text: 'Базовый бот окупается за 3 дня и приносит от 50 000 ₽/мес. Хотите персональный расчет для вашего бизнеса?', isBot: true }
        ]);
      }, 1500);
    }, 500);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-brand-dark to-gray-900 text-white hover-scale border-0 shadow-2xl rounded-3xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">💬 Интерактивное Демо</h3>
        <Button 
          onClick={startDemo} 
          size="sm" 
          className="bg-brand-accent text-brand-dark hover:bg-brand-accent/90 font-bold rounded-xl"
        >
          Запустить
        </Button>
      </div>

      <div className="bg-white text-black rounded-2xl p-6 h-[450px] overflow-y-auto shadow-inner">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-blue-500 rounded-full flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <div className="font-bold text-lg">BotWise Assistant</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              онлайн
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
              <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                msg.isBot 
                  ? 'bg-gray-100 text-gray-900 rounded-tl-none' 
                  : 'bg-gradient-to-r from-brand-accent to-blue-500 text-white rounded-tr-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}

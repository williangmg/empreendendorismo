import React, { useState } from 'react';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';

function ChatbotScreen({ onSubmit, onBack }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Olá! Sou sua assistente de moda pessoal. Vou te ajudar a encontrar roupas perfeitas para você! Para começar, me conte: qual é o seu estilo preferido?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({});

  const botResponses = {
    1: "Perfeito! E para que ocasião você está procurando roupas? (trabalho, festa, casual, esporte, etc.)",
    2: "Ótima escolha! Quais são suas cores favoritas?",
    3: "Excelente! Qual é sua faixa de preço preferida?",
    4: "Qual o seu gênero? (feminino, masculino)",
    5: "Perfeito! Agora tenho todas as informações que preciso. Vou gerar suas recomendações personalizadas!"
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);

    // Salvar preferência baseada no passo atual
    const newPreferences = { ...preferences };
    switch (step) {
      case 1:
        newPreferences.style = inputMessage;
        break;
      case 2:
        newPreferences.occasion = inputMessage;
        break;
      case 3:
        newPreferences.colors = inputMessage.split(',').map(c => c.trim());
        break;
      case 4:
        newPreferences.budget = inputMessage;
        break;
      case 5:
        newPreferences.gender = inputMessage;
        break;
    }
    setPreferences(newPreferences);

    setTimeout(() => {
      if (step < 5) {
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          text: botResponses[step + 1]
        };
        setMessages(prev => [...prev, botMessage]);
        setStep(step + 1);
      } else {
        const finalMessage = {
          id: messages.length + 2,
          type: 'bot',
          text: botResponses[5]
        };
        setMessages(prev => [...prev, finalMessage]);
        
        setTimeout(() => {
          onSubmit(newPreferences);
        }, 2000);
      }
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Assistente StyleAI</h1>
              <p className="text-sm text-green-600">● Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border shadow-sm text-gray-800'
                }`}>
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua resposta..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatbotScreen;
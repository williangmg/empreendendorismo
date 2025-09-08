import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import ChoiceScreen from './components/ChoiceScreen';
import FormScreen from './components/FormScreen';
import ChatbotScreen from './components/ChatbotScreen';
import ResultsScreen from './components/ResultsScreen';
import ProductDetailScreen from './components/ProductDetailScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userPreferences, setUserPreferences] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('choice');
  };

  const handleChoiceSelect = (choice) => {
    setCurrentScreen(choice === 'form' ? 'form' : 'chatbot');
  };

  const handlePreferencesSubmit = (preferences) => {
    setUserPreferences(preferences);
    // Simular recomendações da IA
    generateRecommendations(preferences);
    setCurrentScreen('results');
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentScreen('productDetail');
  };

  const handleBack = () => {
    if (currentScreen === 'productDetail') {
      setCurrentScreen('results');
    } else if (currentScreen === 'results') {
      setCurrentScreen('choice');
    } else if (currentScreen === 'form' || currentScreen === 'chatbot') {
      setCurrentScreen('choice');
    }
  };

  const generateRecommendations = (preferences) => {
    // Mock de recomendações baseadas nas preferências
    const mockProducts = [
      {
        id: 1,
        name: "Blazer Elegante Premium",
        brand: "StyleCo",
        price: 299.90,
        image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.8,
        description: "Blazer moderno e elegante, perfeito para ocasiões formais e casuais.",
        details: "Tecido de alta qualidade com corte ajustado. Ideal para combinar com calças sociais ou jeans.",
        colors: ["Preto", "Azul Marinho", "Cinza"],
        sizes: ["P", "M", "G", "GG"]
      },
      {
        id: 2,
        name: "Vestido Casual Chic",
        brand: "FashionPoint",
        price: 189.90,
        image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.6,
        description: "Vestido versátil e confortável para o dia a dia com estilo.",
        details: "Tecido leve e respirável, corte midi moderno. Perfeito para trabalho e lazer.",
        colors: ["Rosa", "Azul", "Branco"],
        sizes: ["PP", "P", "M", "G"]
      },
      {
        id: 3,
        name: "Jeans Premium Skinny",
        brand: "DenimLux",
        price: 149.90,
        image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.7,
        description: "Calça jeans de alta qualidade com modelagem perfeita.",
        details: "Denim premium com elastano para maior conforto e durabilidade. Corte skinny moderno.",
        colors: ["Azul Escuro", "Azul Médio", "Preto"],
        sizes: ["36", "38", "40", "42", "44"]
      },
      {
        id: 4,
        name: "Camisa Social Slim",
        brand: "ExecutiveFit",
        price: 129.90,
        image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.5,
        description: "Camisa social moderna com corte slim e tecido anti-rugas.",
        details: "100% algodão egipcio, corte slim fit, ideal para ambientes corporativos.",
        colors: ["Branco", "Azul Claro", "Rosa Claro"],
        sizes: ["P", "M", "G", "GG", "XG"]
      },
      {
        id: 5,
        name: "Tênis Casual Premium",
        brand: "ComfortStep",
        price: 259.90,
        image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.9,
        description: "Tênis casual de luxo com tecnologia de conforto avançada.",
        details: "Solado com amortecimento premium, cabedal em couro sintético de alta qualidade.",
        colors: ["Branco", "Preto", "Cinza"],
        sizes: ["37", "38", "39", "40", "41", "42", "43"]
      },
      {
        id: 6,
        name: "Saia Midi Elegante",
        brand: "ChicStyle",
        price: 119.90,
        image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.4,
        description: "Saia midi versátil e elegante para diversas ocasiões.",
        details: "Tecido fluido com forro, cintura alta valorizando a silhueta feminina.",
        colors: ["Preto", "Vinho", "Verde Musgo"],
        sizes: ["PP", "P", "M", "G", "GG"]
      }
    ];

    // Filtrar baseado nas preferências (simulação simples)
    const filtered = mockProducts.filter(product => {
      if (preferences.style && preferences.style !== 'todos') {
        return product.name.toLowerCase().includes(preferences.style.toLowerCase()) ||
               product.description.toLowerCase().includes(preferences.style.toLowerCase());
      }
      return true;
    });

    setRecommendations(filtered.length > 0 ? filtered : mockProducts);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'choice':
        return <ChoiceScreen onChoiceSelect={handleChoiceSelect} />;
      case 'form':
        return <FormScreen onSubmit={handlePreferencesSubmit} onBack={handleBack} />;
      case 'chatbot':
        return <ChatbotScreen onSubmit={handlePreferencesSubmit} onBack={handleBack} />;
      case 'results':
        return <ResultsScreen 
          recommendations={recommendations} 
          onProductSelect={handleProductSelect}
          onBack={handleBack}
        />;
      case 'productDetail':
        return <ProductDetailScreen 
          product={selectedProduct} 
          onBack={handleBack}
        />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;
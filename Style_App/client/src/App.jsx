

import React, { useState } from "react";
import Inicio from "./components/Inicio";
import ChoiceScreen from "./components/ChoiceScreen";
import FormScreen from "./components/FormScreen";
import ChatbotScreen from "./components/ChatbotScreen";
import ResultsScreen from "./components/ResultsScreen";
import ProductDetailScreen from "./components/ProductDetailScreen";
import { Loader2 } from "lucide-react"; // Ícone para a tela de carregamento

function App() {
  const [currentScreen, setCurrentScreen] = useState("auth");
  const [userPreferences, setUserPreferences] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);
  // ADICIONADO: Estado para controlar a tela de carregamento
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setCurrentScreen("choice");
  };

  const handleChoiceSelect = (choice) => {
    setCurrentScreen(choice === "form" ? "form" : "chatbot");
  };

  // --- FUNÇÃO SUBSTITUÍDA PELA VERSÃO CORRETA ---
  const handlePreferencesSubmit = async (preferences) => {
    setUserPreferences(preferences);
    setIsLoading(true); // Ativa o carregamento
    setCurrentScreen("results"); // Muda para a tela de resultados (que mostrará o loading)

    try {
      // Faz a chamada para o seu backend Python
      const response = await fetch(
        "https://empreendendorismo-production.up.railway.app/api/recommendations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(preferences),
        }
      );

      if (!response.ok) {
        throw new Error("Falha na resposta do servidor");
      }

      const data = await response.json();
      setRecommendations(data); // Preenche com os dados da IA
    } catch (error) {
      console.error("Erro ao buscar recomendações:", error);
      setRecommendations([]); // Limpa em caso de erro
    } finally {
      setIsLoading(false); // Desativa o carregamento
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentScreen("productDetail");
  };

  const handleBack = () => {
    if (currentScreen === "productDetail") {
      setCurrentScreen("results");
    } else if (currentScreen === "results") {
      setRecommendations([]); // Limpa as recomendações ao voltar
      setCurrentScreen("choice");
    } else if (currentScreen === "form" || currentScreen === "chatbot") {
      setCurrentScreen("choice");
    } else if (currentScreen === "choice") {
      // Logout
      setUser(null);
      setCurrentScreen("auth");
    }
  };

  // --- FUNÇÃO generateRecommendations FOI REMOVIDA ---
  // Não precisamos mais dela, pois os dados vêm do backend.

  // --- FUNÇÃO renderCurrentScreen FOI ATUALIZADA ---
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "auth":
        return <Inicio onAuthSuccess={handleAuthSuccess} />;
      case "choice":
        return <ChoiceScreen onChoiceSelect={handleChoiceSelect} />;
      case "form":
        return (
          <FormScreen
            onSubmit={handlePreferencesSubmit}
            onBack={handleBack}
            user={user}
          />
        );
      case "chatbot":
        return (
          <ChatbotScreen
            onSubmit={handlePreferencesSubmit}
            onBack={handleBack}
          />
        );
      case "results":
        // Adicionada a lógica para mostrar a tela de carregamento
        if (isLoading) {
          return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-gray-700">
                Analisando suas preferências...
              </h2>
              <p className="text-gray-500 mt-2">
                Nossa IA está criando os looks perfeitos para você!
              </p>
            </div>
          );
        }
        return (
          <ResultsScreen
            recommendations={recommendations}
            userPreferences={userPreferences}
            onProductSelect={handleProductSelect}
            onBack={handleBack}
          />
        );
      case "productDetail":
        return (
          <ProductDetailScreen product={selectedProduct} onBack={handleBack} />
        );
      default:
        return <Inicio onAuthSuccess={handleAuthSuccess} />;
    }
  };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {renderCurrentScreen()}
      </div>
    );
  }
  
  export default App;

import React, { useState } from "react";
import { ArrowLeft, Share2, MessageCircle, Instagram } from "lucide-react";
import ModalIndisponivel from "./ModalIndisponivel";

// Componente auxiliar para exibir cada item do look de forma organizada
function LookItemCard({ category, item }) {
  // Se não houver um item para a categoria (ex: a IA não sugeriu acessório), não renderiza nada.
  if (!item || !item.nome) return null;
  console.log(item);

  // Mapa de cores em português para HEX
  const colorMap = {
    preto: "#000000",
    branco: "#ffffff",
    vermelho: "#ff0000",
    azul: "#0000ff",
    azul_claro: "#87ceeb",
    verde: "#00ff00",
    amarelo: "#ffff00",
    rosa: "#ffc0cb",
    roxo: "#800080",
    cinza: "#808080",
    bege: "#f5f5dc",
    marrom: "#a52a2a",
    laranja: "#ffa500",
    loiro: "#f9e4b7",
    loiro_claro: "#fffacd",
    castanho: "#8b5c2d",
    ruivo: "#b55239",
    platinado: "#e5e4e2",
    dourado: "#ffd700",
    cobre: "#b87333",
    caramelo: "#c68e17",
    chocolate: "#7b3f00",
    preto_azulado: "#232b2b",
    grisalho: "#bcbcbc",
    verde_agua: "#00ced1",
    azul_marinho: "#001f3f",
    lilas: "#c8a2c8",
    vinho: "#800000",
    prata: "#c0c0c0",
    // adicione outras cores que você precisar
  };

  // Função para garantir que a cor seja hex
  function parseColor(cor) {
    if (!cor) return "#000000"; // fallback
    return colorMap[cor.toLowerCase()] || cor; // usa o nome original se não achar
  }

  // Depois, na hora de montar o gradiente
  const gradient =
    item.cores && item.cores.length > 0
      ? `linear-gradient(to bottom, ${item.cores.map(parseColor).join(", ")})`
      : "linear-gradient(to bottom, #6366f1, #a855f7)";

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
      style={{
        borderLeft: "10px solid transparent",
        borderImage: `${gradient} 1`,
      }}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0"></div>
        <div className="p-6 flex flex-col justify-center">
          <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
            {category}
          </div>
          <h3 className="block mt-1 text-2xl leading-tight font-bold text-gray-900">
            {item.nome}
          </h3>
          <p className="mt-2 text-gray-700">{item.descricao}</p>
          <p className="mt-3 text-sm text-gray-500">
            <strong>Detalhes:</strong> {item.detalhes}
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultsScreen({ recommendations, onBack }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  // Função para gerar mensagem para WhatsApp
  const generateWhatsAppMessage = () => {
    if (!recommendations) return "";
    
    let message = "🌟 Meu Look Personalizado! 🌟\n\n";
    message += "✨ Acabei de receber uma consultoria de moda incrível!\n\n";
    
    if (recommendations.roupas) {
      message += `👗 Roupa: ${recommendations.roupas.nome}\n`;
      message += `🎨 Cor: ${recommendations.roupas.cor}\n\n`;
    }
    
    if (recommendations.calca) {
      message += `👖 Calça: ${recommendations.calca.nome}\n`;
      message += `🎨 Cor: ${recommendations.calca.cor}\n\n`;
    }
    
    if (recommendations.sapatos) {
      message += `👠 Sapatos: ${recommendations.sapatos.nome}\n`;
      message += `🎨 Cor: ${recommendations.sapatos.cor}\n\n`;
    }
    
    if (recommendations.acessorio) {
      message += `💎 Acessório: ${recommendations.acessorio.nome}\n`;
      message += `🎨 Cor: ${recommendations.acessorio.cor}\n\n`;
    }
    
    message += "💫 Que combinação perfeita! Adorei o resultado!\n";
    message += "#LookPersonalizado #ModaIA #EstiloUnico";
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppShare = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  // Mapeia as chaves do objeto para títulos amigáveis em português
  const categories = {
    superior: "Parte Superior",
    inferior: "Parte Inferior",
    calcado: "Calçado",
    cabelo: "Sugestão de Cabelo / Penteado",
    acessorio: "Acessório",
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Seu Look Personalizado
              </h1>
              <p className="text-gray-600 mt-1">
                Criamos uma combinação perfeita com base nas suas preferências.
              </p>
            </div>
          </div>
          
          {/* Botões de Compartilhamento */}
          {recommendations && (
            <div className="flex gap-3">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors shadow-md"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </button>
            </div>
          )}
        </div>

        {/* Grade de Resultados */}
        {recommendations ? (
          <div className="space-y-8">
            {Object.keys(categories).map((key) => (
              <LookItemCard
                key={key}
                category={categories[key]}
                item={recommendations[key]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">
              Nenhuma recomendação encontrada.
            </h3>
            <p className="text-gray-500">
              Tente refazer a consulta para obter resultados.
            </p>
          </div>
        )}
        
        {/* Modal de Indisponível */}
        <ModalIndisponivel open={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
}

export default ResultsScreen;

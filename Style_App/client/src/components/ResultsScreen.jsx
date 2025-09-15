import React, { useState, useEffect } from "react";
import { ArrowLeft, Share2 } from "lucide-react";
import { sendRecommendationEmail } from "../services/emailService";
import NotificationPopup from "./NotificationPopup";

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

function ResultsScreen({ recommendations, userPreferences, onBack }) {
  const [notification, setNotification] = useState({ type: null, message: '' });

  // Envio automático do email quando os resultados carregarem
  useEffect(() => {
    const sendEmailAutomatically = async () => {
      if (recommendations && userPreferences?.email) {
        // Mostra notificação de carregamento
        setNotification({ 
          type: 'loading', 
          message: 'Enviando suas recomendações por email...' 
        });

        try {
          const result = await sendRecommendationEmail(
            userPreferences.email,
            recommendations,
            userPreferences
          );
          
          if (result.success) {
            setNotification({ 
              type: 'success', 
              message: 'Email enviado com sucesso!' 
            });
            // Remove a notificação após 4 segundos
            setTimeout(() => setNotification({ type: null, message: '' }), 4000);
          } else {
            setNotification({ 
              type: 'error', 
              message: 'Erro ao enviar email. Tente novamente.' 
            });
            setTimeout(() => setNotification({ type: null, message: '' }), 5000);
          }
        } catch (error) {
          console.error('Erro ao enviar email:', error);
          setNotification({ 
            type: 'error', 
            message: 'Erro ao enviar email. Verifique sua conexão.' 
          });
          setTimeout(() => setNotification({ type: null, message: '' }), 5000);
        }
      }
    };

    sendEmailAutomatically();
  }, [recommendations, userPreferences]);

  const closeNotification = () => {
    setNotification({ type: null, message: '' });
  };

  // Função para sanitizar emojis problemáticos no WhatsApp
  const sanitizeEmojisForWhatsApp = (text) => {
    const emojiMap = {
      '💇‍♀️': '💇',
      '👩‍💼': '👩',
      '🧑‍💻': '👨',
      '👨‍💼': '👨',
      '🏃‍♀️': '🏃',
      '🏃‍♂️': '🏃',
      '🚶‍♀️': '🚶',
      '🚶‍♂️': '🚶',
      // Substitui emojis compostos que causam problemas
      '👔': '👕', // Mais compatível
      '👖': '👕', // Genérico para roupas
      '👠': '👞', // Mais compatível
    };
    
    let sanitized = text;
    Object.keys(emojiMap).forEach(problematicEmoji => {
      sanitized = sanitized.replace(new RegExp(problematicEmoji, 'g'), emojiMap[problematicEmoji]);
    });
    
    return sanitized;
  };

  // Função para gerar mensagem completa e bonita para WhatsApp
  const generateWhatsAppMessage = () => {
    if (!recommendations || !userPreferences) return "";
    
    let message = "";
    
    // 🎯 HEADER PRINCIPAL
    message += "✨🌟 STYLO AI - CONSULTORIA DE MODA 🌟✨\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    
    // 📋 INFORMAÇÕES DO EVENTO
    message += "📋 *INFORMAÇÕES DO EVENTO*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    
    if (userPreferences.evento) {
      message += `🎉 *Evento:* ${userPreferences.evento}\n`;
    }
    
    if (userPreferences.local) {
      message += `📍 *Local:* ${userPreferences.local}\n`;
    }
    
    if (userPreferences.horario) {
      message += `⏰ *Horário:* ${userPreferences.horario}\n`;
    }
    
    if (userPreferences.duracao) {
      message += `⏳ *Duração:* ${userPreferences.duracao}\n`;
    }
    
    if (userPreferences.clima) {
      message += `🌤️ *Clima:* ${userPreferences.clima}\n`;
    }
    
    if (userPreferences.estilo) {
      message += `� *Estilo Preferido:* ${userPreferences.estilo}\n`;
    }
    
    message += "\n";
    
    // 👗 RECOMENDAÇÕES PERSONALIZADAS
    message += "👗 *LOOK PERSONALIZADO CRIADO PELA IA*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    
    // Verifica diferentes estruturas de recomendações
    if (recommendations.superior) {
      message += `👔 *Parte Superior:* ${recommendations.superior.nome || 'Não especificado'}\n`;
      message += `   🎨 Cor: ${recommendations.superior.cor || 'Não especificada'}\n\n`;
    }
    
    if (recommendations.inferior) {
      message += `👖 *Parte Inferior:* ${recommendations.inferior.nome || 'Não especificado'}\n`;
      message += `   🎨 Cor: ${recommendations.inferior.cor || 'Não especificada'}\n\n`;
    }
    
    if (recommendations.calcado) {
      message += `� *Calçado:* ${recommendations.calcado.nome}\n`;
      message += `   🎨 Cor: ${recommendations.calcado.cor}\n\n`;
    }
    
    if (recommendations.acessorio) {
      message += `💎 *Acessório:* ${recommendations.acessorio.nome}\n`;
      message += `   🎨 Cor: ${recommendations.acessorio.cor}\n\n`;
    }
    
    if (recommendations.cabelo) {
      message += `�‍♀️ *Cabelo/Penteado:* ${recommendations.cabelo.nome}\n`;
      message += `   🎨 Estilo: ${recommendations.cabelo.cor}\n\n`;
    }
    
    // Estrutura alternativa (para compatibilidade)
    if (recommendations.roupas) {
      message += `👗 *Roupa:* ${recommendations.roupas.nome}\n`;
      message += `   🎨 Cor: ${recommendations.roupas.cor}\n\n`;
    }
    
    if (recommendations.calca) {
      message += `� *Calça:* ${recommendations.calca.nome}\n`;
      message += `   🎨 Cor: ${recommendations.calca.cor}\n\n`;
    }
    
    if (recommendations.sapatos) {
      message += `👠 *Sapatos:* ${recommendations.sapatos.nome}\n`;
      message += `   🎨 Cor: ${recommendations.sapatos.cor}\n\n`;
    }
    
    // 💝 INFORMAÇÕES ADICIONAIS
    if (userPreferences.corPreferida || userPreferences.pecas || userPreferences.adicionais) {
      message += "💝 *PREFERÊNCIAS CONSIDERADAS*\n";
      message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
      
      if (userPreferences.corPreferida) {
        message += `🎨 *Cor Preferida:* ${userPreferences.corPreferida}\n`;
      }
      
      if (userPreferences.pecas) {
        message += `� *Peças Específicas:* ${userPreferences.pecas}\n`;
      }
      
      if (userPreferences.adicionais) {
        message += `📝 *Observações:* ${userPreferences.adicionais}\n`;
      }
      
      message += "\n";
    }
    
    // 🎯 FOOTER MOTIVACIONAL
    message += "✨ *RESULTADO INCRÍVEL!* ✨\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    message += "💫 Look criado especialmente para mim!\n";
    message += "🤖 Powered by Inteligência Artificial\n";
    message += "🔥 #StyloAI #LookPersonalizado #ModaIA\n";
    message += "💎 #ConsultoriaDeModa #EstiloUnico\n\n";
    
    message += "Experimente você também! 👇\n";
    message += "🌐 Stylo AI - Sua consultoria de moda inteligente";
    
    return encodeURIComponent(message);
  };

  const handleShare = async () => {
    const rawMessage = generateWhatsAppMessage();
    const sanitizedMessage = sanitizeEmojisForWhatsApp(rawMessage);
    
    // Estratégia 1: Tentar Web Share API (mais moderno e mostra todas as opções)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Stylo AI - Meu Look Personalizado',
          text: decodeURIComponent(sanitizedMessage),
        });
        return;
      } catch (error) {
        console.log('Web Share API falhou, copiando para área de transferência:', error);
      }
    }
    
    // Estratégia 2: Copiar para área de transferência se Web Share não funcionar
    await handleCopyToClipboard();
  };

  // Função para copiar texto para área de transferência
  const handleCopyToClipboard = async () => {
    const rawMessage = generateWhatsAppMessage();
    const cleanText = decodeURIComponent(sanitizeEmojisForWhatsApp(rawMessage));
    
    try {
      await navigator.clipboard.writeText(cleanText);
      setNotification({ 
        type: 'success', 
        message: 'Texto copiado! Cole no WhatsApp ou onde desejar.' 
      });
      setTimeout(() => setNotification({ type: null, message: '' }), 3000);
    } catch (error) {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = cleanText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setNotification({ 
        type: 'success', 
        message: 'Texto copiado! Cole no WhatsApp ou onde desejar.' 
      });
      setTimeout(() => setNotification({ type: null, message: '' }), 3000);
    }
  };

  // Função para gerar mensagem para email
  const generateEmailMessage = () => {
    if (!recommendations) return "";
    
    let message = "Seu Look Personalizado!\n\n";
    message += "Olá! Aqui estão suas recomendações de moda personalizadas:\n\n";
    
    if (recommendations.superior) {
      message += `👗 Parte Superior: ${recommendations.superior.nome}\n`;
      message += `🎨 Cor: ${recommendations.superior.cor}\n\n`;
    }
    
    if (recommendations.inferior) {
      message += `👖 Parte Inferior: ${recommendations.inferior.nome}\n`;
      message += `🎨 Cor: ${recommendations.inferior.cor}\n\n`;
    }
    
    if (recommendations.calcado) {
      message += `👠 Calçado: ${recommendations.calcado.nome}\n`;
      message += `🎨 Cor: ${recommendations.calcado.cor}\n\n`;
    }
    
    if (recommendations.acessorio) {
      message += `💎 Acessório: ${recommendations.acessorio.nome}\n`;
      message += `🎨 Cor: ${recommendations.acessorio.cor}\n\n`;
    }

    if (recommendations.cabelo) {
      message += `💇 Cabelo: ${recommendations.cabelo.nome}\n`;
      message += `🎨 Cor: ${recommendations.cabelo.cor}\n\n`;
    }
    
    message += "Esperamos que você goste das sugestões!\n\n";
    message += "Atenciosamente,\nEquipe Stylo AI";
    
    return message;
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
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors shadow-md"
              >
                <Share2 className="h-4 w-4" />
                Compartilhar
              </button>
              
              <button
                onClick={handleCopyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-md"
              >
                <Share2 className="h-4 w-4" />
                Copiar Texto
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
        
        {/* Notificação de Email */}
        <NotificationPopup 
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      </div>
    </div>
  );
}

export default ResultsScreen;

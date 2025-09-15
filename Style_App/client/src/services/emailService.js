// services/emailService.js
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/emailConfig';

// Inicializar EmailJS
emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

// Função principal para envio de emails via EmailJS
export const sendRecommendationEmail = async (userEmail, recommendations, userPreferences) => {
  try {
    const templateParams = {
      to_email: userEmail,
      to_name: userPreferences.nome || 'Cliente',
      from_name: 'Stylo AI',
      message: formatRecommendations(recommendations),
      
      // Informações do evento (mapeamento para o template)
      selected_color: userPreferences.evento || 'Não informado',
      selected_size: userPreferences.clima || 'Não informado', 
      product_colors: userPreferences.horario || 'Não informado',
      product_sizes: userPreferences.estilo || 'Não informado',
      
      // Informações adicionais do evento
      event_location: userPreferences.local || 'Não informado',
      event_duration: userPreferences.duracao || 'Não informado',
      
      // Descrição detalhada das recomendações
      product_details: generateEventDescription(userPreferences),
      product_rating: '5.0',
      
      // Detalhes das escolhas do usuário
      quantity: '1 Look Completo',
      total_price: 'Grátis',
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('Email enviado com sucesso!', response.status, response.text);
    return { success: true, message: 'Email enviado com sucesso!' };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, message: 'Erro ao enviar email: ' + error.text };
  }
};

const formatRecommendations = (recommendations) => {
  // Se já é uma string, apenas formata
  if (typeof recommendations === 'string') {
    return recommendations.split('\n').map(line => line.trim()).filter(line => line).join('\n');
  }
  
  // Se é um objeto, converte para texto formatado
  if (typeof recommendations === 'object' && recommendations !== null) {
    let formattedText = '';
    
    // Estrutura usada no ResultsScreen
    if (recommendations.roupas) {
      formattedText += `👗 ROUPA: ${recommendations.roupas.nome} (${recommendations.roupas.cor})\n`;
    }
    
    if (recommendations.calca) {
      formattedText += `👖 CALÇA: ${recommendations.calca.nome} (${recommendations.calca.cor})\n`;
    }
    
    if (recommendations.sapatos) {
      formattedText += `👠 SAPATOS: ${recommendations.sapatos.nome} (${recommendations.sapatos.cor})\n`;
    }
    
    if (recommendations.acessorio) {
      formattedText += `� ACESSÓRIO: ${recommendations.acessorio.nome} (${recommendations.acessorio.cor})\n`;
    }
    
    // Estrutura alternativa (superior, inferior, calcado, cabelo)
    if (recommendations.superior) {
      formattedText += `� PARTE SUPERIOR: ${recommendations.superior.nome} (${recommendations.superior.cor})\n`;
    }
    
    if (recommendations.inferior) {
      formattedText += `� PARTE INFERIOR: ${recommendations.inferior.nome} (${recommendations.inferior.cor})\n`;
    }
    
    if (recommendations.calcado) {
      formattedText += `� CALÇADO: ${recommendations.calcado.nome} (${recommendations.calcado.cor})\n`;
    }
    
    if (recommendations.cabelo) {
      formattedText += `💇 CABELO: ${recommendations.cabelo.nome} (${recommendations.cabelo.cor})\n`;
    }
    
    // Se não tem as propriedades específicas, tenta converter o objeto para string
    if (!formattedText) {
      formattedText = 'Look personalizado criado pela Stylo AI com base nas suas preferências.';
    }
    
    return formattedText.trim();
  }
  
  // Fallback para outros tipos
  return String(recommendations);
};

const generateEventDescription = (userPreferences) => {
  let description = '';
  
  // Informações sobre o evento
  const eventDetails = [];
  
  if (userPreferences.evento) {
    eventDetails.push(`Evento: ${userPreferences.evento}`);
  }
  
  if (userPreferences.local) {
    eventDetails.push(`Local: ${userPreferences.local}`);
  }
  
  if (userPreferences.horario) {
    eventDetails.push(`Horário: ${userPreferences.horario}`);
  }
  
  if (userPreferences.duracao) {
    eventDetails.push(`Duração: ${userPreferences.duracao}`);
  }
  
  if (userPreferences.clima) {
    eventDetails.push(`Clima esperado: ${userPreferences.clima}`);
  }
  
  // Informações pessoais relevantes
  const personalDetails = [];
  
  if (userPreferences.estilo) {
    personalDetails.push(`Estilo preferido: ${userPreferences.estilo}`);
  }
  
  if (userPreferences.corPreferida) {
    personalDetails.push(`Cor preferida: ${userPreferences.corPreferida}`);
  }
  
  if (userPreferences.pecas) {
    personalDetails.push(`Peças específicas: ${userPreferences.pecas}`);
  }
  
  if (userPreferences.adicionais) {
    personalDetails.push(`Observações: ${userPreferences.adicionais}`);
  }
  
  // Monta a descrição final
  if (eventDetails.length > 0) {
    description += 'DETALHES DO EVENTO:\n' + eventDetails.join('\n') + '\n\n';
  }
  
  if (personalDetails.length > 0) {
    description += 'SUAS PREFERÊNCIAS:\n' + personalDetails.join('\n');
  }
  
  if (!description) {
    description = 'Evento personalizado criado com base nas suas preferências.';
  }
  
  return description;
};

export default { sendRecommendationEmail };
import React, { useState } from "react";
import {
  ArrowLeft,
  Send,
  Calendar,
  Sun,
  Clock,
  Scissors,
  Palette,
  Hash,
  User,
  Heart,
  MapPin,
  Timer,
  Shirt,
  FileText,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import ModalIndisponivel from "./ModalIndisponivel";

function FormScreen({ onSubmit, onBack, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenModal = () => setIsModalOpen(true);

  const [formData, setFormData] = useState({
    evento: "",
    clima: "",
    horario: "",
    cabelo: "",
    corPreferida: "",
    idade: "",
    genero: "",
    estilo: "",
    imagem: "",
    local: "",
    duracao: "",
    pecas: "",
    adicionais: "",
    contato: "",
    tomPele: "",
    telefone: "",
    altura: "",
    email: "",
  });

  // Estilos para sliders
  const sliderStyle = `
    .slider::-webkit-slider-thumb {
      appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #f59e0b;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      cursor: pointer;
    }
    
    .slider::-moz-range-thumb {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #f59e0b;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      cursor: pointer;
      border: none;
    }
  `;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Se a opção de contato for email, usar o email do usuário logado
    const finalFormData = {
      ...formData,
      email: formData.contato === "email" ? user?.email : formData.email,
    };

    if (formData.contato === "whatsapp") {
      handleOpenModal();
    } else {
      handleCloseModal();
    }

    onSubmit(finalFormData);
  };

  return (
    <div className="min-h-screen p-6">
      <style>{sliderStyle}</style>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Conte-nos sobre o evento
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Evento */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              Qual o evento?
            </label>
            <input
              type="text"
              value={formData.evento}
              onChange={(e) =>
                setFormData({ ...formData, evento: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Clima */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Sun className="h-5 w-5 mr-2 text-yellow-500" />
              Qual o clima na data?
            </label>
            <select
              value={formData.clima}
              onChange={(e) =>
                setFormData({ ...formData, clima: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              required
            >
              <option value="">Selecione o clima</option>
              <option value="ensolarado">☀️ Ensolarado</option>
              <option value="nublado">⛅ Nublado</option>
              <option value="chuvoso">🌧️ Chuvoso</option>
              <option value="frio">❄️ Frio</option>
              <option value="quente">🔥 Quente</option>
              <option value="ventoso">💨 Ventoso</option>
              <option value="ameno">🌤️ Ameno</option>
            </select>
          </div>

          {/* Horário */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Clock className="h-5 w-5 mr-2 text-green-500" />
              Qual o horário?
            </label>
            <input
              type="time"
              value={formData.horario}
              onChange={(e) =>
                setFormData({ ...formData, horario: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Cabelo */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Scissors className="h-5 w-5 mr-2 text-pink-500" />
              Cabelo
            </label>
            <input
              type="text"
              value={formData.cabelo}
              placeholder="Descreva brevemente(Cor, comprimento, estilo...)"
              onChange={(e) =>
                setFormData({ ...formData, cabelo: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* CorPreferida */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Palette className="h-5 w-5 mr-2 text-purple-500" />
              Cor Preferida
            </label>
            <select
              value={formData.corPreferida}
              onChange={(e) =>
                setFormData({ ...formData, corPreferida: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              required
            >
              <option value="">Selecione sua cor preferida</option>
              <option value="preto">⚫ Preto</option>
              <option value="branco">⚪ Branco</option>
              <option value="azul">🔵 Azul</option>
              <option value="vermelho">🔴 Vermelho</option>
              <option value="verde">🟢 Verde</option>
              <option value="amarelo">🟡 Amarelo</option>
              <option value="rosa">🩷 Rosa</option>
              <option value="roxo">🟣 Roxo</option>
              <option value="laranja">🟠 Laranja</option>
              <option value="marrom">🟤 Marrom</option>
              <option value="cinza">⚫ Cinza</option>
              <option value="dourado">✨ Dourado</option>
              <option value="prateado">🪙 Prateado</option>
              <option value="navy">🔵 Azul Marinho</option>
              <option value="bege">🟫 Bege</option>
            </select>
          </div>

          {/* Contato */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <MessageCircle className="h-5 w-5 mr-2 text-purple-500" />
              Tom de pele
            </label>
            <select
              value={formData.tomPele}
              onChange={(e) =>
                setFormData({ ...formData, tomPele: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Selecione</option>
              <option value="branco">Branco</option>
              <option value="pardo">Pardo</option>
              <option value="preto">Preto</option>
            </select>
          </div>

          {/* Idade */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Hash className="h-5 w-5 mr-2 text-orange-500" />
              Idade: {formData.idade || 25} anos
            </label>
            <div className="space-y-4">
              <input
                type="range"
                min="15"
                max="80"
                value={formData.idade || 25}
                onChange={(e) =>
                  setFormData({ ...formData, idade: e.target.value })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${
                    (((formData.idade || 25) - 15) / (80 - 15)) * 100
                  }%, #e5e7eb ${
                    (((formData.idade || 25) - 15) / (80 - 15)) * 100
                  }%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>15 anos</span>
                <span>80 anos</span>
              </div>
            </div>
          </div>

          {/* Altura */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Hash className="h-5 w-5 mr-2 text-orange-500" />
              Altura: {formData.altura || 170} cm
            </label>
            <div className="space-y-4">
              <input
                type="range"
                min="140"
                max="220"
                value={formData.altura || 170}
                onChange={(e) =>
                  setFormData({ ...formData, altura: e.target.value })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${
                    (((formData.altura || 170) - 140) / (220 - 140)) * 100
                  }%, #e5e7eb ${
                    (((formData.altura || 170) - 140) / (220 - 140)) * 100
                  }%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>140 cm</span>
                <span>220 cm</span>
              </div>
            </div>
          </div>

          {/* Gênero */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Gênero
            </label>
            <select
              value={formData.genero}
              onChange={(e) =>
                setFormData({ ...formData, genero: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Selecione</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Preferências de estilo */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Shirt className="h-5 w-5 mr-2 text-indigo-500" />
              Preferências de estilo
            </label>
            <select
              value={formData.estilo}
              onChange={(e) =>
                setFormData({ ...formData, estilo: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="">Selecione seu estilo preferido</option>
              <option value="casual">👕 Casual</option>
              <option value="elegante">👔 Elegante/Formal</option>
              <option value="moderno">✨ Moderno</option>
              <option value="vintage">🕰️ Vintage/Retrô</option>
              <option value="boho">🌸 Boho/Hippie</option>
              <option value="minimalista">⚪ Minimalista</option>
              <option value="streetwear">🛹 Streetwear/Urbano</option>
              <option value="romantico">💕 Romântico</option>
              <option value="rock">🤘 Rock/Alternativo</option>
              <option value="classico">👑 Clássico/Atemporal</option>
              <option value="esportivo">🏃 Esportivo</option>
              <option value="sofisticado">💎 Sofisticado</option>
            </select>
          </div>

          {/* Tipo de imagem */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <FileText className="h-5 w-5 mr-2 text-gray-500" />
              Qual tipo de imagem pretende passar?
            </label>
            <select
              value={formData.imagem}
              onChange={(e) =>
                setFormData({ ...formData, imagem: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              required
            >
              <option value="">Selecione a imagem que quer passar</option>
              <option value="profissional">💼 Profissional/Corporativa</option>
              <option value="confiante">💪 Confiante/Poderosa</option>
              <option value="elegante">✨ Elegante/Sofisticada</option>
              <option value="criativa">🎨 Criativa/Artística</option>
              <option value="acessivel">😊 Acessível/Amigável</option>
              <option value="misteriosa">🌙 Misteriosa/Enigmática</option>
              <option value="jovial">🌟 Jovial/Energética</option>
              <option value="serena">🕊️ Serena/Calma</option>
              <option value="ousada">🔥 Ousada/Corajosa</option>
              <option value="romantica">💕 Romântica/Delicada</option>
              <option value="intelectual">📚 Intelectual/Séria</option>
              <option value="espontanea">🎈 Espontânea/Divertida</option>
            </select>
          </div>

          {/* Local do evento */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              Local do evento
            </label>
            <input
              type="text"
              value={formData.local}
              onChange={(e) =>
                setFormData({ ...formData, local: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Duração */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Timer className="h-5 w-5 mr-2 text-teal-500" />
              Duração do evento
            </label>
            <input
              type="text"
              value={formData.duracao}
              onChange={(e) =>
                setFormData({ ...formData, duracao: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Tipos de peça */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Shirt className="h-5 w-5 mr-2 text-blue-600" />
              Tipos de peça que gosta
            </label>
            <textarea
              value={formData.pecas}
              onChange={(e) =>
                setFormData({ ...formData, pecas: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Informações adicionais */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <FileText className="h-5 w-5 mr-2 text-gray-500" />
              Informações adicionais
            </label>
            <textarea
              value={formData.adicionais}
              onChange={(e) =>
                setFormData({ ...formData, adicionais: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <ModalIndisponivel open={isModalOpen} onClose={handleCloseModal} />
          {/* Contato */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <MessageCircle className="h-5 w-5 mr-2 text-purple-500" />
              Prefere receber por WhatsApp ou Email?
            </label>
            <select
              value={formData.contato}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, contato: value });
                if (value === "whatsapp") {
                  handleOpenModal(); // abre o modal
                  setFormData({ ...formData, telefone: null }); // limpa o telefone
                } else {
                  handleCloseModal(); // fecha se não for whatsapp
                }
              }}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Selecione</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
          </div>

          {/* Email - só aparece se escolher email */}
          {formData.contato === "email" && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center font-semibold text-gray-900 mb-4">
                <Mail className="h-5 w-5 mr-2 text-blue-500" />
                <span>Email para recebimento: </span>
                <input
                  type="email"
                  value={formData.contato === "email" ? user?.email : formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <p className="text-sm text-gray-500">
                As recomendações serão enviadas para o email escolhido.
              </p>
            </div>
          )}

          {/* Telefone */}
          {/* {(formData.contato === "whatsapp" ) && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <label className="flex items-center font-semibold text-gray-900 mb-4">
                <Phone className="h-5 w-5 mr-2 text-green-500" />
                Número de telefone
              </label>
              <input
                type="tel"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          )} */}

          {/* Submit */}
          <button
            type="submit"
            disabled={!formData.evento || !formData.genero}
            className="w-full flex justify-center items-center py-4 px-6 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <Send className="h-5 w-5 mr-2" />
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormScreen;

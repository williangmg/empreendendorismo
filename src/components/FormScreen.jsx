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

function FormScreen({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    evento: "",
    clima: "",
    horario: "",
    cabelo: "",
    cor: "",
    idade: "",
    genero: "",
    identidadeGenero: "",
    estilo: "",
    imagem: "",
    local: "",
    duracao: "",
    pecas: "",
    adicionais: "",
    contato: "",
    telefone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen p-6">
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
              onChange={(e) => setFormData({ ...formData, evento: e.target.value })}
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
            <input
              type="text"
              value={formData.clima}
              onChange={(e) => setFormData({ ...formData, clima: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Horário */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Clock className="h-5 w-5 mr-2 text-green-500" />
              Qual o horário?
            </label>
            <input
              type="text"
              value={formData.horario}
              onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
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
              onChange={(e) => setFormData({ ...formData, cabelo: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Cor */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Palette className="h-5 w-5 mr-2 text-purple-500" />
              Cor
            </label>
            <input
              type="text"
              value={formData.cor}
              onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Idade */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Hash className="h-5 w-5 mr-2 text-orange-500" />
              Idade (Somente Números)
            </label>
            <input
              type="number"
              value={formData.idade}
              onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Gênero */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Gênero
            </label>
            <select
              value={formData.genero}
              onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Selecione</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Identidade de gênero */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              Identidade de gênero
            </label>
            <input
              type="text"
              value={formData.identidadeGenero}
              onChange={(e) =>
                setFormData({ ...formData, identidadeGenero: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Preferências de estilo */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <Shirt className="h-5 w-5 mr-2 text-indigo-500" />
              Preferências de estilo
            </label>
            <textarea
              value={formData.estilo}
              onChange={(e) => setFormData({ ...formData, estilo: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Tipo de imagem */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <FileText className="h-5 w-5 mr-2 text-gray-500" />
              Qual tipo de imagem pretende passar?
            </label>
            <input
              type="text"
              value={formData.imagem}
              onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
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
              onChange={(e) => setFormData({ ...formData, local: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
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
              onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
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
              onChange={(e) => setFormData({ ...formData, pecas: e.target.value })}
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

          {/* Contato */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center font-semibold text-gray-900 mb-4">
              <MessageCircle className="h-5 w-5 mr-2 text-purple-500" />
              Prefere receber por WhatsApp ou Email?
            </label>
            <select
              value={formData.contato}
              onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Selecione</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
          </div>

          {/* Telefone */}
          {formData.contato === "whatsapp" && (
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
              />
            </div>
          )}

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

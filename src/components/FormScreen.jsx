import React, { useState } from 'react';
import { ArrowLeft, Send, User, Palette, Calendar, DollarSign } from 'lucide-react';

function FormScreen({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    gender: '',
    style: '',
    occasion: '',
    colors: [],
    budget: '',
    size: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleColorToggle = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const colorOptions = [
    { name: 'Preto', value: 'preto', bg: 'bg-black' },
    { name: 'Branco', value: 'branco', bg: 'bg-white border' },
    { name: 'Azul', value: 'azul', bg: 'bg-blue-500' },
    { name: 'Vermelho', value: 'vermelho', bg: 'bg-red-500' },
    { name: 'Verde', value: 'verde', bg: 'bg-green-500' },
    { name: 'Rosa', value: 'rosa', bg: 'bg-pink-500' },
    { name: 'Roxo', value: 'roxo', bg: 'bg-purple-500' },
    { name: 'Amarelo', value: 'amarelo', bg: 'bg-yellow-500' }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">Conte-nos sobre seu estilo</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Gênero */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Gênero
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['Feminino', 'Masculino'].map(gender => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setFormData({...formData, gender})}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.gender === gender
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* Estilo */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Palette className="h-5 w-5 mr-2 text-purple-500" />
              Estilo Preferido
            </label>
            <select
              value={formData.style}
              onChange={(e) => setFormData({...formData, style: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Selecione seu estilo</option>
              <option value="casual">Casual</option>
              <option value="elegante">Elegante</option>
              <option value="esportivo">Esportivo</option>
              <option value="formal">Formal</option>
              <option value="boho">Boho</option>
              <option value="minimalista">Minimalista</option>
            </select>
          </div>

          {/* Ocasião */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Calendar className="h-5 w-5 mr-2 text-green-500" />
              Ocasião
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Trabalho', 'Casual', 'Festa', 'Esporte', 'Viagem', 'Encontro'].map(occasion => (
                <button
                  key={occasion}
                  type="button"
                  onClick={() => setFormData({...formData, occasion})}
                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                    formData.occasion === occasion
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {occasion}
                </button>
              ))}
            </div>
          </div>

          {/* Cores */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Palette className="h-5 w-5 mr-2 text-pink-500" />
              Cores Favoritas
            </label>
            <p className="text-gray-600 mb-4 text-sm">Selecione suas cores preferidas (múltipla escolha)</p>
            <div className="grid grid-cols-4 gap-3">
              {colorOptions.map(color => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleColorToggle(color.value)}
                  className={`relative p-3 rounded-lg transition-all ${
                    formData.colors.includes(color.value)
                      ? 'ring-2 ring-blue-500 ring-offset-2'
                      : 'hover:scale-105'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full mx-auto mb-2 ${color.bg}`}></div>
                  <span className="text-xs text-gray-700">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Orçamento */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <DollarSign className="h-5 w-5 mr-2 text-yellow-500" />
              Faixa de Preço
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Até R$ 100', 'R$ 100 - 200', 'R$ 200 - 500', 'Acima de R$ 500'].map(budget => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => setFormData({...formData, budget})}
                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                    formData.budget === budget
                      ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.gender || !formData.style}
            className="w-full flex justify-center items-center py-4 px-6 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <Send className="h-5 w-5 mr-2" />
            Obter Recomendações
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormScreen;
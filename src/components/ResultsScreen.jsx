import React from 'react';
import { ArrowLeft } from 'lucide-react';

// Componente auxiliar para exibir cada item do look de forma organizada
function LookItemCard({ category, item }) {
  // Se não houver um item para a categoria (ex: a IA não sugeriu acessório), não renderiza nada.
  if (!item || !item.nome) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            src={item.imagem}
            alt={item.nome}
            className="h-56 w-full object-cover md:w-56"
          />
        </div>
        <div className="p-6 flex flex-col justify-center">
          <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">{category}</div>
          <h3 className="block mt-1 text-2xl leading-tight font-bold text-gray-900">{item.nome}</h3>
          <p className="mt-2 text-gray-700">{item.descricao}</p>
          <p className="mt-3 text-sm text-gray-500"><strong>Detalhes:</strong> {item.detalhes}</p>
        </div>
      </div>
    </div>
  );
}

function ResultsScreen({ recommendations, onBack }) {
  // Mapeia as chaves do objeto para títulos amigáveis em português
  const categories = {
    superior: "Parte Superior",
    inferior: "Parte Inferior",
    calcado: "Calçado",
    cabelo: "Sugestão de Cabelo / Penteado",
    acessorio: "Acessório"
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seu Look Personalizado</h1>
            <p className="text-gray-600 mt-1">
              Criamos uma combinação perfeita com base nas suas preferências.
            </p>
          </div>
        </div>

        {/* Grade de Resultados */}
        {recommendations ? (
          <div className="space-y-8">
            {Object.keys(categories).map(key => (
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
            <p className="text-gray-500">Tente refazer a consulta para obter resultados.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsScreen;
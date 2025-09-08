import React from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart } from 'lucide-react';

function ResultsScreen({ recommendations, onProductSelect, onBack }) {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Suas Recomendações</h1>
            <p className="text-gray-600 mt-1">
              Encontramos {recommendations.length} peças perfeitas para você
            </p>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map(product => (
            <div
              key={product.id}
              onClick={() => onProductSelect(product)}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{product.brand}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Ver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Heart className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma recomendação encontrada
            </h3>
            <p className="text-gray-500">
              Tente ajustar suas preferências para obter melhores resultados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsScreen;
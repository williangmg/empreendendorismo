import { MessageSquare, ClipboardList, Sparkles } from "lucide-react";
import ModalIndisponivel from "./ModalIndisponivel";
import { useState } from "react";

function ChoiceScreen({ onChoiceSelect }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Como você gostaria de receber suas recomendações?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha a forma que preferir para nos contar sobre seu estilo e
            preferências
          </p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Formulário */}
          <div
            onClick={() => onChoiceSelect("form")}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer border-2 border-transparent hover:border-blue-200"
          >
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <ClipboardList className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Formulário Rápido
              </h3>
              <p className="text-gray-600 mb-6">
                Responda algumas perguntas objetivas sobre suas preferências de
                estilo, ocasião e cores favoritas.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>✓ Rápido e objetivo</li>
                <li>✓ Perguntas estruturadas</li>
                <li>✓ Resultados precisos</li>
              </ul>
            </div>
          </div>

          {/* Chatbot */}

          <ModalIndisponivel open={isModalOpen} onClose={handleCloseModal} />
          <div
            onClick={() => handleOpenModal(true)}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer border-2 border-transparent hover:border-purple-200"
          >
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Conversa com IA
              </h3>
              <p className="text-gray-600 mb-6">
                Converse naturalmente com nossa IA sobre seu estilo,
                preferências e o que você está procurando.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>✓ Conversa natural</li>
                <li>✓ IA inteligente</li>
                <li>✓ Personalizado</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Ambas as opções geram recomendações personalizadas usando nossa IA
            avançada
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChoiceScreen;

import React from "react";
import { AlertTriangle } from "lucide-react";

const ModalIndisponivel = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center transform transition-all scale-100">
        <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🚧 Serviço Indisponível
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          A opção de <span className="font-semibold">conversa com IA</span> ainda não está disponível.
          <br />
          Por favor, escolha o formulário rápido por enquanto.
          <br />
          Aguarde novidades! 😊
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-md"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalIndisponivel;

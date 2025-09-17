import React from "react";

function Inicio({ onAuthSuccess }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-md w-full space-y-8 p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Outfinder</h2>
        <p className="mt-2 text-gray-600">Seu assistente pessoal de moda</p>

        <button
          onClick={() => onAuthSuccess({ name: "Usuário Convidado" })}
          className="mt-6 w-full py-3 px-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Começar
        </button>
      </div>
    </div>
  );
}

export default Inicio;

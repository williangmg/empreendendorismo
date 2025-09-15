import React, { useState } from "react";

function AuthScreen({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Limpar erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(
        `https://empreendendorismo-production.up.railway.app${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // Login bem-sucedido
          onAuthSuccess(data.user);
        } else {
          // Cadastro bem-sucedido, muda para login
          setIsLogin(true);
          setFormData({ name: "", email: "", password: "" });
          setError("Cadastro realizado com sucesso! Faça login agora.");
        }
      } else {
        setError(data.error || "Erro desconhecido");
      }
    } catch (error) {
      setError("Erro de conexão. Verifique se o servidor está rodando.");
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Stylo AI</h2>
          <p className="mt-2 text-gray-600">Seu assistente pessoal de moda</p>
        </div>

        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLogin
                ? "bg-white text-gray-900 shadow"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLogin
                ? "bg-white text-gray-900 shadow"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite seu nome"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite seu email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder={isLogin ? "Digite sua senha" : "Mínimo 6 caracteres"}
            />
          </div>

          {error && (
            <div
              className={`text-sm p-3 rounded ${
                error.includes("sucesso")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <button
              type="button"
              className="ml-1 text-blue-600 hover:text-blue-500"
              onClick={toggleMode}
            >
              {isLogin ? "Cadastre-se" : "Faça login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;

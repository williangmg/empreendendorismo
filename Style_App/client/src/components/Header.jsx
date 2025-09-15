import React from 'react';
import './Header.css';

function Header({ user, onLogout }) {
  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1:3001/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      localStorage.removeItem('user');
      onLogout();
    } catch (error) {
      console.error('Erro no logout:', error);
      // Fazer logout local mesmo se houver erro no servidor
      localStorage.removeItem('user');
      onLogout();
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">Stylo AI</h1>
          <span className="app-subtitle">Assistente de Moda</span>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">Olá, {user.name}!</span>
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
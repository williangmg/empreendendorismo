# 🎨 STYLO AI - Assistente Inteligente de Moda

![Logo Stylo AI](https://img.shields.io/badge/Stylo%20AI-Fashion%20Assistant-purple?style=for-the-badge&logo=sparkles)

## 📋 Sobre o Projeto

O **Stylo AI** é um assistente inteligente de moda que utiliza Inteligência Artificial para criar recomendações personalizadas de looks baseadas nas preferências do usuário, tipo de evento, clima e estilo pessoal.

### ✨ Funcionalidades Principais

- 🤖 **IA Avançada**: Powered by Google Gemini AI
- 📧 **Email Automático**: Envio de recomendações via EmailJS
- 📱 **Interface Moderna**: React + Tailwind CSS responsivo
- 🎯 **Personalização Total**: Formulário completo de preferências
- 💌 **Template Elegante**: Email com design profissional
- 🌤️ **Consideração Climática**: Recomendações baseadas no clima
- 👔 **Múltiplos Estilos**: Desde casual até formal

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Framework JavaScript
- **Vite** - Build tool moderna
- **Tailwind CSS** - Framework CSS utilitário
- **EmailJS** - Serviço de envio de emails

### Backend
- **Python Flask** - Framework web
- **Google Gemini AI** - Inteligência Artificial
- **CORS** - Cross-Origin Resource Sharing

## 📦 Instalação e Configuração

### 1. Clone o Repositório
```bash
git clone https://github.com/DallaVec/STYLO-AI.git
cd STYLO-AI
```

### 2. Configuração do Backend

```bash
cd server
pip install -r requirements.txt

# Configure sua API Key do Google Gemini no server.py
export GEMINI_API_KEY=AIzaSyDrZZzMt4HkN5YVaBRJqOHawcAvWDj2hko

python server.py
```

### 3. Configuração do Frontend

```bash
cd client
npm install

# Configure as credenciais do EmailJS em src/config/emailConfig.js
npm run dev
```

### 4. Configuração do EmailJS

1. Crie uma conta em [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email
3. Crie um template de email
4. Atualize as credenciais em `client/src/config/emailConfig.js`

## 🔧 Variáveis de Ambiente

### Backend (.env)
```env
GEMINI_API_KEY=AIzaSyDrZZzMt4HkN5YVaBRJqOHawcAvWDj2hko
```

### Frontend (emailConfig.js)
```javascript
export const EMAIL_CONFIG = {
  SERVICE_ID: 'seu_service_id',
  TEMPLATE_ID: 'seu_template_id',
  PUBLIC_KEY: 'sua_public_key'
};
```

## 📊 Estrutura do Projeto

```
STYLO-AI/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── config/         # Configurações
│   │   └── services/       # Serviços (EmailJS)
│   └── package.json
├── server/                 # Backend Flask
│   ├── server.py          # Servidor principal
│   └── requirements.txt
├── suggested_email_template.html  # Template de email
└── README.md
```

## 🎯 Como Usar

1. **Acesse a aplicação** em `http://localhost:5175`
2. **Preencha o formulário** com suas preferências:
   - Tipo de evento
   - Condições climáticas
   - Horário e local
   - Preferências de estilo
   - Informações pessoais
3. **Receba recomendações** geradas pela IA
4. **Compartilhe por email** suas recomendações

## 📧 Template de Email

O sistema inclui um template de email moderno e responsivo que apresenta:

- ✅ Informações completas do evento
- ✅ Recomendações personalizadas da IA
- ✅ Design elegante com gradientes
- ✅ Compatibilidade com clientes de email
- ✅ Layout responsivo para mobile

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvido com ❤️ pela equipe Stylo AI**

## 📞 Suporte

Para suporte ou dúvidas:
- 📧 Email: suporte@styloai.com
- 🐛 Issues: [GitHub Issues](https://github.com/DallaVec/STYLO-AI/issues)

---

⭐ **Se este projeto foi útil para você, não esqueça de dar uma estrela!**
# Stylo.ai - Consultor de Moda com IA

Sistema de consultoria de moda personalizada usando Google Gemini AI, com envio de recomendações por email e compartilhamento social.

## 🚀 Funcionalidades

- ✨ Recomendações de moda personalizadas com IA
- 📧 Envio de recomendações por email  
- 📱 Compartilhamento no WhatsApp
- 🎨 Interface moderna com Tailwind CSS
- 🔒 Domínio profissional (stylo.ai)

## 🛠️ Tecnologias

**Frontend:**
- React + Vite
- Tailwind CSS
- Lucide React (ícones)

**Backend:**
- Flask (Python)
- Google Gemini AI
- Resend (email)
- Flask-CORS

## 📦 Deploy na Vercel

### 1. Configurar Variáveis de Ambiente

No painel da Vercel, adicione estas variáveis:

```
GEMINI_API_KEY=sua_chave_gemini_aqui
RESEND_API_KEY=sua_chave_resend_aqui  
EMAIL_FROM=noreply@stylo.ai
```

### 2. Deploy Automático

1. Conecte o repositório GitHub à Vercel
2. A Vercel detectará automaticamente o `vercel.json`
3. Deploy será feito automaticamente

### 3. Domínio Personalizado

Configure seu domínio `stylo.ai` nas configurações da Vercel.

## 🔧 Desenvolvimento Local

### Backend:
```bash
cd server
pip install -r requirements.txt
python server.py
```

### Frontend:
```bash  
cd client
npm install
npm run dev
```

## 📧 Configuração de Email

O sistema usa Resend para envio de emails profissionais:
- Domínio: stylo.ai
- Emails enviados de: noreply@stylo.ai
- Templates HTML responsivos

## 🎯 APIs Disponíveis

- `POST /api/recommendations` - Gerar recomendações de moda
- `POST /api/test-email` - Testar envio de email

---

Desenvolvido para consultoria de moda com IA 🎨✨

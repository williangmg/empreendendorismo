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

## 📦 Deploy

### Frontend (Vercel) - SIMPLIFICADO ✅

1. **Conecte o repositório à Vercel**
   - Vá em https://vercel.com
   - Import repository: `DallaVec/style-ai2-v3`

2. **A Vercel detectará automaticamente:**
   - Framework: Vite
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`

3. **Deploy automático funcionará!** 🎉

### Backend (Separado)

Para o backend, você tem algumas opções:

**Opção 1: Railway** (Recomendado)
```bash
# Deploy automático do backend Python
railway login
railway init
railway up
```

**Opção 2: Render**
- Conecte o repositório
- Configure para rodar `server/server.py`

**Opção 3: PythonAnywhere**
- Upload dos arquivos do server/
- Configure Flask app

### Variáveis de Ambiente

**Backend:**
```
GEMINI_API_KEY=sua_chave_gemini
RESEND_API_KEY=sua_chave_resend  
EMAIL_FROM=noreply@stylo.ai
```

**Frontend (.env.production):**
```
VITE_API_URL=https://sua-url-backend.com
```

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
- `GET /api/health` - Health check

---

**Status:** ✅ Frontend pronto para Vercel | Backend precisa de hospedagem separada

Desenvolvido para consultoria de moda com IA 🎨✨

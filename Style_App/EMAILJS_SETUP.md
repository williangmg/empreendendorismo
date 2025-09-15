# 📧 Configuração do EmailJS para Stylo AI

## Passos para configurar o envio automático de emails:

### 1. Criar conta no EmailJS
- Acesse: https://emailjs.com/
- Faça login ou crie uma conta

### 2. Configurar o Service (Gmail)
- Vá em "Email Services"
- Clique em "Add New Service"
- Escolha "Gmail"
- Conecte sua conta Gmail (ai.stylo.look@gmail.com)
- O Service ID será: `service_7vwin0f` (já configurado)

### 3. Criar Template de Email
- Vá em "Email Templates"
- Clique em "Create New Template"
- Use o Template ID: `template_sugerido`
- Configure o template com o HTML fornecido no arquivo `suggested_email_template.html`

```html
Assunto: Suas Recomendações de Moda Personalizadas - Stylo AI

Corpo do email:
Olá {{user_name}}!

Aqui estão suas recomendações de moda personalizadas:

Evento: {{evento}}
Clima: {{clima}}
Horário: {{horario}}
Estilo: {{estilo}}

{{message}}

Atenciosamente,
Equipe Stylo AI
```

### 4. Obter Public Key
- Vá em "Account" → "API Keys"
- Copie a "Public Key"
- Cole no arquivo: `client/src/config/emailConfig.js`

### 5. Atualizar configurações
No arquivo `client/src/config/emailConfig.js`, substitua:
```javascript
PUBLIC_KEY: 'SUA_PUBLIC_KEY_AQUI'
```

### 6. Testar
- Reinicie o servidor do cliente
- Preencha um formulário com email
- Clique no botão "Email" na tela de resultados

## Limitações da conta gratuita:
- 200 emails/mês
- Limite de 50KB por email
- Funciona perfeitamente para testes

## Troubleshooting:
- Verifique se o Service ID está correto
- Verifique se o Template ID existe
- Verifique se a Public Key está correta
- Abra o console do navegador para ver erros
# server/server.py
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuração para Railway - PORT dinâmico
port = int(os.environ.get('PORT', 3001))

# Configuração do Flask-Mail para Gmail
# Configuração do Flask-Mail para Gmail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('GMAIL_USER', 'ai.stylo.look@gmail.com')
app.config['MAIL_PASSWORD'] = os.environ.get('GMAIL_APP_PASSWORD', '')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('GMAIL_USER', 'ai.stylo.look@gmail.com')

mail = Mail(app)

# Configurar Gemini API Key via variável de ambiente
genai.configure(api_key=os.environ.get('GEMINI_API_KEY', 'AIzaSyDrZZzMt4HkN5YVaBRJqOHawcAvWDj2hko'))

def create_prompt(preferences):
    prompt_details = []
    field_map = {
        "evento": "Tipo de Evento", "clima": "Clima previsto",
        "horario": "Horário do evento", "cabelo": "Características do cabelo",
        "corPreferida": "Cores preferidas/que combinam", "idade": "Idade", "genero": "Gênero",
        "identidadeGenero": "Identidade de Gênero", "estilo": "Preferências de estilo pessoal",
        "imagem": "Imagem que deseja transmitir", "local": "Local do evento",
        "duracao": "Duração do evento", "pecas": "Tipos de peça que gosta",
        "adicionais": "Informações adicionais", "tomPele": "Tom de pele", "altura": "Altura"
    }
    for key, label in field_map.items():
        if value := preferences.get(key):
            prompt_details.append(f"- {label}: {value}")
    preferences_string = "\n".join(prompt_details)

    # --- PROMPT ATUALIZADO ---
    return f"""
        Você é um consultor de imagem e moda IA especialista. Sua tarefa é criar UM look COMPLETO,
        dividido em categorias, com base nas preferências detalhadas de um usuário.

        **Preferências do Usuário:**
        {preferences_string}

        **Sua Tarefa:**
        Retorne **APENAS** um único objeto JSON válido. Não inclua nenhuma outra palavra ou explicação.
        O objeto deve ter EXATAMENTE as seguintes chaves: "superior", "inferior", "calcado", "cabelo", "acessorio".

        Cada chave deve conter um objeto com a seguinte estrutura:
        {{
            "nome": "Nome da Peça ou Sugestão",
            "descricao": "Descrição da peça/sugestão e como ela se encaixa no look.",
            "cores": ["Cor Principal", "Cor Secundária"],
            "tamanho": ["Sugestão de Tamanhos Disponíveis"],
            "detalhes": "Detalhes sobre o material, corte ou estilo.",
            "imagem": "URL de uma imagem de alta qualidade que represente a sugestão (use Pexels, Unsplash, etc.)"
        }}

        Exemplo da estrutura de saída COMPLETA:
        {{
          "superior": {{
            "nome": "Camisa de Seda Off-White",
            "descricao": "Uma camisa de seda elegante que traz um toque de sofisticação ao look, perfeita para o clima ameno do evento.",
            "cores": ["Off-White", "Creme"],
            "tamanho": ["P", "M", "G"],
            "detalhes": "Seda 100% pura com botões de madrepérola. Caimento fluido.",
            "imagem": "https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg"
          }},
          "inferior": {{
            "nome": "Calça de Alfaiataria Cinza",
            "descricao": "Calça com corte reto que alonga a silhueta, criando uma imagem profissional e moderna.",
            "cores": ["Cinza Chumbo", "Grafite"],
            "tamanho": ["38", "40", "42"],
            "detalhes": "Lã fria com pregas frontais e cintura alta.",
            "imagem": "https://images.pexels.com/photos/7679883/pexels-photo-7679883.jpeg"
          }},
          "calcado": {{
            "nome": "Scarpin Preto de Couro",
            "descricao": "Um clássico atemporal que finaliza o look com elegância e formalidade.",
            "cores": ["Preto"],
            "tamanho": ["35", "36", "37"],
            "detalhes": "Couro legítimo com bico fino e salto de 7cm.",
            "imagem": "https://images.pexels.com/photos/1445696/pexels-photo-1445696.jpeg"
          }},
          "cabelo": {{  
            "nome": "Coque Baixo Polido",
            "descricao": "Um penteado sofisticado que transmite elegância e mantém o foco no rosto e nos acessórios.",
            "cores": ["Preto", "Castanho"],
            "tamanho": [],
            "detalhes": "Finalizado com spray de brilho para um acabamento impecável e sem frizz.",
            "imagem": "https://images.pexels.com/photos/3992873/pexels-photo-3992873.jpeg"
          }},
          "acessorio": {{
            "nome": "Brincos de Pérola e Ouro",
            "descricao": "Acessório delicado que complementa a sofisticação do look sem sobrecarregar.",
            "cores": ["Dourado", "Branco Pérola"],
            "tamanho": [],
            "detalhes": "Ouro 18k com pérolas naturais de água doce.",
            "imagem": "https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg"
          }}
        }}

IMPORTANTE: O campo "cores" NUNCA deve estar vazio. Sempre forneça pelo menos uma cor principal e, se possível, uma cor secundária relacionada a cada item. 
Cada cor **deve ser APENAS UMA PALAVRA**, por exemplo: "vermelho", "azul", "verde". 
Não use adjetivos, múltiplas palavras ou combinações.


        Agora, gere o objeto JSON com base nas preferências do usuário.
    """

# (O resto do arquivo server.py continua igual)

@app.route("/api/recommendations", methods=["POST"])
def get_recommendations():
    try:
        user_preferences = request.get_json()
        print("Preferências recebidas:", user_preferences)
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        prompt = create_prompt(user_preferences)
        response = model.generate_content(prompt)
        text = response.text.strip().replace("```json", "").replace("```", "")
        print("Resposta da Gemini (após limpeza):", text)
        recommendations = json.loads(text)
        
        # Se o usuário escolheu email, enviar por email
        if user_preferences.get('contato') == 'email' and user_preferences.get('email'):
            try:
                email_usuario = user_preferences.get('email')
                print(f"🔍 DEBUG - Email do usuário recebido: {email_usuario}")
                
                # TEMPORÁRIO: Enquanto domínio não está verificado, usar apenas seu email
                email_destino = "stylo.ai.look@gmail.com"  # Seu email verificado
                print(f"🔍 DEBUG - Enviando para email verificado: {email_destino}")
                print(f"⚠️  NOTA: Domínio em verificação, usando email padrão temporariamente")
                
                send_recommendations_email(email_destino, recommendations)
                print(f"Email enviado para: {email_destino}")
            except Exception as email_error:
                print(f"Erro ao enviar email: {email_error}")
                # Continua normalmente mesmo se o email falhar
        
        return jsonify(recommendations)
    except Exception as e:
        print(f"Erro ao processar a requisição: {e}")
        return jsonify({"error": "Falha ao gerar recomendações.", "details": str(e)}), 500

def send_recommendations_email(email, recommendations):
    """Função de envio de email desabilitada (Resend removido)"""
    print("Função de envio de email desabilitada. Resend removido do projeto.")
    return False

def create_email_html(recommendations):
    """Cria o conteúdo HTML do email com as recomendações"""
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; }
            .content { padding: 30px; }
            .look-item { margin-bottom: 25px; padding: 20px; border-radius: 10px; background-color: #f8f9fa; border-left: 4px solid #667eea; }
            .look-item h3 { color: #333; margin-top: 0; font-size: 18px; }
            .look-item p { color: #666; margin: 8px 0; line-height: 1.5; }
            .color-preview { display: inline-block; width: 20px; height: 20px; border-radius: 50%; margin-right: 8px; vertical-align: middle; border: 2px solid #ddd; }
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; }
            .emoji { font-size: 20px; margin-right: 8px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌟 Seu Look Personalizado</h1>
                <p>Criamos uma combinação perfeita para você!</p>
            </div>
            <div class="content">
    """
    
    # Mapear categorias para emojis e nomes
    categories = {
        "superior": {"emoji": "👗", "name": "Parte Superior"},
        "inferior": {"emoji": "👖", "name": "Parte Inferior"},
        "calcado": {"emoji": "👠", "name": "Calçado"},
        "cabelo": {"emoji": "💇‍♀️", "name": "Cabelo"},
        "acessorio": {"emoji": "💎", "name": "Acessório"}
    }
    
    for category, item in recommendations.items():
        if item and item.get('nome'):
            cat_info = categories.get(category, {"emoji": "✨", "name": category.title()})
            colors = item.get('cores', [])
            
            html += f"""
                <div class="look-item">
                    <h3><span class="emoji">{cat_info['emoji']}</span>{cat_info['name']}: {item['nome']}</h3>
                    <p><strong>Descrição:</strong> {item.get('descricao', 'Não disponível')}</p>
            """
            
            if colors:
                html += f"""<p><strong>Cores:</strong> {', '.join(colors)}</p>"""
            
            if item.get('detalhes'):
                html += f"""<p><strong>Detalhes:</strong> {item['detalhes']}</p>"""
            
            html += "</div>"
    
    html += """
            </div>
            <div class="footer">
                <p>💫 Esperamos que você arrase com seu novo look!</p>
                <p>✨ Obrigado por usar nosso serviço de consultoria de moda!</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return html

@app.route("/api/test-email", methods=["POST"])
def test_email():
    """Rota para testar o envio de email"""
    try:
        data = request.get_json()
        test_email_address = data.get('email')
        
        if not test_email_address:
            return jsonify({"error": "Email é obrigatório"}), 400
        
        # Criar recomendações de teste
        test_recommendations = {
            "superior": {
                "nome": "Camisa Branca Clássica (TESTE)",
                "descricao": "Este é um email de teste do sistema.",
                "cores": ["Branco", "Azul"],
                "detalhes": "Teste de funcionalidade de email."
            }
        }
        
        # Tentar enviar email
        send_recommendations_email(test_email_address, test_recommendations)
        
        return jsonify({
            "success": True, 
            "message": f"Email de teste enviado com sucesso para {test_email_address}!"
        })
        
    except Exception as e:
        print(f"Erro no teste de email: {e}")
        return jsonify({
            "success": False, 
            "error": str(e)
        }), 500

@app.route('/send-email', methods=['POST'])
def send_email_route():
    """Rota para envio de emails via Flask-Mail (mais confiável)"""
    try:
        data = request.json
        to_email = data.get('to_email')
        recommendations = data.get('recommendations')
        user_preferences = data.get('user_preferences')
        
        if not to_email or not recommendations:
            return jsonify({
                "success": False,
                "error": "Email e recomendações são obrigatórios"
            }), 400
        
        # Criar o email
        subject = "🌟 Suas Recomendações de Moda - Stylo AI"
        
        # Corpo do email em HTML
        html_body = generate_email_html(recommendations, user_preferences)
        
        # Criar mensagem
        msg = Message(
            subject=subject,
            recipients=[to_email],
            html=html_body
        )
        
        # Enviar email
        mail.send(msg)
        
        print(f"✅ Email enviado com sucesso para {to_email}")
        return jsonify({
            "success": True,
            "message": "Email enviado com sucesso!"
        })
        
    except Exception as e:
        print(f"❌ Erro ao enviar email: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

def generate_email_html(recommendations, user_preferences):
    """Gera o HTML do email com as recomendações"""
    
    # Dados do usuário
    user_name = user_preferences.get('nome', 'Cliente')
    evento = user_preferences.get('evento', 'Não especificado')
    clima = user_preferences.get('clima', 'Não especificado')
    horario = user_preferences.get('horario', 'Não especificado')
    estilo = user_preferences.get('estilo', 'Não especificado')
    cores = user_preferences.get('corPreferida', 'Não especificado')
    altura = user_preferences.get('altura', 'Não especificado')
    
    # Montar detalhes das recomendações
    look_details = []
    
    if recommendations.get('superior'):
        item = recommendations['superior']
        look_details.append(f"👗 Parte Superior: {item.get('nome', 'N/A')} ({item.get('cor', 'N/A')})")
    
    if recommendations.get('inferior'):
        item = recommendations['inferior']
        look_details.append(f"👖 Parte Inferior: {item.get('nome', 'N/A')} ({item.get('cor', 'N/A')})")
    
    if recommendations.get('calcado'):
        item = recommendations['calcado']
        look_details.append(f"👠 Calçado: {item.get('nome', 'N/A')} ({item.get('cor', 'N/A')})")
    
    if recommendations.get('acessorio'):
        item = recommendations['acessorio']
        look_details.append(f"💎 Acessório: {item.get('nome', 'N/A')} ({item.get('cor', 'N/A')})")
    
    if recommendations.get('cabelo'):
        item = recommendations['cabelo']
        look_details.append(f"💇 Cabelo: {item.get('nome', 'N/A')} ({item.get('cor', 'N/A')})")
    
    look_text = "\\n".join(look_details)
    
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #f9f9f9; padding: 20px; }}
            .look-section {{ background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border: 1px solid #ddd; }}
            .preferences {{ background: #e8f4fd; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }}
            .recommendations {{ background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border: 1px solid #ddd; }}
            .price {{ font-size: 1.2em; font-weight: bold; color: #667eea; }}
            .footer {{ text-align: center; padding: 20px; color: #666; background: #f1f1f1; border-radius: 0 0 10px 10px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌟 Suas Recomendações de Moda Personalizadas</h1>
                <p>Criado especialmente para você pela Stylo AI</p>
            </div>
            
            <div class="content">
                <p>Olá <strong>{user_name}</strong>! 👋</p>
                
                <p>Sua consultoria de moda personalizada está pronta! Nossa IA analisou suas preferências e criou o look perfeito para você.</p>
                
                <div class="preferences">
                    <h3>📋 Suas Preferências</h3>
                    <p><strong>🎉 Evento:</strong> {evento}</p>
                    <p><strong>🌤️ Clima:</strong> {clima}</p>
                    <p><strong>⏰ Horário:</strong> {horario}</p>
                    <p><strong>✨ Estilo:</strong> {estilo}</p>
                    <p><strong>🎨 Cores Preferidas:</strong> {cores}</p>
                    <p><strong>📏 Altura:</strong> {altura}</p>
                </div>
                
                <div class="look-section">
                    <h2>✨ Look Personalizado Completo</h2>
                    <p><strong>Criado por:</strong> Stylo AI Recommendations</p>
                    <p><strong>Avaliação:</strong> ⭐ 5.0/5</p>
                    <p><strong>Investimento:</strong> <span class="price">Consultoria Gratuita</span></p>
                    
                    <h3>🎯 Composição do Seu Look:</h3>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-line;">{look_text}</div>
                </div>
                
                <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeaa7; margin: 15px 0;">
                    <p><strong>💡 Dica:</strong> Este look foi criado especialmente para você pela nossa IA de moda! Cada peça foi selecionada considerando suas preferências pessoais.</p>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>✨ Stylo AI - Recomendações Personalizadas de Moda ✨</strong></p>
                <p>Enviado com 💜 pela nossa plataforma de consultoria em moda</p>
                <p style="font-size: 0.9em; color: #888;">Obrigado por confiar na Stylo AI para suas escolhas de moda!</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return html

# Sistema de Autenticação Simples
USERS_FILE = 'users.json'

def load_users():
    """Carrega usuários do arquivo JSON"""
    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_users(users):
    """Salva usuários no arquivo JSON"""
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

import hashlib

def hash_password(password):
    """Hash simples da senha"""
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/api/register', methods=['POST'])
def register():
    """Registra um novo usuário"""
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        name = data.get('name', '').strip()

        if not email or not password or not name:
            return jsonify({'error': 'Todos os campos são obrigatórios'}), 400

        users = load_users()
        
        if email in users:
            return jsonify({'error': 'Email já está em uso'}), 400

        # Adiciona o usuário
        users[email] = {
            'name': name,
            'password': hash_password(password)
        }
        
        save_users(users)
        
        return jsonify({'message': 'Usuário criado com sucesso!'}), 201

    except Exception as e:
        return jsonify({'error': 'Erro interno do servidor'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    """Faz login do usuário"""
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')

        if not email or not password:
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400

        users = load_users()
        
        if email not in users:
            return jsonify({'error': 'Email ou senha incorretos'}), 401

        if users[email]['password'] != hash_password(password):
            return jsonify({'error': 'Email ou senha incorretos'}), 401

        return jsonify({
            'message': 'Login realizado com sucesso!',
            'user': {
                'email': email,
                'name': users[email]['name']
            }
        }), 200

    except Exception as e:
        return jsonify({'error': 'Erro interno do servidor'}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=port, debug=False)
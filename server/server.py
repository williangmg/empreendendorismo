# server/server.py
import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import resend

load_dotenv()
app = Flask(__name__)
CORS(app)

# Configuração do Resend
resend_api_key = os.environ.get('RESEND_API_KEY')
email_from = os.environ.get('EMAIL_FROM')

# Debug: verificar se as variáveis estão sendo lidas
print(f"🔍 RESEND_API_KEY: {'Definido' if resend_api_key else 'Não definido'}")
print(f"🔍 EMAIL_FROM: {email_from}")

# Configurar Resend
if resend_api_key:
    resend.api_key = resend_api_key
    EMAIL_ENABLED = True
    print(f"✅ Resend configurado com email: {email_from}")
else:
    EMAIL_ENABLED = False
    print("⚠️  AVISO: RESEND_API_KEY não configurado. Funcionalidade de email desabilitada.")

try:
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
except KeyError:
    print("Erro: A variável de ambiente GEMINI_API_KEY não foi encontrada.")
    exit()

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
    """Envia as recomendações por email usando Resend"""
    try:
        # Debug detalhado
        print(f"🔍 Debug na função send_recommendations_email:")
        print(f"   - EMAIL_ENABLED: {EMAIL_ENABLED}")
        print(f"   - RESEND_API_KEY: {'Definido' if resend_api_key else 'Não definido'}")
        print(f"   - EMAIL_FROM: {email_from}")
        print(f"   - EMAIL DE DESTINO (parâmetro): {email}")
        print(f"   - TIPO do email de destino: {type(email)}")
        
        if not EMAIL_ENABLED or not resend_api_key or not email_from:
            raise Exception(f"Configuração de email não disponível - API Key: {'OK' if resend_api_key else 'FALTA'}, Email From: {'OK' if email_from else 'FALTA'}")
            
        # Criar o conteúdo HTML do email
        html_content = create_email_html(recommendations)
        
        print(f"📧 Tentando enviar email para: {email}")
        print(f"📧 Usando remetente: {email_from}")
        
        # Enviar email usando Resend
        params = {
            "from": email_from,
            "to": email,  # Resend aceita string diretamente, não lista
            "subject": "🌟 Seu Look Personalizado está pronto!",
            "html": html_content,
        }
        
        print(f"📤 Parâmetros FINAIS do email: {params}")
        
        try:
            response = resend.Emails.send(params)
            print(f"📥 Resposta do Resend: {response}")
            print(f"✅ Email enviado com sucesso! ID: {response.get('id', 'N/A')}")
            return True
        except Exception as resend_error:
            print(f"❌ Erro específico do Resend: {resend_error}")
            print(f"❌ Tipo do erro: {type(resend_error)}")
            if hasattr(resend_error, 'response'):
                print(f"❌ Response do erro: {resend_error.response}")
            raise resend_error
        
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Erro ao enviar email: {error_msg}")
        
        # Diagnóstico de erros comuns
        if "unauthorized" in error_msg.lower() or "401" in error_msg:
            print("💡 Dica: Verifique se a API Key do Resend está correta")
        elif "domain" in error_msg.lower():
            print("💡 Dica: Verifique se o domínio no EMAIL_FROM está configurado no Resend")
        elif "from" in error_msg.lower():
            print("💡 Dica: Verifique o formato do EMAIL_FROM (ex: noreply@seudominio.com)")
            
        raise e

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

if __name__ == "__main__":
    app.run(port=3001, debug=True)
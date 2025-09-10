# server/server.py
import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

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
        return jsonify(recommendations)
    except Exception as e:
        print(f"Erro ao processar a requisição: {e}")
        return jsonify({"error": "Falha ao gerar recomendações.", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(port=3001, debug=True)
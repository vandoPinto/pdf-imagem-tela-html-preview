# Conversor de PDF para Imagens e HTML + Sprite

Este script converte um arquivo PDF (`final.pdf`) em imagens PNG, gera páginas HTML individuais para cada página e cria um sprite contendo todas as imagens organizadas em uma grade.

## 📌 Funcionalidades

✅ Converte cada página do PDF em uma imagem PNG.  
✅ Gera um arquivo HTML para cada página com a respectiva imagem.  
✅ Cria um sprite (pré-visualização) combinando todas as páginas.  

## 🛠 Tecnologias Utilizadas

- [pdf2pic](https://www.npmjs.com/package/pdf2pic) - Conversão de PDF para imagens.  
- [sharp](https://www.npmjs.com/package/sharp) - Manipulação de imagens para criar sprites.  
- `fs` e `path` - Manipulação de arquivos e diretórios no Node.js.  

## 📥 Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

## 🚀 Uso

1. Coloque o arquivo PDF que deseja converter na raiz do projeto e nomeie como `final.pdf`.
2. Execute o script:
   ```sh
   node index.js
   ```
3. As imagens serão salvas na pasta `imagens/`, os arquivos HTML na pasta `pages/`, e o sprite será salvo como `preview.jpg`.

## 📂 Estrutura do Projeto

```
📂 seu-repositorio
 ├── 📂 imagens   # Contém as imagens extraídas do PDF
 ├── 📂 pages     # Contém os arquivos HTML gerados e o sprite
 ├── final.pdf    # Arquivo PDF de entrada
 ├── index.js     # Script principal
 ├── package.json # Configuração do projeto
 ├── README.md    # Documentação
```

## 📝 Licença

Este projeto é de uso livre. Modifique e adapte conforme necessário! 🚀


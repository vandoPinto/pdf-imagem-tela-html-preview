const { fromPath } = require("pdf2pic");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const pdfFilePath = path.join(__dirname, "final.pdf");

const options = {
    density: 1000,
    saveFilename: "pagina",
    savePath: "./imagens",
    format: "png",
    width: 1082,
    height: 1082
};

const storeAsImage = fromPath(pdfFilePath, options);

const convertPDF = async () => {
    try {
        console.log("Iniciando conversão...");

        const totalPages = 25;
        const imgWidth = 1082;
        const imgHeight = 1082;
        const colunas = 2;

        // Criação das pastas, se não existirem
        if (!fs.existsSync("./imagens")) fs.mkdirSync("./imagens");
        if (!fs.existsSync("./pages")) fs.mkdirSync("./pages");

        // Conversão do PDF para imagens + HTML individual
        for (let i = 1; i <= totalPages; i++) {
            const savePath = path.join("./imagens", `pagina.${i}.png`);
            await storeAsImage(i, { saveFilename: `pagina.${i}`, savePath }).then((resolve) => {
                console.log(`Página ${i} convertida:`, resolve.path);
            });

            const htmlContent = `
            <div class="table-contents">
                <img src="imagens/pagina.${i}.png" style="width: 100%; height: 100%;">
            </div>
            `;

            const htmlFilePath = path.join("./pages", `page${i}.html`);
            fs.writeFileSync(htmlFilePath, htmlContent.trim());
            console.log(`Arquivo HTML criado: ${htmlFilePath}`);
        }

        console.log("Todas as imagens foram convertidas. Gerando sprite...");

        // Gera os buffers das imagens
        const imagens = Array.from({ length: totalPages }, (_, i) => `imagens/pagina.${i + 1}.png`);
        const buffers = await Promise.all(
            imagens.map(img => sharp(img).resize(imgWidth, imgHeight).toBuffer())
        );

        // Cálculo do tamanho final do sprite
        const linhas = Math.ceil((totalPages - 1) / colunas) + 1; // +1 linha da primeira imagem
        const spriteWidth = colunas * imgWidth;
        const spriteHeight = linhas * imgHeight;

        // Posicionamento das imagens
        const composite = [];

        // Primeira imagem na linha 0, coluna 0
        composite.push({
            input: buffers[0],
            top: 0,
            left: 0
        });

        // Restante das imagens
        for (let i = 1; i < buffers.length; i++) {
            const index = i - 1;
            const linha = Math.floor(index / colunas) + 1; // a partir da segunda linha
            const coluna = index % colunas;

            composite.push({
                input: buffers[i],
                top: linha * imgHeight,
                left: coluna * imgWidth
            });
        }

        // Cria sprite com sharp
        await sharp({
            create: {
                width: spriteWidth,
                height: spriteHeight,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            }
        })
            .composite(composite)
            .jpeg({ quality: 10 })
            .toFile('./pages/preview.jpg');

        console.log("✅ Sprite gerado como preview.jpg com layout personalizado.");
        console.log("🎉 Processo finalizado com sucesso!");
    } catch (error) {
        console.error("Erro durante o processo:", error);
    }
};

convertPDF();

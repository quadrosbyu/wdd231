// Manipulação das Datas do Rodapé
document.getElementById('anoAtual').textContent = new Date().getFullYear();
document.getElementById('ultimaModificacao').textContent = document.lastModified;

// Menu Hamburguer Responsivo
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuBtn.textContent = navMenu.classList.contains('open') ? '❌' : '☰';
});

// Lógica de manipulação do Diretório de Membros
const container = document.getElementById('membrosContainer');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

const urlJson = 'dados/membros.json';

// Função assíncrona para buscar os dados
async function carregarMembros() {
    try {
        const resposta = await fetch(urlJson);
        if (!resposta.ok) throw new Error('Erro ao carregar o arquivo JSON.');
        const dadosMembros = await resposta.json();
        exibirMembros(dadosMembros);
    } catch (erro) {
        console.error('Erro na requisição dos dados:', erro);
        container.innerHTML = `<p class="erro">Não foi possível carregar o diretório de membros neste momento.</p>`;
    }
}

// Função para renderizar os cartões na tela
function exibirMembros(membros) {
    container.innerHTML = ""; // Limpa o contêiner

    membros.forEach(membro => {
        const secao = document.createElement('section');
        secao.classList.add('membro-card');
        
        // Define o rótulo do nível de associação baseado no número
        let txtNivel = "Bronze";
        if (membro.nivel === 2) txtNivel = "Prata";
        if (membro.nivel === 3) txtNivel = "Ouro";

        secao.innerHTML = `
            <img src="${membro.imagem}" alt="Logotipo de ${membro.nome}" loading="lazy">
            <h3>${membro.nome}</h3>
            <p class="ramo-atividade">${membro.ramo}</p>
            <div class="detalhes-contato">
                <p>📍 ${membro.endereco}</p>
                <p>📞 ${membro.telefone}</p>
                <p>🌐 <a href="${membro.website}" target="_blank" rel="noopener">Visitar Website</a></p>
            </div>
            <span class="badge nivel-${membro.nivel}">${txtNivel}</span>
        `;
        container.appendChild(secao);
    });
}

// Eventos para alternância de layouts (Grid vs List)
gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// Executa a carga inicial dos dados
carregarMembros();

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inserir dinamicamente o ano atual no local reservado
    const anoAtualSpan = document.getElementById("anoAtual");
    if (anoAtualSpan) {
        anoAtualSpan.textContent = new Date().getFullYear();
    }

    // 2. Inserir dinamicamente a data de última modificação do documento
    const ultimaModificacaoP = document.getElementById("ultimaModificacao");
    if (ultimaModificacaoP) {
        ultimaModificacaoP.textContent = `Última modificação: ${document.lastModified}`;
    }

    // 3. Mecanismo de abertura e fechamento do Menu Hambúrguer (Responsividade)
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            // Atualiza o atributo de acessibilidade aria-expanded
            menuToggle.setAttribute("aria-expanded", isOpen);
        });
    }
});

async function loadCourses() {
    try {
        const response = await fetch('scripts/cursos.json'); // Caminho correto!
        if (!response.ok) throw new Error('Erro ao carregar dados');
        const data = await response.json();
        displayCourses(data);
    } catch (error) {
        console.error("Aviso: Não foi possível carregar os cursos via rede.", error);
        // Dica de ouro: se falhar, carregue um array "reserva" local para a auditoria não quebrar!
    }
}

// 1. Array de Cursos (Modifique 'completed' para true nos que você já concluiu)
const courses = [
    { id: "CSE 110", title: "Introduction to Programming", credits: 3, completed: true },
    { id: "WDD 130", title: "Web Fundamentals", credits: 3, completed: true },
    { id: "CSE 111", title: "Programming with Functions", credits: 3, completed: false },
    { id: "WDD 131", title: "Web Frontend Development I", credits: 3, completed: true },
    { id: "CSE 210", title: "Programming with Classes", credits: 3, completed: false },
    { id: "WDD 231", title: "Web Frontend Development II", credits: 3, completed: false }
];

document.addEventListener("DOMContentLoaded", () => {
    // 2. Ano Atual no Rodapé
    const anoAtualSpan = document.getElementById("anoAtual");
    if (anoAtualSpan) {
        anoAtualSpan.textContent = new Date().getFullYear();
    }

    // 3. Última Modificação
    const ultimaModificacaoP = document.getElementById("ultimaModificacao");
    if (ultimaModificacaoP) {
        ultimaModificacaoP.textContent = `Última modificação: ${document.lastModified}`;
    }

    // 4. Menu Hambúrguer
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen);
        });
    }

    // 5. Renderização dos Cursos e Filtros
    const coursesContainer = document.getElementById("courses-container"); // ID do container no HTML

    function displayCourses(filteredCourses) {
        if (!coursesContainer) return;
        
        // Limpa o container antes de renderizar
        coursesContainer.innerHTML = "";

        filteredCourses.forEach(course => {
            const courseCard = document.createElement("div");
            
            // Define classes base e uma classe extra caso o curso esteja concluído
            courseCard.classList.add("course-card");
            if (course.completed) {
                courseCard.classList.add("completed");
            }

            courseCard.innerHTML = `<h3>${course.id}</h3>`;
            coursesContainer.appendChild(courseCard);
        });
    }

    // Renderiza todos os cursos inicialmente
    displayCourses(courses);

    // Configuração dos botões de filtro (IDs devem corresponder ao seu HTML)
    const btnAll = document.getElementById("btn-all");
    const btnWdd = document.getElementById("btn-wdd");
    const btnCse = document.getElementById("btn-cse");

    if (btnAll) btnAll.addEventListener("click", () => displayCourses(courses));
    
    if (btnWdd) btnWdd.addEventListener("click", () => {
        const wddCourses = courses.filter(course => course.id.startsWith("WDD"));
        displayCourses(wddCourses);
    });

    if (btnCse) btnCse.addEventListener("click", () => {
        const cseCourses = courses.filter(course => course.id.startsWith("CSE"));
        displayCourses(cseCourses);
    });
});


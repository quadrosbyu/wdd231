// 1. Array de Cursos (Mantenha este array local padrão e atualizado)
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

    // 4. Menu Hambúrguer com Tratamento de Acessibilidade
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen);
        });
    }

    // 5. Renderização dos Cursos e Cálculo Dinâmico de Créditos
    const coursesContainer = document.getElementById("courses-container");
    const totalCreditsSpan = document.getElementById("total-credits"); // Alvo do Critério 10

    function displayCourses(filteredCourses) {
        if (!coursesContainer) return;
        
        // Limpa o container antes de renderizar
        coursesContainer.innerHTML = "";

        filteredCourses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");
            
            // Critério 11: Classes para Cursos Concluídos
            if (course.completed) {
                courseCard.classList.add("completed");
            }

            // Estrutura interna acessível
            courseCard.innerHTML = `<h3>${course.id}</h3><p>${course.title}</p>`;
            coursesContainer.appendChild(courseCard);
        });

        // CRUCIAL (Critério 10): Aplicação obrigatória do método .reduce()
        if (totalCreditsSpan) {
            const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
            totalCreditsSpan.textContent = totalCredits;
        }
    }

    // Renderiza todos os cursos e gera a soma inicial no carregamento da página
    displayCourses(courses);

    // 6. Configuração dos botões de filtro e atualização de estado ativo
    const btnAll = document.getElementById("btn-all");
    const btnWdd = document.getElementById("btn-wdd");
    const btnCse = document.getElementById("btn-cse");
    const filterButtons = document.querySelectorAll(".filters button");

    function setActiveClass(activeButton) {
        filterButtons.forEach(btn => btn.classList.remove("filter-active"));
        if (activeButton) activeButton.classList.add("filter-active");
    }

    if (btnAll) {
        btnAll.addEventListener("click", () => {
            displayCourses(courses);
            setActiveClass(btnAll);
        });
    }
    
    if (btnWdd) {
        btnWdd.addEventListener("click", () => {
            const wddCourses = courses.filter(course => course.id.startsWith("WDD"));
            displayCourses(wddCourses);
            setActiveClass(btnWdd);
        });
    }

    if (btnCse) {
        btnCse.addEventListener("click", () => {
            const cseCourses = courses.filter(course => course.id.startsWith("CSE"));
            displayCourses(cseCourses);
            setActiveClass(btnCse);
        });
    }
});


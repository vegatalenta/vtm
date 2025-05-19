
// Fonction pour afficher/fermer le menu
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('open');
}
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    if (query) {
        const result = document.createElement('p');
        result.innerHTML = `🔎 Résultats pour : <strong style="color:#00FF00;">${query}</strong>`;
        result.style.textAlign = "center";
        result.style.color = "#ffffff";
        result.style.marginTop = "20px";
        document.body.prepend(result);
    }


 
  // === Données articles ===
  const articles = [
    {
      title: "La Cybersecurity à l’ère moderne",
      image: "VTM.jpg",
      excerpt: "Découvrez les dernières avancées en matière de sécurité informatique et comment protéger vos données sensibles dans un monde hyperconnecté.",
      date: "15 mai 2025",
      author: "Alice Dupont",
      content: "La cybersécurité est devenue une priorité majeure face à l’augmentation exponentielle des attaques informatiques. Cet article explore les méthodes actuelles, les outils innovants, et les bonnes pratiques pour assurer la protection maximale de vos infrastructures numériques..."
    },
    {
      title: "Programmation avancée en Python",
      image: "g.jpg",
      excerpt: "Apprenez des techniques avancées en Python, du multiprocessing à la programmation asynchrone, pour écrire des applications performantes et scalables.",
      date: "10 mai 2025",
      author: "Jean Martin",
      content: "Python est un langage polyvalent, mais pour exploiter tout son potentiel, il est crucial de maîtriser des concepts avancés comme le threading, les coroutines, et les design patterns. Dans cet article, nous plongeons au cœur de ces techniques avec des exemples concrets..."
    },
    {
      title: "Hacking éthique : guide complet",
      image: "p.jpg",
      excerpt: "Explorez le monde du hacking éthique, ses principes, outils, et comment devenir un professionnel certifié en sécurité offensive.",
      date: "05 mai 2025",
      author: "Marie Curie",
      content: "Le hacking éthique est une discipline qui vise à identifier les failles de sécurité dans les systèmes informatiques avant que des acteurs malveillants ne les exploitent. Cet article couvre les bases, les certifications, et les ressources pour débuter dans ce domaine passionnant..."
    },
    {
      title: "Les bases du reverse engineering",
      image: "L.jpg",
      excerpt: "Une introduction aux techniques de rétro-ingénierie, utilisées pour analyser et comprendre le fonctionnement interne des logiciels et firmwares.",
      date: "01 mai 2025",
      author: "Paul Durand",
      content: "Le reverse engineering est un art complexe qui nécessite des connaissances approfondies en assembleur, débogage et analyse binaire. Ce tutoriel présente les outils incontournables et les premières étapes pour démarrer vos analyses..."
    }
  ];

  // === Variables slideshow articles ===
  let currentSlide = 0;

  const container = document.getElementById("articleContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Détermine combien d'articles afficher simultanément (2 sur desktop, 1 sur mobile)
  function articlesPerView() {
    return window.innerWidth <= 600 ? 1 : 2;
  }

  // Affiche les articles selon currentSlide
  function renderArticles() {
    const perView = articlesPerView();
    container.innerHTML = "";
    for(let i = 0; i < perView; i++) {
      const index = (currentSlide + i) % articles.length;
      const art = articles[index];
      const articleElem = document.createElement("article");
      articleElem.setAttribute("tabindex", "0");
      articleElem.innerHTML = `
        <img src="${art.image}" alt="Image article : ${art.title}" />
        <h3>${art.title}</h3>
        <p class="excerpt"></p>
        <div class="blog-meta">Publié le ${art.date} par ${art.author}</div>
        <a href="#" class="read-more" role="button" aria-label="Lire l'article complet : ${art.title}">Lire l'article</a>
      `;
      container.appendChild(articleElem);

      // Machine à écrire sur excerpt
      typeWriterExcerpt(articleElem.querySelector('.excerpt'), art.excerpt);
    }
  }

  // Machine à écrire sur extrait résumé
  function typeWriterExcerpt(element, text) {
    let idx = 0;
    element.textContent = "";
    function type() {
      if(idx < text.length) {
        element.textContent += text.charAt(idx);
        idx++;
        setTimeout(type, 15);
      }
    }
    type();
  }

  // Boutons navigation
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - articlesPerView() + articles.length) % articles.length;
    renderArticles();
  });

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + articlesPerView()) % articles.length;
    renderArticles();
  });

  // Gestion clic sur "Lire l'article"
  container.addEventListener("click", (e) => {
    if(e.target.classList.contains("read-more")) {
      e.preventDefault();
      const articleIndex = Array.from(container.children).indexOf(e.target.closest("article"));
      const art = articles[(currentSlide + articleIndex) % articles.length];
      openModal(art);
    }
  });

  // Modal elements
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImg = document.getElementById("modalImg");
  const modalDesc = document.getElementById("modalDesc");
  const modalClose = modal.querySelector(".close");

  // Ouvre modal
  function openModal(article) {
    modalTitle.textContent = article.title;
    modalImg.src = article.image;
    modalImg.alt = "Image détaillée article : " + article.title;
    modalDesc.textContent = article.content;
    modal.classList.add("active");
    modalClose.focus();
  }

  // Ferme modal
  function closeModal() {
    modal.classList.remove("active");
  }

  modalClose.addEventListener("click", closeModal);

  modalClose.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeModal();
    }
  });

  // Fermer modal avec touche Échap
  window.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Fermer modal si clic en dehors du contenu
  modal.addEventListener("click", (e) => {
    if(e.target === modal) {
      closeModal();
    }
  });

  // Mise à jour responsive à la redimension
  window.addEventListener("resize", renderArticles);

  // Initialisation
  renderArticles();
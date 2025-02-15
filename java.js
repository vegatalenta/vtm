<!-- Script pour l'ouverture et la fermeture du menu -->
    function toggleMenu() {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('active');
        const menuClose = document.querySelector('.menu-close');
        const menuToggle = document.querySelector('.menu-toggle');
        // Alterner l'affichage des icônes du menu
        menuClose.classList.toggle('active');
        menuToggle.classList.toggle('inactive');
    }

    let chatbotContainer = document.getElementById('chatbot-container');
    let openChatbotButton = document.getElementById('open-chatbot');
    let userInput = document.getElementById('user-input');
    let chatbotMessages = document.getElementById('chatbot-messages');
    
    // Ouvrir et fermer le chatbot
    function openChatbot() {
        chatbotContainer.style.display = 'flex';
        openChatbotButton.style.display = 'none'; // Masquer le bouton d'ouverture
    }
    
    // Fermer le chatbot
    function closeChatbot() {
        chatbotContainer.style.display = 'none';
        openChatbotButton.style.display = 'none'; // Afficher à nouveau le bouton d'ouverture
    }
    
    // Envoyer un message utilisateur et réponse du bot
    function sendMessage() {
        let input = userInput.value;
        if (input.trim() === "") return; // Ne pas envoyer si l'entrée est vide
    
        // Afficher le message de l'utilisateur
        let userMessage = document.createElement("div");
        userMessage.classList.add("message", "user-message");
        userMessage.innerHTML = `<p>${input}</p>`;
        chatbotMessages.appendChild(userMessage);
    
        // Effacer le champ de saisie
        userInput.value = '';
    
        // Réponse du chatbot
        setTimeout(function() {
            let botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot-message");
            botMessage.innerHTML = `<p>${getBotResponse(input)}</p>`;
            chatbotMessages.appendChild(botMessage);
    
            // Faire défiler les messages vers le bas
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000); // Délai de réponse
    }
    
    // Obtenir la réponse du chatbot
    function getBotResponse(input) {
        if (input.toLowerCase().includes("bonjour")) {
            return "Salut! Comment puis-je vous aider aujourd'hui ?";
        } else if (input.toLowerCase().includes("merci")) {
            return "De rien! À bientôt!";
        } else {
            return "Je n'ai pas bien compris. Pouvez-vous reformuler?";
        }
    }
    
    // Déplacer le chatbot (dragging)
    let isDragging = false;
    let offsetX, offsetY;
    
    function startDrag(e) {
        isDragging = true;
        offsetX = e.clientX - chatbotContainer.offsetLeft;
        offsetY = e.clientY - chatbotContainer.offsetTop;
        document.addEventListener('mousemove', dragChatbot);
        document.addEventListener('mouseup', stopDrag);
    }
    
    function dragChatbot(e) {
        if (isDragging) {
            chatbotContainer.style.left = (e.clientX - offsetX) + 'px';
            chatbotContainer.style.top = (e.clientY - offsetY) + 'px';
        }
    }
    
    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', dragChatbot);
        document.removeEventListener('mouseup', stopDrag);
    }
    

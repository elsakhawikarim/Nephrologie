// ========================================
// CLINIQUE DE NÉPHROLOGIE - SCRIPT JS
// ========================================

// 1. Gestion du fond d'écran dynamique
function changeBG(imageUrl) {
    document.body.style.backgroundImage = `url("${imageUrl}")`;
    // Sauvegarde le fond choisi
    localStorage.setItem('savedBackground', imageUrl);
}

// Charge le fond sauvegardé au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    const savedBG = localStorage.getItem('savedBackground');
    if (savedBG) {
        document.body.style.backgroundImage = `url("${savedBG}")`;
    } else {
        // Fond par défaut
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/elsakhawikarim/photos/main/jplenio-ocean-7461792_1920.jpg')";
    }

    // 2. Menu mobile (burger)
    const burger = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-menu');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Ferme le menu si on clique sur un lien
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 3. Animation de la barre de navigation au scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // 4. Formulaire de contact (simulation d'envoi)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Récupère les valeurs du formulaire
            const nom = document.getElementById('nom').value;
            const prenom = document.getElementById('prenom').value;
            const email = document.getElementById('email').value;

            // Affiche un message de confirmation
            alert(`Merci ${prenom} ${nom} ! Votre message a été envoyé. Nous vous contacterons sous 24h à l'adresse ${email}.`);

            // Réinitialise le formulaire
            contactForm.reset();

            // Dans un vrai site, tu enverrais les données à un serveur
            // Exemple avec FormSubmit (gratuit) :
            // contactForm.action = "https://formsubmit.co/tu@email.com";
            // contactForm.method = "POST";
        });
    }

    // 5. Animation au survol des cartes
    const cards = document.querySelectorAll('.service-card, .disease-card, .treatment-card, .team-card, .blog-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });

    // 6. Effet de défilement fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Animation des compteurs (si tu ajoutes des stats plus tard)
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                clearInterval(timer);
                element.textContent = target;
            }
        }, 20);
    }

    // 8. Lazy loading des images (pour optimiser le chargement)
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.3.1/dist/lazyload.min.js';
        document.body.appendChild(lazyLoadScript);

        const lazyLoadInstance = new LazyLoad({
            elements_selector: 'img[loading="lazy"]'
        });
    }
});
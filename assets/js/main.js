document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const navbarToggle = document.querySelector('.navbar__toggle');
    const navbarMenu = document.querySelector('.navbar__menu');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.navbar__menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
    
    // Funcionalidad para copiar la dirección de correo al hacer clic
    const emailElement = document.querySelector('.contact-text a[href^="mailto:"]');
    
    if (emailElement) {
        emailElement.addEventListener('click', function(event) {
            // El enlace ya manejará la apertura del cliente de correo
            // Esto es solo para mostrar feedback visual
            const originalText = this.textContent;
            
            // Añadir un tooltip o indicación que se ha copiado
            const tooltip = document.createElement('span');
            tooltip.textContent = '¡Abriendo cliente de correo!';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'var(--turquesa)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.bottom = '-30px';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s';
            
            // Posicionar el elemento padre como relativo para el tooltip
            this.parentElement.style.position = 'relative';
            this.parentElement.appendChild(tooltip);
            
            // Mostrar el tooltip
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            // Ocultar el tooltip después de 2 segundos
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    tooltip.remove();
                }, 300);
            }, 2000);
        });
    }
    
    // Animación de aparición al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .value-item, .portfolio-item, .contact-form, .contact-info__item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicialmente, establece los elementos como invisibles
    const elementsToAnimate = document.querySelectorAll('.service-card, .value-item, .portfolio-item, .contact-form, .contact-info__item');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Ejecutar animación al cargar la página y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Activar enlace del menú según la sección visible
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar__menu a');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Establecer la navegación activa inicialmente
    setActiveNavLink();
});
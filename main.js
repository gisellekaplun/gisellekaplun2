/* =========================================
   GISELLE KAPLUN SMM - JavaScript Principal
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('.nav__link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Navbar Scroll Effect (hide on down, show on up) ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const menuOpen = navMenu.classList.contains('active');

        if (currentScroll > lastScroll && currentScroll > 120 && !menuOpen) {
            nav.classList.add('nav--hidden');
        } else {
            nav.classList.remove('nav--hidden');
        }

        if (currentScroll > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScroll = currentScroll;
    });

    // --- Scroll Animations (AOS-like) ---
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Form Handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;

            const btn = contactForm.querySelector('.btn');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Enviando...';

            try {
                const response = await fetch('https://formspree.io/f/mdeoygrv', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        email: email,
                        telefono: telefono,
                        mensaje: mensaje
                    })
                });

                if (response.ok) {
                    contactForm.reset();
                    btn.textContent = '¡Mensaje enviado!';
                    btn.style.background = '#25D366';
                } else {
                    btn.textContent = 'Hubo un error, intentá de nuevo';
                    btn.style.background = '#E1524D';
                }
            } catch (error) {
                btn.textContent = 'Hubo un error, intentá de nuevo';
                btn.style.background = '#E1524D';
            }

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    });

    // --- FAQ Accordion ---
    const faqData = [
        {
            id: 1,
            question: "¿Puedo trabajar con vos si estoy empezando un emprendimiento?",
            answer: "<p>Sí. No necesitás tener todo resuelto para empezar.</p><p>Podemos trabajar desde una idea inicial, un emprendimiento que recién comienza o un negocio que ya está funcionando y necesita ordenar su presencia digital, su comunicación o su estrategia comercial.</p><p>La idea es partir de dónde estás hoy y definir juntos qué necesitás para avanzar.</p>"
        },
        {
            id: 2,
            question: "¿Trabajás solamente con redes sociales o también con estrategia de marketing digital?",
            answer: "<p>Las redes sociales son una parte del trabajo, pero no son el punto de partida.</p><p>También puedo ayudarte a pensar la estrategia de marketing digital, ordenar tu presencia online, trabajar la comunicación de tu marca, mejorar tu presencia en Google, desarrollar una web o landing page y detectar oportunidades comerciales.</p><p>Primero entendemos el negocio. Después vemos qué herramientas tienen sentido.</p>"
        },
        {
            id: 3,
            question: "¿Qué pasa si no sé exactamente qué necesito para mejorar mi presencia digital?",
            answer: "<p>No pasa nada. De hecho, es una de las situaciones más habituales.</p><p>No necesitás llegar con un diagnóstico ni saber qué servicio contratar.</p><p>Primero conversamos, conozco tu negocio, qué estás haciendo actualmente y qué querés conseguir. A partir de ahí detectamos qué está funcionando, qué se puede mejorar y por dónde conviene empezar.</p>"
        },
        {
            id: 4,
            question: "Tengo Instagram, pero siento que no representa mi negocio. ¿Podés ayudarme?",
            answer: "<p>Sí.</p><p>Podemos revisar qué estás comunicando, cómo se presenta tu negocio, qué información encuentra una persona cuando llega a tu perfil y qué oportunidades estás dejando pasar.</p><p>El objetivo no es simplemente que tu Instagram se vea mejor, sino que sea más claro, coherente con tu negocio y útil para las personas que podrían convertirse en clientes.</p>"
        },
        {
            id: 5,
            question: "¿Podés ayudarme a crear mi marca desde cero?",
            answer: "<p>Sí.</p><p>Podemos trabajar desde las primeras ideas: nombre, propuesta de valor, identidad, comunicación y presencia digital.</p><p>No se trata solamente de crear una identidad visual linda, sino de construir una marca que tenga sentido para el negocio y para las personas a las que querés llegar.</p>"
        },
        {
            id: 6,
            question: "¿Tengo que contratar todos los servicios o podemos empezar por lo más necesario?",
            answer: "<p>No tenés que contratar todo.</p><p>Prefiero trabajar por prioridades y empezar por lo que realmente puede generar un impacto en tu negocio.</p><p>A partir del diagnóstico podemos definir qué necesitás ahora y qué puede esperar para una segunda etapa.</p>"
        },
        {
            id: 7,
            question: "¿Trabajás con pequeños negocios y emprendimientos que tienen un presupuesto acotado?",
            answer: "<p>Sí.</p><p>Entiendo que no todos los negocios están en el mismo momento ni tienen las mismas posibilidades de inversión.</p><p>Por eso podemos pensar una estrategia por etapas, priorizando lo más importante y construyendo sobre esa base.</p><p>No todo tiene que resolverse de una vez.</p>"
        },
        {
            id: 8,
            question: "¿Cómo definís qué estrategia necesita cada negocio?",
            answer: "<p>No trabajo con una fórmula única.</p><p>Primero necesito entender el negocio: qué vendés, a quién, cómo estás llegando hoy a tus clientes, qué objetivos tenés y qué dificultades estás encontrando.</p><p>Con esa información puedo detectar oportunidades y definir qué acciones tienen más sentido para tu situación.</p>"
        },
        {
            id: 9,
            question: "¿Puedo contratar una consultoría comercial 1 a 1 sin contratar otros servicios?",
            answer: "<p>Sí.</p><p>Las sesiones 1 a 1 están pensadas para quienes necesitan una mirada externa para ordenar ideas, analizar una situación comercial, tomar una decisión o definir próximos pasos.</p><p>No es necesario contratar ningún otro servicio para trabajar de esta manera.</p>"
        },
        {
            id: 10,
            question: "¿Cómo es el primer paso para empezar a trabajar con vos?",
            answer: "<p>Es muy simple.</p><p>Agendamos una primera charla sin cargo y me contás qué estás haciendo, qué necesitás y hacia dónde querés llevar tu negocio.</p><p>A partir de esa conversación vemos si puedo ayudarte y cuál sería la mejor manera de hacerlo.</p>"
        }
    ];

    function renderFAQItems(container, limit) {
        const items = limit ? faqData.slice(0, limit) : faqData;
        container.innerHTML = items.map(item => `
            <div class="faq-item">
                <button class="faq-item__header" aria-expanded="false" aria-controls="faq-answer-${item.id}">
                    <span class="faq-item__question">${item.question}</span>
                    <span class="faq-item__icon" aria-hidden="true"></span>
                </button>
                <div class="faq-item__answer" id="faq-answer-${item.id}" role="region">
                    <div class="faq-item__answer-inner">${item.answer}</div>
                </div>
            </div>
        `).join('');
    }

    function initAccordion(container) {
        container.addEventListener('click', (e) => {
            const header = e.target.closest('.faq-item__header');
            if (!header) return;

            const item = header.closest('.faq-item');
            const answer = item.querySelector('.faq-item__answer');
            const isOpen = item.classList.contains('faq-item--open');

            if (isOpen) {
                item.classList.remove('faq-item--open');
                header.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('faq-item--open');
                header.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    }

    const faqPreview = document.getElementById('faq-preview');
    const faqFull = document.getElementById('faq-full');

    if (faqPreview) {
        renderFAQItems(faqPreview, 3);
        initAccordion(faqPreview);
    }

    if (faqFull) {
        renderFAQItems(faqFull);
        initAccordion(faqFull);
    }

    

    });

/* ============ CARRUSEL ¿SENTÍS QUE TE PASA? (4 tarjetas, loop infinito) ============ */
document.addEventListener("DOMContentLoaded", function () {
    var track = document.getElementById("situacionesTrack");
    var prev = document.getElementById("situacionesPrev");
    var next = document.getElementById("situacionesNext");
    if (!track || !prev || !next) return;

    var situaciones = [
        { numero: 1, titulo: "Tenés un buen producto ó servicio, pero te cuesta reflejarlo online.", texto: "Cuando alguien lo ve en redes, Google o WhatsApp no encuentra todo eso que hace que te elijan. Tu presencia digital no está a la altura de lo que realmente ofrecés.", imagen: "img/situations/sit 1.webp" },
        { numero: 2, titulo: "Estás en todas las áreas, no sabés qué priorizar.", texto: "Tenés mil ideas, herramientas y cosas pendientes. Querés hacer crecer tu negocio, pero terminás resolviendo lo urgente y postergando lo que realmente necesitás ordenar.", imagen: "img/situations/sit 2.webp" },
        { numero: 3, titulo: "Publicás, pero sin un criterio", texto: "Subís contenido porque sabés que tenés que estar presente, pero no siempre sabés qué decir, para qué publicarlo o cómo convertir esa presencia en oportunidades reales para tu negocio.", imagen: "img/situations/sit 3.webp" },
        { numero: 4, titulo: "Sabés lo que hacés, pero te cuesta destacar tu diferencial", texto: "Conocés tu producto o servicio mejor que nadie. Sin embargo, cuando tenés que contar qué hacés, para quién es o por qué deberían elegirte.", imagen: "img/situations/sit 4.webp" }
    ];

    function tarjetaHTML(s) {
        return '<li class="situaciones__card" role="group" aria-roledescription="slide" aria-label="Situación ' + s.numero + ' de 4">' +
            '<span class="situaciones__card-num">0' + s.numero + '</span>' +
            '<img class="situaciones__card-img" src="' + s.imagen + '" alt="Ilustración de la situación ' + s.numero + '" loading="lazy">' +
            '<h3 class="situaciones__card-title">' + s.titulo + '</h3>' +
            '<p class="situaciones__card-text">' + s.texto + '</p>' +
            '</li>';
    }

    // dos copias del set => loop infinito sin salto al volver al inicio
    track.innerHTML = situaciones.map(tarjetaHTML).join("") + situaciones.map(tarjetaHTML).join("");

    var tarjetas = track.children;
    var pos = 0;
    var setAncho = 0;    // ancho de 4 tarjetas + gaps (un set)
    var trackAncho = 0;  // ancho total = setAncho * 2
    var autoplay = null;
    var parado = false;
    var moviendo = false, inicioX = 0, inicioPos = 0;
    var VEL = 0.6;       // px por frame (lento y elegante)

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function medir() {
        var w = 0;
        for (var i = 0; i < situaciones.length; i++) {
            w += tarjetas[i].getBoundingClientRect().width + 12;
        }
        setAncho = w;
        trackAncho = w * 2;
    }

    // --cards-visible por breakpoint
    function cardsResponsive() {
        var vp = track.parentElement.clientWidth;
        var vis = vp < 760 ? 1.2 : 2.2;
        document.documentElement.style.setProperty("--cards-visible", vis);
        document.documentElement.style.setProperty("--cards-movil", vis < 2 ? 1.2 : 2.2);
    }
    cardsResponsive();
    window.addEventListener("resize", function () { cardsResponsive(); medir(); });

    function pintar(sinTransicion) {
        track.style.transition = sinTransicion ? "none" : "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)";
        track.style.transform = "translateX(" + (-pos) + "px)";
    }

    function loop() {
        if (parado) return;
        pos += VEL;
        if (pos >= setAncho) pos -= setAncho; // rebobinar sin salto visual
        pintar(true);
    }

    function arrancar() {
        if (parado || autoplay || reduceMotion) return;
        autoplay = window.setInterval(loop, 16);
    }
    function parar() {
        if (autoplay) { window.clearInterval(autoplay); autoplay = null; }
    }
    function reanudar() {
        if (!parado) arrancar();
    }

    medir();
    pintar(false);

    function ir(dir) {
        parar();
        var paso = tarjetas[0].getBoundingClientRect().width + 12;
        pos += dir * paso;
        if (pos < 0) pos = 0;
        if (pos > trackAncho - (paso * 2)) pos = trackAncho - (paso * 2);
        pintar(false);
        reanudar();
    }
    next.addEventListener("click", function () { ir(1); });
    prev.addEventListener("click", function () { ir(-1); });

    track.setAttribute("tabindex", "0");
    track.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); ir(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); ir(-1); }
    });

    track.addEventListener("pointerdown", function (e) {
        parar();
        moviendo = true;
        inicioX = e.clientX;
        inicioPos = pos;
        if (track.setPointerCapture) { try { track.setPointerCapture(e.pointerId); } catch (err) {} }
    });
    track.addEventListener("pointermove", function (e) {
        if (!moviendo) return;
        var dx = e.clientX - inicioX;
        pos = inicioPos - dx;
        if (pos < 0) pos = 0;
        pintar(true);
    });
    track.addEventListener("pointerup", function (e) {
        if (!moviendo) return;
        moviendo = false;
        var dx = e.clientX - inicioX;
        if (Math.abs(dx) > 40) {
            ir(dx < 0 ? 1 : -1);
        } else {
            var paso = tarjetas[0].getBoundingClientRect().width + 12;
            var idx = Math.round(pos / paso);
            pos = idx * paso;
            pintar(false);
            reanudar();
        }
    });
    track.addEventListener("pointerleave", function () { moviendo = false; });

    // pausa al interactuar
    track.addEventListener("mouseenter", parar);
    track.addEventListener("mouseleave", reanudar);
    track.addEventListener("focus", parar);
    track.addEventListener("blur", reanudar);
    document.addEventListener("visibilitychange", function () {
        document.hidden ? parar() : reanudar();
    });

    arrancar();

    // --- Lucide Icons ---
    if (window.lucide) {
        lucide.createIcons();
    }
});

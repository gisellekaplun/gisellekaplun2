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

    // --- Carrusel de identificación (situaciones) ---
    // Los SVG en img/situations son placeholders. Para usar fotografía real,
    // reemplazá cada archivo y actualizá la ruta en image.
    const situations = [
        { title: "Tenés un buen negocio, pero online no se nota.", image: "img/situations/sit-1.jpg", alt: "Local comercial callejero con productos visibles pero presencia digital desactualizada." },
        { title: "Publicás, pero no sabés para qué.", image: "img/situations/sit-2.jpg", alt: "Mujer pensando frente a su laptop mientras revisa las publicaciones de su negocio." },
        { title: "Tu negocio está en todos lados, pero cada canal dice algo distinto.", image: "img/situations/sit-3.jpg", alt: "Mesa con celular, laptop, cuaderno y café: múltiples canales descoordinados." },
        { title: "Sabés perfectamente lo que hacés, pero te cuesta explicarlo.", image: "img/situations/sit-4.jpg", alt: "Dueña de un negocio local atendiendo a una cliente, intentando explicar su producto." },
        { title: "Tenés mil ideas y no sabés por dónde empezar.", image: "img/situations/sit-5.jpg", alt: "Escritorio con post-its de colores, gráficos y cuaderno de planificación, lleno de ideas sin orden." },
        { title: "Tu negocio depende demasiado del boca en boca.", image: "img/situations/sit-6.jpg", alt: "Dos personas conversando en un café, recomendándose negocios de palabra." },
        { title: "Sentís que cada vez que publicás terminás vendiendo.", image: "img/situations/sit-7.jpg", alt: "Pantallas de laptop y celular mostrando tiendas online y medios de pago." },
        { title: "Todo lo urgente le gana a la estrategia.", image: "img/situations/sit-8.jpg", alt: "Emprendedora multitasking: habla por celular mientras trabaja en su laptop en un café." }
    ];

    const identCarousel = document.getElementById('situacionesCarousel');
    const identTrack = document.getElementById('situacionesTrack');

    if (identCarousel && identTrack) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        function slideHTML(s, i, clone) {
            return `<li class="identificacion__slide"${clone ? ' aria-hidden="true"' : ''}>
                <div class="identificacion__img">
                    <span class="identificacion__num">${String(i + 1).padStart(2, '0')}</span>
                    <img src="${s.image}" alt="${clone ? '' : s.alt}"${clone ? ' aria-hidden="true"' : ''} loading="lazy" width="800" height="600">
                </div>
                <div class="identificacion__body">
                    <p class="identificacion__title">${s.title}</p>
                </div>
            </li>`;
        }

        identTrack.innerHTML =
            situations.map((s, i) => slideHTML(s, i, false)).join('') +
            situations.map((s, i) => slideHTML(s, i, true)).join('');

        const slideEls = identTrack.children;
        const gap = parseFloat(getComputedStyle(identTrack).columnGap) || 24;
        const SPEED = 40; // px/s: lento y elegante

        let setWidth = 0;
        let pos = 0;
        let raf = 0;
        let lastTs = 0;
        let paused = false;
        let dragging = false;
        let inView = true;

        function measure() {
            setWidth = slideEls.length ? slideEls[situations.length].offsetLeft : 1;
        }

        function wrap(v) {
            if (!setWidth) return 0;
            v %= setWidth;
            return v < 0 ? v + setWidth : v;
        }

        function render() {
            identTrack.style.transform = `translate3d(${-pos}px, 0, 0)`;
        }

        function step(ts) {
            if (paused || dragging || reducedMotion.matches || !inView || !setWidth) {
                raf = 0;
                return;
            }
            if (!lastTs) lastTs = ts;
            const dt = Math.min(ts - lastTs, 100);
            lastTs = ts;
            pos = wrap(pos + (SPEED * dt) / 1000);
            render();
            raf = requestAnimationFrame(step);
        }

        function start() {
            if (paused || reducedMotion.matches || !inView) return;
            cancelAnimationFrame(raf);
            lastTs = 0;
            raf = requestAnimationFrame(step);
        }

        function stop() {
            cancelAnimationFrame(raf);
            raf = 0;
        }

        measure();
        render();

        // Pausa al pasar el mouse, reanuda al salir
        identCarousel.addEventListener('pointerenter', () => { paused = true; stop(); });
        identCarousel.addEventListener('pointerleave', () => { paused = false; start(); });

        // Arrastre con mouse / swipe en touch
        let startX = 0;
        let startPos = 0;
        let resumeTimer = 0;

        identCarousel.addEventListener('pointerdown', (e) => {
            dragging = true;
            paused = true;
            stop();
            identCarousel.classList.add('dragging');
            startX = e.clientX;
            startPos = pos;
            identCarousel.setPointerCapture(e.pointerId);
        });

        identCarousel.addEventListener('pointermove', (e) => {
            if (!dragging) return;
            const dx = e.clientX - startX;
            pos = wrap(startPos - dx);
            render();
        });

        function endDrag() {
            if (!dragging) return;
            dragging = false;
            identCarousel.classList.remove('dragging');
            clearTimeout(resumeTimer);
            resumeTimer = setTimeout(() => {
                paused = false;
                start();
            }, 3000);
        }

        identCarousel.addEventListener('pointerup', endDrag);
        identCarousel.addEventListener('pointercancel', endDrag);

        // Navegación con teclado
        identCarousel.addEventListener('keydown', (e) => {
            const stepWidth = slideEls.length ? slideEls[0].offsetWidth + gap : 0;
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                pos = wrap(pos + stepWidth);
                render();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                pos = wrap(pos - stepWidth);
                render();
            }
        });

        // Solo anima cuando la sección está visible
        const viewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                inView = entry.isIntersecting;
                if (inView) start();
                else stop();
            });
        });
        viewObserver.observe(identCarousel);

        // Reajuste al cambiar el viewport
        let reflowTimer = 0;
        window.addEventListener('resize', () => {
            clearTimeout(reflowTimer);
            reflowTimer = setTimeout(() => {
                measure();
                pos = wrap(pos);
                render();
            }, 150);
        });

        start();
    }

});

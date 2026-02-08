
// small helpers
const q = s => document.querySelector(s);
const qa = s => document.querySelectorAll(s);

// set year
q('#year').textContent = new Date().getFullYear();

// mobile menu toggle
const hamburger = q('#hamburger');
const mobileMenu = q('#mobileMenu');
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    mobileMenu.setAttribute('aria-hidden', !mobileMenu.classList.contains('open'));
});

// close mobile menu on nav click
qa('.mobile-menu .navlink').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
}));

// smooth scroll and active link highlight
const navLinks = qa('a.navlink');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
            // set active
            navLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Intersection Observer for reveal animations
const reveals = qa('.reveal');
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.12 });

reveals.forEach(r => obs.observe(r));

// progress bars animate when visible
qa('.progress > span').forEach(span => {
    const val = span.getAttribute('data-progress');
    const pbObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                span.style.width = val + '%';
            }
        });
    }, { threshold: 0.4 });
    pbObserver.observe(span);
});

// Scroll-to-top button
const toTop = q('#toTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight / 2) {
        toTop.classList.add('show');
    } else {
        toTop.classList.remove('show');
    }
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Simple contact form validation (client-side only)
const form = q('#contactForm');
const nameIn = q('#name');
const emailIn = q('#email');
const msgIn = q('#message');
const errName = q('#err-name');
const errEmail = q('#err-email');
const errMsg = q('#err-message');
const status = q('#formStatus');

function validateEmail(email) {
    // simple regex (not perfect but fine for demo)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    errName.textContent = ''; errEmail.textContent = ''; errMsg.textContent = '';
    status.textContent = '';

    if (!nameIn.value.trim()) { errName.textContent = 'Please enter your name.'; ok = false; }
    if (!validateEmail(emailIn.value.trim())) { errEmail.textContent = 'Enter a valid email.'; ok = false; }
    if (msgIn.value.trim().length < 10) { errMsg.textContent = 'Message should be at least 10 characters.'; ok = false; }

    if (!ok) return;

    // Simulate send (client-only). Replace with real submit (fetch) to your backend or service.
    status.textContent = 'Sending...';
    setTimeout(() => {
        status.textContent = alert('Message sent — thank you!');
        form.reset();
    }, 900);
});

// Highlight nav as you scroll through sections
const sections = Array.from(qa('main section'));
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const id = e.target.id;
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#' + id) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.45 });

sections.forEach(s => navObserver.observe(s));

// keyboard accessibility: close mobile menu on ESC
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') mobileMenu.classList.remove('open');
});
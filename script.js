document.getElementById('year').textContent = new Date().getFullYear();

/* ===========================
   NAVBAR — scroll glass effect
   =========================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ===========================
   MOBILE — hamburger menu
   =========================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const spans     = hamburger.querySelectorAll('span');

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
});

navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
});

/* ===========================
   TYPING EFFECT
   =========================== */
const titles    = ['Network Engineer II', 'Test Automation Specialist', 'Python Developer', '5G / LTE Expert'];
const typingEl  = document.getElementById('typingText');

let ti = 0, ci = 0, deleting = false;

function type() {
    const word = titles[ti];

    if (!deleting) {
        typingEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
    } else {
        typingEl.textContent = word.slice(0, --ci);
        if (ci === 0) {
            deleting = false;
            ti = (ti + 1) % titles.length;
            setTimeout(type, 350);
            return;
        }
    }

    setTimeout(type, deleting ? 45 : 80);
}

// Start typing after hero animation settles
setTimeout(type, 1100);

/* ===========================
   SCROLL REVEAL
   =========================== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const parent    = entry.target.parentElement;
        const isGrid    = parent && (
            parent.classList.contains('skills-grid') ||
            parent.classList.contains('projects-grid')
        );
        const delay = isGrid
            ? [...parent.children].indexOf(entry.target) * 90
            : 0;

        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
    });
}, {
    threshold:  0.1,
    rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

/* ===========================
   ACTIVE NAV LINK on scroll
   =========================== */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = navLinks.querySelectorAll('a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}, { passive: true });

/* ===========================
   SCROLL PROGRESS BAR
   =========================== */
const progressBar = document.getElementById('scrollProgressBar');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrolled / total) * 100}%`;
}, { passive: true });

/* ===========================
   BACK TO TOP
   =========================== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   COPY EMAIL
   =========================== */
const copyBtn = document.getElementById('copyEmail');
copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('gtrreddy5@gmail.com').then(() => {
        copyBtn.textContent = '✓';
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.textContent = '📋';
            copyBtn.classList.remove('copied');
        }, 2000);
    });
});

/* ===========================
   STATS COUNT-UP
   =========================== */
function countUp(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const step     = target / (duration / 16);
    let current    = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => {
            entry.target.classList.add('visible');
            const num = entry.target.querySelector('.stat-number[data-target]');
            if (num) countUp(num);
        }, i * 120);
        statObserver.unobserve(entry.target);
    });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-item').forEach(el => statObserver.observe(el));

/* ===========================
   NETWORK PARTICLE ANIMATION
   =========================== */
const canvas = document.getElementById('particlesCanvas');
const ctx    = canvas.getContext('2d');
const COUNT  = 55;
const DIST   = 130;
let particles = [];

function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

class Dot {
    constructor() { this.init(); }
    init() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r  = Math.random() * 1.4 + 0.8;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.65)';
        ctx.fill();
    }
}

function initDots() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(new Dot());
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x;
            const dy   = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < DIST) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - dist / DIST) * 0.28})`;
                ctx.lineWidth   = 0.7;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => { resizeCanvas(); initDots(); });
resizeCanvas();
initDots();
animateParticles();

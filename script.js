/* ==========================================================================
   CONFIGURATION SECTION
   Edit the links and statistics below to update the website easily.
   ========================================================================== */
const CONFIG = {
    links: {
        whatsappChannel: "https://whatsapp.com/channel/your-channel-link",
        movieGroup: "https://chat.whatsapp.com/your-movie-group-link",
        premiumAppsGroup: "https://chat.whatsapp.com/your-apps-group-link",
        backupGroup: "https://chat.whatsapp.com/your-backup-group-link",
        contact: {
            whatsapp: "https://wa.me/your-number",
            telegram: "https://t.me/your-telegram-username",
            youtube: "https://youtube.com/@your-channel",
            email: "mailto:contact@chathu-md.com"
        }
    },
    stats: {
        members: 15000,
        downloads: 50000,
        communities: 4,
        dailyVisitors: 2500
    }
};

/* ==========================================================================
   1. INITIALIZE LINKS FROM CONFIG
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Update Community Links
    document.getElementById('btn-whatsapp-hero').href = CONFIG.links.whatsappChannel;
    document.getElementById('link-whatsapp').href = CONFIG.links.whatsappChannel;
    document.getElementById('link-movie').href = CONFIG.links.movieGroup;
    document.getElementById('link-apps').href = CONFIG.links.premiumAppsGroup;
    document.getElementById('link-backup').href = CONFIG.links.backupGroup;

    // Update Contact Links
    document.getElementById('contact-whatsapp').href = CONFIG.links.contact.whatsapp;
    document.getElementById('contact-telegram').href = CONFIG.links.contact.telegram;
    document.getElementById('contact-youtube').href = CONFIG.links.contact.youtube;
    document.getElementById('contact-email').href = CONFIG.links.contact.email;

    // Update Stats Data Targets
    const counters = document.querySelectorAll('.counter');
    counters[0].setAttribute('data-target', CONFIG.stats.members);
    counters[1].setAttribute('data-target', CONFIG.stats.downloads);
    counters[2].setAttribute('data-target', CONFIG.stats.communities);
    counters[3].setAttribute('data-target', CONFIG.stats.dailyVisitors);
});

/* ==========================================================================
   2. LOADING ANIMATION
   ========================================================================== */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500); // 1.5s delay for dramatic effect
});

/* ==========================================================================
   3. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

/* ==========================================================================
   4. SCROLL REVEAL ANIMATION (Intersection Observer)
   ========================================================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

/* ==========================================================================
   5. ANIMATED STATISTICS COUNTERS
   ========================================================================== */
const statsSection = document.getElementById('stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower is faster

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText.replace(/,/g, ''); // Remove commas for calculation
            if (count < target) {
                counter.innerText = Math.ceil(count + increment).toLocaleString();
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString() + (target > 100 ? '+' : '');
            }
        };
        updateCount();
    });
}

/* ==========================================================================
   6. CYBER PARTICLE BACKGROUND ANIMATION (Canvas)
   ========================================================================== */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() * 1) - 0.5;
        this.speedY = (Math.random() * 1) - 0.5;
        // Randomly assign neon blue or purple
        this.color = Math.random() > 0.5 ? 'rgba(0, 243, 255, ' : 'rgba(188, 19, 254, ';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
        ctx.fillStyle = this.color + '0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    // Number of particles based on screen size (fewer on mobile for performance)
    const numberOfParticles = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(0, 243, 255,' + opacityValue * 0.15 + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
}

// Handle resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Start animation
initParticles();
animateParticles();
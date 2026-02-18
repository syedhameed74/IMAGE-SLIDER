const slides = document.querySelector(".slides");
const images = document.querySelectorAll("img");
const clickSound = document.getElementById("clickSound");

let index = 0;

function showSlide(i) {
    slides.style.transform = `translateX(${-i * 1200}px)`;

    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");

    clickSound.currentTime = 0;
    clickSound.play();
}

document.getElementById("next").onclick = () => {
    index = (index + 1) % images.length;
    showSlide(index);
};

document.getElementById("prev").onclick = () => {
    index = (index - 1 + images.length) % images.length;
    showSlide(index);
};

setInterval(() => {
    index = (index + 1) % images.length;
    showSlide(index);
}, 5000);

showSlide(index);

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 120; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
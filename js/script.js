// Home section
// Ensure the page starts at the home section
window.onload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typed-text");
    const text = "Nikol Alexandrova";
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < text.length) {
            textElement.innerHTML += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 200); // Typing speed
        }
    }
    typeEffect();


});


document.addEventListener("DOMContentLoaded", function () {
    const codeElement = document.getElementById("code-block");
    const cursor = document.getElementById("cursor");

    const codeLines = [
        "function introduceMyself() {",
        "    console.log(\"A passionate developer, tech enthusiast, and problem solver.\");",
        "    console.log(\"I build innovative solutions that make an impact.\");",
        "}",
        "introduceMyself();"
    ];

    let index = 0;
    let charIndex = 0;
    let currentLine = "";
    let isDeleting = false;

    function typeCode() {
        if (!isDeleting) {
            if (charIndex < codeLines[index].length) {
                currentLine += codeLines[index].charAt(charIndex);
                charIndex++;
                codeElement.innerHTML = `<span class="text-blue-400">function</span> introduceMyself() {<br> <span class="text-green-500">${currentLine}</span>`;
            } else {
                charIndex = 0;
                index++;
                if (index < codeLines.length) {
                    currentLine += "<br>";
                } else {
                    setTimeout(() => (isDeleting = true), 1000);
                }
            }
        } else {
            if (charIndex < currentLine.length) {
                currentLine = currentLine.slice(0, -1);
                charIndex++;
                codeElement.innerHTML = `<span class="text-blue-400">function</span> introduceMyself() {<br> <span class="text-green-500">${currentLine}</span>`;
            } else {
                index = 0;
                charIndex = 0;
                currentLine = "";
                isDeleting = false;
            }
        }
        setTimeout(typeCode, isDeleting ? 30 : 80);
    }

    typeCode();
});

// About section

document.addEventListener("DOMContentLoaded", () => {
    const codeLines = [
        "const aboutMe = {",
        "   name: 'Nikol',",
        "   profession: 'Developer',",
        "   skills: ['JavaScript', 'React', 'Node.js'],",
        "   passion: 'Building innovative solutions',",
        "   motto: 'Code is poetry!'",
        "};",
        "",
        "console.log(`Hi! I'm ${aboutMe.name}, a passionate ${aboutMe.profession}.`);",
        "console.log(`I love ${aboutMe.passion}, and my skills include ${aboutMe.skills.join(', ')}.`);",
        "console.log(`My motto is: ${aboutMe.motto}`);"
    ];

    let currentLine = 0;
    const codeSnippet = document.getElementById("code-snippet");

    function revealCodeLine() {
        const line = document.createElement("div");
        line.classList.add("line");
        line.textContent = codeLines[currentLine];
        codeSnippet.appendChild(line);

        setTimeout(() => {
            line.style.opacity = 1;
        }, 100);  // Adding small delay for each line

        currentLine++;

        if (currentLine < codeLines.length) {
            setTimeout(revealCodeLine, 1500); // Delay between lines of code
        }
    }

    // Start the reveal after a short delay
    setTimeout(revealCodeLine, 500);
});


document.addEventListener("DOMContentLoaded", function () {
    const homeCanvas = document.getElementById("particleCanvas");
    const aboutCanvas = document.getElementById("particleCanvasAbout");

    function syncCanvas(sourceCanvas, targetCanvas) {
        targetCanvas.width = sourceCanvas.width;
        targetCanvas.height = sourceCanvas.height;
        targetCanvas.getContext("2d").drawImage(sourceCanvas, 0, 0);
    }

    setInterval(() => {
        syncCanvas(homeCanvas, aboutCanvas);
    }, 50); // Sync every 50ms
});

// PROJECTS SECTION

document.addEventListener("DOMContentLoaded", function () {
    const projectContainer = document.getElementById("project-container");
    const projectTrack = document.getElementById("project-track");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    const scrollStep = 400; // How much to scroll per arrow click

    function updateArrowVisibility() {
        prevBtn.style.display = projectContainer.scrollLeft > 0 ? "flex" : "none";
        nextBtn.style.display =
            projectContainer.scrollLeft + projectContainer.clientWidth < projectTrack.scrollWidth ? "flex" : "none";
    }

    // Scroll with buttons
    nextBtn.addEventListener("click", () => {
        projectContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
        setTimeout(updateArrowVisibility, 500); // Wait for scroll animation
    });

    prevBtn.addEventListener("click", () => {
        projectContainer.scrollBy({ left: -scrollStep, behavior: "smooth" });
        setTimeout(updateArrowVisibility, 500);
    });

    // Enable manual scrolling (updates arrows in real time)
    projectContainer.addEventListener("scroll", updateArrowVisibility);

    // Ensure proper visibility on load
    updateArrowVisibility();
});


document.addEventListener("DOMContentLoaded", function () {
    function createParticleEffect(canvasId, backgroundColor) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return; // Ensure the canvas exists before proceeding
        const ctx = canvas.getContext("2d");

        let particlesArray = [];
        const numParticles = 80;

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setCanvasSize();

        class Particle {
            constructor() {
                this.size = Math.random() * 3 + 2;
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.6;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
                if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(34, 139, 34, 0.8)"; // Green particles
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < numParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particlesArray.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animateParticles);
        }

        window.addEventListener("mousemove", (event) => {
            let mouseX = event.clientX;
            let mouseY = event.clientY;

            particlesArray.forEach((particle) => {
                let dx = mouseX - particle.x;
                let dy = mouseY - particle.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    let angle = Math.atan2(dy, dx);
                    particle.x -= Math.cos(angle) * 2;
                    particle.y -= Math.sin(angle) * 2;
                }
            });
        });

        window.addEventListener("resize", () => {
            setCanvasSize();
            initParticles();
        });

        initParticles();
        animateParticles();
    }

    // Apply particle effect to multiple sections
    createParticleEffect("particleCanvas", "rgba(200, 230, 200, 1)"); // Home Section
    createParticleEffect("particleCanvasAbout", "rgba(200, 230, 200, 1)"); // About Section
    createParticleEffect("particleCanvasSkills", "rgba(200, 230, 200, 1)"); // Skills Section
    createParticleEffect("particleCanvasProjects", "rgba(200, 230, 200, 1)"); // Projects Section
    createParticleEffect("particleCanvasContact", "rgba(200, 230, 200, 1)"); // Contact Section
});

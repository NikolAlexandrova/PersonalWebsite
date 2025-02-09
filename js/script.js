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

// AI Chatbot


document.addEventListener("DOMContentLoaded", function () {
    const chatToggle = document.getElementById("chat-toggle");
    const chatContainer = document.getElementById("chat-container");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    // Toggle chatbox visibility
    chatToggle.addEventListener("click", () => {
        chatContainer.classList.toggle("hidden");

        // Show the prewritten message when chat is opened
        if (!chatContainer.classList.contains("hidden") && chatMessages.children.length === 0) {
            chatMessages.innerHTML += `<div class="text-left"><span class="bg-gray-200 p-2 rounded-lg">You can ask me about Nikol's career plans, motivation, availability, education, or what she finds fun!</span></div>`;
        }
    });

    // Send message when the button is clicked
    sendBtn.addEventListener("click", async () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Display user message
        chatMessages.innerHTML += `<div class="text-right"><span class="bg-green-300 p-2 rounded-lg">${userMessage}</span></div>`;
        chatInput.value = "";

        // Display typing animation for the bot
        const botTypingMessage = `<div class="text-left"><span class="bg-gray-200 p-2 rounded-lg">...</span></div>`;
        chatMessages.innerHTML += botTypingMessage;

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Get AI response
        const botResponse = await fetchChatbotResponse(userMessage);

        // Remove the typing message and display the real response with typing animation
        const botMessage = document.querySelector(".bg-gray-200");
        if (botMessage) botMessage.remove(); // Remove typing message

        // Display the bot's response with a typing effect
        typeBotResponse(botResponse);
    });

    // Send message when "Enter" key is pressed
    chatInput.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission if any
            sendBtn.click(); // Trigger the send button click action
        }
    });

    // Function to simulate typing effect for bot's response
    async function typeBotResponse(response) {
        let index = 0;
        const botMessageDiv = document.createElement("div");
        botMessageDiv.classList.add("text-left");
        const botMessageSpan = document.createElement("span");
        botMessageSpan.classList.add("bg-gray-200", "p-2", "rounded-lg");
        botMessageDiv.appendChild(botMessageSpan);
        chatMessages.appendChild(botMessageDiv);

        // Typing effect simulation
        const typingInterval = setInterval(() => {
            botMessageSpan.textContent += response.charAt(index);
            index++;
            if (index === response.length) {
                clearInterval(typingInterval);
            }
        }, 100); // Adjust the typing speed here (in ms)
    }

    // Function to get chatbot response
    async function fetchChatbotResponse(message) {
        const apiKey = "your-api-key-here"; // Replace with your API key

        // Predefined responses
        if (message.toLowerCase().includes("fun") || message.toLowerCase().includes("hobbies")) {
            return "Nikol's hobbies include Krav Maga, Hiking, and Photography.";
        }

        if (message.toLowerCase().includes("languages") || message.toLowerCase().includes("skills")) {
            return "Nikol's skills include Java, Svelte, Docker, Laravel, JavaScript, SQL, and more!";
        }

        if (message.toLowerCase().includes("about") || message.toLowerCase().includes("who is") || message.toLowerCase().includes("Nikol") || message.toLowerCase().includes("Nicole")) {
            return "Nikol Alexandrova is a passionate developer, tech enthusiast, and problem solver. She builds innovative solutions with technologies like JavaScript, React, and Node.js.";
        }

        if (message.toLowerCase().includes("projects") || message.toLowerCase().includes("work")) {
            return "Nikol has worked on various projects including a Food Saver app, a student organization website, and a security services chatbot.";
        }

        if (message.toLowerCase().includes("contact") || message.toLowerCase().includes("reach")) {
            return "You can contact Nikol via email at n1kol1vay@gmail.com or through LinkedIn and GitHub!";
        }
        
        if (message.toLowerCase().includes("improve") || message.toLowerCase().includes("tips")) {
            return "To improve your coding skills, practice regularly, work on real-world projects, and always keep learning from others!";
        }

        if (message.toLowerCase().includes("career") || message.toLowerCase().includes("motivation")) {
            return "Nikol aims to solve real-world problems with innovative technology, build impactful solutions, and contribute to open-source communities.";
        }
             
        if (message.toLowerCase().includes("available") || message.toLowerCase().includes("work") || message.toLowerCase().includes("availability")) {
            return "Nikol is currently open to new opportunities and freelance projects! Feel free to reach out via email or LinkedIn.";
        }

        if (message.toLowerCase().includes("study") || message.toLowerCase().includes("education")) {
            return "Nikol studied Information and Communication Technology at HZ University of Applied Sciences and earned a propedeuse certificate.";
        }
        // Fetch AI response if no predefined answers match
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";
    }
});

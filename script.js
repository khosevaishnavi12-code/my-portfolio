/* =====================================
   VAISHNAVI KHose - PORTFOLIO JAVASCRIPT
===================================== */


/* ===== 1. TYPING ANIMATION ===== */

const typingElement = document.getElementById("typing");

const roles = [
    "Web Developer",
    "Frontend Developer",
    "App Developer",
    "Tech Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingElement.textContent =
        currentRole.substring(0, characterIndex);

    let speed = deleting ? 45 : 90;

    if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        speed = 1400;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 350;
    }

    setTimeout(typeEffect, speed);
}

if (typingElement) {
    typingElement.textContent = "";
    typeEffect();
}


/* ===== 2. FLOATING PARTICLES ===== */

const particleContainer = document.getElementById("particles");

if (
    particleContainer &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    const particleCount = window.innerWidth < 600 ? 18 : 35;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 8 + "s";
        particle.style.animationDuration =
            (6 + Math.random() * 8) + "s";

        const size = 2 + Math.random() * 3;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particleContainer.appendChild(particle);
    }
}


/* ===== 3. AUTOMATIC FOOTER YEAR ===== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ===== 4. ACTIVE NAVIGATION LINK ===== */

const navigationLinks = document.querySelectorAll(".nav-links a");

const pageSections = document.querySelectorAll(
    "main section[id]"
);

function updateActiveNavigation() {
    let currentSection = "home";

    pageSections.forEach((section) => {
        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navigationLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );
    });
}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

window.addEventListener("load", updateActiveNavigation);


/* ===== 5. SCROLL REVEAL ANIMATIONS ===== */

const revealElements = document.querySelectorAll(
    ".section-label, .section h2, .section-text, " +
    ".card, .hero-content, .hero-visual"
);

if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    revealElements.forEach((element) => {
        if (
            element.classList.contains("hero-content") ||
            element.classList.contains("hero-visual")
        ) {
            return;
        }

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        if (
            !element.classList.contains("hero-content") &&
            !element.classList.contains("hero-visual")
        ) {
            revealObserver.observe(element);
        }
    });
}


/* ===== 6. CONSOLE MESSAGE ===== */

console.log(
    "%c Welcome to Vaishnavi's Portfolio! ",
    "background: #7c3aed; color: white; padding: 8px; border-radius: 5px;"
);
/* =================================
   LIGHT / DARK THEME SWITCH
================================= */

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");

// Restore the saved theme
if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeButton() {
    if (!themeToggle) return;

    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "🌙" : "☀️";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

    themeToggle.setAttribute(
        "title",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );
}

updateThemeButton();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeButton();
    });
}

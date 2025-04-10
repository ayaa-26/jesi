document.addEventListener("DOMContentLoaded", () => {
    const cursorLine = document.createElement("div");
    cursorLine.classList.add("cursor-line");
    document.body.appendChild(cursorLine);

    document.addEventListener("mousemove", (e) => {
        cursorLine.style.left = `${e.pageX}px`;
        cursorLine.style.top = `${e.pageY}px`;
        cursorLine.style.height = `${Math.random() * 150 + 50}px`; // Random height
    });

    particlesJS("particles-js", {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: ["#000000", "#FFA500"] }, // Black and Orange
            shape: { type: "circle" },
            opacity: { value: 0.8, random: true },
            size: { value: 4, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#FFA500",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 3,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true,
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 },
            },
        },
        retina_detect: true,
    });
});

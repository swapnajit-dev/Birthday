document.addEventListener("DOMContentLoaded", () => {
    const birthdayBtn = document.getElementById("birthday-btn");
    const sagarImages = document.querySelectorAll(".image-pair");
    const cakeBtn = document.getElementById("cake-btn");
    const cakeContainer = document.getElementById("cake-container");

    // Initially hide images
    sagarImages.forEach(image => {
        image.style.display = "none";
    });

    // Load sound effects
    const birthdaySound = new Audio("birthday.mp3");
    const cakeSound = new Audio("pop.mp3");

    // Celebrate Button Click Event
    birthdayBtn.addEventListener("click", () => {
        // Play sound
        birthdaySound.play();

        // Confetti effect
        let confettiInterval = setInterval(() => {
            confetti({
                particleCount: 100,
                spread: 160,
                origin: { y: 0.6 }
            });
        }, 300);

        // Stop confetti after 3 seconds
        setTimeout(() => clearInterval(confettiInterval), 3000);

        // Show images with GSAP animation
        sagarImages.forEach((image, index) => {
            image.style.display = "block"; // Make images visible
            gsap.fromTo(image, 
                { opacity: 0, scale: 0.8, y: 50 }, 
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    duration: 1, 
                    delay: index * 0.3, 
                    ease: "power2.out" 
                }
            );
        });
    });

    // Surprise Cake Button Click Event
    cakeBtn.addEventListener("click", () => {
        cakeSound.play();
        cakeContainer.style.display = "block";
        gsap.to(cakeContainer, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out"
        });

        // Play subtle shaking animation on the cake
        gsap.to(cakeContainer, {
            x: 5,
            repeat: -1,
            yoyo: true,
            duration: 0.2
        });
    });

    // Scroll-triggered image animations
    gsap.utils.toArray(".image-pair").forEach((image) => {
        gsap.fromTo(image, 
            { opacity: 0, scale: 0.8, y: 50 },
            { 
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: image,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
});
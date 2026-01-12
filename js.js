(function () {
  'use strict';

  // 1. Typewriter Effect
  const roles = [
    "Web Developer",
    "MEAN Stack Developer",
    "Angular Developer",
    "Programmer"
  ];

  let index = 0;
  const typewriter = document.querySelector(".typewriter");

  function changeText() {
    if (typewriter) {
      typewriter.textContent = roles[index];
      index = (index + 1) % roles.length;
    }
  }

  // Initial call and interval
  if (typewriter) {
    changeText();
    setInterval(changeText, 2000);
  }


  // 2. Skill Buttons Observer
  const skillButtons = document.querySelectorAll(".skill-btn");
  if (skillButtons.length > 0) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    skillButtons.forEach((btn) => skillsObserver.observe(btn));
  }


  // 3. Document Loaded Actions (Cards Animation)
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    if (cards.length > 0) {
      const cardsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("card-left")) {
              entry.target.classList.add("fadeInLeft");
            } else {
              entry.target.classList.add("fadeInRight");
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      cards.forEach(card => cardsObserver.observe(card));
    }
  });


  // 4. Stats Counter (Refactored to use IntersectionObserver instead of scroll event for performance)
  const statsSection = document.querySelector("#Stats");
  const stats = document.querySelectorAll(".stat-number");

  if (statsSection && stats.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stats.forEach(s => {
            s.classList.add("visible");
            startCountUp(s);
          });
          observer.unobserve(entry.target); // Run once
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    statsObserver.observe(statsSection);
  }

  function startCountUp(el) {
    const target = +el.getAttribute("data-target");
    let count = 0;
    const speed = target / 100;

    const update = () => {
      count += speed;
      if (count < target) {
        el.textContent = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  }


  // 5. Contact Form Validation
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      // Helper to show/hide error
      const toggleError = (id, show) => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("d-none", !show);
      };

      // Name
      const name = document.getElementById("name");
      if (name && name.value.trim().length < 3) {
        toggleError("nameError", true);
        isValid = false;
      } else {
        toggleError("nameError", false);
      }

      // Phone
      const phone = document.getElementById("phone");
      const phoneRegex = /^[0-9]{10,15}$/;
      if (phone && !phoneRegex.test(phone.value)) {
        toggleError("phoneError", true);
        isValid = false;
      } else {
        toggleError("phoneError", false);
      }

      // Email
      const email = document.getElementById("email");
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (email && !emailRegex.test(email.value)) {
        toggleError("emailError", true);
        isValid = false;
      } else {
        toggleError("emailError", false);
      }

      // Message
      const message = document.getElementById("message");
      if (message && message.value.trim().length < 10) {
        toggleError("messageError", true);
        isValid = false;
      } else {
        toggleError("messageError", false);
      }

      // Success
      if (isValid) {
        const successMsg = document.getElementById("successMsg");
        if (successMsg) successMsg.classList.remove("d-none");
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          if (successMsg) successMsg.classList.add("d-none");
        }, 5000);
      }
    });
  }


  // 6. Form Fade-in Animation
  const messageSection = document.querySelector(".form");
  if (messageSection) {
    const formObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          messageSection.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    formObserver.observe(messageSection);
  }


  // 7. Site Protection (Anti-Inspect)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  document.addEventListener("keydown", (e) => {
    // F12
    if (e.key === "F12") e.preventDefault();

    // Ctrl+Shift+I / Cmd+Option+I
    if (e.ctrlKey && e.shiftKey && e.key === "I") e.preventDefault();
    if (e.metaKey && e.altKey && e.key === "I") e.preventDefault();

    // Ctrl+Shift+J / Cmd+Option+J
    if (e.ctrlKey && e.shiftKey && e.key === "J") e.preventDefault();
    if (e.metaKey && e.altKey && e.key === "J") e.preventDefault();

    // Ctrl+U → view source
    if (e.ctrlKey && e.key === "u") e.preventDefault();
  });

})();

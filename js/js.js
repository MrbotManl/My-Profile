const roles = [
  "Web Developer",
  "MEAN Stack Developer",
  "Angular Developer",
  "Programmer"
];

let index = 0;
const typewriter = document.querySelector(".typewriter");

function changeText() {
  typewriter.textContent = roles[index];
  index = (index + 1) % roles.length;
}

setInterval(changeText, 2000);
changeText();


// ////////////////////////////////////////////////////////////////////////////////

const skillButtons = document.querySelectorAll(".skill-btn");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);  
      }
    });
  },
  { threshold: 0.2 }  
);

skillButtons.forEach((btn) => observer.observe(btn));


// let cursor = document.querySelector(".cursor");


// document.body.addEventListener('mousemove', function (eventInfo) {
//     cursor.style.top=eventInfo.clientY+'px'
//     cursor.style.left=eventInfo.clientX+'px'
// });

// ////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        if(entry.target.classList.contains("card-left")){
          entry.target.classList.add("fadeInLeft");
        } else {
          entry.target.classList.add("fadeInRight");
        }
        observer.unobserve(entry.target); // عشان يظهر مرة واحدة  
      }
    });
  }, { threshold: 0.3 }); // يظهر لما 30% من الكرت يكون داخل الشاشة

  cards.forEach(card => observer.observe(card));
});


// //////////////////////////////////////////////////////////////////
const stats = document.querySelectorAll(".stat-number");
let started = false; // عشان يشتغل مرة واحدة بس

function startCountUp(el) {
  const target = +el.getAttribute("data-target");
  let count = 0;
  const speed = target / 100; // سرعة العد

  const update = () => {
    count += speed;
    if (count < target) {
      el.textContent = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };

  update();
}

function handleScroll() {
  const section = document.querySelector("#Stats");
  const position = section.getBoundingClientRect().top;

  if (position < window.innerHeight - 100 && !started) {
    stats.forEach(s => {
      s.classList.add("visible");
      startCountUp(s);
    });
    started = true;
  }
}

window.addEventListener("scroll", handleScroll);
// //////////////////////////////////////////////////////////////

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // Name
  const name = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  if (name.value.trim().length < 3) {
    nameError.classList.remove("d-none");
    isValid = false;
  } else {
    nameError.classList.add("d-none");
  }

  // Phone
  const phone = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(phone.value)) {
    phoneError.classList.remove("d-none");
    isValid = false;
  } else {
    phoneError.classList.add("d-none");
  }

  // Email
  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.classList.remove("d-none");
    isValid = false;
  } else {
    emailError.classList.add("d-none");
  }

  // Message
  const message = document.getElementById("message");
  const messageError = document.getElementById("messageError");
  if (message.value.trim().length < 10) {
    messageError.classList.remove("d-none");
    isValid = false;
  } else {
    messageError.classList.add("d-none");
  }

  // Success
  if (isValid) {
    document.getElementById("successMsg").classList.remove("d-none");
    form.reset();
  }
});

// Fade-in on scroll
const massageSection = document.querySelector(".form");

const observer3 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // شغّل الأنيميشن
      massageSection.style.animationPlayState = "running";
      // توقف المراقبة عشان ما يعيدش الأنيميشن
      observer3.unobserve(massageSection);
    }
  });
});

// ابدأ المراقبة
observer3.observe(massageSection);





// document.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
// });


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

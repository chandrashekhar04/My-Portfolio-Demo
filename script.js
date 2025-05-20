// Scroll tracking using Intersection Observer
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("aside nav ul li a");

// Intersection Observer to detect current section in viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === id) {
          link.classList.add("active");
        }
      });
    }
  });
}, {
  threshold: 0.6  // 60% section visible hone par trigger ho
});

// Observe all sections
sections.forEach(section => observer.observe(section));

// Optional: Smooth scroll (if CSS doesn't handle it)
navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const words = [
  "Creative Graphic Designer",
  "Video Editor",
  "Tech Enthusiast",
  "Lifelong Learner"
];

const typingText = document.getElementById("typing-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let deletingSpeed = 80;
let pauseBetween = 2000; // pause before deleting

function type() {
  const currentWord = words[wordIndex];
  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, pauseBetween);
      return;
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

// Start typing effect after page loads
document.addEventListener("DOMContentLoaded", () => {
  type();
});

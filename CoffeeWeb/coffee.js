document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profileBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");


  document.getElementById("menuToggle").addEventListener("click", function () {
    this.classList.toggle("active");
    document.getElementById("navbar").classList.toggle("active");
});

  // Profile dropdown toggle
  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove("active");
    }
  });

  // Mobile menu toggle (WORKING version)
  menuToggle.onclick = function () {
    navbar.classList.toggle("active");
  };
});

// Carousel
const carousel = document.querySelector('.reviews-carousel');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

next.addEventListener('click', () => {
  carousel.scrollBy({ left: 400, behavior: 'smooth' });
});

prev.addEventListener('click', () => {
  carousel.scrollBy({ left: -400, behavior: 'smooth' });
});

// FAQ
const items = document.querySelectorAll(".faq-item");

items.forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

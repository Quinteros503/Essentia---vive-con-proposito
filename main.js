document.addEventListener("DOMContentLoaded", () => {
  // ===== Scroll suave =====
  window.scrollToSection = function (id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  // ===== Configuración del carrusel =====
  let currentIndex = 0;
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-track .card');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  function moveCarousel(direction) {
    const visibleCards = Math.floor(window.innerWidth / 340);
    const maxIndex = Math.max(cards.length - visibleCards, 0);

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const offset = currentIndex * -340;
    track.style.transform = `translateX(${offset}px)`;
  }

  // ===== Botones del carrusel =====
  prevBtn.addEventListener('click', () => moveCarousel(-1));
  nextBtn.addEventListener('click', () => moveCarousel(1));

  // ===== Soporte táctil para móviles =====
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      moveCarousel(diff < 0 ? 1 : -1);
      isDragging = false;
    }
  });

  track.addEventListener('touchend', () => {
    isDragging = false;
  });

  // ===== Ajuste al cambiar tamaño de ventana =====
  window.addEventListener('resize', () => moveCarousel(0));
});

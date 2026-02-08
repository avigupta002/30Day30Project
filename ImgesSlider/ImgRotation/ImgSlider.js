
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
let activeIndex = 1;

function updateSlider() {
    cards.forEach((card, index) => {
        const offset = index - activeIndex;
        const scale = index === activeIndex ? 1.2 : 0.9;
        const opacity = index === activeIndex ? 1 : 0.6;
        const zIndex = index === activeIndex ? 10 : 5;
        card.style.transform = `translateX(${offset * 270}px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = zIndex;
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

updateSlider();

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        activeIndex = index;
        updateSlider();
    });
});

setInterval(() => {
    activeIndex = (activeIndex + 1) % cards.length;
    updateSlider();
}, 3000);

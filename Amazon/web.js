
function openMenu() {
    document.getElementById("sideMenu").style.left = "0";
    document.getElementById("overlay").style.display = "block";
}

function closeMenu() {
    document.getElementById("sideMenu").style.left = "-260px";
    document.getElementById("overlay").style.display = "none";
}

function moveSlides(id, direction) {
    const carousel = document.getElementById(id);
    const scrollAmount = 300; // slide size per click

    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
    });
}


const strip = document.getElementById("stripCarousel");
document.querySelector(".next").onclick = () => {
    strip.scrollBy({ left: 300, behavior: "smooth" });
};
document.querySelector(".prev").onclick = () => {
    strip.scrollBy({ left: -300, behavior: "smooth" });
};

const products = [
    {
        title: "Up to 60% | Kitchen Essentials",
        desc: "High-quality cookware set for daily home use.",
        price: "₹999",
        main: "assets4/box1.jpg",
        thumbs: ["assets4/box1.jpg", "assets4/box2.jpg", "assets4/box3.jpg", "assets4/box4.jpg"]
    },
    {
        title: "Up to 70% | Smart Home Gadgets",
        desc: "Automatic sensor LED lights to brighten your home.",
        price: "₹299",
        main: "assets4/box5.jpg",
        thumbs: ["assets4/box6.jpg", "assets4/box7.jpg", "assets4/box8.jpg", "assets4/box9.jpg"]
    },
    {
        title: "Up to 50% | Premium Storage",
        desc: "Multipurpose airtight food container set.",
        price: "₹499",
        main: "assets4/box10.jpg",
        thumbs: ["assets4/box11.jpg", "assets4/box12.jpg", "assets4/box13.jpg", "assets4/box14.jpg"]
    },
    {
        title: "Up to 40% | Home Accessories",
        desc: "Soft cotton bedsheet with two pillow covers.",
        price: "₹799",
        main: "assets4/box15.jpg",
        thumbs: ["assets4/box16.jpg", "assets4/box10.jpg", "assets4/box15.jpg", "assets4/box11.jpg"]
    }
];

function loadCards() {
    const cards = document.querySelectorAll(".card");
    
    cards.forEach((card, index) => {
        const data = products[index];

        card.querySelector(".card-title").textContent = data.title;
        card.querySelector(".desc").textContent = data.desc;
        card.querySelector(".price-box").textContent = "Price: " + data.price;

        // Set main image
        const mainImg = card.querySelector(".main-img");
        mainImg.src = data.main;
        const thumbs = card.querySelectorAll(".thumb-box img");
        thumbs.forEach((thumb, i) => {
            thumb.src = data.thumbs[i];
            thumb.onclick = () => {
                mainImg.src = data.thumbs[i];
            };
        });
    });
}

loadCards();

document.querySelector(".back-to-top").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



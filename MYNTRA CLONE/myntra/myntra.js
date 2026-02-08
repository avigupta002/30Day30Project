function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });
}

// Show initial slide
document.addEventListener("DOMContentLoaded", () => {
    // Slider Functionality
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    let currentSlide = 0;
    const slideInterval = 3000; // Change slide every 3 seconds

    function showSlide(index) {
        const slidesContainer = document.querySelector(".slides-container");
        slidesContainer.style.transform = `translateX(${-100 * index}%)`;
    }

    // Show initial slide
    showSlide(currentSlide);

    // Automatic slide transition
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides; // Loop back to the first slide
        showSlide(currentSlide);
    }, slideInterval);
});


// Dark mode functionality
let darkmode = localStorage.getItem('darkmode');
const themeswitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    darkmode = 'active'; // Update the variable
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'inactive');
    darkmode = 'inactive'; // Update the variable
};

// Check the localStorage value on page load
if (darkmode === "active") enableDarkmode();

themeswitch.addEventListener("click", () => {
    if (darkmode !== "active") {
        enableDarkmode();
    } else {
        disableDarkmode();
    }
});

// Responsive Navbar Toggle (for mobile view)
const navBar = document.querySelector(".nav-bar");
document.querySelector(".menu-toggle").addEventListener("click", () => {
    navBar.style.display = navBar.style.display === "none" ? "flex" : "none";
});


document.querySelectorAll('.nav_bar > a').forEach(item => {
    item.addEventListener('mouseover', () => {
        const dropdown = item.nextElementSibling;
        if (dropdown) dropdown.style.display = 'block';
    });

    item.addEventListener('mouseout', () => {
        const dropdown = item.nextElementSibling;
        if (dropdown) dropdown.style.display = 'none';
    });
});

        const clothlist = [
            "Polo shirt",
            "Dress shirt",
            "T-shirt",
            "Flannel shirt",
            "Henley shirt",
            "Sweat shirt",
            "Hoodie",
            "Cardigan",
            "Pullover sweater",
            "Turtleneck sweater",
            "Blazer",
            "Sports jacket",
            "Suit jacket",
            "Trench coat",
            "Wrap dress",
            "Maxi dress",
            "Cocktail dress",
            "Evening gown",
            "Bodycon dress",
            "Slip dress",
            "Skater dress",
            "Ball gown",
            "Bikini",
            "One-piece swimsuit",
            "Tankini",
            "Swimsuit cover-up",
        ];

        const resultsbox = document.querySelector(".results");
        const inputbox = document.querySelector(".search_input");

        inputbox.addEventListener("input", function() {
            const searchTerm = inputbox.value.toLowerCase();
            const filteredResults = clothlist.filter(cloth => cloth.toLowerCase().includes(searchTerm));
            displayResults(filteredResults);
        });

        const displayResults = function(results) {
            resultsbox.innerHTML = ''; // Clear previous results
            if (results.length > 0) {
                results.forEach(cloth => {
                    const li = document.createElement('li');
                    li.textContent = cloth;
                    li.onclick = () => selectInput(cloth);
                    resultsbox.appendChild(li);
                });
                resultsbox.style.display = 'block'; // Show results
            } else {
                resultsbox.style.display = 'none'; // Hide results if no match
            }
        };

        const selectInput = function(selectedItem) {
            inputbox.value = selectedItem; // Set input value to selected item
            resultsbox.style.display = 'none'; // Hide results after selection
        };
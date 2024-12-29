const searchBar = document.getElementById("search-bar");
const searchForm = document.getElementById("search-form");
const posterContainer = document.getElementById('poster-container');

const checkUser = () => {

};

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    renderGames(searchBar.value);
});

// Add a loading state
const homeLoadingStateDiv = document.getElementById('loader');
const postersContainer = document.getElementById('poster-container');

function showLoading() {
    homeLoadingStateDiv.style.display = 'flex';
    if (posterContainer) {
        postersContainer.style.display = 'none';
    }
}

function hideLoading() {
    setTimeout(() => {
        homeLoadingStateDiv.style.display = 'none';
        if (posterContainer) {
            postersContainer.style.display = 'grid';
        }
    }, 200);
}

const renderGames = (search) => {
    showLoading();
    fetch(`http://localhost:5000/api/games?search=${search}`)
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                const games = response.data;
                posterContainer.innerHTML = "";

                games.forEach(game => {
                    // Create a slug from the game title for the URL
                    const gameSlug = game.title.toLowerCase().replace(/\s+/g, '-');

                    // Create elements
                    const linkElement = document.createElement('a');
                    const imgElement = document.createElement('img');
                    const imgContainer = document.createElement('div');
                    const paragraphContainer = document.createElement('div');
                    const gameTitle = document.createElement('p');
                    const gameGenre = document.createElement('p');

                    // Add CSS classes
                    imgContainer.classList.add("individual-poster-container");
                    gameTitle.classList.add("poster-title");
                    paragraphContainer.classList.add("game-descriptions");
                    gameGenre.classList.add("game-genre");

                    // Set content
                    imgElement.src = game.url;
                    imgElement.alt = game.title;
                    gameTitle.innerText = game.title;
                    gameGenre.innerText = game.genre;
                    linkElement.href = `/game/${gameSlug}`;

                    // Append elements to container
                    posterContainer.appendChild(linkElement);
                    linkElement.appendChild(imgContainer);
                    imgContainer.appendChild(imgElement);
                    imgContainer.appendChild(paragraphContainer);
                    paragraphContainer.appendChild(gameTitle);
                    paragraphContainer.appendChild(gameGenre);
                });
            } else {
                console.error('Failed to fetch games:', response);
            }
        })
        .catch(error => console.error('Error fetching games', error))
        .finally(() => {
            hideLoading();
        });
};

let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');
const navLinks = document.querySelectorAll('.slider-nav a');

function showSlide(index) {
    // Hide all slides and reset nav link classes
    if (slides.length) {
        slides.forEach((slide, i) => {
            slide.style.display = 'none';
            navLinks[i].classList.remove('active', 'inactive');
            navLinks[i].classList.add(i === index ? 'active' : 'inactive');
        });

        slides[index].style.display = 'block';
        slides[index].style.opacity = '0';
        setTimeout(() => {
            slides[index].style.transition = 'opacity 1s ease';
            slides[index].style.opacity = '1';
        }, 50);

        setTimeout(() => {
            slides[index].style.transition = 'opacity 1s ease';
            slides[index].style.opacity = '0';
        }, 6000);
    }
}

function autoSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Initialize
showSlide(currentSlide);
let intervalId = setInterval(autoSlide, 7000);

navLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
        if (index === currentSlide) return;
        currentSlide = index;
        showSlide(currentSlide);

        // Restart interval
        clearInterval(intervalId);
        intervalId = setInterval(autoSlide, 7000);
    });
});

renderGames();

const user = document.getElementById("user-icon-container");
const logOutBtn = document.querySelector(".log-out-btn");

user.addEventListener("click", () => {
    logOutBtn.classList.toggle("block");
});

logOutBtn.addEventListener("click", () => {
    // Removing the current user from the session
    localStorage.removeItem("user");

    window.location.replace('/');
});

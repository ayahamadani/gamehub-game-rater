// Add the functionality to click the websites name to go back to the home page
const gameHub = document.querySelector(".website-title");
const currentUrl = window.location.href;
const baseDirectory = currentUrl.substring(0, currentUrl.lastIndexOf('/'));

if (gameHub) {
    gameHub.addEventListener("click", () => {
        window.location.href = baseDirectory.concat("/home.html");
    });
} else {
    console.error("Element with class '.website-title' not found.");
}

// Get the game slug from the URL
const urlParams = new URLSearchParams(window.location.search);
const gameSlug = urlParams.get('id');

// Add a loading state
const loadingStateDiv = document.getElementById('loader');
const container = document.getElementById('game-container');

function showLoading() {
    loadingStateDiv.style.display = 'flex';
    container.style.display = 'none';
}

function hideLoading() {
    loadingStateDiv.style.display = 'none';
    container.style.display = 'flex';
}

if (gameSlug) {

    showLoading();

    fetch(`http://localhost:5000/api/games/${gameSlug}`)
        .then((res) => res.json())
        .then((response) => {
            if (response.success) {
                const game = response.data;

                // Create elements for the game details
                const imgElement = document.createElement('img');
                const imgElementContainer = document.createElement('div');
                const gameDetailsContainer = document.createElement('div');
                const titleElement = document.createElement('h1');
                const descriptionElement = document.createElement('p');
                const genreElement = document.createElement('p');
                const ratingElement = document.createElement('p');
                const developerElement = document.createElement('p');
                const releaseDateElement = document.createElement('p');

                // Set content
                imgElement.src = game.url;
                imgElement.alt = game.title;
                titleElement.innerText = game.title;
                descriptionElement.innerText = `Description: ${game.description}`;
                genreElement.innerText = `Genre: ${game.genre}`;
                ratingElement.innerText = `Rating: ${game.rating}`;
                developerElement.innerText = `Developer: ${game.developer}`;
                releaseDateElement.innerText = `Release Date: ${new Date(game.releaseDate).toLocaleDateString()}`;

                // Add ID's for each element
                imgElement.setAttribute('id', 'game-image');
                titleElement.setAttribute('id', 'game-title');
                descriptionElement.setAttribute('id', 'game-description');
                genreElement.setAttribute('id', 'game-genre');
                ratingElement.setAttribute('id', 'game-rating');
                developerElement.setAttribute('id', 'game-developer');
                releaseDateElement.setAttribute('id', 'game-release-date');
                imgElementContainer.setAttribute('id', 'image-element-container');
                gameDetailsContainer.setAttribute('id', 'game-details-container');

                // Append elements
                imgElementContainer.appendChild(imgElement);
                container.appendChild(imgElementContainer);
                container.appendChild(gameDetailsContainer);
                gameDetailsContainer.appendChild(titleElement);
                gameDetailsContainer.appendChild(genreElement);
                gameDetailsContainer.appendChild(ratingElement);
                gameDetailsContainer.appendChild(developerElement);
                gameDetailsContainer.appendChild(releaseDateElement);
                gameDetailsContainer.appendChild(descriptionElement);
            } else {
                console.error('Game not found:', response.message);
                container.innerHTML = '<p>Game not found.</p>';
            }
        })
        .catch((error) => {
            console.error('Error fetching game details:', error);
            container.innerHTML = '<p>Failed to load game details.</p>';
        })
        .finally(() => {
            hideLoading();
        });
}

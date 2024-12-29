// Add the functionality to click the websites name to go back to the home page
const gameHub = document.querySelector(".website-title");
const currentUrl = window.location.href;
const baseDirectory = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
const game = JSON.parse(document.getElementById("gameslug").textContent);

if (gameHub) {
    gameHub.addEventListener("click", () => {
        window.location.href = "/home";
    });
} else {
    console.error("Element with class '.website-title' not found.");
}

// Add a loading state
const loadingStateDiv = document.getElementById('loader');
const container = document.getElementById('game-container');

function showLoading() {
    loadingStateDiv.style.display = 'flex';
    container.style.display = 'none';
}

function hideLoading() {
    setTimeout(() => {
        loadingStateDiv.style.display = 'none';
        container.style.display = 'flex';
    }, 200);
}


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

if (game) {
    hideLoading();

    // Set content
    imgElement.src = game.url;
    imgElement.alt = game.title;
    titleElement.innerText = game.title;
    descriptionElement.innerText = `Description: ${game.description}`;
    genreElement.innerText = `Genre: ${game.genre}`;
    ratingElement.innerText = `Rating: ${game.rating}`;
    developerElement.innerText = `Developer: ${game.developer}`;
    releaseDateElement.innerText = `Release Date: ${new Date(game.releaseDate).toLocaleDateString()}`;
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

}





const searchBar = document.getElementById("search-bar");
const searchForm = document.getElementById("search-form");
const container = document.getElementById('poster-container');

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    renderGames(searchBar.value);
});

const renderGames = (search) => {
    fetch(`http://localhost:5000/api/games?search=${search}`)
    .then(res => res.json())
    .then(response => {
        if (response.success) {
            const games = response.data;
            container.innerHTML = "";

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
                linkElement.href = `game.html?id=${gameSlug}`;

                // Append elements to container
                container.appendChild(linkElement);
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
    .catch(error => console.error('Error fetching games', error));
};

renderGames();
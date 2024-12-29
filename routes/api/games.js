const express = require('express');
const gameRouter = express.Router();
const { getGames, getGame } = require('../../controllers/games');

gameRouter.get("/", getGames);
gameRouter.get("/:id", getGame);

const games = [
    {
        title: "Baldur's Gate 3",
        url: '../assets/images/baldurs-gate.jpeg',
        releaseDate: new Date('2023-08-03'),
        genre: "RPG",
        description: "A turn-based RPG set in the Dungeons & Dragons universe, featuring rich storytelling and tactical combat.",
        rating: 9.6,
        developer: "Larian Studios"
    },
    {
        title: "Dead Plate",
        url: '../assets/images/dead-plate.jpeg',
        releaseDate: new Date('2023-11-06'),
        genre: "Horror, RPG, Visual Novel",
        description: "A haunting horror game blending visual novel and point-and-click mechanics, set in a 1960s French bistro.",
        rating: 7.5,
        developer: "Studio Investigrave"
    },
    {
        title: "Dark Souls",
        url: '../assets/images/ds.jpeg',
        releaseDate: new Date('2011-09-22'),
        genre: "Action RPG",
        description: "A dark, atmospheric action RPG known for its challenging gameplay and interconnected world design.",
        rating: 9.1,
        developer: "FromSoftware"
    },
    {
        title: "Dark Souls 2",
        url: '../assets/images/ds2.jpeg',
        releaseDate: new Date('2014-03-11'),
        genre: "Action RPG",
        description: "The sequel to Dark Souls, featuring new locations, mechanics, and a gripping dark atmosphere.",
        rating: 8.7,
        developer: "FromSoftware"
    },
    {
        title: "Dark Souls 3",
        url: '../assets/images/ds3.jpeg',
        releaseDate: new Date('2016-03-24'),
        genre: "Action RPG",
        description: "A visually stunning conclusion to the Dark Souls trilogy, offering refined gameplay and epic battles.",
        rating: 9.2,
        developer: "FromSoftware"
    },
    {
        title: "Elden Ring",
        url: '../assets/images/elden-ring.jpeg',
        releaseDate: new Date('2022-02-25'),
        genre: "Action RPG",
        description: "A collaborative effort with George R.R. Martin, offering an expansive open world with FromSoftware's signature difficulty.",
        rating: 9.7,
        developer: "FromSoftware"
    },
    {
        title: "Hades",
        url: '../assets/images/hades.jpeg',
        releaseDate: new Date('2020-09-17'),
        genre: "Roguelike, Action",
        description: "A fast-paced roguelike where you attempt to escape the Underworld as Zagreus, the son of Hades.",
        rating: 9.4,
        developer: "Supergiant Games"
    },
    {
        title: "Omori",
        url: '../assets/images/omori.jpeg',
        releaseDate: new Date('2020-12-25'),
        genre: "Psychological Horror, RPG",
        description: "A surreal psychological RPG that delves into themes of mental health, memories, and nostalgia.",
        rating: 8.8,
        developer: "Omocat"
    },
    {
        title: "Resident Evil 4",
        url: '../assets/images/re4.jpeg',
        releaseDate: new Date('2005-01-11'),
        genre: "Survival Horror",
        description: "A groundbreaking horror game that redefined the genre, focusing on action and immersive storytelling.",
        rating: 9.5,
        developer: "Capcom"
    },
    {
        title: "Sekiro: Shadows Die Twice",
        url: '../assets/images/sekiro.jpeg',
        releaseDate: new Date('2019-03-22'),
        genre: "Action-Adventure",
        description: "A samurai-themed action game with challenging combat and a unique resurrection mechanic.",
        rating: 9.3,
        developer: "FromSoftware"
    },
    {
        title: "Skyrim",
        url: '../assets/images/skyrim.jpeg',
        releaseDate: new Date('2011-11-11'),
        genre: "Action RPG",
        description: "An expansive open-world RPG set in the fantasy land of Tamriel, offering limitless adventures.",
        rating: 9.4,
        developer: "Bethesda Game Studios"
    },
    {
        title: "Stardew Valley",
        url: '../assets/images/stardew-valley.jpeg',
        releaseDate: new Date('2016-02-26'),
        genre: "Simulation, RPG",
        description: "A relaxing farming simulator with RPG elements, allowing players to create their dream farm.",
        rating: 9.6,
        developer: "ConcernedApe"
    },
    {
        title: "The Witcher 3",
        url: '../assets/images/tw3.jpeg',
        releaseDate: new Date('2015-05-19'),
        genre: "Action RPG",
        description: "A sprawling, narrative-driven RPG following Geralt of Rivia's quests in a richly detailed world.",
        rating: 9.8,
        developer: "CD Projekt Red"
    },
    {
        title: "Undertale",
        url: '../assets/images/undertale.jpeg',
        releaseDate: new Date('2015-09-15'),
        genre: "RPG",
        description: "An innovative RPG with a unique combat system and a deeply emotional, choice-driven story.",
        rating: 9.2,
        developer: "Toby Fox"
    }
];


module.exports = gameRouter;
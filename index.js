import { ObjectHandler } from "./game/services/object_handler.js";
import { GameInstance } from "./game/game.js";
import { Player } from "./game/objects/player.js";
import {WaveHandler} from "./game/services/wave_handler.js";
import {ScoreHandler} from "./game/services/score_handler.js";

const newGameButton = document.getElementById("new-game-button");
const singlePlayerButton = document.getElementById("single-player-button");
const multiPlayerButton = document.getElementById("multi-player-button");
let multiplayer = false;

const playerOneKeyMap = {
  UP: 'w',
  DOWN: 's',
  RIGHT: 'd',
  LEFT: 'a',
  SHOOT: ' ',
};

const playerTwoKeyMap = {
    UP: 'ArrowUp', // up arrow
    LEFT: 'ArrowLeft', // left arrow
    DOWN: 'ArrowDown', // down arrow
    RIGHT: 'ArrowRight', // right arrow
    SHOOT: 'Backspace', // backspace
};

newGameButton.addEventListener('click', () => {
    newGameButton.disabled = true;
    ScoreHandler.gameOverScoring();

    ObjectHandler.addObject(new Player("0", playerOneKeyMap));

    if (multiplayer) {
        ObjectHandler.addObject(new Player("1", playerTwoKeyMap));
    }

    GameInstance.runGame();
    WaveHandler.startWaving();
});

singlePlayerButton.addEventListener('click', () => {
    singlePlayerButton.disabled = true;
    multiPlayerButton.disabled = false;
    multiplayer = false;
});

multiPlayerButton.addEventListener('click', () => {
    singlePlayerButton.disabled = false;
    multiPlayerButton.disabled = true;
    multiplayer = true;
});
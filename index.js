import { ObjectHandler } from "./game/services/object_handler.js";
import { GameInstance } from "./game/game.js";
import { Player } from "./game/objects/player.js";

const newGameButton = document.getElementById("new-game-button");
const score = document.getElementById("score");
const highscore = document.getElementById("highscore");

newGameButton.addEventListener('click', () => {
    ObjectHandler.addObject(new Player())
    GameInstance.runGame();

    newGameButton.disabled = true;
    highscore.innerText = parseInt(highscore.innerText, 10) < parseInt(score.innerText, 10) ?
        score.innerText : highscore.innerText;
    score.innerText = "0";
})
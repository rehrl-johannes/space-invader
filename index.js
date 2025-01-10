import { ObjectHandler } from "./game/services/object_handler.js";
import { GameInstance } from "./game/game.js";
import { Player } from "./game/objects/player.js";
import {WaveHandler} from "./game/services/wave_handler.js";
import {ScoreHandler} from "./game/services/score_handler.js";

const newGameButton = document.getElementById("new-game-button");

newGameButton.addEventListener('click', () => {
    newGameButton.disabled = true;
    ScoreHandler.gameOverScoring();

    ObjectHandler.addObject(new Player(crypto.randomUUID()))
    GameInstance.runGame();
    WaveHandler.startWaving();
})
import { ObjectHandler } from "./services/object_handler.js";
import {CanvasHandler} from "./services/canvas_handler.js";
import {CollisionHandler} from "./services/collision_handler.js";
import {ObjectType} from "./enums/object_type.js";
import {WaveHandler} from "./services/wave_handler.js";

// singleton design pattern
export const GameInstance = (function() {
    // private
    let running = false;
    let image;
    let bgPosition;

    let context = CanvasHandler.getCanvasContext();
    let canvas = CanvasHandler.getCanvas();

    function update() {
        if(!running) return;

        if (bgPosition.y >= 0) {
            bgPosition.y = canvas.height - (canvas.width * 9.25);
        }

        bgPosition.y += 1;

        ObjectHandler.getObjects().forEach((object) => {
            object.update();
        });

        ObjectHandler.clearOOB();

        CollisionHandler.handleCollision(ObjectHandler.getObjects());

        if (!ObjectHandler.getObjects().find(obj => obj.type === ObjectType.PLAYER)) {
            gameOver();
        }

        draw();

        requestAnimationFrame(update.bind(GameInstance));
    }

    function draw() {
        if(!running) return;

        context.fillRect(0, 0, canvas.width, canvas.height);

        context.drawImage(
            image,
            bgPosition.x,
            bgPosition.y,
            canvas.width,
            canvas.width * 9.25);

        ObjectHandler.getObjects().forEach((object) => {
            object.draw();
        });
    }

    function gameOver() {
        running = false;

        document.getElementById("new-game-button").disabled = false;
        WaveHandler.stopWaving();
        WaveHandler.endBossMode();
        ObjectHandler.clearAllObjects();

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "bold 50px verdana, sans-serif ";
        context.fillStyle = "#ff0000";
        context.textAlign = "center";
        context.fillText("GAME OVER", canvas.width / 2 ,canvas.height / 2);
    }

    // public
    return {
        runGame: function() {
            running = true;
            image = new Image();
            image.src = "./game/assets/background.png";
            bgPosition = {x: 0, y: canvas.height - (canvas.width * 9.25)};
            update();
        },

        stopGame: function() {
            gameOver();
        }
    }
})();
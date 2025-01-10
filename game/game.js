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

    function update() {
        if(!running) return;

        if (bgPosition.y >= 0) {
            bgPosition.y = CanvasHandler.getCanvas().height - (CanvasHandler.getCanvas().width * 9.25);
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

        CanvasHandler.getCanvasContext().fillRect(0, 0, CanvasHandler.getCanvas().width, CanvasHandler.getCanvas().height);

        CanvasHandler.getCanvasContext().drawImage(
            image,
            bgPosition.x,
            bgPosition.y,
            CanvasHandler.getCanvas().width,
            CanvasHandler.getCanvas().width * 9.25);

        ObjectHandler.getObjects().forEach((object) => {
            object.draw();
        });
    }

    function gameOver() {
        running = false;
        document.getElementById("new-game-button").disabled = false;
        WaveHandler.stopWaving();
        ObjectHandler.clearAllObjects();

        CanvasHandler.getCanvasContext().clearRect(0, 0, CanvasHandler.getCanvas().width, CanvasHandler.getCanvas().height);
        CanvasHandler.getCanvasContext().fillStyle = "#000000";
        CanvasHandler.getCanvasContext().fillRect(0, 0, CanvasHandler.getCanvas().width, CanvasHandler.getCanvas().height);
        CanvasHandler.getCanvasContext().font = "bold 24px verdana, sans-serif ";
        CanvasHandler.getCanvasContext().fillStyle = "#ff0000";
        CanvasHandler.getCanvasContext().textAlign = "center";
        CanvasHandler.getCanvasContext().fillText("GAME OVER", CanvasHandler.getCanvas().width / 2 ,CanvasHandler.getCanvas().height / 2);
    }

    // public
    return {
        runGame: function() {
            running = true;
            image = new Image();
            image.src = "./game/assets/background.png";
            bgPosition = {x: 0, y: CanvasHandler.getCanvas().height - (CanvasHandler.getCanvas().width * 9.25)};
            update();
        }
    }
})();
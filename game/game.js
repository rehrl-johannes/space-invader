import { ObjectHandler } from "./services/object_handler.js";
import {CanvasHandler} from "./services/canvas_handler.js";

// singleton design pattern
export const GameInstance = (function() {
    // private
    let running = false;

    function update() {
        if(!running) return;

        ObjectHandler.getObjects().forEach((object) => {
            object.update();
        });
        ObjectHandler.clearOOB();

        draw();

        requestAnimationFrame(update.bind(GameInstance));
    }

    function draw() {
        if(!running) return;

        CanvasHandler.getCanvasContext().fillRect(0, 0, canvas.width, canvas.height);

        ObjectHandler.getObjects().forEach((object) => {
            object.draw();
        });
    }

    // public
    return {
        runGame: function() {
            running = true;
            update();
        }
    }
})();
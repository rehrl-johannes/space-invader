// singleton design pattern
import {CanvasHandler} from "./canvas_handler.js";

export const ObjectHandler = (function () {
    // private
    let objects = [];

    // public
    return {
        getObjects: function () {
            return objects;
        },

        addObject: function (obj) {
            objects.push(obj);
        },

        removeObject: function (obj) {
            objects.splice(objects.indexOf(obj), 1);
        },

        clearOOB: function () {
            let objectsToRemove = []
            objects.forEach(obj => {
                if ((obj.getCenterPosition().x < 0 || obj.getCenterPosition().x >= CanvasHandler.getCanvas().width) ||
                    (obj.getCenterPosition().y < 0 || obj.getCenterPosition().y >= CanvasHandler.getCanvas().height)) {
                    objectsToRemove.push(obj)
                }
            });

            objectsToRemove.forEach((obj) => {
                this.removeObject(obj);
            });
        }
    };
})();
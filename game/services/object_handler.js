// singleton design pattern
import {CanvasHandler} from "./canvas_handler.js";
import {ObjectType} from "../enums/object_type.js";

export const ObjectHandler = (function () {
    // private
    let objects = [];
    let removalQueue = []

    function removeObject(obj) {
        objects.splice(objects.indexOf(obj), 1);
    }

    // public
    return {
        getObjects: function () {
            return objects;
        },

        getObjectById: function (id) {
            return objects.find(object => object.id === id);
        },

        addObject: function (obj) {
            objects.push(obj);
        },

        removeObjectById: function (id) {
            if (this.getObjectById(id)) {
                removalQueue.push(this.getObjectById(id));
            }
        },

        clearAllObjects: function () {
            objects = [];
        },

        clearOOB: function () {
            objects.forEach(obj => {
                if ((obj.getCenterPosition().x < -10 || obj.getCenterPosition().x > CanvasHandler.getCanvas().width) ||
                    (obj.getCenterPosition().y < -10 || obj.getCenterPosition().y > CanvasHandler.getCanvas().height)) {
                    removalQueue.push(obj)
                }
            });

            removalQueue.forEach((obj) => {
                removeObject(obj);
            });

            removalQueue = [];
        }
    };
})();
import {DrawableObject} from "./drawable_object.js";
import {ObjectType} from "../enums/object_type.js";
import {CanvasHandler} from "../services/canvas_handler.js";
import {Direction} from "../enums/directions.js";
import {ObjectHandler} from "../services/object_handler.js";

export class Item extends DrawableObject {
    constructor() {
        let position = {
            x: Math.random() * (CanvasHandler.getCanvas().width),
            y: 0
        }
        super(crypto.randomUUID(), ObjectType.ITEM, position, "game/assets/item.png");

        this.lootTable = [
            function (player) {
                player.health += 1;
                player.addHeartIcon(player.health - 1);
            },
            function (player) {
                player.giveGrace(10000);
            },
            function (player) {
                player.reloadSpeed = player.reloadSpeed / 2;
                setTimeout(() => {
                    player.reloadSpeed = player.reloadSpeed * 2
                }, 10000);
            },
            // movement is quite clunky
            /*function (player) {
                player.speed.x = player.speed.x * 1.5;
                player.speed.y = player.speed.y * 1.5;
                player.velocity.x = 0;
                player.velocity.y = 0;
                player.activeKeys = []
                setTimeout(() => {
                    player.speedX = player.speed.x / 1.5;
                    player.speedY = player.speed.y / 1.5;
                    player.velocity.x = 0;
                    player.velocity.y = 0;
                    player.activeKeys = []
                }, 7000);
            },*/
        ];
    }

    update() {
        this.position.y += 3
    }

    collide(obj) {
        if (obj.type === ObjectType.PLAYER ||
            (obj.type === ObjectType.PROJECTILE &&
                ObjectHandler.getObjectById(obj.ownerId) &&
                ObjectHandler.getObjectById(obj.ownerId).type === ObjectType.PLAYER)) {
            ObjectHandler.removeObjectById(this.id);
        }
    }
}
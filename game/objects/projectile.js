import { Direction } from "../enums/directions.js";
import { DrawableObject } from "./drawable_object.js";
import {ObjectHandler} from "../services/object_handler.js";
import {ObjectType} from "../enums/object_type.js";

export class Projectile extends DrawableObject{
    constructor(ownerId, position, direction, velocity, imagePath) {
        super(crypto.randomUUID(), ObjectType.PROJECTILE, position, imagePath);
        this.ownerId = ownerId;
        this.direction = direction;
        this.velocity = velocity;
        this.position = { x: position.x - (this.image.width / 2), y: position.y - (this.image.height / 2)};
        this.grace = true;

        setTimeout(() => {this.grace = false}, 10)
    }

    update() {
        switch (this.direction) {
            case Direction.DOWN:
                this.position.y += this.velocity;
                break;
            case Direction.UP:
                this.position.y -= this.velocity;
                break;
            case Direction.LEFT:
                this.position.x -= this.velocity;
                break;
            case Direction.RIGHT:
                this.position.x += this.velocity;
                break;
        }
    }

    collide(obj) {
        if (obj.id === this.ownerId || this.grace) return;

        if (!ObjectHandler.getObjectById(this.ownerId)) {
            ObjectHandler.removeObjectById(this.id);
        }

        else if (ObjectHandler.getObjectById(this.ownerId).type === ObjectType.PLAYER && obj.type === ObjectType.ENEMY) {
            ObjectHandler.removeObjectById(this.id);
        }

        else if (ObjectHandler.getObjectById(this.ownerId).type === ObjectType.PLAYER && obj.type === ObjectType.ITEM) {
            obj.lootTable[Math.floor(Math.random() * (obj.lootTable.length))](ObjectHandler.getObjectById(this.ownerId));
        }

        else if (ObjectHandler.getObjectById(this.ownerId).type === ObjectType.ENEMY && obj.type === ObjectType.PLAYER) {
            ObjectHandler.removeObjectById(this.id);
        }
    }
}
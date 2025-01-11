import { ObjectHandler } from "../services/object_handler.js";
import { DrawableObject } from "./drawable_object.js";
import {ObjectType} from "../enums/object_type.js";
import {ScoreHandler} from "../services/score_handler.js";

export class WallEnemy extends DrawableObject{

    constructor(id, position) {
        super(id, ObjectType.ENEMY, position, "game/assets/wall_enemy_inactive.png")
        this.velocity = 0;

        // initial delay for player to prepare
        setTimeout(() => {
            this.velocity = 20;
            this.image.src = "game/assets/wall_enemy_active.png";
        }, 2000)
    }

    update() {
        this.position.y += this.velocity;
    }

    // wall doesn't break
    collide(obj) {}
}
import { ObjectHandler } from "../services/object_handler.js";
import { Projectile } from "./projectile.js";
import { Direction } from "../enums/directions.js";
import { DrawableObject } from "./drawable_object.js";
import {ObjectType} from "../enums/object_type.js";
import {ScoreHandler} from "../services/score_handler.js";

export class SmallEnemy extends DrawableObject{

    constructor(id, position, velocity, reloadSpeed) {
        super(id, ObjectType.ENEMY, position, "game/assets/enemy.png")

        this.position = {
            x: position.x - this.getPositionCenterOffset().x,
            y: position.y
        }
        this.velocity = velocity;

        this.health = 1;
        this.grace = true;

        setTimeout(() => {this.grace = false}, 1000)

        this.reloadSpeed = reloadSpeed;
        this.reloading = true;

        // initial shooting delay so they don't shoot at the same time
        let shootingDelay = Math.random() * 3000;
        setTimeout(() => { this.reloading = false }, shootingDelay)
    }

    update() {
        if (this.health <= 0) {
            ObjectHandler.removeObjectById(this.id);
            ScoreHandler.addPoints(10);
        }

        if ((this.position.x + this.velocity.x) + (this.getPositionCenterOffset().x * 2) > this.canvas.width) {
            this.position.x = this.canvas.width - (this.getPositionCenterOffset().x * 2);
            this.velocity.x *= -1;
        }

        if ((this.position.x + this.velocity.x) < 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (!this.reloading) {
            this.shootGun();
        }
    }

    collide(obj) {
        if (this.grace) return;

        if (obj.type === ObjectType.PLAYER ||
            (obj.type === ObjectType.PROJECTILE &&
                ObjectHandler.getObjectById(obj.ownerId) &&
                ObjectHandler.getObjectById(obj.ownerId).type === ObjectType.PLAYER)) {
            this.health -= 1;
        }
    }

    shootGun() {
        ObjectHandler.addObject(new Projectile(this.id, this.getCenterPosition(), Direction.DOWN, 10, "game/assets/enemy_bullet.png"));
        this.reloadGun();
    }

    reloadGun() {
        this.reloading = true;
        setTimeout(() => {
            this.reloading = false;
        }, this.reloadSpeed * 1000);
    }
}
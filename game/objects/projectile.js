import { Direction } from "../enums/directions.js";
import { DrawableObject } from "./drawable_object.js";

export class Projectile extends DrawableObject{
    constructor(position, direction, velocity) {
        super(position, "game/assets/bullet.png");
        this.direction = direction;
        this.velocity = velocity;
        this.position = { x: position.x - (this.image.width / 2), y: position.y - (this.image.height / 2)};
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
}
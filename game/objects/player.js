import { ObjectHandler } from "../services/object_handler.js";
import { Projectile } from "./projectile.js";
import { Direction } from "../enums/directions.js";
import { CanvasHandler } from "../services/canvas_handler.js";
import { DrawableObject } from "./drawable_object.js";

export class Player extends DrawableObject{

    constructor() {
        super({ x: 0, y: 0 }, "game/assets/player.png")

        this.position = {
            x: (CanvasHandler.getCanvas().width / 2) - this.getPositionCenterOffset().x,
            y: (CanvasHandler.getCanvas().height - (this.getPositionCenterOffset().y * 2)) - 10
        }

        this.activeKeys = [];
        this.velocity = { x: 0, y: 0 }
        this.speedX = 5;
        this.speedY = this.speedX / 2;

        this.reloadSpeed = 0.5;
        this.reloading = false;

        // Movement
        addEventListener('keydown', (event) => {
            if (this.activeKeys.includes(event.key)) return;
            switch (event.key) {
                case 'w':
                    this.velocity.y -= this.speedY;
                    break;
                case 'a':
                    this.velocity.x -= this.speedX;
                    break;
                case 's':
                    this.velocity.y += this.speedY;
                    break;
                case 'd':
                    this.velocity.x += this.speedX;
                    break;
            }
            this.activeKeys.push(event.key);
        });

        addEventListener('keyup', (event) => {
            if (!this.activeKeys.includes(event.key)) return;
            switch (event.key) {
                case 'w':
                    this.velocity.y += this.speedY;
                    break;
                case 'a':
                    this.velocity.x += this.speedX;
                    break;
                case 's':
                    this.velocity.y -= this.speedY;
                    break;
                case 'd':
                    this.velocity.x -= this.speedX;
                    break;
            }
            this.activeKeys = this.activeKeys.filter(key => key !== event.key);
        });
    }

    update() {
        if ((this.position.x + this.velocity.x) + (this.getPositionCenterOffset().x * 2) <= CanvasHandler.getCanvas().width &&
            (this.position.x + this.velocity.x) >= 0) {
            this.position.x += this.velocity.x;
        }

        if ((this.position.y + this.velocity.y) + (this.getPositionCenterOffset().y * 2) <= CanvasHandler.getCanvas().height &&
            (this.position.y + this.velocity.y) >= 0) {
            this.position.y += this.velocity.y;
        }

        if (!this.reloading && this.activeKeys.includes(" ")) {
            this.shootGun();
        }
    }

    shootGun() {
        ObjectHandler.addObject(new Projectile(this.getCenterPosition(), Direction.UP, 10));
        this.reloadGun();
    }

    reloadGun() {
        this.reloading = true;
        setTimeout(() => {
           this.reloading = false;
        }, this.reloadSpeed * 1000);
    }
}
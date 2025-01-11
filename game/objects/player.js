import { ObjectHandler } from "../services/object_handler.js";
import { Projectile } from "./projectile.js";
import { Direction } from "../enums/directions.js";
import { DrawableObject } from "./drawable_object.js";
import {ObjectType} from "../enums/object_type.js";

export class Player extends DrawableObject{

    constructor(id, keyMap) {
        super(id, ObjectType.PLAYER, { x: 0, y: 0 }, "game/assets/player_" + id + ".png")
        this.offsetMultiplier = parseInt(this.id);
        this.keyMap = keyMap;

        this.image.addEventListener('load', () => {
            this.position = {
                x: (this.canvas.width / 2) - this.getPositionCenterOffset().x,
                y: (this.canvas.height - (this.getPositionCenterOffset().y * 2)) - 10
            }
        }, {once: true});

        this.activeKeys = [];
        this.velocity = { x: 0, y: 0 }
        this.speed = { x: 7, y: 7 / 2};

        this.health = 3;
        this.healthDisplay = []
        for (let i = 0; i < this.health; i++) {
            this.addHeartIcon(i);
        }

        this.grace = true;
        this.graceCall;
        this.giveGrace(1000)

        this.reloadSpeed = 0.5;
        this.reloading = false;

        // Movement
        addEventListener('keydown', (event) => {
            if (this.activeKeys.includes(event.key)) return;

            switch (event.key) {
                case this.keyMap.UP:
                    this.velocity.y -= this.speed.y;
                    break;
                case this.keyMap.LEFT:
                    this.velocity.x -= this.speed.x;
                    break;
                case this.keyMap.DOWN:
                    this.velocity.y += this.speed.y;
                    break;
                case this.keyMap.RIGHT:
                    this.velocity.x += this.speed.x;
                    break;
            }
            this.activeKeys.push(event.key);
        });

        addEventListener('keyup', (event) => {
            if (!this.activeKeys.includes(event.key)) return;
            switch (event.key) {
                case this.keyMap.UP:
                    this.velocity.y += this.speed.y;
                    break;
                case this.keyMap.LEFT:
                    this.velocity.x += this.speed.x;
                    break;
                case this.keyMap.DOWN:
                    this.velocity.y -= this.speed.y;
                    break;
                case this.keyMap.RIGHT:
                    this.velocity.x -= this.speed.x;
                    break;
            }
            this.activeKeys = this.activeKeys.filter(key => key !== event.key);
        });
    }

    update() {
        if (this.health <= 0) {
            ObjectHandler.removeObjectById(this.id);
        }

        if ((this.position.x + this.velocity.x) + (this.getPositionCenterOffset().x * 2) <= this.canvas.width &&
            (this.position.x + this.velocity.x) >= 0) {
            this.position.x += this.velocity.x;
        }

        if ((this.position.y + this.velocity.y) + (this.getPositionCenterOffset().y * 2) <= this.canvas.height &&
            (this.position.y + this.velocity.y) >= 0) {
            this.position.y += this.velocity.y;
        }

        if (!this.reloading && this.activeKeys.includes(this.keyMap.SHOOT)) {
            this.shootGun();
        }
    }

    draw() {
        if (!this.image.complete) return;

        this.context.drawImage(this.image, this.position.x, this.position.y);

        this.context.font = "bold 20px verdana, sans-serif";
        this.context.fillStyle = "#ffffff";
        this.context.textAlign = "start";
        this.context.fillText("Player " + (parseInt(this.id) + 1).toString() + ":",
            10,
            (this.canvas.height - 10) - (this.offsetMultiplier * 25));
        this.context.fillStyle = "#000000";

        this.healthDisplay.forEach(hd => {
           hd.draw();
        });
    }

    collide(obj) {
        if (obj.type === ObjectType.ITEM) {
            obj.lootTable[Math.floor(Math.random() * (obj.lootTable.length))](this);
        }

        else if (obj.type === ObjectType.ENEMY ||
            (obj.type === ObjectType.PROJECTILE &&
                ObjectHandler.getObjectById(obj.ownerId) &&
                ObjectHandler.getObjectById(obj.ownerId).type === ObjectType.ENEMY) ||
            obj.type === ObjectType.PROJECTILE && !ObjectHandler.getObjectById(obj.ownerId)) {
            if (!this.grace) {
                this.health -= 1;
                this.healthDisplay.pop();
                this.giveGrace(2000);
            }
        }
    }

    shootGun() {
        ObjectHandler.addObject(new Projectile(this.id, this.getCenterPosition(), Direction.UP, 25, "game/assets/player_" + this.id + "_bullet.png"));
        this.reloadGun();
    }

    reloadGun() {
        this.reloading = true;
        setTimeout(() => {
           this.reloading = false;
        }, this.reloadSpeed * 1000);
    }

    giveGrace(gracePeriod) {
        this.grace = true;

        this.image.src = "game/assets/player_" + this.id + "_grace.png";

        clearTimeout(this.graceCall);
        this.graceCall = setTimeout(() => {
            this.grace = false;
            this.image.src = "game/assets/player_" + this.id + ".png";
        }, gracePeriod)
    }

    addHeartIcon(index) {
        this.healthDisplay.push(
            new DrawableObject(
                index.toString(),
                ObjectType.ICON,
                { x: 0, y: 0 },
                "game/assets/health_icon.png"));
        this.healthDisplay[index].image.addEventListener('load', () => {
            this.healthDisplay[index].position = {
                x: (130 - this.healthDisplay[index].getPositionCenterOffset().x) +
                    (((this.healthDisplay[index].getPositionCenterOffset().x * 2) * index) + 3),
                y: (this.canvas.height - this.healthDisplay[index].getPositionCenterOffset().y - 6) -
                    this.healthDisplay[index].getPositionCenterOffset().y - (this.offsetMultiplier * 25)
            };
        }, {once: true});
    }
}
import { ObjectHandler } from "../services/object_handler.js";
import { Projectile } from "./projectile.js";
import { Direction } from "../enums/directions.js";
import { DrawableObject } from "./drawable_object.js";
import {ObjectType} from "../enums/object_type.js";
import {ScoreHandler} from "../services/score_handler.js";
import {CanvasHandler} from "../services/canvas_handler.js";
import {WaveHandler} from "../services/wave_handler.js";
import {SmallEnemy} from "./small_enemy.js";
import {LargeEnemy} from "./large_enemy.js";

export class BossEnemy extends DrawableObject{

    constructor(id) {
        super(id, ObjectType.ENEMY, { x: 0, y: 0 }, "game/assets/boss_enemy.png");
        this.image.addEventListener('load', () => {
            this.imageRatio = this.image.height / this.image.width;
        }, {once: true});

        this.health = 100;
        this.grace = true;

        setTimeout(() => {this.grace = false}, 1000)

        this.reloadSpeed = 5;
        this.reloading = true;
        this.reloadGun();
        this.stageDelay = 2000;
        this.stageTimer = null;

        this.phaseOne = false;
        this.phaseTwo = false;

        this.bulletImagePath = "game/assets/enemy_bullet.png";
        this.bulletVelocity = 5;
        this.bulletSpacing = 25;
    }

    update() {
        if (this.health <= 0) {
            ObjectHandler.removeObjectById(this.id);
            ScoreHandler.addPoints(1000);
            WaveHandler.endBossMode();
            clearTimeout(this.stageTimer);
        }

        if (this.health < 66 && !this.phaseOne) {
            this.engagePhaseOne();
        }

        if (this.health < 33 && !this.phaseTwo) {
            this.engagePhaseTwo();
        }

        if (!this.reloading) {
            let pattern = Math.floor(Math.random() * 3);

            switch (pattern) {
                case 0:
                    this.shootPattern0();
                    break;
                case 1:
                    this.shootPattern1();
                    break;
                case 2:
                    this.shootPattern2()
                    break;
            }

            this.reloading = true;
        }
    }

    draw() {
        if (!this.image.complete) return;

        this.context.drawImage(
            this.image,
            0,
            0,
            CanvasHandler.getCanvas().width,
            CanvasHandler.getCanvas().height * this.imageRatio,
        );

        this.context.font = "bold 20px verdana, sans-serif";
        this.context.fillStyle = "#ffffff";
        this.context.textAlign = "start";
        this.context.fillText((this.id) + " Health: " + this.health.toString(),
            10,
            30);
        this.context.fillStyle = "#000000";
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

    shootPattern0() {
        let maxNumberOfWalls = Math.ceil(CanvasHandler.getCanvas().width / this.bulletSpacing);
        for (let i = Math.floor(maxNumberOfWalls / 2); i <= maxNumberOfWalls; i++) {
            ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
        }

        this.stageTimer = setTimeout(() => {
            for (let i = 0; i <= Math.floor(maxNumberOfWalls / 2); i++) {
                ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
            }

            this.stageTimer = setTimeout(() => {
                for (let i = 0; i <= maxNumberOfWalls; i++) {
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    i += 8;
                }

                this.stageTimer = setTimeout(() => {
                    let i = Math.floor(maxNumberOfWalls / 2)
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i - 6), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i - 5), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i - 4), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i - 3), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i - 2), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i - 1), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i + 1), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i + 2), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i + 3), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i + 4), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i + 5), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * (i + 6), y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))

                    this.reloadGun();
                }, this.stageDelay);
            }, this.stageDelay);
        }, this.stageDelay);
    }

    shootPattern1() {
        let maxNumberOfWalls = Math.ceil(CanvasHandler.getCanvas().width / this.bulletSpacing);
        for (let i = Math.floor(maxNumberOfWalls / 2); i <= maxNumberOfWalls; i++) {
            ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
        }

        this.stageTimer = setTimeout(() => {
            for (let i = Math.floor(maxNumberOfWalls / 2); i <= maxNumberOfWalls; i++) {
                ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
            }

            this.stageTimer = setTimeout(() => {
                for (let i = 0; i <= Math.floor(maxNumberOfWalls / 2); i++) {
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                }

                this.stageTimer = setTimeout(() => {
                    for (let i = 0; i <= Math.floor(maxNumberOfWalls / 2); i++) {
                        ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    }

                    this.reloadGun();
                }, this.stageDelay);
            }, this.stageDelay);
        }, this.stageDelay);
    }

    shootPattern2() {
        let maxNumberOfWalls = Math.ceil(CanvasHandler.getCanvas().width / this.bulletSpacing);
        for (let i = 0; i <= maxNumberOfWalls; i++) {
            ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
            ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
            ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
            ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
            ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
            ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
            ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
            ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
            i += 8;
        }

        this.stageTimer = setTimeout(() => {
            for (let i = 8; i <= maxNumberOfWalls; i++) {
                ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                i += 8;
            }

            this.stageTimer = setTimeout(() => {
                for (let i = 0; i <= maxNumberOfWalls; i++) {
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                    i += 8;
                }

                this.stageTimer = setTimeout(() => {
                    for (let i = 8; i <= maxNumberOfWalls; i++) {
                        ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                        ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                        ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                        ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                        ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                        ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                        ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                        ObjectHandler.addObject(new Projectile(this.id, { x: this.bulletSpacing * i++, y: 0 }, Direction.DOWN, this.bulletVelocity, this.bulletImagePath))
                        i += 8;
                    }

                    this.reloadGun();
                }, this.stageDelay);
            }, this.stageDelay);
        }, this.stageDelay);
    }

    reloadGun() {
        this.reloading = true;
        setTimeout(() => {
            this.reloading = false;
            console.log("reloaded")
        }, this.reloadSpeed * 1000);
    }

    engagePhaseOne() {
        this.phaseOne = true;
        this.reloadSpeed = 3;
        this.stageDelay = 1000;
        this.bulletVelocity = 6;

        let initialXSign = 1;

        for (let i = 0; i < 3; i++) {
            initialXSign *= -1;
            let velocity = {
                x: 4 * initialXSign,
                y: 1
            };
            let position = {
                x: this.getCenterPosition().x + (i * 60),
                y: this.getCenterPosition().y
            }
            ObjectHandler.addObject(new SmallEnemy(crypto.randomUUID(), position, velocity, 1));
        }

        for (let t = 0; t < 2; t++) {
            initialXSign *= -1;
            let velocity = {
                x: 2 * initialXSign,
                y: 0.5
            };
            let position = {
                x: this.getCenterPosition().x + (t * 60),
                y: this.getCenterPosition().y
            }
            ObjectHandler.addObject(new LargeEnemy(crypto.randomUUID(), position, velocity, 1));
        }
    }

    engagePhaseTwo() {
        this.phaseTwo = true;
        this.reloadSpeed = 2;
        this.stageDelay = 500;
        this.bulletVelocity = 7;

        let initialXSign = 1;

        for (let x = 0; x < 8; x++) {
            initialXSign *= -1;
            let velocity = {
                x: 4 * initialXSign,
                y: 1
            };
            let position = {
                x: this.getCenterPosition().x + (x * 60),
                y: this.getCenterPosition().y
            }
            ObjectHandler.addObject(new SmallEnemy(crypto.randomUUID(), position, velocity, 1));
        }

        for (let y = 0; y < 3; y++) {
            initialXSign *= -1;
            let velocity = {
                x: 2 * initialXSign,
                y: 0.5
            };
            let position = {
                x: this.getCenterPosition().x + (y * 60),
                y: this.getCenterPosition().y
            }
            ObjectHandler.addObject(new LargeEnemy(crypto.randomUUID(), position, velocity, 1));
        }
    }
}
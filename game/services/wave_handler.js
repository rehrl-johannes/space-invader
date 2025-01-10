// singleton design pattern
import {ObjectHandler} from "./object_handler.js";
import {SimpleEnemy} from "../objects/simple_enemy.js";
import {CanvasHandler} from "./canvas_handler.js";

export const WaveHandler = (function () {
    // private

    // nr of enemies
    let enemyParam = {min: 1, max: 8};

    // velocity
    let xVelocityParam = {min: 4, max: 1};
    let yVelocityParam = {min: 0.1, max: 1};

    // reload speed
    let reloadParam = {min: 1, max: 5};

    // time to next wave = TTW
    let ttwParam = {min: 1000, max: 3000};

    let loop;

    function wave() {
        // generate enemies
        let enemies = Math.floor(Math.random() * (enemyParam.max - enemyParam.min + 1)) + enemyParam.min;

        for (let i = 0; i < enemies; i++) {
            let position = {
                x: Math.random() * (CanvasHandler.getCanvas().width),
                y: 0
            }

            let initialXSign = (Math.floor(Math.random() * 2) === 0) ? -1 : 1;

            let velocity = {
                x: (Math.random() * (xVelocityParam.max - xVelocityParam.min) + xVelocityParam.min) * initialXSign,
                y: Math.random() * (yVelocityParam.max - yVelocityParam.min) + yVelocityParam.min };

            let reloadSpeed = Math.random() * (reloadParam.max - reloadParam.min) + reloadParam.min;

            ObjectHandler.addObject(new SimpleEnemy(crypto.randomUUID(), position, velocity, reloadSpeed));
        }

        // calculate next wave start time
        let interval = (Math.random() * (ttwParam.max - ttwParam.min) + ttwParam.min) + (enemies * 1000);

        loop = setTimeout(wave.bind(this), interval);
    }

    // public
    return {
        startWaving: function () {
            setTimeout(wave.bind(this), 3000);
        },

        stopWaving: function () {
            clearInterval(loop);
        }
    };
})();
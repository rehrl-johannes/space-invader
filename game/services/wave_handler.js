// singleton design pattern
import {ObjectHandler} from "./object_handler.js";
import {SmallEnemy} from "../objects/small_enemy.js";
import {CanvasHandler} from "./canvas_handler.js";
import {LargeEnemy} from "../objects/large_enemy.js";
import {WallEnemy} from "../objects/wall_enemy.js";
import {Item} from "../objects/item.js";
import {BossEnemy} from "../objects/boss_enemy.js";

export const WaveHandler = (function () {
    // private

    const waveHTML = document.getElementById("wave");
    let waveIndex = 0;
    let running = false;
    let bossMode = false;

    // nr of enemies
    let enemyParam;

    // velocity
    let xVelocityParam;
    let yVelocityParam;

    // reload speed
    let reloadParam;

    // time to standard wave = ttsw
    let ttswParam;
    // time to wall wave = ttww
    let ttwwParam;

    let standardLoop;
    let wallLoop;

    function resetParams() {
        waveIndex = 0;

        // nr of enemies
        enemyParam = {
            small: {
                min: 1,
                max: 2
            },
            large: {
                min: 0,
                max: 0
            }
        };

        // velocity
        xVelocityParam = {min: 1, max: 4};
        yVelocityParam = {min: 0.1, max: 1};

        // reload speed
        reloadParam = {min: 1, max: 5};

        // time to next wave = TTW
        ttswParam = {min: 5000, max: 7000};
        ttwwParam = {min: 15000, max: 30000};
    }

    function standardWave() {
        if (!running) return;
        if (bossMode) {
            clearTimeout(standardLoop);
            standardLoop = setTimeout(standardWave.bind(this), 3000);
            return;
        }

        // boss every 10 waves
        if (waveIndex > 0 && waveIndex % 10 === 0) {
            startBossMode();
            clearTimeout(standardLoop);
            standardLoop = setTimeout(standardWave.bind(this), 3000);
            waveIndex++;

            waveHTML.innerText = "BOSS";
            return;
        }

        waveHTML.innerText = waveIndex.toString();

        // generate nr of enemies
        let smallEnemies = Math.floor(Math.random() * (enemyParam.small.max - enemyParam.small.min + 1))
            + enemyParam.small.min;
        let largeEnemies = Math.floor(Math.random() * (enemyParam.large.max - enemyParam.large.min + 1)) +
            enemyParam.large.min;

        // generate small enemies
        for (let i = 0; i < smallEnemies; i++) {
            createSmallEnemy();
        }

        // generate large enemies
        for (let i = 0; i < largeEnemies; i++) {
            createLargeEnemy()
        }

        // 1 in 3 chance to spawn an item
        if ((Math.floor(Math.random() * 3) === 0)) {
            ObjectHandler.addObject(new Item());
        }

        // calculate next wave start time
        let interval = (Math.random() * (ttswParam.max - ttswParam.min) + ttswParam.min)
            + (smallEnemies * 1000)
            + (largeEnemies * 2000);

        waveIndex++;

        // large enemy is introduced in wave 3
        if (waveIndex === 3) {
            enemyParam.large.min = 1;
            enemyParam.large.max = 1;
        }

        // scale enemy spawn rate with wave index
        enemyParam.large.min += waveIndex % 6 === 0 ? 1 : 0;
        enemyParam.large.max += waveIndex % 4 === 0 ? 1 : 0;
        enemyParam.small.min += waveIndex % 5 === 0 ? 1 : 0;
        enemyParam.small.max += waveIndex % 3 === 0 ? 1 : 0;

        clearTimeout(standardLoop);
        standardLoop = setTimeout(standardWave.bind(this), interval);
    }

    function wallWave() {
        if (!running) return;
        if (bossMode) {
            clearTimeout(wallLoop);
            wallLoop = setTimeout(wallWave.bind(this), 3000);
            return;
        }

        let pattern = Math.floor(Math.random() * 5);

        switch (pattern) {
            case 0:
                createWallPattern0();
                break;
            case 1:
                createWallPattern1();
                break;
            case 2:
                createWallPattern2();
                break;
            case 3:
                createWallPattern3();
                break;
            case 4:
                createWallPattern4();
                break;
        }

        // calculate next wave start time
        let interval = (Math.random() * (ttwwParam.max - ttwwParam.min) + ttwwParam.min);

        clearTimeout(wallLoop);
        wallLoop = setTimeout(wallWave.bind(this), interval);
    }

    function createWallPattern0() {
        let maxNumberOfWalls = Math.ceil(CanvasHandler.getCanvas().width / 50);
        for (let i = Math.floor(maxNumberOfWalls / 2); i <= maxNumberOfWalls; i++) {
            ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * i, y: 0 }))
        }
    }

    function createWallPattern1() {
        let maxNumberOfWalls = Math.ceil(CanvasHandler.getCanvas().width / 50);
        for (let i = 0; i <= Math.floor(maxNumberOfWalls / 2); i++) {
            ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * i, y: 0 }))
        }
    }

    function createWallPattern2() {
        let maxNumberOfWalls = Math.ceil(CanvasHandler.getCanvas().width / 50);
        for (let i = 0; i <= maxNumberOfWalls; i++) {
            ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * i++, y: 0 }))
            ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * i++, y: 0 }))
            ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * i++, y: 0 }))
            ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * i++, y: 0 }))
            i += 4;
        }
    }

    function createWallPattern3() {
        let maxNumberOfWalls = Math.ceil(CanvasHandler.getCanvas().width / 50);
        for (let i = 0; i <= maxNumberOfWalls; i++) {
            ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * i++, y: 0 }))
            ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * i++, y: 0 }))
            ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * i++, y: 0 }))
            i += 3;
        }
    }

    function createWallPattern4() {
        let maxNumberOfWalls = Math.ceil(CanvasHandler.getCanvas().width / 50);
        let i = Math.floor(maxNumberOfWalls / 2)
        ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * (i - 3), y: 0 }))
        ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * (i - 2), y: 0 }))
        ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * (i - 1), y: 0 }))
        ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * i, y: 0 }))
        ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * (i + 1), y: 0 }))
        ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * (i + 2), y: 0 }))
        ObjectHandler.addObject(new WallEnemy(crypto.randomUUID(), { x: 50 * (i + 3), y: 0 }))
    }

    function createSmallEnemy() {
        let position = {
            x: Math.random() * (CanvasHandler.getCanvas().width),
            y: 0
        }

        // coin toss to determine direction
        let initialXSign = (Math.floor(Math.random() * 2) === 0) ? -1 : 1;

        let velocity = {
            x: (Math.random() * (xVelocityParam.max - xVelocityParam.min) + xVelocityParam.min) * initialXSign,
            y: Math.random() * (yVelocityParam.max - yVelocityParam.min) + yVelocityParam.min };

        let reloadSpeed = Math.random() * (reloadParam.max - reloadParam.min) + reloadParam.min;

        ObjectHandler.addObject(new SmallEnemy(crypto.randomUUID(), position, velocity, reloadSpeed));
    }

    function createLargeEnemy() {
        let position = {
            x: Math.random() * (CanvasHandler.getCanvas().width),
            y: 0
        }

        // coin toss to determine direction
        let initialXSign = (Math.floor(Math.random() * 2) === 0) ? -1 : 1;

        let velocity = {
            x: ((Math.random() * (xVelocityParam.max - xVelocityParam.min) + xVelocityParam.min) * initialXSign) / 2,
            y: (Math.random() * (yVelocityParam.max - yVelocityParam.min) + yVelocityParam.min) / 2 };

        let reloadSpeed = (Math.random() * (reloadParam.max - reloadParam.min) + reloadParam.min) * 0.8;

        ObjectHandler.addObject(new LargeEnemy(crypto.randomUUID(), position, velocity, reloadSpeed));
    }

    function startBossMode() {
        bossMode = true;

        ObjectHandler.addObject(new BossEnemy("Mothership"));
    }

    // public
    return {
        startWaving: function() {
            resetParams();
            running = true;
            standardLoop = setTimeout(standardWave.bind(this), 1000);
            wallLoop = setTimeout(wallWave.bind(this), 10000);
        },

        stopWaving: function() {
            resetParams();
            running = false;
            clearTimeout(standardLoop);
            clearTimeout(wallLoop);
        },

        endBossMode: function() {
            bossMode = false;
        }
    };
})();
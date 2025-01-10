import {CanvasHandler} from "../services/canvas_handler.js";

export class DrawableObject {
    constructor(id, type, position, imagePath) {
        this.id = id;
        this.type = type;
        this.position = position;
        this.image = new Image()
        this.image.src = imagePath;
    }

    getPositionCenterOffset() {
        return { x: (this.image.width / 2), y: (this.image.height / 2) };
    }

    getCenterPosition() {
        return {
            x: this.position.x + this.getPositionCenterOffset().x,
            y: this.position.y + this.getPositionCenterOffset().y,
        };
    }

    draw() {
        CanvasHandler.getCanvasContext().drawImage(this.image, this.position.x, this.position.y);
    }
}
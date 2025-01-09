// singleton design pattern
export const CanvasHandler = (function () {
    // private
    let canvas;
    let context;

    function createCanvas() {
        let c = document.getElementById("canvas");
        let sidebar = document.getElementById("sidebar");
        c.width = (window.innerWidth - (window.innerHeight * 0.02)) - sidebar.clientWidth;
        c.height = window.innerHeight * 0.98;

        return c;
    }

    function createContext(canvas) {
        if (!canvas) {
            canvas = createCanvas();
        }

        return canvas.getContext("2d");
    }

    // public
    return {
        getCanvas: function () {
            if (!canvas) {
                canvas = createCanvas();
            }

            return canvas;
        },

        getCanvasContext: function () {
            if (!context) {
                context = createContext();
            }

            return context;
        }
    };
})();
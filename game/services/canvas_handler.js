// singleton design pattern
export const CanvasHandler = (function () {
    // private
    let canvas = document.getElementById("canvas");
    let sidebar = document.getElementById("sidebar");
    canvas.width = (window.innerWidth - (window.innerHeight * 0.02)) - sidebar.clientWidth;
    canvas.height = window.innerHeight * 0.98;
    let context = canvas.getContext("2d");

    // public
    return {
        getCanvas: function () {
            return canvas;
        },

        getCanvasContext: function () {
            return context;
        }
    };
})();
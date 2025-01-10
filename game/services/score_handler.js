// singleton design pattern
export const ScoreHandler = (function () {
    // private
    const score = document.getElementById("score");
    const highscore = document.getElementById("highscore");

    // public
    return {
        addPoints: function (points) {
            score.innerText = (parseInt(score.innerText, 10) + points).toString();
        },

        gameOverScoring: function () {
            highscore.innerText = parseInt(highscore.innerText, 10) < parseInt(score.innerText, 10) ?
                score.innerText : highscore.innerText;
            score.innerText = "0";
        }
    };
})();
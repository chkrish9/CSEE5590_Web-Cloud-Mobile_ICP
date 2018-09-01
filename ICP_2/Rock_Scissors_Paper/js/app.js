(function ($) {
    const gameItems = ["Rock", "Scissors", "Paper"];
    $("#startPlay").click(function () {
        const player1 = gameItems[Math.floor(Math.random() * gameItems.length)];
        const player2 = gameItems[Math.floor(Math.random() * gameItems.length)];
        let result = "";
        $("#player1,#player2").removeClass("hidden");
        $("#player1").attr("src","images/"+player1.toLowerCase()+".png");
        $("#player2").attr("src","images/"+player2.toLowerCase()+".png");
        if (player1 === player2) {
            result = "Draw";
        }
        else {
            const temp = player1 + "_" + player2;
            if (temp.indexOf("Rock") >= 0 && temp.indexOf("Paper") < 0) {
                result = (temp.split("_").indexOf("Rock") === 0) ? "Player 1 Win" : "Player 2 Win";
            }
            else if (temp.indexOf("Scissors") >= 0 && temp.indexOf("Rock") < 0) {
                result = (temp.split("_").indexOf("Scissors") === 0) ? "Player 1 Win" : "Player 2 Win";
            }
            else if (temp.indexOf("Paper") >= 0 && temp.indexOf("Scissors") < 0) {
                result = (temp.split("_").indexOf("Paper") === 0) ? "Player 1 Win" : "Player 2 Win";
            }
        }

        $("#result").text(result);
        $("#result").removeClass();
        $("#result").addClass((result == "Draw")? "label label-warning":"label label-success");
    });
})($);
(function ($) {
    /*game items list*/
    const gameItems = ["Rock", "Scissors", "Paper"];

    /*On Play button click*/
    $("#startPlay").click(function () {

        /*Generating two random numbers*/
        const player1 = gameItems[Math.floor(Math.random() * gameItems.length)];
        const player2 = gameItems[Math.floor(Math.random() * gameItems.length)];
        let result = "";

        /*Displaying the player-1 and player-2 result images*/
        $("#player1,#player2").removeClass("hidden");

        /*Updating the player-1 and player-2 src result images*/
        $("#player1").attr("src", "images/" + player1.toLowerCase() + ".png");
        $("#player2").attr("src", "images/" + player2.toLowerCase() + ".png");

        /*
         * Evaluating the results.
         *
         * Rules :
         * 1. Rock vs Scissors - Rock wins
         * 2. Scissors vs Paper - Scissors wins
         * 3. Rock vs Paper - Paper wins
         * 4. Both player - 1 and player -2 are equal the game is draw.
        */

        /* Checking the player 1 and player 2 for draw condition*/
        if (player1 === player2) {
            result = "Draw";
        }
        else {
            /* Concatenating player -1 and player -2 and storing in temp variable*/
            const temp = player1 + "_" + player2;

            /*
             * Checking temp variable contains Rock and not contains Paper.
             * if case is true : Then checking the index of Rock and set the winner to result.
             * else go to else if.
            */
            if (temp.indexOf("Rock") >= 0 && temp.indexOf("Paper") < 0) {
                result = (temp.split("_").indexOf("Rock") === 0) ? "Player 1 Win" : "Player 2 Win";
            }
            /*
             * Checking temp variable contains Scissors and not contains Rock.
             * if case is true : Then checking the index of Scissors and set the winner to result.
             * else go to else if.
            */
            else if (temp.indexOf("Scissors") >= 0 && temp.indexOf("Rock") < 0) {
                result = (temp.split("_").indexOf("Scissors") === 0) ? "Player 1 Win" : "Player 2 Win";
            }
            /*
             * Checking temp variable contains Paper and not contains Scissors.
             * if case is true : Then checking the index of Paper and set the winner to result.
             * else go to else if.
            */
            else if (temp.indexOf("Paper") >= 0 && temp.indexOf("Scissors") < 0) {
                result = (temp.split("_").indexOf("Paper") === 0) ? "Player 1 Win" : "Player 2 Win";
            }
        }


        /*
          * Updating the result label.
          * Applying the classes based on result.
          * if result is Draw then the result label is Yellow else result Win then the result label is Green.
        */
        $("#result").text(result);
        $("#result").removeClass();
        $("#result").addClass((result == "Draw") ? "label label-warning" : "label label-success");
    });
})($);
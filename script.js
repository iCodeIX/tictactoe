

window.addEventListener("load", (event) => {

    /*welcome menu variables */
    let rulesBtn = document.querySelector(".htp-btn");
    let rules = document.querySelector(".rules");
    let closeBtn = document.querySelector(".close-btn");

    let startBtn = document.querySelector(".start-btn");
    let menuContainer = document.querySelector(".menu-container");
    let gameContainer = document.querySelector(".game-container");

    /*main game variables */
    let boxContainer = document.querySelector(".box-container");
    let boxes = document.querySelectorAll(".box");
    let boxPick = document.querySelectorAll(".box-pick");
    let player1ScoreBox = document.querySelector("#scoreP1");
    let player2ScoreBox = document.querySelector("#scoreP2");
    let raceto = document.getElementById("raceto");
    let racetoBtn = document.querySelector(".raceto-btn");
    /* alerts */

    let occupiedAlert = document.querySelector(".occupied");
    let playerWon = document.querySelector(".player-won");
    let roundWinner = document.querySelector(".winner");
    let noMoreBox = document.querySelector(".nomore-box");
    let raceToSavedAlert = document.querySelector(".raceto-saved-alert");
    let raceToValDisp = document.querySelector(".raceto-num");
    let finalWinnerContainerAlert = document.querySelector(".final-winner-alert");
    let playerFinalWinnerDisp = document.querySelector(".player-winner");
    let playAgainBtn = document.querySelector(".play-again-btn");

    /*data */
    let player2color = "#293241";
    let player1color = "#ee6c4d";
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let winner = 0;
    let raceToVal = 0;
    var player1score = 0;
    var player2score = 0;
    var playerTurn = 0;

    //auto play
    /*welcome menu*/

    startBtn.addEventListener("click", () => {
        menuContainer.style.display = "none";
        gameContainer.style.display = " block";
    })
    rulesBtn.addEventListener("click", () => {
        rules.classList.add("rules-show");
    })

    closeBtn.addEventListener("click", () => {
        rules.classList.remove("rules-show");
    })




    /*main game*/

    racetoBtn.addEventListener("click", function () {
        raceToSavedAlert.style.display = "block";
        raceToValDisp.innerHTML = raceto.value;
        raceToVal = raceto.value;
        resetGame();
        resetBoard();
        setTimeout(() => {
            raceToSavedAlert.style.display = "none";
        }, 2000);
    })

    playAgainBtn.addEventListener("click", () => {
        finalWinnerContainerAlert.style.display = "none";
    })
    raceto.addEventListener("keydown", function (e) {
        // prevent: "e", "=", ",", "-", "."
        if ([69, 187, 188, 189, 190].includes(e.keyCode)) {
            e.preventDefault();
        }
    })



    function clickListener() {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener("click", () => {

                if (!checkOccupy(i)) {
                    playerTurn++;
                    changeColorOnClick(i, playerTurn);
                } else {
                    occupiedAlert.style.display = "block";
                    setTimeout(hideOccupiedAlert, 1000);
                }

            })
        }
    }


    function hideOccupiedAlert() {
        occupiedAlert.style.display = "none";
    }

    function checkOccupy(index) {
        return board[index] !== 0 ? true : false;
    }

    function changeColorOnClick(index, playerTurn) {

        if (playerTurn % 2 != 0) {
            board[index] = 1;
            boxes[index].style.backgroundColor = player1color;
            boxPick[index].src = "cross.png";
        } else {
            board[index] = 2;
            boxes[index].style.backgroundColor = player2color;
            boxPick[index].src = "circle.png";

        }

        checkResult();
    }

    function checkResult() {
        if (checkWinner()) {
            setTimeout(function () {
                playerWon.style.display = "block";
                boxContainer.style.pointerEvents = "none";
                roundWinner.innerHTML = winner;
                setTimeout(hidePlayerWon, 3000);
            }, 200);
        } else if (checkNoMoreBox()) {
            setTimeout(function () {
                noMoreBox.style.display = "block";
                setTimeout(hidePlayerWon, 3000);
            }, 200);
        }


    }

    function checkFinalWinner() {
        if (player1score == raceToVal && raceToVal != 0) {
            playerFinalWinnerDisp.innerHTML = 1;
            finalWinnerContainerAlert.style.display = "flex";
            resetGame();
            resetBoard();

        } else if (player2score == raceToVal && raceToVal != 0) {
            playerFinalWinnerDisp.innerHTML = 2;
            finalWinnerContainerAlert.style.display = "flex";
            resetGame();
            resetBoard();
        }
    }

    function resetGame() {
        player1score = 0;
        player2score = 0;
        player1ScoreBox.innerHTML = player1score;
        player2ScoreBox.innerHTML = player2score;

    }


    function checkNoMoreBox() {
        let occupiedBox = [...board].filter((item) => { return item >= 1 });
        return occupiedBox.length == 9 ? true : false;
    }

    function hidePlayerWon() {
        noMoreBox.style.display = "none"
        playerWon.style.display = "none";
        boxContainer.style.pointerEvents = "auto";
        addPoint();
        resetBoard();
    }

    function checkWinner() {
        if (board[0] == 1 && board[1] == 1 && board[2] == 1) {
            winner = 1;
            return true;
        } else if (board[0] == 1 && board[4] == 1 && board[8] == 1) {
            winner = 1;
            return true;

        } else if (board[0] == 1 && board[3] == 1 && board[6] == 1) {
            winner = 1;
            return true;

        } else if (board[1] == 1 && board[4] == 1 && board[7] == 1) {
            winner = 1;
            return true;

        } else if (board[2] == 1 && board[5] == 1 && board[8] == 1) {
            winner = 1;
            return true;

        } else if (board[2] == 1 && board[4] == 1 && board[6] == 1) {
            winner = 1;
            return true;

        } else if (board[3] == 1 && board[4] == 1 && board[5] == 1) {
            winner = 1;
            return true;

        } else if (board[6] == 1 && board[7] == 1 && board[8] == 1) {
            winner = 1;
            return true;

        } else if (board[0] == 2 && board[1] == 2 && board[2] == 2) {
            winner = 2;
            return true;
        } else if (board[0] == 2 && board[4] == 2 && board[8] == 2) {
            winner = 2;
            return true;

        } else if (board[0] == 2 && board[3] == 2 && board[6] == 2) {
            winner = 2;
            return true;

        } else if (board[1] == 2 && board[4] == 2 && board[7] == 2) {
            winner = 2;
            return true;

        } else if (board[2] == 2 && board[5] == 2 && board[8] == 2) {
            winner = 2;
            return true;

        } else if (board[2] == 2 && board[4] == 2 && board[6] == 2) {
            winner = 2;
            return true;

        } else if (board[3] == 2 && board[4] == 2 && board[5] == 2) {
            winner = 2;
            return true;

        } else if (board[6] == 2 && board[7] == 2 && board[8] == 2) {
            winner = 2;
            return true;

        }

        return false;
    }

    function addPoint() {
        if (winner == 1) {
            player1score++;
        } else if (winner == 2) {
            player2score++;
        }

        player1ScoreBox.innerHTML = player1score;
        player2ScoreBox.innerHTML = player2score;
        checkFinalWinner();
    }

    function resetBoard() {

        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = "";
            boxPick[i].src = "";
        }
        winner = 0;
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    clickListener();
});
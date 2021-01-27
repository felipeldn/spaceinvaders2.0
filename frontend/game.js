class Game {
    constructor (score) {
        this.score = score
    }

    setUpGame() {
        fetch(GAME_URL + '/' + currentGame.id, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
            }) 
            .then(resp => resp.json())
            .then(game => {
                currentGame = game
                console.log( currentGame.score )
            })
            .catch(error => alert(error.message));
        
        getGameLoop = setTimeout(setUpGame, 1000)
    }

    

    yourScore() {
        console.log(`You scored ${this.score} hits this time!`)
    }

    //which class methods can you create?
    //which instance methods can you create?
}

let gameOne = Game.setUpGame()

gameOne.yourScore()
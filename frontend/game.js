// const GAME_URL = 'http://localhost:3000/games'

export default class Game {
    constructor (score) {
        this.score = score
    }

    newGame = () => {
        
        fetch(GAME_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: currentUserObj.id}),
            }) 
            .then(resp => resp.json())
            .then(game => {
                currentGame = game
                console.log( this.score )
                getCurrentGame();	
                runGame();		
            })
            .catch(error => alert(error.message)); 
    }
    
    updateGame = () => {
        
        fetch(GAME_URL + '/' + currentGame.id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ score: currentGame.score }),
        }) 
        .then(resp => resp.json())
        .then(game => {
            currentGame = game
            // console.log( currentGame.score )
        })
        .catch(error => alert(error.message));
                    
    }
    
    getCurrentGame = () => {
        
        fetch(GAME_URL + '/' + currentGame.id, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
            }) 
            .then(resp => resp.json())
            .then(game => {
                this = game
                console.log( this.score )
            })
            .catch(error => alert(error.message));
        
        getGameLoop = setTimeout(getCurrentGame, 1000)
    }

    yourScore() {
        console.log(`You scored ${this.score} hits this time!`)
    }
}
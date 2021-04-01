class Game {
    constructor () {
        this.score = 0
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
                console.log( currentGame.score )
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
    
}


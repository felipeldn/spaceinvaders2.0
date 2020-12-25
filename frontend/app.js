const SCORE_URL = 'http://localhost:3000/scores'
const GAME_URL = 'http://localhost:3000/games'
const USER_URL = 'http://localhost:3000/users'

const createacctBtn = document.querySelector('.create_account_button')
const newUserForm = document.querySelector('.new_account_div')

const logInBtn = document.querySelector('.log_in_button')
const logInForm = document.querySelector('.log_in_div ')
const startGameBtn = document.querySelector('img#start')
const gameOverPhoto = document.querySelector('img#gameover')
const scoreBtn = document.querySelector('img#score')

let currentUserObj
let currentUser
let currentGame
let gameLoop

var hero = {
    top: 700,
    left: 700
};

// var explosions = [];

var missiles = [];

var enemies = [
    {left: 200, top: 100},
    {left: 300, top: 100},
    {left: 400, top: 100},
    {left: 500, top: 100},
    {left: 600, top: 100},
    {left: 700, top: 100},
    {left: 800, top: 100},
    {left: 900, top: 100},
    {left: 200, top: 175},
    {left: 300, top: 175},
    {left: 400, top: 175},
    {left: 500, top: 175},
    {left: 600, top: 175},
    {left: 700, top: 175},
    {left: 800, top: 175},
    {left: 900, top: 175},
    {left: 200, top: 250},
    {left: 300, top: 250},
    {left: 400, top: 250},
    {left: 500, top: 250},
    {left: 600, top: 250},
    {left: 700, top: 250},
    {left: 800, top: 250},
    {left: 900, top: 250}
];

document.onkeydown = function(key) {
    // console.log(key.keyCode);
    if (key.keyCode === 37 && hero.left > 200){
        // console.log("LEFT")
        hero.left = hero.left - 10;
        // moveHero()
    }
    else if (key.keyCode === 39 && hero.left < 900) {
        // console.log("RIGHT")
        hero.left = hero.left + 10;
        // moveHero()
    }
    else if (key.keyCode === 38 && hero.top > 375) {
        // console.log("UP")
        hero.top = hero.top - 10;
        // moveHero()
    }
    else if (key.keyCode === 40 && hero.top < 690) {
        // console.log("DOWN")
        hero.top = hero.top + 10
        // moveHero()
    }
    else if (key.keyCode === 32)
    // console.log("FIRE!!")
        missiles.push({
            left: hero.left + 15, 
            top:  hero.top
    })
    // drawMissiles();
}


function moveHero() {
    document.getElementById('hero').style.left = hero.left + "px";
    document.getElementById('hero').style.top = hero.top + "px";
}


function drawMissiles() {  
    var missilesNode = document.getElementById('missiles')
    if (missilesNode != null){

        document.getElementById('missiles').innerHTML = ""

            for (var missile = 0; missile < missiles.length; missile++) {
            document.getElementById('missiles').innerHTML += `<div class='missile' style='left:${missiles[missile].left}px; top:${missiles[missile].top}px;'></div>`;
        }
    }   
}

function moveMissiles() {
    for (var missile = 0; missile < missiles.length; missile++){
        missiles[missile].top = missiles[missile].top - 10;
    }
}

function drawEnemies() {
    var enemiesNode = document.getElementById('enemies')
    if (enemiesNode != null){
        
        document.getElementById('enemies').innerHTML = ""
        
        for (var enemy = 0; enemy < enemies.length; enemy++) {
        document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px;'></div>`;
    }}
}

function moveEnemies() {
    for (var enemy = 0; enemy < enemies.length; enemy++){
        enemies[enemy].top = enemies[enemy].top + 15;
        
        if (enemies[enemy].top >= 700) {
            enemies[enemy].top = 100
        } 
    }
}

function missileHit() {
    for (var enemy = 0; enemy < enemies.length; enemy++){
        for (var missile = 0; missile < missiles.length; missile++){  
            if (
                missiles[missile].left >= enemies[enemy].left  &&
                missiles[missile].left <= (enemies[enemy].left + 50)  &&
                missiles[missile].top <= (enemies[enemy].top + 50)  &&
                missiles[missile].top >= enemies[enemy].top
            ){
                currentGame.score++;
				
				updateGame()
				
                console.log("HIT!")
                enemies.splice(enemy, 1)
                
                enemies.push({
                    top: 100,
                    left: missiles[missile].left
                })
                
                missiles.splice(missile, 1)

                // explosions.push({
                //     top: missiles[missile].top,
                //     left: missiles[missile].left
                // })

            }
        }
    }
}

function collisionDetection() {
    for (var enemy = 0; enemy < enemies.length; enemy++){
        if (
            hero.left >= enemies[enemy].left  &&
            hero.left <= (enemies[enemy].left + 50)  &&
            hero.top <= (enemies[enemy].top + 50)  &&
            hero.top >= enemies[enemy].top
        ){
            function stopGameLoop(){
                clearTimeout(gameLoop)
                clearTimeout(getGameLoop)
            }
            stopGameLoop();
            gameOverPhoto.style.display = 'flex'
            scoreBtn.style.display = 'flex'
            // console.log("GAME OVER!")
        }
    }
}

function runGame() {   
    // newScore();
    let buttons = document.querySelectorAll('#buttons');
    buttons.forEach(button => button.style.display = 'none');
    gameLoop = setTimeout(runGame, 100)
    // gameLoop
    moveHero()
    moveMissiles();
    drawMissiles();
    moveEnemies();
    drawEnemies();
    // moveExplosions();
    // drawExplosions();
    missileHit();
    collisionDetection();

}

createacctBtn.addEventListener('click', event => {
    newUserForm.style.display = "block"
    createacctBtn.style.display = 'none'
    logInBtn.style.display = 'none'
})


newUserForm.addEventListener('submit', event => {
    event.preventDefault()
    newUserForm.style.display = "none"
    createUser(event.target)
})

const createUser = (form) => {
    // currentUser = form.username.value
        return fetch(USER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: form.username.value
            })
            })
            .then(resp => resp.json())
            .then(user => {
                currentUserObj = user
                currentUser = user.username
            })
            .then(logInBtn.style.display = 'none')
            .then(startGameBtn.style.display = 'flex')
}

logInBtn.addEventListener('click', event => {
    logInForm.style.display = "block"
    logInBtn.style.display = 'none'
    createacctBtn.style.display = 'none'
})

logInForm.addEventListener('submit', event => {
    event.preventDefault()
    logInForm.style.display = "none"
    logInUser(event.target)
})

const logInUser = (form) => {    
    return fetch(`${USER_URL}/${form.username.value}`)
    .then(resp => resp.json()) 
    .then(user => {

        currentUserObj = user
        currentUser = user.username
        })
    .then(startGameBtn.style.display = 'flex')
    .catch(error => alert(error.message))
}

startGameBtn.addEventListener('click', event => {
    startGameBtn.style.display = 'none' 
    newGame()
    // playSound(music)
    let buttons = document.querySelectorAll('.buttons')
    buttons.forEach(button => button.style.display = 'none')
})

scoreBtn.addEventListener('click', event => {
    scoreBtn.style.display = 'none'   
    displayScore()
})

const newGame = () => {

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

const updateGame = () => {
	
	fetch(GAME_URL + '/' + currentGame.id, {
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ score: currentGame.score }),
	}) 
	.then(resp => resp.json())
	.then(game => {
		currentGame = game
		console.log( currentGame.score )
	})
	.catch(error => alert(error.message));
				
}

const getCurrentGame = () => {
	
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
	
	getGameLoop = setTimeout(getCurrentGame, 1000)
}

function displayScore() {
    userScore = document.querySelector(".userscore")
    if(currentGame.score < 1) {
        userScore.innerHTML = `You scored ${currentGame.score} hits!`
        userScore.style.display = 'flex'
    }
    else if (currentGame.score === 1) {
        userScore.innerHTML = `You scored ${currentGame.score} hit!`
        userScore.style.display = 'flex'
    }
    else if (currentGame.score > 1) {
        userScore.innerHTML = `You scored ${currentGame.score} hits!`
        userScore.style.display = 'flex'
    }
}
// gameLoop()

const SCORES_URL = 'http://localhost:3000/scores'
const GAME_URL = 'http://localhost:3000/games'
const USER_URL = 'http://localhost:3000/users'

const createacctBtn = document.querySelector('.create_account_button')
const newUserForm = document.querySelector('.new_account_div')

const logInBtn = document.querySelector('.log_in_button')
const logInForm = document.querySelector('.log_in_div ')

let currentUserObj
let currentUser
let currentGame

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
    console.log(key.keyCode);

    if (key.keyCode === 37 && hero.left > 200){
        // console.log("LEFT")
        hero.left = hero.left - 10;
        moveHero()
    }
    else if (key.keyCode === 39 && hero.left < 900) {
        // console.log("RIGHT")
        hero.left = hero.left + 10;
        moveHero()
    }
    else if (key.keyCode === 38 && hero.top > 375) {
        // console.log("UP")
        hero.top = hero.top - 10;
        moveHero()
    }
    else if (key.keyCode === 40 && hero.top < 690) {
        // console.log("DOWN")
        hero.top = hero.top + 10
        moveHero()
    }
    else if (key.keyCode === 32)
    // console.log("FIRE!!")
        missiles.push({
            left: hero.left + 15, 
            top:  hero.top
    })
    drawMissiles();
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

// function drawExplosions() {

//     document.getElementById('explosions').innerHTML = ""
    
//     for (var explosion = 0; explosion < explosions.length; explosion++) {
//         document.getElementById('explosions').innerHTML += `<div class='explosion' style='left:${explosions[explosion].left}px; top:${explosions[explosion].top}px;'></div>`;
//     }

// }

function moveEnemies() {
    for (var enemy = 0; enemy < enemies.length; enemy++){
        enemies[enemy].top = enemies[enemy].top + 10;
        
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
            console.log("GAME OVER!")
        }
    }
}

function gameLoop() {
    setTimeout(gameLoop, 100)
    moveMissiles();
    drawMissiles();
    moveEnemies();
    drawEnemies();
    // moveExplosions();?
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
    // newGameBtn.style.display = "inline-block"
    // startGameBtn.style.display = "inline-block"
})

logInBtn.addEventListener('click', event => {
    logInForm.style.display = "block"
    logInBtn.style.display = 'none'
    createacctBtn.style.display = 'none'
})

const createUser = (form) => {
    currentUser = form.username.value
        return fetch(USER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: form.username.value,
                password: form.password.value
            })
            })
            .then(resp => resp.json())
            .then(user => {
                currentUserObj = user
                currentUser = user.username
            })
            .then(logInBtn.style.display = 'none')
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
    // newGameBtn.style.display = "inline-block"
    // startGameBtn.style.display = "inline-block"
})

const logInUser = (form) => {
    return fetch(`${USER_URL}/${form.username.value}`)
    .then(resp => resp.json())
    .then(user => {
        currentUserObj = user
        currentUser = user.username
        // getResults()
    })
    .catch(error => alert(error.message))
}

// gameLoop();


// User login
// Hero health/death
// High scores

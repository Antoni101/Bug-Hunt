var player = {
    money: 0,
    cooldown: 500, //2 Second Shoot cooldown
    canShoot: true,
    cursorX: 0,
    cursorY: 0,
    round: 1,
    damage: 1,
    hp: 10
}

var bugs = [
    { health: 1, x: 0, y: 0, value: 1, target: null, dead: false} ,
    { health: 1, x: 0, y: 0, value: 1, target: null, dead: false },
    { health: 1, x: 0, y: 0, value: 1, target: null, dead: false },
    { health: 1, x: 0, y: 0, value: 1, target: null, dead: false },
    { health: 1, x: 0, y: 0, value: 1, target: null, dead: false },
]

var game;
var cursor;
var bugsStart;
var gamespeed = 50;

function start() {
    game = document.getElementById("game");
    cursor = document.getElementById("cursor");

    game.addEventListener('mousemove', function(event) {
        player.cursorX = (event.clientX - game.offsetLeft) / game.offsetWidth * 100;
        player.cursorY = (event.clientY - game.offsetTop) / game.offsetHeight * 100;
        
        cursor.style.top = (player.cursorY - 8) + "%";
        cursor.style.left = player.cursorX + "%";
        //console.log("X - "+ cursor.style.left + " | Y - " + cursor.style.top)
    });

    game.addEventListener('click', function(event) {
        shoot()
    });
}

function shoot() {
    if (player.canShoot == true) {
        player.canShoot = false;
        cursor.style.transition = "0.1s";
        cursor.style.transform = "scale(1.5)";
        setTimeout(function(){ 
            cursor.style.transform = "scale(1)";
            cursor.style.transition = "none";
        }, 100);
        setTimeout(function(){ 
            player.canShoot = true;
        }, player.cooldown);
    }
}

function shootBug(bug) {
    bugs[bug].health -= player.damage
    if (bugs[bug].health <= 0 && bugs[bug].dead == false) {
        document.getElementById("bug" + [bug]).style.opacity = 0;
        player.money += bugs[bug].value
        bugs[bug].dead = true;
        document.getElementById("bug" + [bug]).setAttribute('draggable', false);
        document.getElementById("money").innerHTML = "$" + player.money;
    }
}

function bugPlacement() {
    for (let i = 0; i < bugs.length; i++) {    
        var randomSide = Math.floor(Math.random() * 2);
        if (randomSide == 1) {
            console.log("Bug" + i + " placed on left side")
            bugs[i].x = -100
            bugs[i].target = "right";
            
        }
        else {
            bugs[i].x = 200
            console.log("Bug" + i + " placed on right side")
            bugs[i].target = "left";
        }
        document.getElementById("bug" + i).style.left = bugs[i].x + "%";
        var randomHeight = Math.random() * (90 - 5) + 5
        document.getElementById("bug" + i).style.top = randomHeight + "%";''
    }
}

function bugMove() {
    console.log("Bugs Moving")
    for (let i = 0; i < bugs.length; i++) {    
        if (bugs[i].target == "right") {
            if (bugs[i].x < 200) {
                bugs[i].x += 1;
                document.getElementById("bug" + i).style.transform = "rotate(90deg)"
            }
        }
        else if (bugs[i].target == "left") {
            if (bugs[i].x > -100) {
                bugs[i].x -= 1;
                document.getElementById("bug" + i).style.transform = "rotate(-90deg)"
            }
        }
        else {
            alert("Error")
        }
        document.getElementById("bug" + i).style.left = bugs[i].x + "%";
        document.getElementById("bug" + i).style.top = bugs[i].y + "%";''
    }
}

function startGame() {
    for (let i = 0; i < bugs.length; i++) {
        document.getElementById("bug" + i).style.opacity = 0.7
        bugs[i].health = 1;
        bugs[i].dead = false;
    }
    bugPlacement()
    bugsStart = setInterval(bugMove, gamespeed);
}
 

document.addEventListener('DOMContentLoaded', start);
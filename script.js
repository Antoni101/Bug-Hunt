var player = {
    money: 0,
    cooldown: 500, //2 Second Shoot cooldown
    canShoot: true,
    cursorX: 0,
    cursorY: 0,
    round: 1,
    hp: 10
}

var bug1 = {
    health: 1,
    x: 0,
    y: 0
}

var bug2 = {
    health: 1,
    x: 0,
    y: 0
}

var bug3 = {
    health: 1,
    x: 0,
    y: 0
}

var bug4 = {
    health: 1,
    x: 0,
    y: 0
}

var bug5 = {
    health: 1,
    x: 0,
    y: 0
}

var game;
var cursor;

function start() {
    game = document.getElementById("game");
    cursor = document.getElementById("cursor");

    game.addEventListener('mousemove', function(event) {
        player.cursorX = (event.clientX - game.offsetLeft) / game.offsetWidth * 100;
        player.cursorY = (event.clientY - game.offsetTop) / game.offsetHeight * 100;
        
        cursor.style.top = (player.cursorY - 8) + "%";
        cursor.style.left = player.cursorX + "%";
        console.log("X - "+ cursor.style.left + " | Y - " + cursor.style.top)
    });

    game.addEventListener('click', function(event) {
        shoot()
    });
    bugPlacement()
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
        console.log("shoot")
        setTimeout(function(){ 
            player.canShoot = true;
        }, player.cooldown);
    }
}

function shootBug(bug) {
    document.getElementById(bug).style.display = "none";
}

function bugPlacement() {
    for (let i = 1; i < 6; i++) {    
        var randomSide = Math.floor(Math.random() * 2);
        if (randomSide == 1) {
            console.log("Bug" + i + " placed on left side")
            document.getElementById("bug" + i).style.left = "-100%";
        }
        else {
            console.log("Bug" + i + " placed on right side")
            document.getElementById("bug" + i).style.left = "200%";
        }
        var randomHeight = Math.random() * (90 - 5) + 5
        document.getElementById("bug" + i).style.top = randomHeight + "%";''
    }
}

function bug1() {
    console.log("Hi")
}

document.addEventListener('DOMContentLoaded', start);
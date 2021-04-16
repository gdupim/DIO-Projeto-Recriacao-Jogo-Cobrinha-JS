let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let direction = "none";
let pontos = 0;
let jogar = false, recomecar = false;
let indice = 0;
let cores = ["green", "blue", "yellow", "orange", "brown", "maroon", "lime", "crimson", 
             "black", "purple", "navy", "chartreuse", "forestgreen", "indigo", "lawngreen", 
             "lightseagreen", "orangered", "salmon", "springgreen", "yellowgreen"]; 
let snake = [];
snake[0] = {
    x: 8*box,
    y: 8*box
}
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}

function criarFundo(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}

function criarTexto(){
    context.fillStyle = "black";
    context.font = "25px Consolas";
    context.textAlign = "center";

    if(recomecar){
        context.fillText("GAME OVER!", 256, 210);
        context.fillText("CLIQUE AQUI PARA JOGAR DE NOVO!", 256, 280);
        document.addEventListener('click', reload);
    }
    else{
        context.fillText("CLIQUE AQUI PARA JOGAR!", canvas.width/2, canvas.width/2);
    }
}

function criarCobrinha(){
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = cores[indice];
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarFruta(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function criarPontuacao(){
    document.getElementById("pontos").innerHTML = pontos;
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right"){
        direction = "left";
    }
    if(event.keyCode == 38 && direction != "down"){
        direction = "up";
    }
    if(event.keyCode == 39 && direction != "left"){
        direction = "right";
    }
    if(event.keyCode == 40 && direction != "up"){
        direction = "down";
    }
}

function reload(){
    location.reload();
}

function iniciarJogo(){   
    //? Efeito Pac-man:
    if(snake[0].x > 15*box){
        snake[0].x = 0;
    }
    if(snake[0].x < 0){
        snake[0].x = 16*box;
    }
    if(snake[0].y > 15*box){
        snake[0].y = 0;
    }
    if(snake[0].y < 0){
        snake[0].y = 16*box;
    }

    //? Game over:
    for(let i = 1; i<snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            jogar=false;
            recomecar=true;
            criarTexto(recomecar);
        }
    }

    if(jogar){
        criarBG();
        criarCobrinha();
        criarFruta();
        criarPontuacao();
    }
    else{
        criarFundo();
        criarTexto(recomecar);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //? Movimento da cobrinha:
    switch(direction){
        case "right":
            snakeX += box;
        break;

        case "left":
            snakeX -= box;
        break;

        case "up":
            snakeY -= box;
        break;

        case "down":
            snakeY += box;
        break;
    }

    //? Cria frutinha:
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        
        //? Faz que a frutinha não apareça dentro da cobrinha:
        for(let i = 1; i<snake.length; i++){
            if(food.x == snake[i].x && food.y == snake[i].y){
                food.x = Math.floor(Math.random() * 15 + 1) * box;
                food.y = Math.floor(Math.random() * 15 + 1) * box;
            }
        }
        indice = Math.floor(Math.random() * cores.length);
        pontos++;
    }   

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
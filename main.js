// setting the marks
let Xs = "X";
let Os = "O";
//accessing the board
let board = document.getElementById("board");
// varibles for the map and (Xs and Os)
let cells;
let mark;
//games win counter
let Xwins = 1;
let Owins = 1;
let checkDraw = -1;
// chosing the mode to build thee rules and map
document.getElementById("single").onclick = () => {
    document.getElementById("settings").style.display = "block";
    document.getElementById("mode").style.display = "none";
    document.getElementById("image").style.display = "none";
    buildGrid1();
} ;
document.getElementById("1V1").onclick = () => {
    document.getElementById("settings").style.display = "block";
    document.getElementById("mode").style.display = "none";
    document.getElementById("image").style.display = "none";
    buildGrid2();
}
//chosing your mark X or O
document.getElementById("setX").onclick = () => {
    mark = Xs;
    document.getElementById("map").style.display = "block";
    document.getElementById("settings").style.display = "none";
    document.getElementById("turn").textContent = mark + " Turn";
};
document.getElementById("setO").onclick = () => {
    mark = Os;
    document.getElementById("map").style.display = "block";
    document.getElementById("settings").style.display = "none";
    document.getElementById("turn").textContent = mark + " Turn";
};
// build the 1 VS COM map
function buildGrid1() {
    for (var i = 1; i <= 9; i++) {
      var cell = document.createElement('span');
      cell.id = i;
      cell.addEventListener('click', playerMove);
      board.appendChild(cell);
      cells = Array.prototype.slice.call(board.getElementsByTagName('span'));
    }
}
//player move
function playerMove(){
    if (this.textContent == '') {
        this.textContent = mark;
        checkRow();
        if (checkDraw === 8){checkDraw--};
        Cmoves();
}};
//computer move
function Cmoves(){
    if (mark === Xs) {
        mark = Os;
    }
    else {mark = Xs;}
    let random;
    let emptyCells = [];
    cells.forEach(function(cell){
        if (cell.textContent == '') {
            emptyCells.push(cell);
          }
      });
        random = Math.ceil(Math.random() * emptyCells.length) - 1;
        emptyCells[random].textContent = mark;
        checkRow();
        if (mark === Xs) {
            mark = Os;
        }
        else {mark = Xs;}
};

// check for the win and draw
function checkRow() {
    checkGame(document.getElementById('1'), document.getElementById('2'), document.getElementById('3'));
    checkGame(document.getElementById('4'), document.getElementById('5'), document.getElementById('6'));
    checkGame(document.getElementById('7'), document.getElementById('8'), document.getElementById('9'));
    checkGame(document.getElementById('1'), document.getElementById('4'), document.getElementById('7'));
    checkGame(document.getElementById('2'), document.getElementById('5'), document.getElementById('8'));
    checkGame(document.getElementById('3'), document.getElementById('6'), document.getElementById('9'));
    checkGame(document.getElementById('1'), document.getElementById('5'), document.getElementById('9'));
    checkGame(document.getElementById('3'), document.getElementById('5'), document.getElementById('7'));
    checkDraw++;
    if(checkDraw === 9){
        document.getElementById("winner").textContent = " No winner";
        Swal.fire({icon: 'error',title: 'Oops...',text: 'Its tie!',})
        document.getElementById("again").style.display = "block";
        document.getElementById("again").onclick = () => {
            cells.forEach((e) => {
                e.textContent = "";
                e.classList.remove("winner");
                checkDraw = 0;
            });
            document.getElementById("winner").textContent ="";
            document.getElementById("again").style.display = "block";
            document.getElementById("turn").textContent = mark + " Turn";
        }
        if (mark === Xs) {
            mark = Os;
        }
        else {mark = Xs;}
    }
};

// actions for the winner and reseting the game
function checkGame(a, b, c){
    if (a.textContent == mark && b.textContent == mark && c.textContent == mark){
        checkDraw = 0;
        document.getElementById("winner").textContent = mark + " is the winner";
        Swal.fire('Good job!', mark + " is the winner",'success')
        document.getElementById("again").style.display = "block";
        a.classList.add("winner");
        b.classList.add("winner");
        c.classList.add('winner');
        if (mark === Xs){
            document.getElementById("Xmark").textContent =": " + Xwins++;
        }
        else if (mark === Os){
            document.getElementById("Omark").textContent =": " + Owins++;
        }
        document.getElementById("again").onclick = () => {
            cells.forEach((e) => {
                e.textContent = "";
                e.classList.remove("winner");
                checkDraw = 0;
            });
            document.getElementById("winner").textContent ="";
            document.getElementById("again").style.display = "block";
            document.getElementById("turn").textContent = mark + " Turn";
        }
    }
}

// build the P1 VS P2 map
function buildGrid2() {
    for (var i = 1; i <= 9; i++) {
      var cell = document.createElement('span');
      cell.id = i;
      cell.addEventListener('click', multiplayer);
      board.appendChild(cell);
      cells = Array.prototype.slice.call(board.getElementsByTagName('span'));
        };
    };

// moves for both players
function multiplayer(){
    if (this.textContent == '') {
        this.textContent = mark;
        checkRow();
        if (mark === Xs) {
            mark = Os;
        }
        else {mark = Xs;}
    };
    document.getElementById("turn").textContent = mark + " Turn";
};
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("node_id", ev.target.id);
    var node_id = ev.dataTransfer.getData("node_id");
    var node = document.getElementById(node_id);
    markPossibleMovesByPiece(node)
}

function markPossibleMovesByPiece(piece){
    var possible_moves = getPossibleMovesByPiece(piece);
    highlightPossibleSquares(possible_moves);
    console.log(possible_moves);
}

function getPossibleMovesByPiece(piece){
    console.log(piece);
    if( piece.type == "pawn"){
        return getPossibleMovesByPawn(piece);
    }
    return null;
}

function highlightPossibleSquares(squares){
    for(var s = 0; s < squares.length; s++){
        square = document.getElementById(squares[s]);
        square.className = "highlight square";
    }
}

function resetHighlight(){
    for(var i=0; i < squares.length; i++){
        squares[i].className="square";
    }
}

function getPossibleMovesByPawn(pawn){
    var moves = [];
    if(pawn.first_move){
        moves.push(pawn.current_square.column_letter + (pawn.direction*2+parseInt(pawn.current_square.row_number)));
    }
    moves.push((pawn.current_square.column_letter + (pawn.direction*1+parseInt(pawn.current_square.row_number))));

    return moves;
}

function drop(ev) {
    ev.preventDefault();
    resetHighlight();
    var node_id = ev.dataTransfer.getData("node_id");
    var node = document.getElementById(node_id);
    var square = ev.target;
    if( !square.is_square ){
        square = square.parentNode;
    }
           /* movePiece(node.current_square, square);*/

}

function movePiece(origin_square, target_square){
    var child = origin_square.firstChild;
    target_square.appendChild(child);
    child.current_square = square;
}

var squares = document.getElementsByClassName("square");
for( var i = 0; i < squares.length; i++){
    var square = squares[i];
    new Square(square);
}

var pawns = document.getElementsByClassName("pawn");
for( var i = 0; i < pawns.length; i++){
    var pawn = pawns[i];
    new Pawn(pawn, pawn.parentNode);
}

function Square(node){
    node.is_square = true;
    node.empty = function(){
        return node.innerHTML == "";
    };
    node.row_number = node.getAttribute("data-row-number");
    node.column_letter = node.getAttribute("data-column-letter");
    node.id = node.column_letter + node.row_number;
    return node;
}

function Pawn(node, current_square){
    return new Piece(node, "pawn", current_square)
}

function Piece(node, type, current_square){
    node.type = type;
    node.current_square = current_square;
    node.first_move = true;
    node.color = node.getAttribute("data-color");
    node.direction = node.color == "white" ? 1 : -1 ;
    return node;
}
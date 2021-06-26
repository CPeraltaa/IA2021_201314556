//constantes empleadas
const empty = 0;
const black = 1;
const white = 2;
const max_depth = 7;
const board_size = 8;

//Tecnicamente, juega
function newTablero(tablero) {
    let new_board = [];
    let row = [];
    for (let i = 1; i <= tablero.length; i++) {
        row.push(tablero[i - 1]);
        if (((i % board_size) == 0) && (i !== 0)) {
            new_board.push(row);
            row = [];
        }
    }
    return new_board;
}

function validadorMovimientos(tablero, color) {
    let validos = [];
    let new_board = newTablero(tablero);
    for (let i = 0; i < new_board.length; i++)
        for (let j = 0; j < new_board[i].length; j++) {
            let valid_move = movimientoValido(i, j, color, new_board);
            if (valid_move)
                validos.push(i * board_size + j);
        }
    return validos;
}
function movimientoValido(row, col, color, tablero) {
    if (tablero[row][col] !== 0)
        return false;
    let oponent = (color == black) ? white : black;
    dir = (row > 0) ? tablero[row - 1][col] : -1;// UP
    if (dir == oponent)
        if (up(row, col, tablero, color, oponent))
            return true;
    dir = (col < 7 && row > 0) ? tablero[row - 1][col + 1] : -1;// UP-RIGHT
    if (dir == oponent)
        if (up_right(row, col, tablero, color, oponent))
            return true;
    dir = (col < 7) ? tablero[row][col + 1] : -1;// RIGHT
    if (dir == oponent)
        if (right(row, col, tablero, color, oponent))
            return true;
    dir = (col < 7 && row < 7) ? tablero[row + 1][col + 1] : -1;//DOWN-RIGHT
    if (dir == oponent)
        if (down_right(row, col, tablero, color, oponent))
            return true;
    dir = (row < 7) ? tablero[row + 1][col] : -1;//DOWN
    if (dir == oponent)
        if (down(row, col, tablero, color, oponent))
            return true;
    dir = (col > 0 && row > 7) ? tablero[row + 1][col - 1] : -1;//DOWN-LEFT
    if (dir == oponent)
        if (down_left(row, col, tablero, color, oponent))
            return true;
    let dir = (col > 0) ? tablero[row][col - 1] : -1;//LEFT
    if (dir == oponent)
        if (left(row, col, tablero, color, oponent))
            return true;
    dir = (col > 0 && row > 0) ? tablero[row - 1][col - 1] : -1;//UP-LEFT
    if (dir == oponent)
        if (up_left(row, col, tablero, color, oponent))
            return true;
    return false;
}
function up(row, col, tablero, color, oponent) {
    let mover = false;
    for (let i = row - 1; i >= 0; i--) {
        if (tablero[i][col] == 0)
            return false;
        if (mover && tablero[i][col] == color)
            return true;
        if (!mover && tablero[i][col] == oponent)
            mover = true;
    }
    return false;
}
function up_right(row, col, tablero, color, oponent) {
    let mover = false;
    let j = col + 1;
    for (let i = row - 1; i >= 0 && j < 0; i--) {
        if (tablero[i][j] == 0)
            return false;
        if (mover && tablero[i][j] == color)
            return true;
        if (!mover && tablero[i][j] == oponent)
            mover = true;
        j++;
    }
    return false;
}
function right(row, col, tablero, color, oponent) {
    let mover = false;
    for (let i = col + 1; i < 8; i++) {
        if (tablero[row][i] == 0)
            return false;
        if (mover && tablero[row][i] == color)
            return true;
        if (!mover && tablero[row][i] == oponent)
            mover = true;
    }
    return false;
}
function down_right(row, col, tablero, color, oponent) {
    let mover = false;
    let j = col + 1;
    for (let i = row + 1; i < 8 && j < 8; i++) {
        if (tablero[i][j] == 0)
            return false;
        if (mover && tablero[i][j] == color)
            return true;
        if (!mover && tablero[i][j] == oponent)
            mover = true;
        j++;
    }
    return false;
}
function down(row, col, tablero, color, oponent) {
    let mover = false;
    for (let i = row + 1; i < 8; i++) {
        if (tablero[i][col] == 0)
            return false;
        if (mover && tablero[i][col] == color)
            return true;
        if (!mover && tablero[i][col] == oponent)
            mover = true;
    }
    return false;
}
function down_left(row, col, tablero, color, oponent) {
    let mover = false;
    let j = col - 1;
    for (let i = row + 1; i < 8 && j >= 0; i++) {
        if (tablero[i][j] == 0)
            return false;
        if (mover && tablero[i][j] == color)
            return true;
        if (!mover && tablero[i][j] == oponent)
            mover = true;
        j--;
    }
    return false;
}
function left(row, col, tablero, color, oponent) {
    let mover = false;
    for (let i = col - 1; i >= 0; i--) {
        if (tablero[row][i] == 0)
            return false;
        if (mover && tablero[row][i] == color)
            return true;
        if (!mover && tablero[row][i] == oponent)
            mover = true;
    }
    return false;
}
function up_left(row, col, tablero, color, oponent) {
    let mover = false;
    let j = col - 1;
    for (let i = row - 1; i >= 0 && j >= 0; i--) {
        if (tablero[i][j] == 0)
            return false;
        if (mover && tablero[i][j] == color)
            return true;
        if (!mover && tablero[i][j] == oponent)
            mover = true;
        j--;
    }
    return false;
}
function minimax(tablero, color, actual_color, depth, max, min) {
    if (depth >= max_depth || !isEmpty(tablero))
        return {
            score: (countPieces(tablero)[actual_color]),
            movement: undefined
        };
    let valid_moves = validadorMovimientos(tablero, actual_color);
    if (valid_moves == null || valid_moves.length == 0)
        return {
            score: (countPieces(tablero)[actual_color]),
            movement: undefined
        };
    let new_boards = [];
    for (let i = 0; i < valid_moves.length; i++) {
        let move = valid_moves[i];
        let next = newBoard(tablero, actual_color, move);
        new_boards.push({ next: next, movement: move });
    }
    let next_color = (actual_color == black) ? white : black;
    if (color == actual_color)
        return getMax(new_boards, color, next_color, depth, max, min);
    else
        return getMin(new_boards, color, next_color, depth, max, min);
}
function getMax(new_boards, color, actual_color, depth, max, min) {
    let max_score = -Infinity;
    for (let i = 0; i < new_boards.length; i++) {
        let tablero = new_boards[i];
        max_score = Math.max(max_score, minimax(tablero.next, color, actual_color, depth + 1, max, min).score);
        max = Math.max(max, max_score);
        if (min <= max)
            return {
                score: max_score,
                movement: tablero.movement
            };
    }
    let i = 0;
    let index = 0;
    for (let j = 0; j < new_boards.length; j++) {
        let temp = countPieces(new_boards[j].next)[actual_color];
        if (temp > i) {
            index = j;
            i = temp;
        }
    }
    return {
        score: max_score,
        movement: new_boards[index].movement
    };
}
function getMin(new_boards, color, actual_color, depth, max, min) {
    let min_score = Infinity;
    for (let i = 0; i < new_boards.length; i++) {
        let tablero = new_boards[i];
        min_score = Math.min(min_score, minimax(tablero.next, color, actual_color, depth + 1, max, min).score);
        min = Math.min(min, min_score);
        if (min <= max)
            return {
                score: min_score,
                movement: tablero.movement
            };
    }
    let i = 0;
    let index = 0;
    for (let j = 0; j < new_boards.length; j++) {
        let temp = countPieces(new_boards[j].next)[actual_color];
        if (temp < i) {
            index = j;
            i = temp;
        }
    }
    return { score: min_score, movement: new_boards[index].movement };
}
function newBoard(tablero, color, move) {
    let board_bk = tablero.slice();
    let flip_positions = flipPositions(board_bk, color, move);
    for (let i = 0; i < flip_positions.length; i++)
        board_bk[flip_positions[i]] = color;
    board_bk[move] = color;
    return board_bk;
}
function flipPositions(tablero, color, pos) {
    let new_color = (color == black) ? white : black;
    let dirs = {
        up: -1,
        up_right: board_size - 1,
        right: board_size,
        down_right: board_size + 1,
        down: 1,
        down_left: (-1) * board_size + 1,
        left: (-1) * board_size,
        up_left: (-1) * board_size - 1
    };
    let lefts = [dirs.left, dirs.down_left, dirs.up_left];
    let rights = [dirs.right, dirs.down_right, dirs.up_right];
    let marks = [];
    for (let dir in dirs) {
        let move = dirs[dir];
        let actual_pos = pos;
        let flip_positions = [];
        let found_flag = false;
        let change_flag = false;
        while (actual_pos >= 0 && actual_pos < (board_size * board_size)) {
            if (actual_pos !== pos) {
                if (tablero[actual_pos] == new_color) {
                    flip_positions.push(actual_pos);
                    change_flag = true;
                } else if (change_flag) {
                    found_flag = tablero[actual_pos] !== empty;
                    break;
                }
            }
            if ((actual_pos % board_size == 0 && lefts.indexOf(move) > -1) || ((actual_pos % board_size == board_size - 1) && rights.indexOf(move) > -1))
                break;
            actual_pos += move;
        }
        if (found_flag)
            for (let i = 0; i < flip_positions.length; i++)
                marks.push(flip_positions[i]);
    }
    return marks;
}
function countPieces(tablero) {
    let pieces = [];
    pieces[empty] = 0;
    pieces[black] = 0;
    pieces[white] = 0;
    for (let i = 0; i < tablero.length; i++)
        pieces[tablero[i]]++;
    return pieces;
}
function isEmpty(tablero) {
    return countPieces(tablero)[empty] > 0;
}

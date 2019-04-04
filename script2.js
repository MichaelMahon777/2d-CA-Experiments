
function get_random_dir(){

	var dir = (Math.floor(Math.random() * 3)) - 1; // generates random int of -1, 0 or 1

	return (dir * cellSize);

}

function get_random_x(){

	var loc_x = Math.floor(Math.random() * (gridWidth)); // generates random int from 0 (inclusive) to 1600 (exclusive)

	return loc_x;

}

function get_random_y(){

	var loc_y = Math.floor(Math.random() * (gridHeight)); // generates random int from 0 (inclusive) to 900 (exclusive)

	return loc_y;

}
function draw_stones(){

	for (let i = 0; i < grid[i].length; i++) {

		for (let j = 0; j < grid[j].length; j++) {

  			if (grid[i][j] == 1){

  				context.fillStyle = "black"; // <<-- customize clear/background color here
				context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);

  			} 
  		}
	}
}

function get_random_dir(){

	var dir = (Math.floor(Math.random() * 3)) - 1; // generates random int of -1, 0 or 1

	return (dir * cellSize);

}

function get_random_x(){

	var loc_x = (Math.floor(Math.random() * (gridWidth + 1)));

	return loc_x;

}

function get_random_y(){

	var loc_y = (Math.floor(Math.random() * (gridHeight + 1)));

	return loc_y;

}
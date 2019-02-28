function draw_grid() {

	var width = 1600;
	var height = 900;
	var cellSize = 10;
	var gridHeight = height / cellSize;
	var gridWidth = width / cellSize;

	// draw grid
	for (let i = 0; i < gridWidth; i++) {

  		for (let j = 0; j < gridHeight; j++) {

    		context.strokeStyle = "green";
			context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
  		}
	}
}
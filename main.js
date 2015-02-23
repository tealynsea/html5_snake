$(document).ready(function() {

	//Canvas stuff
	var canvas=$('#canvas')[0];
	var ctx = canvas.getContext('2d');
	var w = $('#canvas').width();
	var h = $('#canvas').height();

	// variables

	var cw = 10;
	var d;
	var food;
	var score;	

	// Let's create the snake now
	var snake_array;  // will eventually be an empty array

	function init()
	{
		d = 'right';  // default direction
		create_snake();
		create_food();
		score = 0;

		//  Let's move the snake using a timer which will trigger
		//  the paint function every 60 ms
		if(typeof game_loop != 'undefined')clearInterval(game_loop);
		game_loop = setInterval(paint, 60); 
	}
	init();



	function create_snake() 
	{
		var length = 5;  // length of snake
		snake_array = [];  // now we have an empty array
		for (var i = length-1; i >= 0; i--)
		{
			// This will create the horizontal snake (0,0)
			snake_array.push({x:i, y:0});
		}
	}

	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw),
			y: Math.round(Math.random()*(h-cw)/cw),
		}
		//  This will create cell w/ x/y b/w 0-44
		//  45 positions(450/10) across rows and columns
	}

	// Let's paint the snake
	function paint()
	{
		// To avoid snake trail we need to paint the bg
		// on every frame
		// Paint the canvas here

		// Let's paint the canvas

		ctx.fillStyle = 'white';
		ctx.fillRect(0,0,w,h);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(0,0,w,h);	

		// Movement code for snake
		// Pop out tail cell and place it in front of head cell

		var nx = snake_array[0].x;
		var ny = snake_array[0].y;

		//  These were the position of the head cell
		//  We will increment to get new head position
	
		// Let's add proper direction based on movement
		if(d == 'right') nx++;
		else if(d == 'left') nx--;
		else if(d == 'up') ny--;
		else if(d == 'down')ny++;

		// Let's add the game over clauses now
		// this will restart game is snake hits wall

		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		{
			// restart game
			init();

			return;
		}

		//  Let's write the code to have the snake eat the food
		//  If new head position matches the food
		// 	create a new head instead of moving tail

		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y:ny};
			score++;

			// Create new food
			create_food();
		}
		else
		{
			var tail = snake_array.pop();  // pops out last cell
			tail.x = nx; tail.y = ny;			
		}

		snake_array.unshift(tail);  // puts the tail cell as head cell


		for (var i=0; i<snake_array.length;i++) 
		{
			var c = snake_array[i];

			// Let's paint 10px cells
			paint_cell(c.x, c.y);
		}

		// Let's paint the food
		paint_cell(food.x, food.y);

		var score_text = "Score: " + score;
		ctx.fillText(score_text,5, h-5);
	}

	// Let's first create generic function to paint cells
	function paint_cell(x,y)
	{
			//Lets paint 10px wide cells
			ctx.fillStyle = 'blue';
			ctx.fillRect (x * cw, y * cw, cw, cw);
			ctx.strokeStyle = 'white';
			ctx.strokeRect(x * cw, y * cw, cw, cw);

	}

	function check_collision(x,y,array)
	{
		// This function will check if the provided x/y coords exist
		// in an array of cells or not

		for(var i = 0; i<array.length; i++)
		{
			if(array[i].x == x && array[i].y ==y)
				return true;
		}
			return false;
	}

	//  Let's add keyboard controls
	$(document).keydown(function(e) {

		var key = e.which;

		//  Plus clause that prevents reversal

		if(key == '37' && d!='right') d='left';
		else if(key == '38' && d!= 'down') d='up';
		else if(key == '39' && d!= 'left') d='right';
		else if(key == '40' && d!= 'up') d='down';
		
	})

	
})












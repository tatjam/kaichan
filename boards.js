var focused_board = 0;
var all_boards = [];

function boards_load()
{
	current_window = "boards";
	
	fetch("https://cors-anywhere.herokuapp.com/a.4cdn.org/boards.json")
	.then((resp) => resp.json())
	.then(function(boards4)
	{
		var content = document.getElementById("content");
		content.innerHTML = "";

		for(board_key in boards4["boards"])
		{
			var board = boards4["boards"][board_key];
			var row = '<button class="board" nav-selectable=true id="board-' + board_key + '">' + 
				board["board"] + " - " + board["title"] + '</button>';
			content.innerHTML += row;
			all_boards.push(board);
		}

	})

	document.getElementById("left").innerText = "";
	document.getElementById("center").innerText = "Open";
	document.getElementById("right").innerText = "Search";
}

function boards_update()
{

	if(focused_board < 0)
	{
		focused_board = 0;
	}
	if(focused_board >= all_boards.length)
	{
		focused_board = all_boards.length - 1;
	}
	
	document.getElementById("board-" + focused_board).focus();
}

function boards_keydown(key, event)
{
	if(key == "ArrowDown")
	{
		focused_board++;
		boards_update();
	}
	else if(key == "ArrowUp" )
	{
		focused_board--;
		boards_update();
	}
	else if(key == "Enter")
	{
		// We leave and go to threads
		threads_load(all_boards[focused_board]["board"])
	}

}



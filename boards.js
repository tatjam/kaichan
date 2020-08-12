var focused_board = 0;
var all_boards = [];


function draw_boards()
{
	$("content").innerHTML = "";
	for(board_idx in all_boards)
	{
		var board = all_boards[board_idx];
		var row = '<button class="board" nav-selectable=true id="board-' + board_idx + '">' + 
			board["board"] + " - " + board["title"] + '</button>';
		$("content").innerHTML += row;
	}

	boards_update();
}

function boards_load()
{
	current_window = "boards";

	if(all_boards.length == 0)
	{
		console.log("Reloading boards");

		fetch("https://cors-anywhere.herokuapp.com/a.4cdn.org/boards.json")
		.then((resp) => resp.json())
		.then(function(boards4)
		{
			for(board_key in boards4["boards"])
			{
				all_boards.push(boards4["boards"][board_key]);
			}

			draw_boards();

		})
	}
	else
	{
		draw_boards();
	}

	$("left").innerText = "Settings";
	$("center").innerText = "Open";
	$("right").innerText = "Search";
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
	
	$("board-" + focused_board).focus();
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
		if(all_boards.length != 0)
		{
			// We leave and go to threads
			show_loading();
			threads_load(all_boards[focused_board]["board"])
		}
	}
	else if(key == "SoftLeft")
	{
		settings_load();	
	}

}



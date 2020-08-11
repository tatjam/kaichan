var current_window = "boards";

window.addEventListener("load", function() 
{
	boards_load();
});


window.addEventListener("keydown", event =>
{
	switch(current_window)
	{
		case "boards":
			return boards_keydown(event.key, event);
		case "threads":
			return threads_keydown(event.key, event);
	}
});
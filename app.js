var current_window = "boards";

function $(x) { return document.getElementById(x); }

window.addEventListener("load", function() 
{
	show_loading();
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
		case "settings":
			return settings_keydown(event.key, event);
	}
});
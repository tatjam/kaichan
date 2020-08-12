var settings_tab = "root";
var settings_idx = 0;

var settings = 
{
	"dark_mode": false,
}

var settings_cur_tab = [];
var settings_back = [];

function settings_button(id, text, fnc)
{
	settings_cur_tab.push({"id": id, type: "button", "button": fnc});

	$("content").innerHTML += '<button class="sbutton" id="' + id + '">' + text + '</button>'
}

function settings_navbutton(id, text, target)
{
	settings_cur_tab.push({"id": id, type: "nav", "nav": target});
	$("content").innerHTML += '<button class="snavbutton" id="' + id + '">' + 
	'<div class="snavbutton-text">' + text + '</div>' + 
	'<div class="snavbutton-arrow"></div>' + 
	'</button>';
}

function settings_toggle(id, text, bool)
{
	settings_cur_tab.push({"id": id, type: "toggle", "toggle": bool});
	$("content").innerHTML = "";
}

function settings_change()
{
	$("content").innerHTML = "";

	if(settings_tab == "root")
	{
		settings_navbutton("goto-appearance", "Appearance", "appearance");
		settings_navbutton("goto-behaviour", "Behaviour", "behaviour");
		settings_navbutton("goto-start", "Start", "start");
		settings_navbutton("goto-about", "About", "about");
	}
	else if(settings_tab == "appearance")
	{

	}
	else if(settings_tab == "start")
	{

	}
	else if(settings_tab == "about")
	{

	}
}

function settings_update()
{
	if(settings_idx < 0)
	{
		settings_idx = 0;
	}

	if(settings_idx >= settings_cur_tab.length)
	{
		settings_idx = settings_cur_tab.length - 1;
	}

	$(settings_cur_tab[settings_idx].id).focus();
}

function settings_load()
{
	current_window = "settings";
	
	settings_change();
	settings_update();
}

function settings_keydown(key, event)
{
	if(key == "ArrowUp")
	{
		settings_idx--;
		settings_update();
	}
	else if(key == "ArrowDown")
	{
		settings_idx++;
		settings_update();
	}
	else if(key == "Enter")
	{
		var current = settings_cur_tab[settings_idx];
		if(current["type"] == "nav")
		{
			settings_back.push(settings_tab);
			settings_tab = current["nav"];
			settings_change();
			settings_update();
		}
	}
	else if(key == "Backspace")
	{
		if(settings_back.length == 0)
		{
			boards_load();
		}
		else
		{
			settings_tab = settings_back[settings_back.length - 1];
			settings_back.pop();
			settings_change();
			settings_update();
		}

		event.preventDefault();	
	}
}
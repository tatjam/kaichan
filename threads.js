var lazyload_images = [];
var lazyload_timeout;

var focused_thread;
var all_threads = [];

function threads_lazyloader_do()
{
	var scroll = document.getElementById("content").scrollTop;
	for(i = 0; i < lazyload_images.length; i++)
	{
		img = lazyload_images[i];

		// We have a big margin
		if((img.offsetTop  < (window.innerHeight + scroll + 100)) && img.classList.contains("lazy"))
		{
			img.src = img.dataset.src;
			img.classList.remove("lazy");
			console.log("Loading image!");
		}
	};
}

function threads_lazyloader()
{
	lazyload_timeout = setInterval(threads_lazyloader_do, 100);
}
	


function threads_load(board)
{
	current_window = "threads";
	console.log("Loading board: " + board);

	fetch("https://cors-anywhere.herokuapp.com/a.4cdn.org/" + board + "/catalog.json")
	.then((resp) => resp.json())
	.then(function(pages)
	{
		var content = document.getElementById("content");
		content.innerHTML = "";

		var thread_idx_abs = 0;
		for(page_idx in pages)
		{
			var page = pages[page_idx];
			for(thread_idx in page["threads"])
			{
				thread = page["threads"][thread_idx];
				img_w = thread["w"];
				img_h = thread["h"];
				// We rescale keeping proportion
				var aspect = img_h / img_w;
				if(img_w > 80)
				{
					img_w = 80;
					img_h = img_w * aspect;
				}
				if(img_h > 80)
				{
					img_h = 80;
					img_w = img_h / aspect;
				}
				// We create the complex button
				var row = '<a href="" class="thread" nav-selectable=true id="thread-' + thread_idx_abs + '">' + 
				// Image column
				'<div class="column">' + 
				'<img width="' + img_w + '" height="' + img_h + 
				'" class="lazy" data-src="https://i.4cdn.org/' + board + '/' + thread["tim"] + 's.jpg"></img>' + 
				'</div>' + 
				// Text column
				'<div class="column">';

				if(thread["sub"] != undefined)
				{
					row = row + '<h>' + thread["sub"] + '</h>';
				}
				else
				{
					var max = 50;
					if(thread["com"].length < max)
					{
						max = thread["com"].length;
					}
					// Write a bit of the post content
					row = row + "<p>" + thread["com"].substr(0, max) + " (...)</p>";
				}

				row = row + '</div>' +
				'</a>';
				content.innerHTML += row;

				all_threads.push(thread);
				thread_idx_abs++;
			}
		}

		focused_thread = 0;
		lazyload_images = document.querySelectorAll("img.lazy");
		threads_lazyloader();
	})

	document.getElementById("left").innerText = "Catalog";
	document.getElementById("center").innerText = "Open";
	document.getElementById("right").innerText = "Search";
}

function threads_update()
{
	if(focused_thread < 0)
	{
		focused_thread = 0;
	}
	if(focused_thread >= all_threads.length)
	{
		focused_thread = all_threads.length - 1;
	}

	document.getElementById("thread-" + focused_thread).focus();
}

function threads_keydown(key, event)
{
	if(key == "ArrowDown")
	{
		focused_thread++;
		threads_update();
	}
	else if(key == "ArrowUp" )
	{
		focused_thread--;
		threads_update();
	}
	else if(key == "Backspace")
	{
		event.preventDefault();
		boards_load();
	}
}
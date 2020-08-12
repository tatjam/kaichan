function posts_load(thread)
{
	fetch("https://cors-anywhere.herokuapp.com/a.4cdn.org/" + board + "/thread/" + thread + ".json")
	.then((resp) => resp.json())
	.then(function(thread)
	{

	});
}
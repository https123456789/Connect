/* Global IO Variables */
var output = document.getElementById("output");
var prompt = document.getElementById("prompt");

/* Shell Loading Animation */
output.innerHTML += "Loading...";
setTimeout(function() {
	_clear();
	_print("Bash - " + new Date() + "&#13;");
	prompt.value = "cat notices.txt";
	returnCommand();
}, 1000);

/* Global Genral Variables */
var commands = ["cat : Scheduled for Repair on 09-12-2021", "clear", "help : Under repair", "ls : Scheduled for Repair on 09-9-2021", "man"];
var promptFocus = false;

/* Event Listeners */
document.addEventListener("keydown", handleKeyEvent);

function handleKeyEvent(event) {
	var key = event.code;
	if (promptFocus != true) {
		return;
	}
	if (key == "Enter") {
		returnCommand();
	}
}

function startFocus() {
	promptFocus = true;
}

function endFocus() {
	promptFocus = false;
}

function returnCommand() {
	var command = prompt.value;
	prompt.value = "";
	_print("$ " + command + "&#13;");
	argv = command.split(" ");
	command = argv[0];
	switch (command) {
		case "cat":
			cat("~/" + argv[1]);
			_scroll(window.innerHeight);
			break;
		case "clear":
			clear();
			_scroll(window.innerHeight);
			break;
		case "help":
			help();
			_scroll(window.innerHeight);
			break;
		case "ls":
			ls(argv[1]);
			_scroll(window.innerHeight);
			break;
		case "man":
			man(argv[1]);
			_scroll(window.innerHeight);
			break;
		default:
			_print("Unknown command: " + command + "&#13;");
			_scroll(window.innerHeight);
			break;
	}
}

/* Bin */
function cat(path) {
	_print(path + "&#13;");
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener("load", function() {
		_print(this.responseText + "&#13;&#13;EOF&#13;");
	});
	xhttp.open("GET", path);
	xhttp.send();
}

function clear() {
	_clear();
}

function help() {
	_print("Commands:&#13;");
	for (var i = 0; i < commands.length; i++) {
		_print("&#9;" + commands[i] + "&#13;");
	}
	_print("&#13;For more detailed information, use the command: man <command>&#13;");
}

function ls(path) {
	var data;
	var validated = 0;
	var index;
	function validatePath() {
		var directories = data.directories;
		for (var i = 0; i < directories.length; i++) {
			if (directories[i].path == path) {
				validated = 1;
				index = i;
			}
		}
		if (validated == 0) {
			_print("No directory exists under the name " + path + ".&#13;");
			return;
		}
		getContents();
	}
	function getContents() {
		_print("Contents:&#13;");
		var contentsData = data.directories[index].contents;
		for (var i = 0; i < contentsData.length; i++) {
			_print("&#9;" + contentsData[i].name + "&#13;");
		}
	}
	function displayData() {
		
	}
	_print(path + "&#13;");
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener("load", function() {
		data = JSON.parse(this.responseText);
		validatePath();
	});
	xhttp.open("GET", "Bin/dirData.json");
	xhttp.send();
}

function man(entryName) {
	// Check if required argument exists
	if (!entryName) {
		_print("Invalid arguments: missing 1 required argument.&#13;");
		return;
	}
	var data;
	var index;
	var checkerRequest = new XMLHttpRequest();
	function verifyEntry() {
		var verified = 0;
		for (var i = 0; i < data.indexer.length; i++) {
			if (data.indexer[i] == entryName) {
				_print("Manual entry for " + entryName + ":&#13;");
				index = i;
				verified = 1;
			}
		}
		if (verified != 1) {
			_print("No manual entry for " + entryName + "&#13;");
			return;
		}
		printEntry();
	}
	function printEntry() {
		var str = data.entries[index].name;
		if (data.entries[index].arguments) {
			str += " <" + data.entries[index].arguments + ">";
		}
		if (data.entries[index].options) {
			for (var i = 0; i < data.entries[index].options.length; i++) {
				str += " [" + data.entries[index].options[i] + "]";
			}
		}
		_print(str + "&#13;");
	}
	checkerRequest.addEventListener("load", function() {
		data = JSON.parse(this.responseText);
		verifyEntry();
	});
	checkerRequest.open("GET", "Bin/man/index.json");
	checkerRequest.send();
}
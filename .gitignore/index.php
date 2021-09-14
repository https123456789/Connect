<!DOCTYPE html>
<html>
	<head>
		<title>Shell Emulator</title>
		<link rel="stylesheet" href="style.css?rnd=1">
		<div id="imports">
			<script src="Imports/foundations.js"></script>
		</div>
	</head>
	<body>
		<input type="text" id="prompt" accesskey=" " onblur="endFocus()" onFocus="startFocus()">
		<textarea id="output" disabled></textarea>
		<script src="main.js"></script>
	</body>
</html>
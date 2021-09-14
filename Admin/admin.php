<!DOCTYPE html>
<html>
    <head>
        <title>Admin Portal</title>
    </head>
    <body>
        <h1>Admin Portal</h1>
        <div id="actionsMenu">
            <button onclick="gitRetrive()">Retrive Latest from Github Repositoriy</button>
        </div>
        <div id="actionLoader"></div>
        <script>
            function gitRetrive() {
                var loaderArea = document.getElementById("actionLoader");
                var request = XMLHttpRequest();
                request.addEventListener("load", function() {
                    loaderArea.innerHTML = this.responseText;
                });
                request.open("GET", "https://raw.githubusercontent.com/https123456789/Connect/main/main.js");
                request.send();
            }
        </script>
    </body>
</html>
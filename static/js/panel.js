
document.addEventListener("DOMContentLoaded", function() {
    var fileInput = document.getElementById("file-input");
    var loadDataBtn = document.getElementById("load-data-btn");
    var methodButtons = document.querySelectorAll(".method-button");
    var loadedData;
    var isFileLoaded = false;

    fileInput.addEventListener("change", function() {
        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            var reader = new FileReader();

            reader.onload = function(e) {
                try {
                    loadedData = JSON.parse(e.target.result);
                    isFileLoaded = true;
                } catch (error) {
                    isFileLoaded = false;
                    console.error("Błąd parsowania pliku JSON:", error);
                    alert("Niepoprawny format danych. Plik musi być w formacie JSON.");
                }
            };
            reader.readAsText(file);
        }
    });

    loadDataBtn.addEventListener("click", function(event) {
        if (isFileLoaded) {
            methodButtons.forEach(function(button) {
                button.style.backgroundColor = "#4CAF50";
            });
            console.log("Poprawnie załadowane dane:");
            console.log(loadedData);
        } else {
            alert("Aby załadować dane, wczytaj poprawny plik JSON.");
        }
        event.preventDefault();
    });

    methodButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            if (!isFileLoaded) {
                alert("Aby używać tych funkcji, wczytaj poprawny plik JSON i zaznacz przycisk 'Wczytaj dane'.");
            } else if (button.style.backgroundColor !== "rgb(76, 175, 80)") {
                alert("Kliknij 'Wczytaj dane', aby umożliwić korzystanie z tej funkcji.");
            } else {
                var selectedAlgorithm = button.textContent;
                console.log("selectedAlgorithm = ", selectedAlgorithm)
                var selectedPath;
                if(selectedAlgorithm === "Dijkstra's Algorithm" || selectedAlgorithm === "A* Algorithm" || selectedAlgorithm === "ACO Algorithm"){
                    selectedPath = "/panel/dij_a_aco";
                } else if (selectedAlgorithm === "DQN Algorithm"){
                    selectedPath = "/panel/dqn";
                } else if (selectedAlgorithm === "RRT Algorithm" || selectedAlgorithm === "RRT* Algorithm"){
                    selectedPath = "/panel/rrt";
                }

                // window.location.href = selectedPath;
                window.location.href = selectedPath + "?selectedAlgorithm=" + encodeURIComponent(selectedAlgorithm);
            }
        });
    });
});

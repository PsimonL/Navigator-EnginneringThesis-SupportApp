
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
                button.style.backgroundColor = "#4CAF50"; // Zmiana koloru na zielony
            });
            console.log("Poprawnie załadowane dane:");
            console.log(loadedData);
        } else {
            alert("Aby załadować dane, wczytaj poprawny plik JSON.");
        }
        event.preventDefault();
    });
    //
    // methodButtons.forEach(function(button) {
    //     button.addEventListener("click", function() {
    //         if (!isFileLoaded) {
    //             alert("Aby używać tych funkcji, wczytaj poprawny plik JSON i zaznacz przycisk 'Wczytaj dane'.");
    //         } else if (button.style.backgroundColor !== "rgb(76, 175, 80)") {
    //             alert("Kliknij 'Wczytaj dane', aby umożliwić korzystanie z tej funkcji.");
    //         }
    //     });
    // });

    methodButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            if (!isFileLoaded) {
                alert("Aby używać tych funkcji, wczytaj poprawny plik JSON i zaznacz przycisk 'Wczytaj dane'.");
            } else if (button.style.backgroundColor !== "rgb(76, 175, 80)") {
                alert("Kliknij 'Wczytaj dane', aby umożliwić korzystanie z tej funkcji.");
            } else {
                switch (button.textContent) {
                    case "A* Algorithm":
                    case "Dijkstra's Algorithm":
                    case "ACO Algorithm":
                        window.location.href = "dij_a_aco.html";
                        break;
                    case "RRT Algorithm":
                    case "RRT* Algorithm":
                        window.location.href = "rrt.html";
                        break;
                    case "DQN Algorithm":
                        window.location.href = "dqn.html";
                        break;
                }
            }
        });
    });
});

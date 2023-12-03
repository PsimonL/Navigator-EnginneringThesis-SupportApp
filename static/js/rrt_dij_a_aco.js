function generatePlot(start_point, goal_point, obstacles, room_coords, ret_path) {
    const fig = Plotly;
    var NODE_SIZE = 1;

    //     // Tworzenie punktów na wykresie dla węzłów
    // for (const node of grid) {
    //     Plotly.addTraces(fig, {
    //         x: [node.x],
    //         y: [node.y],
    //         mode: 'markers',
    //         marker: { size: NODE_SIZE, color: 'white' }
    //     });
    // }

    // Tworzenie obszarów przeszkód
    for (const obstacle of obstacles) {
        const rect_x = [obstacle[0], obstacle[0] + obstacle[2], obstacle[0] + obstacle[2], obstacle[0], obstacle[0]];
        const rect_y = [obstacle[1], obstacle[1], obstacle[1] + obstacle[3], obstacle[1] + obstacle[3], obstacle[1]];

        Plotly.addTraces(fig, {
            x: rect_x,
            y: rect_y,
            mode: 'lines',
            line: { color: 'blue' },
            fill: 'toself',
            fillcolor: 'blue'
        });
    }

    // Dodanie punktu startowego
    Plotly.addTraces(fig, {
        x: [start_point[0]],
        y: [start_point[1]],
        mode: 'markers',
        marker: { size: NODE_SIZE * 8, color: 'yellow' }
    });

    // Dodanie punktu końcowego
    Plotly.addTraces(fig, {
        x: [goal_point[0]],
        y: [goal_point[1]],
        mode: 'markers',
        marker: { size: NODE_SIZE * 8, color: 'green' }
    });

    // Dodanie ścieżki, jeśli istnieje
    if (ret_path) {
        const path_x = ret_path.map(point => point[0]);
        const path_y = ret_path.map(point => point[1]);

        Plotly.addTraces(fig, {
            x: path_x,
            y: path_y,
            mode: 'lines',
            line: { color: 'red', width: NODE_SIZE * 2 }
        });
    }

    // Dodanie obszaru pomieszczenia, jeśli jest
    if (room_coords.length > 1) {
        const room_x = room_coords.map(coord => coord[0]).concat([room_coords[0][0]]);
        const room_y = room_coords.map(coord => coord[1]).concat([room_coords[0][1]]);

        Plotly.addTraces(fig, {
            x: room_x,
            y: room_y,
            mode: 'lines',
            line: { color: 'orange', width: NODE_SIZE }
        });
    }

    // Aktualizacja układu wykresu
    Plotly.update(fig, {
        autosize: false,
        width: 800,
        height: 800,
        showlegend: false,
        xaxis: { scaleanchor: 'y', scaleratio: 1 },
        yaxis: { scaleanchor: 'x', scaleratio: 1 }
    });


    const plotContainer = document.getElementById('plot-container');
    Plotly.newPlot(plotContainer, data, layout);
}

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedAlgorithm = urlParams.get('selectedAlgorithm') || '__algo_name__';

    const wymiaryPomieszczenia = JSON.parse(urlParams.get('wymiary_pomieszczenia')) || null;
    const punktStartowy = JSON.parse(urlParams.get('punkt_startowy')) || null;
    const punktKoncowy = JSON.parse(urlParams.get('punkt_koncowy')) || null;
    const przeszkody = JSON.parse(urlParams.get('przeszkody')) || null;
    const selectedSolutionBar = document.getElementById('selected-solution-bar');

    console.log("Selected Algorithm:", selectedAlgorithm);
    console.log("Wymiary Pomieszczenia:", wymiaryPomieszczenia);
    console.log("Punkt Startowy:", punktStartowy);
    console.log("Punkt Końcowy:", punktKoncowy);
    console.log("Przeszkody:", przeszkody);

    const wymiaryPomieszczeniaElement = document.getElementById('wymiaryPomieszczenia');
    const punktStartowyElement = document.getElementById('punktStartowy');
    const punktKoncowyElement = document.getElementById('punktKoncowy');
    const przeszkodyElement = document.getElementById('przeszkody');

    wymiaryPomieszczeniaElement.innerText = JSON.stringify(wymiaryPomieszczenia);
    punktStartowyElement.innerText = JSON.stringify(punktStartowy);
    punktKoncowyElement.innerText = JSON.stringify(punktKoncowy);
    przeszkodyElement.innerText = JSON.stringify(przeszkody);

    const algorithmNameElement = document.createElement('span');
    algorithmNameElement.innerText = selectedAlgorithm;
    algorithmNameElement.style.fontWeight = 'bold';

    selectedSolutionBar.innerHTML = 'Wybrane rozwiązanie ';
    selectedSolutionBar.appendChild(algorithmNameElement);

    console.log("start_point = ", start_point)
    console.log("goal_point = ", goal_point)
    console.log("obstacles = ", obstacles)
    console.log("room_coords = ", room_coords)
    console.log("ret_path = ", ret_path)
    // generatePlot(start_point, goal_point, obstacles, room_coords, ret_path);
});



function generatePlot(punktStartowy, punktKoncowy, przeszkody, wymiaryPomieszczenia, sciezka) {
    const NODE_SIZE = 1;
    let traces = []


    przeszkody.forEach((obstacle, index) => {
        let rect_x = [obstacle[0], obstacle[0] + obstacle[2], obstacle[0] + obstacle[2], obstacle[0], obstacle[0]];
        let rect_y = [obstacle[1], obstacle[1], obstacle[1] + obstacle[3], obstacle[1] + obstacle[3], obstacle[1]];
        let trace = {
            x: rect_x,
            y: rect_y,
            type: 'scatter',
            mode: 'lines',
            line: { color: 'blue' },
            fill: 'toself',
            fillcolor: 'blue',
            name: `Przeszkoda ${index + 1}`
        };
        traces.push(trace)
    });

    const traceStart = {
        x: [punktStartowy[0]],
        y: [punktStartowy[1]],
        mode: 'markers',
        marker: { size: NODE_SIZE * 8, color: 'purple' },
        name: 'Punkt Startowy'
    };

    traces.push(traceStart)

    const traceGoal = {
        x: [punktKoncowy[0]],
        y: [punktKoncowy[1]],
        mode: 'markers',
        marker: { size: NODE_SIZE * 8, color: 'green' },
        name: 'Punkt Końcowy'
    };

    traces.push(traceGoal)

    const tracePath = sciezka ? {
        x: [],
        y: [],
        mode: 'lines',
        line: { color: 'red', width: NODE_SIZE * 2 },
        name: 'Ścieżka'
    } : {};

    for (const point of sciezka) {
        tracePath.x.push(point[0]);
        tracePath.y.push(point[1]);
    }

    traces.push(tracePath)

    const traceRoom = wymiaryPomieszczenia && wymiaryPomieszczenia.length > 1 ? {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines',
        line: { color: 'orange', width: NODE_SIZE },
        name: 'Wymiary Pomieszczenia'
    } : {};

    if (wymiaryPomieszczenia && wymiaryPomieszczenia.length > 1) {
        for (const coord of wymiaryPomieszczenia) {
            traceRoom.x.push(coord[0]);
            traceRoom.y.push(coord[1]);
        }

        traceRoom.x.push(wymiaryPomieszczenia[0][0]);
        traceRoom.y.push(wymiaryPomieszczenia[0][1]);
    }

    traces.push(traceRoom);


    const layout = {
        autosize: false,
        width: 800,
        height: 800,
        showlegend: false,
        xaxis: { scaleanchor: 'y', scaleratio: 1 },
        yaxis: { scaleanchor: 'x', scaleratio: 1 },
    };

    Plotly.newPlot('plot-container', traces, layout);

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

    let sciezka = JSON.parse(ret_path);


    generatePlot(punktStartowy, punktKoncowy, przeszkody, wymiaryPomieszczenia, sciezka);

    const downloadPathButton = document.getElementById('download-path');
    downloadPathButton.addEventListener('click', function () {
        downloadPathToFile(sciezka);
    });
});
function downloadPathToFile(sciezka) {
    const pathData = JSON.stringify(sciezka, null, 2);
    const blob = new Blob([pathData], { type: 'text/plain' });
    const fileName = 'sciezka.txt';

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


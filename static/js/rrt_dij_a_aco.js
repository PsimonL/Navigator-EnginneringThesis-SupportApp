function generatePlot(startPt, goalPt, obstacles, roomCoords, path) {


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

    // console.log("start_point = ", start_point)
    // console.log("goal_point = ", goal_point)
    console.log("obstacles = ", obstacles)
    // console.log("room_coords = ", room_coords)
    // console.log("ret_path = ", ret_path)

    // let start_point = JSON.parse(start_point)
    // let goal_pointt = JSON.parse(goal_point)
    let obstacless = JSON.parse(obstacles);
    // let room_coordss = JSON.parse(room_coords)
    // let ret_pathh = JSON.parse(ret_path)


    // generatePlot(start_point, goal_point, obstacles, room_coords, ret_path);
    const NODE_SIZE = 1;
    let traces = []

    const chuj = [[100, 1, 50, 350], [200, 100, 50, 499], [350, 1, 50, 500]];
    obstacless.forEach(obstacle => {
        let rect_x = [obstacle[0], obstacle[0] + obstacle[2], obstacle[0] + obstacle[2], obstacle[0], obstacle[0]];
        let rect_y = [obstacle[1], obstacle[1], obstacle[1] + obstacle[3], obstacle[1] + obstacle[3], obstacle[1]];
        console.log("obstacle = " + obstacle)
        console.log("rect_x = " + rect_x)
        console.log("rect_y = " + rect_y)
        let trace = {
            x: rect_x,
            y: rect_y,
            type: 'scatter',
            mode: 'lines',
            line: { color: 'blue' },
            fill: 'toself',
            fillcolor: 'blue'
        };
        traces.push(trace)
    });



    // const traceStart = {
    //     x: [startPt[0]],
    //     y: [startPt[1]],
    //     mode: 'markers',
    //     marker: { size: NODE_SIZE * 8, color: 'yellow' }
    // };
    //
    // const traceGoal = {
    //     x: [goalPt[0]],
    //     y: [goalPt[1]],
    //     mode: 'markers',
    //     marker: { size: NODE_SIZE * 8, color: 'green' }
    // };

    // const tracePath = path ? {
    //     x: path.map(point => point[0]),
    //     y: path.map(point => point[1]),
    //     mode: 'lines',
    //     line: { color: 'red', width: NODE_SIZE * 2 }
    // } : {};

    // const traceRoom = roomCoords.length > 1 ? {
    //     x: roomCoords.map(coord => coord[0]).concat(roomCoords[0][0]),
    //     y: roomCoords.map(coord => coord[1]).concat(roomCoords[0][1]),
    //     mode: 'lines',
    //     line: { color: 'orange', width: NODE_SIZE }
    // } : {};

    const layout = {
        autosize: false,
        width: 800,
        height: 800,
        showlegend: false,
        xaxis: { scaleanchor: 'y', scaleratio: 1 },
        yaxis: { scaleanchor: 'x', scaleratio: 1 },
    };

    // Plotly.newPlot('plot-container', [traceObstacles, traceStart, traceGoal, tracePath, traceRoom], layout);
    // Plotly.newPlot('plot-container', [traces, traceStart, traceGoal], layout);
    // Plotly.newPlot('plot-container', [traceObstacles, traces], layout);
    Plotly.newPlot('plot-container', traces, layout);
});



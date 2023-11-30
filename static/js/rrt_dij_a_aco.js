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


    const algorithmNameElement = document.createElement('span');
    algorithmNameElement.innerText = selectedAlgorithm;
    algorithmNameElement.style.fontWeight = 'bold';

    selectedSolutionBar.innerHTML = 'Wybrane rozwiązanie ';
    selectedSolutionBar.appendChild(algorithmNameElement);
});

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedAlgorithm = urlParams.get('selectedAlgorithm') || '__algo_name__';

    const selectedSolutionBar = document.getElementById('selected-solution-bar');

    const algorithmNameElement = document.createElement('span');
    algorithmNameElement.innerText = selectedAlgorithm;
    algorithmNameElement.style.fontWeight = 'bold';

    selectedSolutionBar.innerHTML = 'Wybrane rozwiązanie ';
    selectedSolutionBar.appendChild(algorithmNameElement);
});

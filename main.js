
const svgElemnt = document.getElementById("map");
const width = 100, height = 50, cellSize = 10;

const world = CreateWorld(svgElemnt, width, height, cellSize);

function calculateNextState(world) {

    for (var i = 0; i < world.height; i++) {
        for (var j = 0; j < world.width; j++) {

            const cell = world.cells[i][j];
            const liveNeighborCount = countLiveNeighbors(cell.neighbors);

            if (cell.state == 1 && (liveNeighborCount < 2 || liveNeighborCount > 3)) {
                cell.nextState = 0;
            } else if (cell.state == 1 && (liveNeighborCount == 2 || liveNeighborCount == 3)) {
                cell.nextState = 1;
            }else if(cell.state == 0 && liveNeighborCount == 3){

                cell.nextState = 1;
            }

        }
    }

}

function countLiveNeighbors(neighbors) {
    var count = 0;

    neighbors.forEach(neihbor => {
        count += neihbor.state;
    });

    return count;
}

function applyNextState( world ) {

    for (var i = 0; i < world.height; i++) {
        for (var j = 0; j < world.width; j++) {

            const cell = world.cells[i][j];
            cell.state = cell.nextState;

            if (cell.state == 1){
                cell.rect.setAttributeNS(null, 'fill', 'black');
            }else{
                cell.rect.setAttributeNS(null, 'fill', 'white');
            }

        }
    }

}



var interval;
var isPlaying = false;

const generationText = document.getElementById("span_generation");
var generation = 0;
var speed = 200;


function Play(){

    if (isPlaying){
        return;
    }

    interval = setInterval(function(){
        generation++;
        SetGeneration(generation);
        calculateNextState(world);
        applyNextState(world);
    }, speed);

    isPlaying = true;

}

function Pause(){
    clearInterval(interval);
    isPlaying = false;
}


const speedSlider = document.getElementById("speed_slider");
function UpdateSpeed(){
    speed = 200 / speedSlider.value;

    if(isPlaying){
        Pause();
        Play();
    }

}

function SetGeneration(generation){
    generationText.innerHTML = generation;
}

const svgns = "http://www.w3.org/2000/svg";

function CreateWorld(svgElement, width, height, cellSize) {

    svgElement.setAttribute("viewBox", `0 0 ${width * cellSize} ${height * cellSize}`);
    svgElement.setAttribute("width", width * cellSize);
    svgElement.setAttribute("height", height * cellSize);


    const cells = [];

    for (var j = 0; j < height; j++) {

        const row = [];
        for (var i = 0; i < width; i++) {

            var rect = document.createElementNS(svgns, 'rect');

            rect.setAttributeNS(null, 'x', (i * cellSize));
            rect.setAttributeNS(null, 'y', (j * cellSize));
            rect.setAttributeNS(null, 'width', cellSize);
            rect.setAttributeNS(null, 'height', cellSize);
            rect.setAttributeNS(null, 'stroke', '#FFe7f2');
            rect.setAttributeNS(null, 'stroke-wdith', 1);
            rect.setAttributeNS(null, 'fill', 'white');

            rect.setAttributeNS(null, 'class', 'cell');

            const cell = {
                rect: rect,
                state: 0,
                nextState: 0,
                neighbors: []
            }
            row.push(cell);

            rect.addEventListener("click", function () {

                if (cell.state == 0) {
                    cell.state = 1;
                    cell.rect.setAttributeNS(null, 'fill', 'black');
                    return;
                }

                cell.state = 0;
                cell.rect.setAttributeNS(null, 'fill', 'white');

            });


            svgElement.appendChild(rect);

        }
        cells.push(row)
    }


    const world = {
        svgElement: svgElement,
        cells: cells,
        width: width,
        height: height,
        cellSize: cellSize
    }

    fillNeighbors(world);

    return world;
}


function fillNeighbors(world) {


    for (var i = 0; i < world.height; i++) {
        for (var j = 0; j < world.width; j++) {

            const cells = world.cells;
            const cell = cells[i][j];

            if (cells[i - 1]) {
                cell.neighbors.push(cells[i - 1][j]);
            }

            if (cells[i + 1]) {
                cell.neighbors.push(cells[i + 1][j]);
            }

            if (cells[i][j - 1]) {
                cell.neighbors.push(cells[i][j - 1]);
            }

            if (cells[i][j + 1]) {
                cell.neighbors.push(cells[i][j + 1]);
            }

            if (cells[i - 1] && cells[i - 1][j - 1]) {
                cell.neighbors.push(cells[i - 1][j - 1]);
            }

            if (cells[i - 1] && cells[i - 1][j + 1]) {
                cell.neighbors.push(cells[i - 1][j + 1]);
            }

            if (cells[i + 1] && cells[i + 1][j - 1]) {
                cell.neighbors.push(cells[i + 1][j - 1]);
            }


            if (cells[i + 1] && cells[i + 1][j + 1]) {
                cell.neighbors.push(cells[i + 1][j + 1]);
            }

        }
    }

}
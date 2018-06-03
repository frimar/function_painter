function quadrat(x) {
    return x * x;
}

function sinus(x) {
    return Math.sin(x);
}

function identity(x) {
    return x;
}

function dynamicFunction(x) {
    let expr = document.getElementById('funk1').value;

    var result = eval(expr);
    return result;
}

let canvas;
let ctx;

function zeichne() {

    let maxX = parseInt(document.getElementById('maxX').value);
    let maxY = parseInt(document.getElementById('maxY').value);
    let shrink = parseInt(document.getElementById('shrink').value);
    if (undefined == shrink || 0 == shrink) {
        shrink = 1;
    }

    canvas = document.getElementById("myCanvas");
    canvas.width = 2 * maxX + 1;
    canvas.height = 2 * maxY + 1;

    ctx = canvas.getContext("2d");
    ctx.translate(maxX, maxY);
    drawXAxis(ctx, -maxX, maxX, maxY, shrink, "#cccccc");
    drawYAxis(ctx, -maxY, maxY, maxX, shrink, "#cccccc");
    ctx.scale(1, -1);

    if (document.getElementById('parabel').checked) {
        drawFunction(maxX, shrink, quadrat, "red");
    }

    if (document.getElementById('sinus').checked) {
        drawFunction(maxX, shrink, sinus, "blue");
    }

    if (document.getElementById('identity').checked) {
        drawFunction(maxX, shrink, identity, "green");
    }

    drawFunction(maxX, shrink, dynamicFunction, "black");
}
function drawFunction(maxX, shrink, myFunk, color) {
    for (let x_i = -maxX; x_i <= (maxX - 1); x_i = x_i + 1) {
        x_iplus1 = x_i + 1;
        x1 = x_i / shrink;
        x2 = (x_iplus1) / shrink;
        y1 = shrink * myFunk(x1);
        y2 = shrink * myFunk(x2);
        myDrawLine(ctx, x_i, y1, x_iplus1, y2, color);
    }
}

function drawXAxis(ctx, minX, maxX, maxY, shrink, color = "#000000") {

    myDrawLine(ctx, minX, 0, maxX, 0, color);

    let step = 5;
    if (Math.ceil(-maxX / shrink) > -10) {
        step = 1;
    }
    let min = Math.ceil(-maxX / shrink) - (Math.ceil(-maxX / shrink) % step);
    let max = Math.ceil(maxX / shrink);

    for (let x = min; x <= max; x += step) {
        myDrawLine(ctx, x * shrink, -5, x * shrink, 5, color);
        ctx.textAlign = "center";
        ctx.fillText(x, x * shrink, 15);
    }
}
function drawYAxis(ctx, minY, maxY, maxX, shrink, color = "#000000") {

    myDrawLine(ctx, 0, minY, 0, maxY, color);

    let step = 5;
    if (Math.ceil(-maxY / shrink) > -10) {
        step = 1;
    }
    let min = Math.ceil(-maxY / shrink) - (Math.ceil(-maxY / shrink) % step);
    let max = Math.ceil(maxY / shrink);

    for (let y = min; y <= max; y += step) {
        myDrawLine(ctx, -5, y * shrink, 5, y * shrink, color);
        ctx.textAlign = "center";
        ctx.fillText(y, -15, y * shrink);
    }
}

function myDrawPoint(ctx, x, y, color = "#000000") {
    ctx.strokeStyle = color;
    ctx.beginPath();

    ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
    ctx.fill();

    return;
}

function myDrawLine(ctx, startX, startY, endX, endY, color = "#000000") {
    ctx.strokeStyle = color;
    ctx.beginPath();

    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    return;
}

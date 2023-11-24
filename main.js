class Canvas {
    constructor(xscal=0.99, yscal=0.99, cent=true) {
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth * xscal;
        canvas.height = window.innerHeight * yscal;
        if (cent) canvas.classList.add("center");
        document.body.appendChild(canvas);
    }
}

const gameCanvas = new Canvas()
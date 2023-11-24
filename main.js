class Canvas {
    constructor(xscal=0.99, yscal=0.99, cent=true, camera=new Camera(), children=[]) {
        this.canvas = document.createElement("canvas");
        this.children = children;
        this.camera = camera;
        this.canvas.width = window.innerWidth * xscal;
        this.canvas.height = window.innerHeight * yscal;
        if (cent) this.canvas.classList.add("center");
        document.body.appendChild(this.canvas);
    }
    initiateContext(ctx="2d") {
        this.ctx = this.canvas.getContext(ctx);
    }
    addChild(child=null,children=null) {
        if (child != null && typeof child == CanvasItem) this.children.push(child);
        if (children != null) for (let chld of children) if (typeof chld == CanvasItem) this.children.push(chld);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class CanvasItem {
    constructor(position=[0,0,0], dimensions=[0,0,0], velocity=[0,0,0]) {
        this.position = position;
        this.dimensions = dimensions; 
        this.velocity = velocity;
    }
    // Set the velocity vector
    setVelocity(vel=this.velocity) {
        this.velocity = vel;
    }
    // Set the position array (centre point of item)
    setPosition(pos=this.position) {
        this.position = pos;
    }
    // Set the dimenstions array (expands equally on each side of center)
    setDimensions(dim=this.dimensions) {
        this.dimensions = dim;
    }
    // Update scripts
    update() {
        // Update position based on velocity
        for (let [dim, vel] of this.velocity.entries()) {
            this.position[dim] += vel;
        }
    }
}

class Camera {
    constructor(
        position=[0,0,0], // Position of Camera (may be different to body)
        focalLength=60, // Focal Length (perceived distance to objects)
        angle=[0,0] // [Rotation Angle (no up or down), Angle of Elevation (or depression)]
    ) {
        this.position = position;
        this.focalLength = focalLength;
        this.angle = angle;
    }
}


const gameCanvas = new Canvas();

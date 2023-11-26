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
    addChildren(children=[]) {
        if (children != []) for (let chld of children) if (typeof chld == CanvasItem) this.children.push(chld);
    }
    update() {
        this.clear();
        for (let child of this.children) child.update();
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class CanvasItem {
    constructor(
        position=[0,0,0], // Position vector (x,y,z)
        dimensions=[0,0,0], // Dimensions of item (width,height,depth)
        velocity=[0,0,0] // Velocity vector (x,y,z)
    ) {
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
        position=[0,0,0], // Position of Camera (x,y,z)
        focalLength=60, // Focal Length (perceived distance to objects)
        angle=[0,0] // Angle of Camera (Side to Side Rotation Angle, Angle of Elevation [+] or Depression [-])
    ) {
        this.position = position;
        this.focalLength = focalLength;
        this.angle = angle;
    }
}


const playerCam = new Camera();
const playerObject = new CanvasItem([0,0,0], [10,10,10]);
const gameCanvas = new Canvas(0.99, 0.99, true, playerCam);
gameCanvas.initiateContext();
gameCanvas.addChildren([playerObject]);
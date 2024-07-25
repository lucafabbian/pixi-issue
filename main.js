import './style.css'

import { Application, Graphics } from 'pixi.js'
import { Viewport } from 'pixi-viewport'


const app = new Application();
await app.init({ antialias:true, width: 200, height: 400, backgroundColor: 0xffffff, resolution: window.devicePixelRatio });


const viewport = new Viewport({
  // these do not change a thing: 
  //screenWidth: 200,
  //screenHeight: 400,
  //worldHeight: 400,
  //worldWidth: 200,
  events: app.renderer.events 
})


app.stage.addChild(viewport)
viewport
    .clampZoom({
      minScale: 0.1,
      maxScale: 2,
    })
    .drag()
    .pinch()
    .wheel()

document.body.appendChild(app.canvas)


// create a grid of 50
const ZOOM = 10
const grid = new Graphics()
grid.stroke({ width: 2, color: 0xeeeeee });
const step = 50
const max = 50 * step
for(let i = -max; i < max; i+=step){
  grid.moveTo(-max * ZOOM, i * ZOOM).lineTo(max *ZOOM, i*ZOOM)
  grid.moveTo(i*ZOOM, -max*ZOOM).lineTo(i*ZOOM, max*ZOOM)
}
grid.stroke({ width: 1*ZOOM, color: 0xeeeeee });
viewport.addChild(grid);



// draw a single line from (0,0) to (0,20)
const line = new Graphics().moveTo(0,0).lineTo(0, 20 * ZOOM).stroke({ width: 1*ZOOM, color: 0x111111 });
viewport.addChild(line);


// print clicked points
app.canvas.onmouseup = (e) => {
  console.log(e.x, e.y)
  const p = viewport.toWorld(e.x, e.y)
  console.log('p', p)
}
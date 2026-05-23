let island = [];
let gridSize = 20;
let blockSize = 8;
let maxHeight = 200;

const ui_scale = 2;


function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  noiseDetail(4, 1);
  lookup = {};
  lookup.stone = color(120, 120, 120);
  lookup.grass = color(0, 170, 0);
  // lookup = color()
  // lookup = color()

  ui_save = createButton("save mcfunction");
  ui_save.position(0, 0);
  ui_save.mousePressed(saveMcfunction);
  ui_save.size(120 * ui_scale, 40 * ui_scale);
  ui_save.style("font-size", (ui_scale*15)+"px")
  
  island = genIsland(gridSize, maxHeight);

  //aveMcfunction(island)
  // console. log(island)
 // console.log(noiseSeed());
}

function draw() {
  background(180, 200, 255);
  orbitControl();
  renderIsland(island);
}

function getTexture(x, y, z) {
  let s = 0.005;
  let off = 200;
  if (noise(x * s + off, y * s + off, z * s + off) > 0.9) {
    return "grass";
  }
  return "stone";
}

function genIsland(size, maxHeight) {
  console.time("time");
  // let c = 0
  let blocks = [];
  let half = size / 2;

  for (let gx = 0; gx < size; gx++) {
    for (let gz = 0; gz < size; gz++) {
      // c++
      let x = gx - half;
      let z = gz - half;
      let d = sqrt(x * x + z * z) / half;

      if (d <= 1.2) {
        let h = noise(gx * 0.08, gz * 0.08) * maxHeight;
        h = h * (1 - d);

        let y = 0;
        while (y > -h) {
          blocks.push({
            x: x * blockSize,
            y: y,
            z: z * blockSize,
            type: getTexture(gx, y, gz),
          });
          y = y - blockSize;
        }
      }
    }
  }
  // console. log(c)
  console.timeEnd("time");
  return blocks;
}

function mousePressed() {
  saveMcfunction(island);
}

function keyPressed() {
  if (key == "s") {
    saveMcfunction(island);
  }
}

function saveMcfunction(island) {
  let pack = [];
  pack.push("# " + island.length + " blocks");

  for (let i = 0; i < island.length; i++) {
    let is = island[i];
    pack.push(`setblock ~${is.x} ~${is.y} ~${is.z} ${is.type}`);
  }

  let ID = "island_" + year() + month() + day() + hour() + minute() + second();

  // FIX: join the array yourself
  save(pack.join("\n"), ID + ".mcfunction");
}


function renderIsland(blocks) {
  let list = [];
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    list.push(b.x + "," + b.y + "," + b.z);
  }

  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    let visible = false;

    let dx = [blockSize, -blockSize, 0, 0, 0, 0];
    let dy = [0, 0, blockSize, -blockSize, 0, 0];
    let dz = [0, 0, 0, 0, blockSize, -blockSize];

    for (let n = 0; n < 6; n++) {
      let nx = b.x + dx[n];
      let ny = b.y + dy[n];
      let nz = b.z + dz[n];
      let neighborID = nx + "," + ny + "," + nz;

      let found = false;
      for (let j = 0; j < list.length; j++) {
        if (list[j] === neighborID) {
          found = true;
          break;
        }
      }

      if (found == false) {
        visible = true;
        break;
      }
    }

    if (visible) {
      push();
      translate(b.x, b.y, b.z);
      fill(lookup[b.type]);
      box(blockSize);
      pop();
    }
  }
}

let island = [];
let gridSize = 20;
let blockSize = 8;
let maxHeight = 200;

var ui_scale = 2;

function setup() {
  frameRate(20);

  lookup = {};
  lookup.stone = color(120, 120, 120);
  lookup.grass_block = color(0, 170, 0);
  lookup.andesite = color(70, 70, 70);
  lookup.dirt = color(120, 70, 0);
  // lookup = color()

  createCanvas(windowWidth, windowHeight, WEBGL);
  noiseDetail(4, 1);
  setup_ui();

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

function ui_pressed_generate() {
  island = [];
  island = genIsland(float(ui_gridSize.value()), float(ui_maxHeight.value()));
}

function getTexture(x, y, z) {
  let s = float(ui_textureNoiseScale.value());
  let off = 200;
  if (y > -blockSize * 1) {
    return "grass_block";
  }
  if (y > -blockSize * random(2, 5)) {
    return "dirt";
  }
  if (noise(x * s + off, y * s + off, z * s + off) > 0.9) {
    return "andesite";
  }
  return "stone";
}

function genIsland(size, maxHeight) {
  noiseSeed(random(0, 1000000));
  console.time("time");
  let count = 0;
  let blocks = [];
  let half = size / 2;
  let roughness = float(ui_roughness.value());

  for (let gx = 0; gx < size; gx++) {
    for (let gz = 0; gz < size; gz++) {
      let x = gx - half;
      let z = gz - half;
      let d = sqrt(x * x + z * z) / half;

      if (d <= 1.2) {
        let h = noise(gx * roughness, gz * roughness) * maxHeight;
        h = h * (1 - d);

        let y = 0;
        while (y > -h) {
          count += 1;
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
  console.log(count);
  console.timeEnd("time");
  console.log(blocks.length);
  return blocks;
}

function mousePressed() {
  // saveMcfunction(island);
}

function keyPressed() {
  if (key == "s") {
    saveMcfunction(island);
  }
}

function saveMcfunction() {
  let pack = [];
  pack.push("# " + island.length + " blocks");

  for (let i = 0; i < island.length; i++) {
    let is = island[i];
    pack.push(
      `setblock ~${is.x / blockSize} ~${is.y / blockSize} ~${
        is.z / blockSize
      } ${is.type}`
    );
  }

  let data = pack.join("\n");

  let filename =
    "island_" +
    year() +
    month() +
    day() +
    hour() +
    minute() +
    second() +
    ".mcfunction";

  let blob = new Blob([data], { type: "application/octet-stream" });

  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
}

//noprotect
function renderIsland(blocks) {
  let list = [];
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    list.push(b.x + "," + b.y + "," + b.z);
  }

  //noprotect
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

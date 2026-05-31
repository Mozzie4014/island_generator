function setup_ui() {
  
  ui_scale = 2
  
  let buffer = 5;

// main holder
ui_main = createDiv();
ui_main.position(0, 0);
ui_main.style("width", ui_scale * 150 + "px");
ui_main.style("height", "24%");
ui_main.style("background", "rgb(0,0,200)");
ui_main.style("display", "flex");
ui_main.style("flex-direction", "column");
ui_main.style("padding", (buffer * ui_scale) + "px");
ui_main.style("box-sizing", "border-box");
ui_main.style("gap", (4 * ui_scale) + "px");


// row gen description, element
function makeRow(descText) {
  let row = createDiv();
  row.parent(ui_main);
  row.style("display", "flex");
  row.style("flex-direction", "row");
  row.style("align-items", "center");
  row.style("justify-content", "space-between");
  row.style("width", "100%");
  row.style("background", "rgb(0,90,200)");
  row.style("padding", (3 * ui_scale) + "px");
  row.style("box-sizing", "border-box");
  row.style("border-radius", (2 * ui_scale) + "px");

  let desc = createDiv(descText);
  desc.parent(row);
  desc.style("color", "white");
  desc.style("font-size", (8 * ui_scale) + "px");
  desc.style("margin-right", (4 * ui_scale) + "px");
  desc.style("white-space", "nowrap");

  return row;
}


// save
let row_save = makeRow("save");
ui_save = createButton("save mcfunction");
ui_save.parent(row_save);
ui_save.mousePressed(saveMcfunction);
ui_save.style("font-size", (10 * ui_scale) + "px");
ui_save.style("padding", (3 * ui_scale) + "px " + (6 * ui_scale) + "px");


// generate
let row_generate = makeRow("generate");
ui_generate = createButton("generate");
ui_generate.parent(row_generate);
ui_generate.mousePressed(ui_pressed_generate);
ui_generate.style("font-size", (10 * ui_scale) + "px");
ui_generate.style("padding", (3 * ui_scale) + "px " + (6 * ui_scale) + "px");


// mex height
let row_maxHeight = makeRow("max height");
ui_maxHeight = createInput(240);
ui_maxHeight.parent(row_maxHeight);
ui_maxHeight.style("font-size", (9 * ui_scale) + "px");
ui_maxHeight.style("width", (40 * ui_scale) + "px");
ui_maxHeight.style("height", (12 * ui_scale) + "px");


// grid size
let row_gridSize = makeRow("surface size");
ui_gridSize = createInput(20);
ui_gridSize.parent(row_gridSize);
ui_gridSize.style("font-size", (9 * ui_scale) + "px");
ui_gridSize.style("width", (40 * ui_scale) + "px");
ui_gridSize.style("height", (12 * ui_scale) + "px");

  
// roughness 
let row_roughness = makeRow("roughness");
ui_roughness = createInput(0.04);
ui_roughness.parent(row_roughness);
ui_roughness.style("font-size", (9 * ui_scale) + "px");
ui_roughness.style("width", (40 * ui_scale) + "px");
ui_roughness.style("height", (12 * ui_scale) + "px");
  
// noise scale
let row_textureNoiseScale = makeRow("texture noise scale");
ui_textureNoiseScale = createInput(0.07);
ui_textureNoiseScale.parent(row_textureNoiseScale);
ui_textureNoiseScale.style("font-size", (9 * ui_scale) + "px");
ui_textureNoiseScale.style("width", (40 * ui_scale) + "px");
ui_textureNoiseScale.style("height", (12 * ui_scale) + "px");

  
  }

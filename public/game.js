let map=[];
let gol=20;
let g=600/gol;
let palette=["green","brown","orange","blue","turquoise","yellow","black","red"];
let colour="red";
function init() {
   map=JSON.parse(httpGet("/map"));
   //console.log(map);
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function httpPut(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "PUT", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function httpDelete(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function upd(x,y,col) {
    httpPut("/risuvai?X="+x+"&Y="+y+"&R="+col.r+"&G="+col.g+"&B="+col.b);
    map=JSON.parse(httpGet("/map"));
}
function update() {

}
function draw() {
    for(let i=0;i<gol;i++){
        for(let j=0;j<gol;j++){
            context.fillStyle="rgb("+map[j][i].r+","+map[j][i].g+","+map[j][i].b+")";
            context.fillRect(i*g,j*g,g,g);
        }
    }
    for(let i=0;i<palette.length;i++){
        context.fillStyle=palette[i];
        //console.log(context.fillStyle);
        context.fillRect(600,i*600/palette.length,600/palette.length,600/palette.length)
    }
}
function mouseup() {
    //console.log(Math.floor(mouseX/g),Math.floor(mouseY/g));
    if(Math.floor(mouseX/g)<gol && Math.floor(mouseY/g)<gol){
        context.fillStyle=colour;
        let col=hexToRgb(context.fillStyle);
        upd(Math.floor(mouseX/g),Math.floor(mouseY/g),col);
    }else{
        updColour(Math.floor(mouseY/(600/palette.length)))
    }
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
function updColour(y){
    colour=palette[y];
}
function keyup(key) {
    if(key==46){
        let ans=prompt("WHAT'S THE PASSWORD???");
        httpDelete("/erase?pass="+ans+"");
        map=JSON.parse(httpGet("/map"));
    }
}


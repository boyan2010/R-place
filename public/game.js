let map=[];
let gol=4;
let g=600/gol;
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

function upd(x,y) {
    httpPut("/risuvai?X="+x+"&Y="+y+"&R=255&G=0&B=0");
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
}
function mouseup() {
    console.log(Math.floor(mouseX/g),Math.floor(mouseY/g));
    upd(Math.floor(mouseX/g),Math.floor(mouseY/g));
}
function keyup(key) {
    if(key==46){
        let ans=prompt("WHAT'S THE PASSWORD???");
        httpDelete("/erase?pass="+ans+"");
        map=JSON.parse(httpGet("/map"));
    }
}


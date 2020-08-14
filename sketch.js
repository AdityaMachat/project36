var allPaths;
var flag= false;
var flag2= false;
var canvas;
var database
var paint=[];
var currentPath=[];
function setup(){
    database=firebase.database();
canvas=createCanvas(1600,1000);
canvas.mousePressed(startPath);
canvas.mouseReleased(endPath);
getPaint();
}
function update(){
database.ref("/").update({
    currentPath:currentPath
}) 
}
function endPath(){
    flag=false;
}
function updateAll(){
    database.ref("/").update({
        allPaths:allPaths
    })
}
function draw(){
background(0);
if(allPaths!==undefined){
    if(flag===true){
    var point= {
        x:mouseX,
        y:mouseY
    }
    currentPath.push(point);
    update();
    }
    if(!flag && flag2){
     for(var i in currentPath){
      allPaths.push(currentPath[i]);      
     }
     updateAll();
     flag2=false;
    }

}
strokeWeight(5);
stroke(255);
noFill();
for(var i=0;i<paint.length;i++){
    var path =paint[i];
    beginShape();
    for(var j=0;j<path.length;j++){
        vertex(path[j].x,path[j].y);
    }
    endShape();

}

}
function startPath(){
    flag=true;
    currentPath=[];
    paint.push(currentPath);
}
async function getPaint(){
    await database.ref("allPaths").once("value",(data)=>{
        allPaths=data.val();
    })
    for(var p in allPaths){
        currentPath.push(allPaths[p]);
    }
    paint.push(currentPath);

}
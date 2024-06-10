// let canvas=new fabric.Canvas('canvas',{
//     width:window.innerWidth,
//     height:window.innerHeight
// });
// let addingLineBtn =document.getElementById('adding-line-btn');
// let addingLineBtnClicked=false;
// addingLineBtn.addEventListener('click',activateAddingLine);

// function activateAddingLine()
// {
//     if(addingLineBtnClicked===false)
//     {
//         addingLineBtnClicked=true; 
//     canvas.on('mouse:down',startAddingLine);
//     canvas.on('mouse:move',startDrawingLine);
//     canvas.on('mouse:up',stopDrawingLine);
    

//     canvas.selection=false;
//     canvas.hoverCursor='auto';
//     canvas.getObjects().forEach(o=>
//         {
//             if(o.id==='added-Line')
//             {
//                 o.set({
//                     selectable:false
//                 });
//             }
//         });
//     }
// }
// let line;
// let mouseDown=false;
// function startAddingLine(o)
// {
//     mouseDown=true;
//     let pointer=canvas.getPointer(o.e);
//      line =new fabric.Line([pointer.x,pointer.y,pointer.x,pointer.y],
//         {
//             id:'added-Line',
//             stroke:'red',
//             strokeWidth:3,
//             selectable:false,
//         });
//         canvas.add(line);
//         canvas.requestRenderAll();
// }
// function startDrawingLine(o)
// {
//     if(mouseDown==true)
//     {
//     let pointer=canvas.getPointer(o.e);

//     line.set({
//         x2:pointer.x,
//         y2:pointer.y
//     });
//     canvas.requestRenderAll();
// }
// }
// function stopDrawingLine(o)
// {
//     line.setCoords();
//     mouseDown=false;
// }
// let deactivateAddingShapeBtn=document.getElementById('deactivate-adding-shape-btn');
// deactivateAddingShapeBtn.addEventListener('click',deactivateAddingShape);
// function deactivateAddingShape()
// {
//     canvas.off('mouse:down',startAddingLine);
//     canvas.off('mouse:move',startDrawingLine);
//     canvas.off('mouse:up',stopDrawingLine);
//     canvas.getObjects().forEach(o=>
//         {
//             if(o.id==='added-Line')
//             {
//                 o.set({
//                     selectable:true
//                 });
//             }
//         });


// canvas.hoverCursor='all-scroll';
// addingLineBtnClicked=false;
//     }

let canvas = new fabric.Canvas('canvas', {
    width: window.innerWidth,
    height: window.innerHeight
});

// Function to activate adding pencil
function activateAddingPencil() {
    if (!addingPencilBtnClicked) {
        addingPencilBtnClicked = true;
        canvas.isDrawingMode = true;
        canvas.selection = false;
        canvas.freeDrawingBrush.color = 'black';
        canvas.freeDrawingBrush.width = 3;
        canvas.hoverCursor = 'pointer';
    }
}

// Function to deactivate adding pencil
function deactivateAddingPencil() {
    addingPencilBtnClicked = false;
    canvas.isDrawingMode = false;
    canvas.selection = true;
    canvas.hoverCursor = 'move';
}

// Event listener for pencil button
let addingPencilBtn = document.getElementById('adding-pencil-btn');
let addingPencilBtnClicked = false;
addingPencilBtn.addEventListener('click', activateAddingPencil);

// Function to activate adding eraser
function activateAddingEraser() {
    if (!addingEraserBtnClicked) {
        addingEraserBtnClicked = true;
        canvas.isDrawingMode = true;
        canvas.selection = false;
        canvas.freeDrawingBrush.color = 'white'; // Eraser color set to white
        canvas.freeDrawingBrush.width = 20; // Adjust eraser width as needed
        canvas.hoverCursor = 'pointer';
    }
}

// Function to deactivate adding eraser
function deactivateAddingEraser() {
    addingEraserBtnClicked = false;
    canvas.isDrawingMode = false;
    canvas.selection = true;
    canvas.hoverCursor = 'move';
}

// Event listener for eraser button
let addingEraserBtn = document.getElementById('adding-eraser-btn');
let addingEraserBtnClicked = false;
addingEraserBtn.addEventListener('click', activateAddingEraser);

// Function to activate adding line
function activateAddingLine() {
    if (!addingLineBtnClicked) {
        addingLineBtnClicked = true;
        canvas.on('mouse:down', startAddingLine);
        canvas.on('mouse:move', startDrawingLine);
        canvas.on('mouse:up', stopDrawingLine);

        canvas.selection = false;
        canvas.hoverCursor = 'auto';
        canvas.getObjects().forEach(o => {
            if (o.id === 'added-Line') {
                o.set({
                    selectable: false
                });
            }
        });
    }
}

// Function to deactivate adding line
function deactivateAddingShape() {
    canvas.off('mouse:down', startAddingLine);
    canvas.off('mouse:move', startDrawingLine);
    canvas.off('mouse:up', stopDrawingLine);
    canvas.getObjects().forEach(o => {
        if (o.id === 'added-Line') {
            o.set({
                selectable: true
            });
        }
    });

    canvas.hoverCursor = 'all-scroll';
    addingLineBtnClicked = false;
}

// Event listener for line button
let addingLineBtn = document.getElementById('adding-line-btn');
let addingLineBtnClicked = false;
addingLineBtn.addEventListener('click', activateAddingLine);

// Function to start adding line
let line;
let mouseDown = false;

function startAddingLine(o) {
    mouseDown = true;
    let pointer = canvas.getPointer(o.e);
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        id: 'added-Line',
        stroke: 'red',
        strokeWidth: 3,
        selectable: false,
    });
    canvas.add(line);
    canvas.requestRenderAll();
}

// Function to start drawing line
function startDrawingLine(o) {
    if (mouseDown == true) {
        let pointer = canvas.getPointer(o.e);
        line.set({
            x2: pointer.x,
            y2: pointer.y
        });
        canvas.requestRenderAll();
    }
}

// Function to stop drawing line
function stopDrawingLine(o) {
    line.setCoords();
    mouseDown = false;
}

// Event listener for deactivating shape button
let deactivateAddingShapeBtn = document.getElementById('deactivate-adding-shape-btn');
deactivateAddingShapeBtn.addEventListener('click', deactivateAddingShape);
// Function to activate adding marker
function activateAddingMarker() {
    if (!addingMarkerBtnClicked) {
        addingMarkerBtnClicked = true;
        canvas.isDrawingMode = true;
        canvas.selection = false;
        canvas.freeDrawingBrush.color = 'blue'; // Marker color (adjust as needed)
        canvas.freeDrawingBrush.width = 5; // Marker width (adjust as needed)
        canvas.hoverCursor = 'pointer';
    }
}

// Function to deactivate adding marker
function deactivateAddingMarker() {
    addingMarkerBtnClicked = false;
    canvas.isDrawingMode = false;
    canvas.selection = true;
    canvas.hoverCursor = 'move';
}

// Event listener for marker button
let addingMarkerBtn = document.getElementById('adding-marker-btn');
let addingMarkerBtnClicked = false;
addingMarkerBtn.addEventListener('click', activateAddingMarker);
// Function to activate drawing shapes
function activateAddingShape(shapeType) {
    if (!addingShapeBtnClicked) {
        addingShapeBtnClicked = true;
        canvas.selection = false;
        canvas.hoverCursor = 'crosshair';
        currentShapeType = shapeType;
        canvas.on('mouse:down', startDrawingShape);
        canvas.on('mouse:up', stopDrawingShape);
    }
}

// Function to deactivate drawing shapes
function deactivateAddingShape() {
    addingShapeBtnClicked = false;
    canvas.selection = true;
    canvas.hoverCursor = 'move';
    canvas.off('mouse:down', startDrawingShape);
    canvas.off('mouse:up', stopDrawingShape);
}

// Event listener for shape button
let addingShapeBtn = document.getElementById('adding-shape-btn');
let addingShapeBtnClicked = false;
addingShapeBtn.addEventListener('click', () => activateAddingShape('rectangle')); // You can adjust the shape type here

// Function to start drawing shape
let shape;
let isDrawingShape = false;
let startPoint;

function startDrawingShape(o) {
    isDrawingShape = true;
    startPoint = canvas.getPointer(o.e);
    if (currentShapeType === 'rectangle') {
        shape = new fabric.Rect({
            left: startPoint.x,
            top: startPoint.y,
            width: 0,
            height: 0,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 2
        });
    }
    canvas.add(shape);
}

// Function to stop drawing shape
function stopDrawingShape(o) {
    isDrawingShape = false;
}

// Event listener for mouse move to draw shape
canvas.on('mouse:move', function (o) {
    if (!isDrawingShape) return;
    var pointer = canvas.getPointer(o.e);

    if (currentShapeType === 'rectangle') {
        shape.set({ width: pointer.x - startPoint.x, height: pointer.y - startPoint.y });
    }

    canvas.renderAll();
});





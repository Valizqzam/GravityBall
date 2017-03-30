/*

 * Base code taken from material provided by Dr. Jey

*/

"use strict"; 

var RADIUS = 200;

var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var ambientLight, light;
var canvasWidth = 846;
var canvasHeight = 794;
var balls = [];
var gravity = 10, bounceFactor = 1;
var effectController;

function init() 
{

	// For grading the window is fixed in size; here's general code:
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight*1.5;
	var canvasRatio = canvasWidth / canvasHeight;
    

	// CAMERA
	camera = new THREE.PerspectiveCamera( 55, canvasRatio, 1, 80000 );
	camera.position.set( 500, 800, 2300 );
	camera.lookAt(0,0,0);
    
	// LIGHTS
    //White light
	ambientLight = new THREE.AmbientLight( 0xFF0000 );

	light = new THREE.DirectionalLight( 0xFFFFFF, 0.6 );
    //light.position.set( 0, 1, 0 ).normalize();
  
	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( canvasWidth, canvasHeight );
	renderer.setClearColorHex( 0xAAAAAA, 1.0 );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls( camera, renderer.domElement );
	cameraControls.target.set(0, 0, 0);
    cameraControls.enableDamping = true;
	cameraControls.dampingFactor = 0.25;
    cameraControls.enableZoom = false;
    cameraControls.autoRotate = true;

}

function createBall() 
{

	var material = new THREE.MeshPhongMaterial( { 
        color: 0xFFFFFF, 
        specular: 0x888888, 
        shininess: 300, 
        emissive: 0xac9d9d,
        shading: THREE.SmoothShading,
        map: THREE.ImageUtils.loadTexture('images/ball.png')
        } );
    
    var ball = new THREE.Mesh( new THREE.SphereGeometry(  RADIUS, 64, 32 ),  material );
	
    //Math.random() * RADIUS //to make Balls have different radius

	var ka = 0.4;
	material.ambient.setRGB(material.color.r*ka, material.color.g*ka, material.color.b*ka);

	ball.applyMatrix(new THREE.Matrix4().makeTranslation(0,900,0));
    
    var sphere = {
        x: ball.position.x,
        y: ball.position.y,
        z: ball.position.z,
        vx: 0,
        vy: Math.random() * 1000,
        vz: 0,
        radius: RADIUS ,
        mesh: ball
    };
 
	return sphere;
}

function fillScene() 
{
	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

	// LIGHTS
	scene.add( ambientLight );
	scene.add( light );
    var thetaDegrees = 0;
    var thetaRadians = thetaDegrees*Math.PI/180;
    //balls = [];
    for (var i = 0; i < 8; i++) 
    {
        balls.push(createBall());
        scene.add(balls[i].mesh);
    }

	balls[0].x =  1000* Math.cos(thetaRadians);
    balls[0].z = 1000* Math.sin(thetaRadians);
    
    thetaDegrees = 45;
    thetaRadians = thetaDegrees*Math.PI/180;
    
    balls[1].x = 1000* Math.cos(thetaRadians);
    balls[1].z = 1000* Math.sin(thetaRadians);
    
    thetaDegrees = 90;
    thetaRadians = thetaDegrees*Math.PI/180;
    
    balls[2].x =  1000*Math.cos(thetaRadians);
    balls[2].z = 1000*Math.sin(thetaRadians);
    
    thetaDegrees = 135;
    thetaRadians = thetaDegrees*Math.PI/180;
    
    balls[3].x = 1000* Math.cos(thetaRadians);
    balls[3].z = 1000 * Math.sin(thetaRadians);
    
    thetaDegrees = 180;
    thetaRadians = thetaDegrees*Math.PI/180;
    
    balls[4].x = 1000*Math.cos(thetaRadians);
    balls[4].z = 1000*Math.sin(thetaRadians);
    
    thetaDegrees = 225;
    thetaRadians = thetaDegrees*Math.PI/180;
    
    balls[5].x = 1000* Math.cos(thetaRadians);
    balls[5].z =  1000* Math.sin(thetaRadians);
    
    
    thetaDegrees = 270;
    thetaRadians = thetaDegrees*Math.PI/180;
    
    balls[6].x = 1000*Math.cos(thetaRadians);
    balls[6].z = 1000*Math.sin(thetaRadians);
    
    thetaDegrees = 315;
    thetaRadians = thetaDegrees*Math.PI/180;
    
    balls[7].x = 1000* Math.cos(thetaRadians);
    balls[7].z = 1000* Math.sin(thetaRadians);

	Coordinates.drawGround({size:3000});
    
	//Coordinates.drawGrid({size:3000,scale:0.01});
	//Coordinates.drawAllAxes({axisLength:500,axisRadius:1,axisTess:4});
}

//Controller to modify the bounceFactor
function setupGui () 
{
    effectController = 
        {
        bounceFactor: 1
    }
    
    var gui = new dat.GUI();
    gui.add(effectController, "bounceFactor", 0.1, 1.2, 0.025).name("Bounce Factor");
}

function addToDOM() 
{
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) 
    {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}

function animate() 
{
	window.requestAnimationFrame( animate );
    var delta = clock.getDelta();
	render(delta);
    update(delta);
}

function render(delta) 
{
    
    for (var i = 0; i < balls.length; i++) 
    {
        balls[i].mesh.position.x = balls[i].x;
        balls[i].mesh.position.y = balls[i].y;
        balls[i].mesh.position.z = balls[i].z;
    }
    
	cameraControls.update(delta);
	renderer.render( scene, camera );

}

try {
	init();
	fillScene();
    setupGui();
	addToDOM();
	animate();

    } catch(e) {
	   var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	   $('#container').append(errorReport+e);
    }

//Update the position of the ball
function update(delta) 
{
    
    for (var i = 0; i < balls.length; i++) 
    {
        var sphere = balls[i];
        
        sphere.x += delta * sphere.vx;
        sphere.y += delta * sphere.vy;
        sphere.z += delta * sphere.vz;

        if(sphere.y - sphere.radius < 0 && sphere.vy < 0) 
        {
            sphere.y = sphere.radius;
            sphere.vy *= -effectController.bounceFactor;
            
        } else {
            // Acceleration
           sphere.vy += -gravity;
        }
    }
    
}
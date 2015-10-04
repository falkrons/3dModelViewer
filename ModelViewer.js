<!DOCTYPE html>
<html lang="en"> <head>
<title>3D Object Viewer</title>
	<script src="http://sdk.altvr.com/lib/three.min.js"></script>
    <script src="http://sdk.altvr.com/lib/OBJMTLLoader.js"></script>
    <script src="http://sdk.altvr.com/lib/MTLLoader.js"></script>

	
</head><body><script>

//YOUR OBJ HERE:
function loadObj(){
	// enter the .obj and the .mtl file references.
	loader.load("Models/ClickBeam.obj", "Models/ClickBeam.mtl", function (object){
		//create a reference to the object
		obj = object.clone();
		//sets the initial scale of the obj.
		obj.scale.set(10, 10, 10);
		//sets the initial rotation of the obj
		obj.rotation.set(0, 0, 0);
		//seta the initial position of the obj.
		obj.position.set(0, 0, 0);
		//adds the obj to the scene to be rendered.
		scene.add(obj);
	});
}

var altspace = altspace || null;
var renderer, camera, scene, loader ;
window.addEventListener('keyup', function(event) { Key.onKeyup(event)}, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
var Key = {
  _pressed: {},

  num4: 100,
  num8: 104,
  num6: 102,
  num2: 98,
  num7: 103,
  num9: 105,
  num1: 97,
  num3: 99,
  numMinus: 109,
  numPlus: 107,
  numDivide: 111,
  numTimes: 106,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};
(function init(){
	scene = new THREE.Scene();
	loader = new THREE.OBJMTLLoader();
	if(altspace){
    	renderer = altspace.getThreeJSRenderer({version:'0.2.0'});
    	loadObj();
	}else{
		WIDTH = 1000;
  		HEIGHT = 800;
		VIEW_ANGLE = 45,
		ASPECT = WIDTH / HEIGHT;
		NEAR = 0.1;
		FAR = 10000;
		renderer = new THREE.WebGLRenderer();
		camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
		scene.add(camera);
		camera.position.z = 300;
		renderer.setSize(WIDTH, HEIGHT);
      	document.body.appendChild(renderer.domElement); 
		sceneLight = new THREE.DirectionalLight(0xFFFFFF);
		// set its position
		sceneLight.position.x = 10;
		sceneLight.position.y = 80;
		sceneLight.position.z = 100;
		// add to the scene
		scene.add(sceneLight);
		loadObj();	
	};
	//starts the animation so we can see the object.
	animate();
}());
function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (Key.isDown(Key.num6)){
		obj.translateZ(1);
	};
	if (Key.isDown(Key.num4)){
		obj.translateZ(-1);
	};
	if (Key.isDown(Key.num8)){
		obj.translateY(1);
	};
	if (Key.isDown(Key.num2)){
		obj.translateY(-1);
	};
	if (Key.isDown(Key.numMinus)){
		obj.translateX(1);
	};
	if (Key.isDown(Key.numPlus)){
		obj.translateX(-1);
	};
	if (Key.isDown(Key.numTimes)){
		obj.scale.x += 0.5;
		obj.scale.y += 0.5;
		obj.scale.z += 0.5;
	};
	if (Key.isDown(Key.numDivide)){
		obj.scale.x -= 0.5;
		obj.scale.y -= 0.5;
		obj.scale.z -= 0.5;
	};
	if (Key.isDown(Key.num7)){
		obj.rotateZ(Math.PI * (1)/ 180);
	};
	if (Key.isDown(Key.num9)){
		obj.rotateZ(Math.PI * (-1)/ 180)
	};
	if (Key.isDown(Key.num1)){
		obj.rotateY(Math.PI * (1)/ 180)
	};
	if (Key.isDown(Key.num3)){
		obj.rotateY(Math.PI * (-1)/ 180)
	};
}
</script></body></html>

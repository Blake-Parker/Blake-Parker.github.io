var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var tank;
        var plane;
        var lvl;
        var lvl2;
        var buildings = [];
        
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, groundY, '#3333ff');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var star;
            for(var i=0; i<100; i++){
                star = draw.bitmap('img/Star.png')
                star.x = canvasWidth*Math.random();
                star.y = groundY*Math.random() - 50;
                background.addChild(star);
            }

            var moon = draw.bitmap('img/USSR.png');
            moon.x = 500;
            moon.y = 0;
            moon.scaleX = 0.5;
            moon.scaleY = 0.5;
            background.addChild(moon);
            
            plane = draw.bitmap('img/plane.png');
            plane.x = 0;
            plane.y = groundY - 350;
            background.addChild(plane);
            
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i = 0; i < 7; i++) {
                var buildingHeight = 300*Math.random();
                if(buildingHeight <= 200){
                    buildingHeight += 100;
                }
                var building = draw.rect(75, buildingHeight, 'Crimson', 'Black', 1);
                
                
                building.x = 200*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
          /*  tree = draw.bitmap('img/tree.png');
            tree.x = 0;
            tree.y = 185;
            background.addChild(tree);
          */
            
            tank = draw.bitmap('img/tank.png');
            tank.x = 900;
            tank.y = groundY - 100;
            tank.scaleX = 2.5;
            tank.scaleY = 2.5;
            background.addChild(tank);
            
            lvl = draw.bitmap('img/level2.png');
            lvl.x = 2000;
            lvl.y = groundY - 350;
            background.addChild(lvl);
            
            lvl2 = draw.bitmap('img/level2.png');
            lvl2.x = 4200;
            lvl2.y = groundY - 350;
            background.addChild(lvl2)
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            //tree.x = tree.x - 3;
            
            plane.x = plane.x - 10;
            
            tank.x = tank.x - 4;
            
            lvl.x = lvl.x - 2
            
                        
            /*if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            */
            
            if(plane.x < -2000){
                plane.x = canvasWidth;
            }
            
            if(tank.x < -1000){
                tank.x = canvasWidth;
            }
            
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++){
                buildings[i].x -= 1;
                
                if (buildings[i].x < -100){
                    buildings[i].x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

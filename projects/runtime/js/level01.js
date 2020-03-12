var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Soviet Rumble",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                //level 1
                { "type": "sawblade", "x": 400, "y": groundY - 110},
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY - 110},
                { "type": "sawblade", "x": 1300, "y": groundY },
                { "type": "sawblade", "x": 1800, "y": groundY - 110},
                { "type": "spike", "x": 1100, "y": groundY - 10},
                { "type": "spike", "x": 1500, "y": groundY - 10},
                { "type": "enemy", "x": 500, "y": groundY - 50},
                { "type": "enemy", "x": 800, "y": groundY - 50},
                { "type": "enemy", "x": 1200, "y": groundY - 50},
                { "type": "reward", "x": 850, "y": groundY - 110},
                { "type": "reward", "x": 1750, "y": groundY - 110},
                { "type": "reward2", "x": 1100, "y": groundY - 75},
                { "type": "reward2", "x": 1500, "y": groundY - 75},
                { "type": "reward3", "x": 600, "y": groundY - 75},
                { "type": "bonus", "x": 2000, "y": groundY - 110},
                
                //level 2
                { "type": "sawblade", "x": 2300, "y": groundY - 110},
                { "type": "sawblade", "x": 2600, "y": groundY},
                { "type": "sawblade", "x": 3000, "y": groundY - 110},
                { "type": "sawblade", "x": 3300, "y": groundY - 110},
                { "type": "sawblade", "x": 3400, "y": groundY},
                { "type": "sawblade", "x": 3500, "y": groundY - 110},
                { "type": "sawblade", "x": 3750, "y": groundY},
                { "type": "spike", "x": 2450, "y": groundY - 10},
                { "type": "spike", "x": 2850, "y": groundY - 10},
                { "type": "spike", "x": 3150, "y": groundY - 10},
                { "type": "spike", "x": 3600, "y": groundY - 10},
                { "type": "spike", "x": 3900, "y": groundY - 10},
                { "type": "enemy2", "x": 2450, "y": groundY - 50},
                { "type": "enemy2", "x": 2750, "y": groundY - 50},
                { "type": "enemy2", "x": 2300, "y": groundY - 50},
                { "type": "reward", "x": 2600, "y": groundY - 110},
                { "type": "reward", "x": 3400, "y": groundY - 110},
                { "type": "reward2", "x": 3150, "y": groundY - 75},
                { "type": "reward2", "x": 3600, "y": groundY - 75},
                { "type": "reward3", "x": 3900, "y": groundY - 75},
                { "type": "bonus", "x": 4200, "y": groundY - 110},
                
                //level 3
                { "type": "sawblade", "x": 4400, "y": groundY},
                { "type": "sawblade", "x": 4500, "y": groundY - 110},
                { "type": "sawblade", "x": 4550, "y": groundY - 110},
                { "type": "sawblade", "x": 4400, "y": groundY},
                { "type": "sawblade", "x": 4800, "y": groundY},
                { "type": "sawblade", "x": 5050, "y": groundY},
                { "type": "spike", "x": 4650, "y": groundY - 10},
                { "type": "spike", "x": 4950, "y": groundY - 10},
                { "type": "spike", "x": 5150, "y": groundY - 10},
                { "type": "reward", "x": 4650, "y": groundY - 110},
                { "type": "reward", "x": 5150, "y": groundY - 110},
                { "type": "reward2", "x": 4400, "y": groundY - 110},
                { "type": "reward2", "x": 4950, "y": groundY - 110},
                { "type": "reward3", "x": 5050, "y": groundY - 110},
                { "type": "enemy3", "x": 3900, "y": groundY - 50},
                { "type": "enemy3", "x": 4100, "y": groundY - 50},
                { "type": "enemy3", "x": 4200, "y": groundY - 50},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        //function to make sawblades
        function createSawBlade(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            sawBladeHitZone.velocityX = -2; 
            sawBladeHitZone.rotationalVelocity = 8;
            
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        //code for creating spikes
        function createSpike(x, y){
            var hitZoneSize = 30;
            var damageFromObstacle = 15;
            var spikeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            spikeHitZone.x = x;
            spikeHitZone.y = y;
            game.addGameItem(spikeHitZone);
        
            var obstacleImage = draw.bitmap('img/spike.png');        
            spikeHitZone.addChild(obstacleImage);
            obstacleImage.x = -50;
            obstacleImage.y = -25;
        
        }

        //potatoes, good for your heart.
            function createReward(x,y){
            var reward = game.createGameItem('reward', 25);
            reward.x = x;
            reward.y = y;
            reward.velocityX = -2;
            reward.rotationalVelocity = -1.5;
            
            var picture = draw.bitmap('img/Potato.png');
            picture.x = -25;
            picture.y = -25;
            
            reward.addChild(picture);
            game.addGameItem(reward);
            
            reward.onPlayerCollision = function() {
                game.changeIntegrity(10);
                game.increaseScore(100);
                reward.fadeOut();
            };
          
        }
        
        
        
        //another reward, axe
          function createReward2(x,y){
            var reward = game.createGameItem('reward', 25);
            reward.x = x;
            reward.y = y;
            reward.velocityX = -2;
            
            var picture = draw.bitmap('img/Axe.png');
            picture.x = -75;
            picture.y = -75;
            
            reward.addChild(picture);
            game.addGameItem(reward);
            
            reward.onPlayerCollision = function() {
                game.increaseScore(50);
                reward.fadeOut();
            };
          
        }
        
        //another reward, axe
          function createReward3(x,y){
            var reward = game.createGameItem('reward', 25);
            reward.x = x;
            reward.y = y;
            reward.velocityX = -2;
            
            var picture = draw.bitmap('img/Bumpkin.png');
            picture.x = -25;
            picture.y = -25;
            
            reward.addChild(picture);
            game.addGameItem(reward);
            
            reward.onPlayerCollision = function() {
                game.increaseScore(50);
                reward.fadeOut();
            };
          
        }
        
        //bonus in between levels
        function createBonus(x, y){
            var bonus = game.createGameItem('bonus', 50);
            bonus.x = x;
            bonus.y = y;
            bonus.velocityX = -2;
            
            var picture = draw.bitmap('img/USFlag.png');
            picture.x = -75;
            picture.y = -75;
            
            bonus.addChild(picture);
            game.addGameItem(bonus);
            
            bonus.onPlayerCollision = function() {
                game.increaseScore(100);
                game.changeIntegrity(1000)
                bonus.fadeOut();
            };
            
        }

        //basic enemy
        function createEnemy(x, y){
            var enemy =  game.createGameItem('enemy',30);
                enemy.x = x;
                enemy.y = y;
                enemy.velocityX = -1.5;
                game.addGameItem(enemy);
                
            var stalin = draw.bitmap('img/stalin.png');
                stalin.x = -30;
                stalin.y = -40;
            
                
            enemy.addChild(stalin);
                    
            enemy.onPlayerCollision = function() { 
                game.changeIntegrity(-30);
                enemy.fadeOut();
            };
            
            enemy.onProjectileCollision = function() {
                game.increaseScore(50);
                enemy.fadeOut();
            };
            
        }
        
        function createEnemy2(x, y){
            var enemy2 = game.createGameItem('enemy2', 30);
                enemy2.x = x;
                enemy2.y = y;
                enemy2.velocityX = -1.5;
                game.addGameItem(enemy2);
            
            var putin = draw.bitmap('img/putin.png');
                putin.x = -30;
                putin.y = -40;
                
            enemy2.addChild(putin);
            
            enemy2.onPlayerCollision = function(){
                game.changeIntegrity(-60);
                enemy2.fadeOut();
            };
            
            enemy2.onProjectileCollision = function(){
                game.increaseScore(100);
                enemy2.fadeOut();
            }
        }
        
        function createEnemy3(x, y){
            var enemy3 = game.createGameItem('enemy3', 30);
                enemy3.x = x;
                enemy3.y = y;
                enemy3.velocityX = -1.5;
                game.addGameItem(enemy3);
            
            var lenin = draw.bitmap('img/lenin.png');
                lenin.x = -30;
                lenin.y = -40;
                
            enemy3.addChild(lenin);
            
            enemy3.onPlayerCollision = function(){
                game.changeIntegrity(-60);
                enemy3.fadeOut();
            };
            
            enemy3.onProjectileCollision = function(){
                game.increaseScore(100);
                enemy3.fadeOut();
            }
        }


        //add sawblades using the gameitem variable in level data.
        for (var i = 0; i <= levelData.gameItems.length - 1; i++) {
                var gameItem = levelData.gameItems[i];
            if (gameItem.type === 'sawblade'){
                createSawBlade(gameItem.x, gameItem.y);
                }
            
            if (gameItem.type === 'spike'){
                createSpike(gameItem.x, gameItem.y);
            }
            
            if (gameItem.type === 'enemy'){
                createEnemy(gameItem.x, gameItem.y);
            }
            
            if (gameItem.type === 'enemy2'){
                createEnemy2(gameItem.x, gameItem.y);
            }
            
            if (gameItem.type === 'enemy3'){
                createEnemy3(gameItem.x, gameItem.y);
            }
            
            if (gameItem.type === 'reward'){
                createReward(gameItem.x, gameItem.y);
            }
            
            if (gameItem.type === 'reward2'){
                createReward2(gameItem.x, gameItem.y);
            }
            
            if (gameItem.type === 'reward3'){
                createReward3(gameItem.x, gameItem.y);
            }
            
            if (gameItem.type === 'bonus'){
                createBonus(gameItem.x, gameItem.y);
            }
        }
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}

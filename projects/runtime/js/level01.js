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
                { "type": "sawblade", "x": 400, "y": groundY - 110},
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY - 110},
                { "type": "sawblade", "x": 1300, "y": groundY },
                { "type": "sawblade", "x": 1800, "y": groundY - 110},
                { "type": "sawblade", "x": 2300, "y": groundY - 110},
                { "type": "sawblade", "x": 2600, "y": groundY},
                { "type": "spike", "x": 1100, "y": groundY - 10},
                { "type": "spike", "x": 1500, "y": groundY - 10},
                { "type": "enemy", "x": 500, "y": groundY - 50},
                { "type": "enemy", "x": 800, "y": groundY - 50},
                { "type": "enemy", "x": 1200, "y": groundY - 50},
                { "type": "reward", "x": 850, "y": groundY - 110},
                { "type": "reward2", "x": 1100, "y": groundY - 75},
                { "type": "reward2", "x": 1500, "y": groundY - 75},
                { "type": "reward", "x": 1750, "y": groundY - 110},
                { "type": "bonus", "x": 2000, "y": groundY - 110}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

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
        //the potato reward        
        function createReward(x, y){
            var reward = game.createGameItem('reward', 25);
            var hitZoneSize = 25;
            var damageFromObstacle = 0;
            var rewardHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            rewardHitZone.x = x;
            rewardHitZone.y = y;
            game.addGameItem(rewardHitZone);
            
            var obstacleImage = draw.bitmap('img/Potato.png');
            rewardHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            
            reward.onPlayerCollision = function() {   
                game.changeIntegrity(10);
                game.increaseScore(100);
                reward.fadeOut();
            };
        }
        
        
        
        //another reward, WIP
        function createReward2(x, y){
            var reward2 = game.createGameItem('reward', 25);
            var hitZoneSize = 25;
            var damageFromObstacle = 0;
            var reward2HitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            reward2HitZone.x = x;
            reward2HitZone.y = y;
            game.addGameItem(reward2HitZone);
            
            var obstacleImage = draw.bitmap('img/Axe.png');
            reward2HitZone.addChild(obstacleImage);
            obstacleImage.x = -75;
            obstacleImage.y = -75;
            
            reward2.onPlayerCollision = function() {   
                game.changeIntegrity(5);
                game.increaseScore(100);
                reward2.fadeOut();
            };
        }
        
        //bonus in between levels
        function createBonus(x, y){
            var bonus = game.createGameItem('bonus', 25);
            var hitZoneSize = 50;
            var damageFromObstacle = 0;
            var bonusHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            bonusHitZone.x = x;
            bonusHitZone.y = y;
            game.addGameItem(bonusHitZone);
            
            var obstacleImage = draw.bitmap('img/USFlag.png');
            bonusHitZone.addChild(obstacleImage);
            obstacleImage.x = -75;
            obstacleImage.y = -75;
            
            bonus.onPlayerCollision = function(){
                game.changeIntegrity(100);
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
            
            if (gameItem.type === 'reward'){
                createReward(gameItem.x, gameItem.y);
            }
            
            if (gameItem.type === 'reward2'){
                createReward2(gameItem.x, gameItem.y);
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

$(document).ready(function(){

    var gamecourse = $('#playArea');                            //Referring to the area where we play the game
    gamecourse.addClass('animate-area');                        //To animate game canvas 
    var racer = $('#racer');                                    //Selector for racer
    var score = $('#score')                                     //Selector for score
    var collideSound = document.getElementById("collidesound");   //Selector for sound for avoiding obstacles
    var coinSound = document.getElementById("coinsound");       //Selector for sound for collecting coins
    var gameEndSound = document.getElementById("endsound");     //Selector for sound when the game ends
    collidesound.volume = 0.9;                                  //Setting the volume for the collide sound
    coinSound.volume = 0.9;                                     //Setting the volume for the coin sound
    gameEndSound.volume = 0.9;                                  //Setting the volume for the game end sound
    //var socket = io();                                        //For socket.io
    var username;                                             //Storing the username 
    var password;                                             //Storing the password 
    var speed= 3;                                             //Initial speed of the obstacles
    var scoreval = 0;                                         //Initial Score 
    var hasAvoidedObstacle = false;                         //To check if the racer avoided the obstacle or not                               
    var hascollectedcoin = false;
    var caughtfuel = false;
    var obstacle_current_position = 0;                      //Current position of the obstacle
    var fuel_current_position = 0;                          //Current position of the fuel token
    var coin_current_position = 0;                          //Current position of the coin
    var coinAdded = false;                                  //To check if the coin has been added
    var fuelAdded = false;                                  //To check if the fuel token has been added
    var obstacleAdded = false;                              //To check if the obstacle has been added
    
    //Runs indefinitely until the game is over   
    var gameBegin = setInterval(function(){
        var obstacle = $('#obstacle');                               //Selector for obstacle                                       
        obstacle_current_position = parseInt(obstacle.css('left'));  //Initialising the position of the obstacle
        var racer_top_pos = parseInt(racer.css('top'));              //Initialising the position of the racer          
        
        //Add the obstacle to the playArea if it has not been added yet (To make sure obstacle is added)
        if(obstacleAdded == false) {
            gamecourse.append("<div id = 'obstacle'> </div>");
           obstacleAdded = true;
        }

        //Game Over condition- To check if the obstacle has crossed the position of the racer but the racer has not jumped
        if(obstacle_current_position<=200 && (racer_top_pos== 110))  {
            var sound = true;
            //To play the sound when the racer collides with the obstacle
            if(sound){
                collideSound.currentTime = 0;
                collideSound.play();
                sound= false;
            }
            //Calling the game_over function
            game_over();
        }
        

        var obstacle_random = Math.floor(Math.random() * 100) + 100;    // To place the obstacle randmly

        //To re-initialise the obstacle
        if(obstacle_current_position < -10){
            hasAvoidedObstacle = false;
            obstacle_current_position =1100 + obstacle_random;
            obstacle.fadeIn();
        }
        
    
        //When the obstacle has been avoided...
        if(obstacle_current_position < 200 && hasAvoidedObstacle == false){
            hasAvoidedObstacle = true;

            //We update the score on the HTML
            scoreval++;
            score.html(scoreval); 

            //To play the sound
            var sound = true;
            if(sound){
                coinSound.currentTime = 0;
                coinSound.play();
                sound= false;
            }
                
        } 
        
        //Add the coin when the score is greater than 1
        if(scoreval>1){

            var coin = $('#coin');                                                  //Selector for the coin
            coin_current_position = parseInt(coin.css('left'));                     //Initialising the postion of the coin                                              
            var coin_random = Math.floor(Math.random() * 100) + obstacle_random;    //to aid in getting a random for the coin
            
            //Add the coin to the play area if it has not been added yet
            if(coinAdded == false) {
                gamecourse.append("<div id = 'coin'> </div>");
                coinAdded = true;
            }

            //Re-initialise the coin
            if(coin_current_position < -10){
                hascollectedcoin = false;
                coin_current_position = 1100 + coin_random;
                coin.fadeIn();
            }
            
            //If any key has been pressed and coin has crossed the position of the racer, score will be incremented
            $(document).keydown(function(event){
                var sound = true;

                if(coin_current_position < 200){
                    hascollectedcoin=true;
                    coin.fadeOut();

                    //Incrementing the score and writing it
                    scoreval++; 
                    score.html(scoreval); 

                    //To play the sound
                    if (sound) {
                        coinSound.currentTime = 0;
                        coinSound.play();
                        soundFlag = false;
                    }
            
                 } 
            });

            //To move the coin and at the below speed
            coin.css('left', coin_current_position - speed);
        }

        if(scoreval>4){
            var fuel = $('#fuel');                                              //Selector for the fuel token
            fuel_current_position = parseInt(fuel.css('left'));                 //Initialising the position of the fuel token                                            
            var fuel_random = Math.floor(Math.random()) + obstacle_random  ;    //To aid in getting a random positon of the fuel token
            
            //Add the fuel token to the play area if it has not been added yet
            if(fuelAdded == false) {
                gamecourse.append("<div id = 'fuel'> </div>");
                fuelAdded = true;
            }

            //Re-initialising the fuel token
            if(fuel_current_position < -10){
                caughtfuel = false;
                fuel_current_position = 1100 + fuel_random ;
                fuel.fadeIn();
            }
            
            //If any key has been pressed and fuel token has crossed the position of the racer, score will be incremented
            $(document).keydown(function(event){
                var sound = true;

                if(fuel_current_position < 200){
                    caughtfuel = true;
                    fuel.fadeOut();

                    //Incrementing the score and writing it
                    scoreval++; 
                    score.html(scoreval); 

                    //To play the sound
                    if (sound) {
                        coinSound.currentTime = 0;
                        coinSound.play();
                        sound = false;
                    }
            
                 } 
            });

            //To move the fuel token and at the below speed
            fuel.css('left', fuel_current_position - speed);
        }

        //To move the obstacle and at the below speed
        obstacle.css('left', obstacle_current_position - speed); 
        
        
    });
    

    //To move the racer up/down when the up/down arrow keys are pressed
    $(document).on('keydown', function(e){
        var key = e.keyCode;
        
        if(key===38){ //up arrow
            racer.animate({top:'-=200px'},1050);
            racer.animate({top:'+=200px'},1050);
        }
        
        else if(key===40){ //down arrow
            racer.animate({top:'+=200px'},1050);
            racer.animate({top:'-=200px'},1050);
        }
        
    });
    
    //Game over function to be executed when the game is over
    function game_over() {
        clearInterval(gameBegin);

        //Display game over message as an alert
        window.alert("Game Over! Try Again...");

        //Play the game over sound
        var sound = true;
        if(sound == true)
        {
            gameEndSound.currentTime = 0;
            gameEndSound.play();
            sound = false;
        }
    }
    socket.on('bestYet', function(user1, score1, user2, score2, user3, score3){

            //If there is only one score available
            if(user2 == undefined)
                $('#playarea').append('<table id = "leaderboard"> <tr> <th colspan="2">Best Global Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + user1 +'</td> <td>' + score1 + '</td> </tr> </table>');
            
            //If there are two scores available
            else if(user3 == undefined)
                $('#playarea').append('<table id = "leaderboard"> <tr> <th colspan="2">Best Global Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + user1 +'</td> <td>' + score1 + '</td> </tr> <tr> <td>' + user2 + '</td> <td>' + score2 + '</td> </tr> </table>');
            
            //If top 3 scores are available
            else
                //We display the best score table for all users yet
                $('#playarea').append('<table id = "leaderboard"> <tr> <th colspan="2">Best Global Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + user1 +'</td> <td>' + score1 + '</td> </tr> <tr> <td>' + user2 + '</td> <td>' + score2 + '</td> </tr> <tr> <td>' + user3 + '</td> <td>' + score3 + '</td> </tr> </table>');
        });

        socket.on('bestNow', function(user1, score1, user2, score2, user3, score3){

            //If there is only one score available
            if(user2 == undefined)
                $('#playarea').append('<table id = "ScoreDetails"> <tr> <th colspan="2">Best Active Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + user1 +'</td> <td>' + score1 + '</td> </tr> </table>');
                        
            //If there are two scores available
            else if(user3 == undefined)
                $('#playarea').append('<table id = "ScoreDetails"> <tr> <th colspan="2">Best Active Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + user1 +'</td> <td>' + score1 + '</td> </tr> <tr> <td>' + user2 + '</td> <td>' + score2 + '</td> </tr> </table>');
            
            //If top 3 scores are available
            else
                //We display the best score table for all users yet
                $('#playarea').append('<table id = "ScoreDetails"> <tr> <th colspan="2">Best Active Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + user1 +'</td> <td>' + score1 + '</td> </tr> <tr> <td>' + user2 + '</td> <td>' + score2 + '</td> </tr> <tr> <td>' + user3 + '</td> <td>' + score3 + '</td> </tr> </table>');
        });
    }
});
})
 

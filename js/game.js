var initialTime;
var initialXPosition;
var initialYPosition;
var distanceText;
var background;
var plane;
var planeCrashed = false;
var graphics; // Declare graphics object outside update function
var timerText;
var timerValue = 10; // Initial timer value in seconds
var timerStatus = true; // Initial timer status

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 9.81 } // Set gravity in m/s^2
        }
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/images/background2.png');
    this.load.image('plane', 'assets/images/plane.png');
}

function create() {
    setInterval(requestTimerValue, 1000);

    background = this.add.image(400, 300, 'sky').setOrigin(0.5);

    plane = this.physics.add.sprite(100, 560, 'plane');
    plane.setDisplaySize(110, 50);

    initialXPosition = plane.x;
    initialYPosition = plane.y;
    initialTime = Date.now(); // Initialize initialTime using Date.now()

    distanceText = this.add.text(background.x, background.y, 'X', {
        fontSize: '60px',
        fill: '#ffffff',
        fontWeight: 'bold',
        zIndex: 8
    });
    distanceText.setOrigin(0.5);

    graphics = this.add.graphics(); // Create graphics object

    timerText = this.add.text(10, 10, 'Timer: 0', {
        fontSize: '24px',
        fill: '#fff'
    });
}

function update() {
    // Check if scene is still active before accessing time properties
    if (this.scene.isActive('default')) {
        if (!timerStatus && !planeCrashed) {
            plane.setVelocityX(50);
            background.tilePositionX += 2;

            var currentTime = Date.now();
            var timeElapsed = (currentTime - initialTime) / 1000;

            var gravity = 9.81;

            var newXPosition = initialXPosition + plane.body.velocity.x * timeElapsed;
            var newYPosition = initialYPosition + plane.body.velocity.y * timeElapsed - 0.5 * gravity * timeElapsed * timeElapsed;

            var distanceTraveled = Phaser.Math.Distance.Between(initialXPosition, initialYPosition, newXPosition, newYPosition);
            var distanceTraveledMeters = distanceTraveled / 100;

            var desiredDistance = Phaser.Math.FloatBetween(5, 10);

            if (distanceTraveledMeters >= desiredDistance) {
                planeCrashed = true;
                plane.setVelocityX(5000);
            }

            graphics.lineStyle(5, 0xFF6666); // Red color
            graphics.beginPath();
            graphics.moveTo(plane.x, initialYPosition); // Starting point
            graphics.lineTo(plane.x, plane.y); // Ending point
            graphics.closePath();
            graphics.strokePath();

            plane.setPosition(newXPosition, newYPosition);

            distanceText.setText(distanceTraveledMeters.toFixed(1) + 'X').setDepth(10);
            distanceText.setPosition(background.x, background.y);
        }
    }
}

function requestTimerValue() {
    if (timerStatus) {
        fetch('./server.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(serverResponse => {
                console.log(serverResponse);

                if (serverResponse.trim() === "Game Start") {
                    timerStatus = false;
                    initialTime = Date.now(); // Reset initialTime when game starts
                }

                updateTimer();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
}

function updateTimer() {
    if (timerValue > 0) {
        timerValue--;
        timerText.setText('Timer: ' + timerValue);
    } else {
        timerText.setText("Game Start");
    }
}

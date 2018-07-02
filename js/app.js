// Enemies our player must avoid
class Enemy {
  constructor() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 1;
    this.y = Math.floor(Math.random()*3)*83 + 60;
    this.speed = Math.floor(Math.random()*3)*200 + 100;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 505) {
      this.x = -100;
      this.y = Math.floor(Math.random()*3)*83 + 60;
      this.speed = Math.floor(Math.random()*3)*200 + 100;
    };
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    // The image/ sprite for the player. This uses
    // a provided helper to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 203;
    this.y = 375;
  }

  update() {
    // If the player reaches the water then add 1 to the number
    // of wins and restart the game
    if (this.y < 43) {
      setTimeout(() => {
        wins += 1;
        this.y = 375;
      }, 300);
    };

    // If the player collides with an enemy, then restart the
    // game and reset the score
    allEnemies.forEach((enemy) => {
      if(this.y === (enemy.y - 17) && this.x > enemy.x - 15 && this.x < enemy.x + 15) {
        this.x = 203;
        this.y = 375;
        wins = 0;
      };
    });
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyInput) {
    switch (keyInput) {
      case 'left':
        if (this.x >= 102) {
          this.x -= 101;
        };
        break;
      case 'right':
        if (this.x <= 304) {
          this.x += 101;
        };
        break;
      case 'up':
        if (this.y >= 43) {
          this.y -= 83;
        };
        break;
      case 'down':
        if (this.y <= 292) {
          this.y += 83;
        };
        break;
    }
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Enemy1 = new Enemy(),
    Enemy2 = new Enemy();
    Enemy3 = new Enemy();
var allEnemies = [Enemy1, Enemy2, Enemy3];
var player = new Player();

// Define variables
var wins = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

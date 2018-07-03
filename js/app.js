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
let scoreHTML = document.querySelector('.current-score')
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
      this.x = 203;
      this.y = 375;
      wins += 1;
      score += 20;
      scoreHTML.textContent = `Score: ${score}`;
    };

    // If the player collides with an enemy, then restart the
    // game and reset the score
    allEnemies.forEach((enemy) => {
      if (this.y === (enemy.y - 17) && this.x > enemy.x - 25 && this.x < enemy.x + 25) {
        this.x = 203;
        this.y = 375;
        lives -= 1;
        removeHeart();
        if (lives === 0) {
          lives = 3;
          openModal();
        };
      };
    });

    // If the player lands on the same square as the gem
    // then collect the gem, add 10 to the score and set a
    // new gem down
    if (this.x === collectable.x && this.y === collectable.y - 17) {
      if (collectable.sprite === 'images/Heart.png') {
        lives += 1;
      } else {
        score += 10;
        gems += 1;
      };

      scoreHTML.textContent = `Score: ${score}`;

      collectable.sprite = collectables[ Math.floor(Math.random()*3)];
      collectable.x = Math.floor(Math.random()*5)*101 + 1;
      collectable.y = Math.floor(Math.random()*3)*83 + 60;
      collectable.render();
    };
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

class Collectable {
  constructor() {
    this.sprite = collectables[Math.floor(Math.random()*4)];
    this.x = Math.floor(Math.random()*5)*101 + 1;
    this.y = Math.floor(Math.random()*3)*83 + 60;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};

const heartDisplay = document.querySelector('.hearts');
// A function to remove a heart when a life is lost
function removeHeart() {
  let hearts = heartDisplay.querySelectorAll('.fa-heart');
  hearts[hearts.length - 1].classList.remove('fa-heart');
  hearts[hearts.length - 1].classList.add('fa-heart-o');
};

// If the new game button is pressed then restart the game
let newGameButton = document.querySelector('.new-game');
newGameButton.addEventListener('click', function(evt) {
  resetCounters();
});

function resetCounters() {
  // Move player back to start
  player.x = 203;
  player.y = 375;

  // Reset game counters
  wins = 0;
  score = 50;
  gems = 0;
  lives = 3;
  scoreHTML.textContent = `Score: ${score}`;

  // Reset star rating
  let hearts = heartDisplay.querySelectorAll('.fa');
  hearts.forEach(function(heart) {
    heart.classList.add('fa-heart');
    if (!heart.classList.contains('fa-heart')) {
      heart.classList.add('fa-heart');
    };
    if (heart.classList.contains('fa-heart-o')) {
      heart.classList.remove('fa-heart-o');
    };
  });
};


// Find the modal and its overlay
var modal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal-overlay');

function openModal() {

  // New Game Button
  var newGameButton = modal.querySelector('.new-game');
  newGameButton.addEventListener('click', function() {
    closeModal();
    resetCounters();
  });

  let scoreMsg = document.querySelector('.score');
  let waterMsg = document.querySelector('.water');
  let gemMsg = document.querySelector('.gems');
  scoreMsg.textContent = `Your score is ${score}`;
  if (wins === 1) {
    waterMsg.textContent = `You reached the water ${wins} time`;
  } else {
    waterMsg.textContent = `You reached the water ${wins} times`;
  };
  if (gems === 1) {
    gemMsg.textContent = `You picked up ${gems} gem`;
  } else {
    gemMsg.textContent = `You picked up ${gems} gems`;
  };

  // Show the modal and overlay
  modal.style.display = 'block';
  modalOverlay.style.display = 'block';

};

function closeModal() {
  // Hide the modal and overlay
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var collectables = ['images/Gem Blue.png',
                    'images/Gem Green.png',
                    'images/Gem Orange.png',
                    'images/Heart.png'];
var collectable = new Collectable();
var Enemy1 = new Enemy(),
    Enemy2 = new Enemy();
    Enemy3 = new Enemy();
var allEnemies = [Enemy1, Enemy2, Enemy3];
var player = new Player();



// Define variables
var wins = 0;
var score = 50;
var gems = 0;
var lives = 3;

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

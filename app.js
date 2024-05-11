

class Snake {
    #context; // Canvas context
    #x; // Snake X position
    #y; // Snake Y position
    #xDelta; // Change in X position
    #yDelta; // Change in Y position
    #width; // Snake width
    #height; // Snake height
    #speed; // Snake movement speed
    #tail; // Snake tail segments
    #tailLength; // Snake tail length
    #canvas; // Canvas element
    #food; // Food instance
    count; // Score

    constructor() {
        this.#xDelta = 0; // Initial X change
        this.#yDelta = 0; // Initial Y change
        this.#x = 30; // Initial X position
        this.#y = 0; // Initial Y position
        this.#width = 10; // Snake width
        this.#height = 10; // Snake height
        this.#speed = 1.1; // Snake movement speed
        this.#tail = []; // Snake tail segments
        this.#tailLength = 50; // Initial tail length
        this.#canvas = document.querySelector("canvas"); // Get canvas element
        this.#context = this.#canvas.getContext("2d"); // Get canvas context
        this.count = document.querySelector("#count"); // Get score element
        this.#food = new Food(this.#canvas.width, this.#canvas.height, 50, 50); // Create food instance
        this.image = new Image(); // Create new image element
        this.image.src = "images/down.png"; // Set default image source

        if (!this.#canvas) {
            this.#canvas = document.createElement("canvas"); // Create canvas element
            this.#canvas.width = 700; // Set canvas width
            this.#canvas.height = 700; // Set canvas height
            document.body.appendChild(this.#canvas); // Append canvas to body
        }

        this.loop(); // Start game loop
    }

    checkFoodCollision() {
        if (
            this.#x - 10 < this.#food.x + this.#food.foodWidth &&
            this.#x - 10 + this.#width > this.#food.x &&
            this.#y + 20 < this.#food.y + this.#food.foodHeight &&
            this.#y + 20 + this.#height > this.#food.y
        ) {
            this.#tailLength += 10; // Increase tail length
            this.count.textContent = +this.count.textContent + 10; // Update score
            this.#food.respawn(); // Respawn food
        }
    }

    drawSnake() {
        // Draw snake tail
        this.#tail.forEach((segment) => {
            this.#context.fillStyle = "rgb(109,178,119)"
            this.#context.fillRect(segment.x + 2, segment.y + 4, this.#width + 18, this.#height + 18); // Draw tail segment
            if (segment.x == this.#x && segment.y == this.#y && this.#xDelta + this.#yDelta !== 0) {
                alert("Game Over"); // Show Game Over alert
                this.resetGame(); // Reset game
            }
        });

        // Draw snake head
        this.#context.drawImage(this.image, this.#x - 14, this.#y - 13, this.#width + 50, this.#height + 50); // Draw snake head

    }

    resetGame() {
        this.image.src = "images/down.png"; // Reset snake head image
        this.#tail.length = 50; // Reset tail length
        this.#tailLength = 50; // Reset tail length
        this.#x = 30; // Reset X position
        this.#y = 0; // Reset Y position
        this.#xDelta = 0; // Reset X change
        this.#yDelta = 0; // Reset Y change
        this.count.textContent = 0; // Reset score
    }

    updateSnake() {
        this.#tail.unshift({ x: this.#x, y: this.#y }); // Add new segment to tail

        if (this.#tail.length > this.#tailLength) {
            this.#tail.pop(); // Remove last segment from tail
        }

        this.#x += this.#xDelta; // Update X position
        this.#y += this.#yDelta; // Update Y position
        if (this.#x + this.#width + 25 >= this.#canvas.width || this.#x < 0) {
            alert("Game Over")
            this.resetGame()
        } else if (this.#y >= this.#canvas.height || this.#y < 0) {
            alert("Game Over")
            this.resetGame()
        }
        this.checkFoodCollision(); // Check for food collision
    }

    loop() {
        requestAnimationFrame(() => {
            this.loop(); // Recursive loop
            this.updateSnake(); // Update snake position
            this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height); // Clear canvas
            this.drawSnake(); // Draw snake
            this.#food.draw(this.#context); // Draw food


        });
    }

    goLeft = () => {
        if (this.#xDelta !== this.#speed) {
            this.#xDelta = -this.#speed; // Move left
            this.#yDelta = 0; // Reset vertical movement
            this.image.src = "images/left.png"; // Change snake head image

        }
    };

    goRight = () => {
        if (this.#xDelta !== -this.#speed) {
            this.#xDelta = this.#speed; // Move right
            this.#yDelta = 0; // Reset vertical movement
            this.image.src = "images/right.png"; // Change snake head image
        }
    };

    goUp = () => {
        if (this.#yDelta !== this.#speed) {
            this.#yDelta = -this.#speed; // Move up
            this.#xDelta = 0; // Reset horizontal movement
            this.image.src = "images/top.png"; // Change snake head image
        }
    };

    goDown = () => {
        if (this.#yDelta !== -this.#speed) {
            this.#yDelta = this.#speed; // Move down
            this.#xDelta = 0; // Reset horizontal movement
            this.image.src = "images/down.png"; // Change snake head image
        }

    };
}


import { InputHandler } from "/inputHandler.js"
import { Food } from "/food.js";

new InputHandler(new Snake()); // Initialize game

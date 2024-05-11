
export class InputHandler {
    constructor(snake) {
        this.snake = snake; // Snake instance
        document.addEventListener("keydown", this.handleKeyDown.bind(this)); // Add keydown event listener
    }

    handleKeyDown(event) {
        const key = event.key.toLowerCase(); // Get pressed key

        if (key === "arrowleft") {
            this.snake.goLeft(); // Move snake left
        } else if (key === "arrowright") {
            this.snake.goRight(); // Move snake right
        } else if (key === "arrowup") {
            this.snake.goUp(); // Move snake up
        } else if (key === "arrowdown") {
            this.snake.goDown(); // Move snake down
        }
    }
}

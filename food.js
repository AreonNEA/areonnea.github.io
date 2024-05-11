
 export class Food {
    constructor(canvasWidth, canvasHeight, foodWidth, foodHeight) {
        this.canvasWidth = canvasWidth; // Canvas width
        this.canvasHeight = canvasHeight; // Canvas height
        this.foodWidth = foodWidth; // Food width
        this.foodHeight = foodHeight; // Food height
        this.image = new Image(); // Create new image element
        this.image.src = "images/apple.png"; // Set image source to apple.png
        this.respawn(); // Initialize food position
    }

    respawn() {
        this.x = Math.random() * (this.canvasWidth - (this.foodWidth * 2)); // Random X position within canvas
        this.y = Math.random() * (this.canvasHeight - (this.foodHeight * 2)); // Random Y position within canvas
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.foodWidth, this.foodHeight); // Draw food on canvas
    }
}

 
 
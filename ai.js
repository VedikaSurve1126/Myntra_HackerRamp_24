and the java script:async function generateClothing() {
    const description = document.getElementById('clothingDescription').value;
    const canvas = document.getElementById('clothingCanvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
        const response = await fetch('http://127.0.0.1:5000/generate-clothing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        });

        if (!response.ok) {
            throw new Error('Failed to generate clothing');
        }

        const data = await response.json();

        if (data.instructions) {
            drawClothing(ctx, data.instructions);
        } else if (data.imageUrl) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = data.imageUrl;
        } else {
            throw new Error('Invalid response from the server');
        }
    } catch (error) {
        console.error('Error generating clothing:', error);
    }
}

function drawClothing(ctx, instructions) {
    instructions.forEach(instruction => {
        ctx.beginPath();
        ctx.strokeStyle = instruction.color;
        ctx.lineWidth = instruction.lineWidth;
        ctx.moveTo(instruction.start.x, instruction.start.y);
        ctx.lineTo(instruction.end.x, instruction.end.y);
        ctx.stroke();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const sizeButtons = document.querySelectorAll('.size-button');
    const skinColorPicker = document.getElementById('skinColorPicker');
    const characterImage = document.getElementById('characterImage');

    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const size = button.getAttribute('data-size');
            alert(`Size ${size} selected`);
            // Here you can add functionality to change the character image size if needed
        });
    });

    skinColorPicker.addEventListener('input', function() {
        const color = skinColorPicker.value;
        // Change the character's skin color. This will depend on how the character image is structured.
        // For example, if the character's skin color is controlled via a CSS filter:
        characterImage.style.filter = `sepia(100%) saturate(500%) hue-rotate(${calculateHue(color)}deg) brightness(85%)`;
    });

    function calculateHue(color) {
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h;
        if (max === min) {
            h = 0;
        } else if (max === r) {
            h = (60 * ((g - b) / (max - min)) + 360) % 360;
        } else if (max === g) {
            h = (60 * ((b - r) / (max - min)) + 120) % 360;
        } else {
            h = (60 * ((r - g) / (max - min)) + 240) % 360;
        }
        return h;
    }
});

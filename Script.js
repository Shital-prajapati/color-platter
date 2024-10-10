const paletteContainer = document.getElementById('palette');
const generateBtn = document.getElementById('generateBtn');
const savePaletteBtn = document.getElementById('savePaletteBtn');
const loadPaletteBtn = document.getElementById('loadPaletteBtn');
const downloadImageBtn = document.getElementById('downloadImageBtn');

// Function to generate random color
function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Function to generate color palette
function generatePalette() {
    paletteContainer.innerHTML = ''; // Clear existing palette
    const colors = [];
    for (let i = 0; i < 5; i++) {
        const color = generateRandomColor();
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;
        colorBox.textContent = color;
        colorBox.addEventListener('click', () => copyToClipboard(colorBox, color));
        paletteContainer.appendChild(colorBox);
        colors.push(color);
    }
    return colors;
}

// Copy color code to clipboard
function copyToClipboard(element, color) {
    navigator.clipboard.writeText(color).then(() => {
        element.classList.add('copied');
        setTimeout(() => {
            element.classList.remove('copied');
        }, 1000);
    });
}

// Save the palette in localStorage
function savePalette() {
    const colors = Array.from(document.getElementsByClassName('color-box')).map(box => box.textContent);
    localStorage.setItem('savedPalette', JSON.stringify(colors));
    alert('Palette saved!');
}

// Load the palette from localStorage
function loadPalette() {
    const savedColors = JSON.parse(localStorage.getItem('savedPalette'));
    if (savedColors) {
        paletteContainer.innerHTML = '';
        savedColors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.classList.add('color-box');
            colorBox.style.backgroundColor = color;
            colorBox.textContent = color;
            colorBox.addEventListener('click', () => copyToClipboard(colorBox, color));
            paletteContainer.appendChild(colorBox);
        });
    } else {
        alert('No saved palette found!');
    }
}

// Download palette as image
function downloadPaletteAsImage() {
    html2canvas(paletteContainer).then(canvas => {
        const link = document.createElement('a');
        link.download = 'palette.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        console.error("Error capturing image:", err);
        alert("Failed to download the image.");
    });
}

// Event listeners
generateBtn.addEventListener('click', generatePalette);
savePaletteBtn.addEventListener('click', savePalette);
loadPaletteBtn.addEventListener('click', loadPalette);
downloadImageBtn.addEventListener('click', downloadPaletteAsImage);

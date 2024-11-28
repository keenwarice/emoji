const emojiPalette = [
    { emoji: '🍎', color: [255, 0, 0] }, { emoji: '🌳', color: [0, 128, 0] },
    { emoji: '🌊', color: [0, 0, 255] }, { emoji: '☀️', color: [255, 255, 0] },
    { emoji: '🌙', color: [200, 200, 200] }, { emoji: '🔥', color: [255, 69, 0] },
    { emoji: '⚽️', color: [30, 30, 30] }, { emoji: '💎', color: [100, 180, 255] },
    { emoji: '❤️', color: [255, 20, 60] }, { emoji: '🟢', color: [0, 255, 0] },
    { emoji: '🔵', color: [0, 100, 255] }, { emoji: '🔴', color: [255, 0, 0] },
    { emoji: '🍋', color: [255, 255, 153] }, { emoji: '🍇', color: [153, 102, 255] },
    { emoji: '🟤', color: [139, 69, 19] }, { emoji: '🟡', color: [255, 255, 0] },
    { emoji: '🟠', color: [255, 140, 0] }, { emoji: '🟣', color: [128, 0, 128] },
    { emoji: '💚', color: [0, 128, 0] }, { emoji: '💙', color: [0, 0, 139] },
    { emoji: '🍊', color: [255, 165, 0] }, { emoji: '🍓', color: [255, 0, 63] },
    { emoji: '🌵', color: [34, 139, 34] }, { emoji: '🌸', color: [255, 182, 193] },
    { emoji: '🌼', color: [255, 255, 102] }, { emoji: '🌈', color: [153, 51, 255] },
    { emoji: '💜', color: [128, 0, 128] }, { emoji: '🖤', color: [0, 0, 0] },
    { emoji: '🤍', color: [255, 255, 255] }, { emoji: '🤎', color: [101, 67, 33] },
    { emoji: '🧡', color: [255, 140, 0] }, { emoji: '💛', color: [255, 223, 0] },
    { emoji: '🍒', color: [220, 20, 60] }, { emoji: '🍑', color: [255, 159, 128] },
    { emoji: '🌿', color: [50, 205, 50] }, { emoji: '🏔️', color: [150, 150, 150] },
    { emoji: '🏖️', color: [0, 191, 255] }, { emoji: '⛄️', color: [240, 248, 255] },
    { emoji: '🪨', color: [112, 128, 144] }, { emoji: '🪵', color: [160, 82, 45] },
    { emoji: '🌽', color: [255, 222, 89] }, { emoji: '🥕', color: [255, 165, 79] },
    { emoji: '🥦', color: [107, 142, 35] }, { emoji: '🍵', color: [85, 107, 47] },
    { emoji: '☁️', color: [224, 255, 255] }, { emoji: '🎨', color: [180, 130, 70] },
    { emoji: '🎃', color: [255, 117, 24] }, { emoji: '🕶️', color: [70, 70, 70] },
    { emoji: '🎄', color: [34, 139, 34] }, { emoji: '🎆', color: [255, 140, 200] },
    { emoji: '🌟', color: [255, 255, 204] }, { emoji: '💐', color: [255, 128, 128] },
    { emoji: '🏵️', color: [255, 215, 0] }, { emoji: '🌰', color: [139, 69, 19] },
    { emoji: '🍂', color: [210, 105, 30] }, { emoji: '🍁', color: [255, 99, 71] },
    { emoji: '🍌', color: [255, 225, 53] }, { emoji: '🍍', color: [255, 239, 91] },
    { emoji: '🍉', color: [255, 69, 96] }, { emoji: '🍎', color: [255, 59, 48] },
    { emoji: '🍏', color: [144, 238, 144] }, { emoji: '🥥', color: [255, 245, 238] },
    { emoji: '🦋', color: [135, 206, 250] }, { emoji: '🐝', color: [255, 223, 0] },
    { emoji: '🐞', color: [255, 0, 0] }, { emoji: '🐢', color: [34, 139, 34] },
    { emoji: '🦜', color: [0, 255, 255] }
];


    const imageInput = document.getElementById('imageInput');
    const canvas = document.getElementById('imageCanvas');
    const mosaicDiv = document.getElementById('emojiMosaic');
    const errorMessage = document.getElementById('errorMessage');
    const generateButton = document.getElementById('generateButton');
    const downloadButton = document.getElementById('downloadButton');



    generateButton.addEventListener('click', () => {
      const file = imageInput.files[0];
      if (!file) {
        errorMessage.textContent = 'Please select a valid image file.';
        return;
      }
      errorMessage.textContent = '';

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = Math.round((img.height / img.width) * 100);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imgData.data;
        let mosaic = '';

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];

            let closestEmoji = emojiPalette[0].emoji;
            let smallestDistance = Infinity;

            for (const { emoji, color } of emojiPalette) {
              const [er, eg, eb] = color;
              const distance = Math.sqrt((r - er) ** 2 + (g - eg) ** 2 + (b - eb) ** 2);
              if (distance < smallestDistance) {
                smallestDistance = distance;
                closestEmoji = emoji;
              }
            }
            mosaic += closestEmoji;
          }
          mosaic += '\n';
        }

        mosaicDiv.textContent = mosaic;
      };
    });

    downloadButton.addEventListener('click', () => {
      const blob = new Blob([mosaicDiv.textContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'emoji-mosaic.txt';
      link.click();
    });
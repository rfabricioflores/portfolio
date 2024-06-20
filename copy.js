import fs from 'fs';
import { resolve, dirname } from 'path';

const filesToCopy = [
  { src: 'node_modules/jquery/dist/jquery.min.js', dest: 'src/assets/libs/jquery.min.js' },
  { src: 'node_modules/slick-carousel/slick/slick.min.js', dest: 'src/assets/libs/slick.min.js' },
];

filesToCopy.forEach(file => {
  const srcPath = resolve(dirname("./"), file.src);
  const destPath = resolve(dirname("./"), file.dest);

  // Ensure the destination directory exists
  const destDir = dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Delete the existing file if it exists
  if (fs.existsSync(destPath)) {
    fs.unlinkSync(destPath);
  }

  // Copy the file
  fs.copyFileSync(srcPath, destPath);
});

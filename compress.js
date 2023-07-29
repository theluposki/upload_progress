import { exec } from "node:child_process";
import { promisify } from "node:util";
import { unlink } from "node:fs";

const unlinkAsync = promisify(unlink);

const sizesDefault = [
  { width: 300, height: 300 },
  { width: 640, height: 480 },
  { width: 1920, height: 1080 },
];

export const compress = async (filePath, sizes = sizesDefault) => {
  return new Promise((resolve, reject) => {
    const promises = sizes.map((size) => {
      const outputFilePath = `${filePath}_${size.width}x${size.height}.png`;
      const ffmpegCommand = `ffmpeg -i ${filePath} -map_metadata -1 -vf "scale=${size.width}:${size.height}:force_original_aspect_ratio=decrease" ${outputFilePath}`;
      return new Promise((resolve, reject) => {
        exec(ffmpegCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error converting image to ${size.width}x${size.height}: ${error.message}`);
            reject(error);
          } else {
            console.log(`- ${size.width}x${size.height} OK`);
            resolve(outputFilePath);
          }
        });
      });
    });

    Promise.all(promises)
      .then((result) => {
        unlinkAsync(filePath)
        resolve(result)
      })
      .catch((error) => {
        unlinkAsync(filePath)
        reject(error)
      });
  });
};

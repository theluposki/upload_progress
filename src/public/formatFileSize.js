export const formatFileSize = (size) => {
  const kiloBytes = 1024;
  const megaBytes = kiloBytes * 1024;
  const gigaBytes = megaBytes * 1024;

  if (size < kiloBytes) {
    return size + " bytes";
  } else if (size < megaBytes) {
    const sizeInKB = (size / kiloBytes).toFixed(2);
    return sizeInKB + " KB";
  } else if (size < gigaBytes) {
    const sizeInMB = (size / megaBytes).toFixed(2);
    return sizeInMB + " MB";
  } else {
    const sizeInGB = (size / gigaBytes).toFixed(2);
    return sizeInGB + " GB";
  }
};

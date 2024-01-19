const dataURLtoFile = (dataurl, filename, type) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type });
};

export const compressFile = (file, document) => {
  if (file == null) return;
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let cw = canvas.width;
  let ch = canvas.height;
  let maxW = 500;
  let maxH = 500;
  let img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = function () {
    let iw = img.width;
    let ih = img.height;
    let scale = Math.min(maxW / iw, maxH / ih);
    let iwScaled = iw * scale;
    let ihScaled = ih * scale;
    canvas.width = iwScaled;
    canvas.height = ihScaled;
    ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
    let dataURL = canvas.toDataURL("image/jpeg", 0.1);
    let resizedImage = dataURL.replace(
      /^data:image\/(png|jpg|jpeg);base64,/,
      ""
    );
    let fileResized = dataURLtoFile(dataURL, file.name, file.type);
    return fileResized;
  };
};

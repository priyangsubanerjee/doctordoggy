import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";

function File() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

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

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    // convert to base64 image and set to state to preview in UI

    console.log(croppedArea, croppedAreaPixels);

    let canvas = document.createElement("canvas");

    // height 720 , width 1280px

    canvas.width = 1280;
    canvas.height = 720;
    let ctx = canvas.getContext("2d");
    let image = new Image();
    image.src = file;
    image.onload = () => {
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        1280,
        720
      );
      let base64Image = canvas.toDataURL("image/jpeg");
      setFinalImage(base64Image);
    };
  };

  useEffect(() => {}, [file]);
  return (
    <div className="">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(URL.createObjectURL(e.target.files[0]));
        }}
        name=""
        id=""
      />
      {file != null && (
        <div className="fixed inset-0 h-full w-full bg-red-100 pt-44">
          <div className="h-[500px] w-[500px] bg-blue-500 relative">
            <Cropper
              style={{
                containerStyle: {
                  width: "500px",
                  height: "300px",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                },
              }}
              image={file}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />

            <div className="flex items-center justify-center absolute bottom-[20%]">
              <button
                onClick={() => {
                  setPreview(finalImage);
                  setFile(null);
                }}
              >
                Okayy
              </button>
            </div>
          </div>
        </div>
      )}
      {preview != null && (
        <div className=" bg-blue-500 relative">
          <img src={preview} className="object-contain w-auto h-auto" alt="" />
        </div>
      )}
    </div>
  );
}

export default File;

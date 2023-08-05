import React from "react";

function Chip({ file, setFiles }) {
  const handleRemove = () => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  return (
    <div className="bg-neutral-50 px-4 h-10 flex items-center rounded-full">
      <span className="text-xs">
        {file.name.length > 10
          ? file.name.substring(0, 10) + "..." + file.name.split(".").pop()
          : file.type}
      </span>
      <button onClick={() => handleRemove()} className="mt-1 ml-4">
        <iconify-icon icon="ion:close-outline"></iconify-icon>
      </button>
    </div>
  );
}

export default Chip;

export async function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  const res = await fetch("/api/cloudinary/upload", {
    method: "POST",
    body: formData,
  });
  const { fileUrl, publicId } = await res.json();
  return { fileUrl, publicId };
}

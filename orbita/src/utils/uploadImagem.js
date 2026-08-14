export async function uploadImagem(arquivo) {
  const formData = new FormData()
  formData.append("file", arquivo)
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  )

  const dados = await response.json()
  return dados.secure_url
}
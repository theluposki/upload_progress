import { formatFileSize } from "./formatFileSize.js";

const form = document.querySelector("#form");
const inputFile = document.querySelector("#file");
const uploadFile = document.querySelector(".upload-file");
const uploaded = document.querySelector(".uploaded");

form.addEventListener("dragover", (e) => {
  e.preventDefault();
  form.classList.add("dragover");
});

form.addEventListener("dragleave", () => {
  form.classList.remove("dragover");
});

form.onclick = (e) => {
  inputFile.click();
};

form.addEventListener("drop", async (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];

  await uploadFileWithProgress(file);
});

inputFile.onchange = async (e) => {
  const file = e.target.files[0];
  await uploadFileWithProgress(file);
};

const uploadFileWithProgress = async (file) => {
  if (!file.type.startsWith("image/")) {
    alert("Selecione um arquivo de imagem válido.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const filename = file.name;

  let totalFull;
  try {
    const response = await axios.post("/upload", formData, {
      onUploadProgress: (progressEvent) => {
        totalFull = progressEvent.total;
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );

        uploadFile.innerHTML = `
        <i class="bx bxs-file-blank"></i>
        <div class="content">
          <div class="info">
            <span>${filename}</span>
            <span>${progress}%</span>
          </div>
          <div style="width: ${progress}%;" class="progress-bar"></div>
        </div>
        `;
      },
    });

    form.classList.remove("dragover");
    uploadFile.innerHTML = "";

    let uploadContent = `
    <div class="upload-file">
      <i class="bx bxs-file-blank"></i>
      <div class="content">
        <div class="info">
          <span>${filename}</span>
          <i class="bx bx-check"></i>
        </div>
        <div class="size">${formatFileSize(totalFull)}</div>
      </div>
    </div>
    `;

    uploaded.insertAdjacentHTML("afterbegin", uploadContent);
    console.log("Upload completed:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro no upload:", error.message);
    throw error;
  }
};

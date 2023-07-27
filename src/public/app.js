import { formatFileSize } from "./formatFileSize.js";

const SERVER_LINK = "/upload";

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

form.addEventListener("drop", (e) => {
  e.preventDefault();

  const file = e.dataTransfer.files[0];

  const filename = file.name;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", SERVER_LINK, true);

  let loadedKBs, totalKBs, totalFull;

  xhr.upload.onprogress = ({ loaded, total }) => {
    loadedKBs = Math.floor(loaded / 1000);
    totalKBs = Math.floor(total / 1000);
    totalFull = total;

    let percent = Math.floor((loadedKBs / totalKBs) * 100);

    uploadFile.innerHTML = `
    <i class="bx bxs-file-blank"></i>
    <div class="content">
      <div class="info">
        <span>${filename}</span>
        <span>${percent}%</span>
      </div>
      <div style="width: ${percent}%;" class="progress-bar"></div>
    </div>
    `;
  };

  xhr.onload = (e) => {
    const { error } = JSON.parse(xhr.response);

    if (error) {
      console.error(error);
      return;
    }

    if (loadedKBs === totalKBs) {
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
    }
  };

  let formData = new FormData(form);
  formData.append("file", file);
  xhr.send(formData);
});

form.onclick = (e) => {
  inputFile.click();
};

inputFile.onchange = (e) => {
  const filename = e.target.files[0].name;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", SERVER_LINK, true);

  let loadedKBs, totalKBs, totalFull;

  xhr.upload.onprogress = ({ loaded, total }) => {
    loadedKBs = Math.floor(loaded / 1000);
    totalKBs = Math.floor(total / 1000);
    totalFull = total;

    let percent = Math.floor((loadedKBs / totalKBs) * 100);

    uploadFile.innerHTML = `
    <i class="bx bxs-file-blank"></i>
    <div class="content">
      <div class="info">
        <span>${filename}</span>
        <span>${percent}%</span>
      </div>
      <div style="width: ${percent}%;" class="progress-bar"></div>
    </div>
    `;
  };

  xhr.onload = (e) => {
    const { error } = JSON.parse(xhr.response);

    if (error) {
      console.log(error);
      return;
    }

    if (loadedKBs === totalKBs) {
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
    }
  };

  let formData = new FormData(form);

  xhr.send(formData);
};

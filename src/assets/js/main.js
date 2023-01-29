
const fileInput = document.getElementById("file-input");
const fileInfo = document.getElementById("file-info-text");

fileInput.addEventListener("input", () => {
	fileInfo.textContent = fileInput.files[0].name
})

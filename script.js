function nextPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page' + page).classList.add('active');
}

let score = 0;
let sound = document.getElementById("popSound");
let savedPhoto = "";

// GAME
document.querySelectorAll(".love").forEach(love => {
  love.addEventListener("click", () => {

    sound.currentTime = 0;
    sound.play();

    love.remove();
    score++;

    document.getElementById("score").innerText = "Score: " + score;

    if (document.querySelectorAll(".love").length === 0) {
      setTimeout(() => nextPage(5), 500);
    }
  });
});

// PREVIEW FOTO
document.getElementById("photoInput")?.addEventListener("change", function() {
  let file = this.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      let preview = document.getElementById("preview");
      preview.src = e.target.result;
      preview.style.display = "block";

      savedPhoto = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

// CEK FOTO
function checkPhoto() {
  let input = document.getElementById("photoInput");

  if (input.files.length > 0) {
    let final = document.getElementById("finalPhoto");
    final.src = savedPhoto;
    final.style.display = "block";

    nextPage(6);
  } else {
    alert("Upload foto dulu 😒");
  }
}

// DOWNLOAD
function downloadPhoto() {
  let img = document.getElementById("finalPhoto");

  let a = document.createElement("a");
  a.href = img.src;
  a.download = "foto.png";
  a.click();
}

// SHARE
function shareLink() {
  if (navigator.share) {
    navigator.share({
      title: "Valentine 💗",
      text: "Lihat ini 💖",
      url: window.location.href
    });
  } else {
    alert("Copy link ini:\n" + window.location.href);
  }
}
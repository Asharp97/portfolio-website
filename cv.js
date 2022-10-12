AOS.init({ offset: 250, duration: 1200 });

var icon = document.getElementById("night");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "images/sun.png";
  } else {
    icon.src = "images/NightMode.png";
  }
};

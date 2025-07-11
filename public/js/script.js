const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const gloveIcon = document.querySelector(".glove-icon");

window.addEventListener("mousemove", function (e) {
  const x = e.clientX;
  const y = e.clientY;

  cursorDot.style.left = `${x}px`;
  cursorDot.style.top = `${y}px`;

  cursorOutline.style.left = `${x}px`;
  cursorOutline.style.top = `${y}px`;
});

function animateCursor() {
  if (gloveIcon) {
    const rect = gloveIcon.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2 + window.scrollX;
    const iconCenterY = rect.top + rect.height / 2 + window.scrollY;

    cursorOutline.style.left = `${iconCenterX}px`;
    cursorOutline.style.top = `${iconCenterY}px`;

    cursorDot.style.left = `${iconCenterX}px`;
    cursorDot.style.top = `${iconCenterY}px`;
  }

  requestAnimationFrame(animateCursor);
}

animateCursor();

  window.onload = function() {
    if (window.location.href.indexOf("?page=1") === -1) {
      window.location.href = window.location.pathname + "?page=1";
    }
  }

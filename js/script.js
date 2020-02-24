let lineEls = null;
const lineGridEl = document.querySelector('.line-grid');
const colorRadius = 300;

const baseColor = {
  r: 105,
  g: 109,
  b: 125 };

const highlightColor = {
  r: 255,
  g: 255,
  b: 255 };


//------


function setLinePosition(lineEl, deltaX, deltaY) {
  const slope = deltaY / deltaX;
  const rotation = Math.atan(slope) * (180 / Math.PI);

  lineEl.style.transform = `rotate(${rotation}deg)`;
}


function setColor(lineEl, deltaX, deltaY) {
  const totalDelta = Math.abs(deltaX) + Math.abs(deltaY);
  const colorFactor = (colorRadius - totalDelta) / colorRadius;

  if (colorFactor >= 0) {
    const newR = setColorValue('r', colorFactor);
    const newB = setColorValue('b', colorFactor);
    const newG = setColorValue('g', colorFactor);

    lineEl.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
  }
}


function setColorValue(colorVal, colorFactor) {
  return baseColor[colorVal] + Math.abs(baseColor[colorVal] - highlightColor[colorVal]) * colorFactor;
}


function mouseWatcher(e) {
  lineEls.forEach(el => {
    const deltaX = e.x - el.offsetLeft;
    const deltaY = e.y - el.offsetTop;

    setLinePosition(el, deltaX, deltaY);
    setColor(el, deltaX, deltaY);
  });
}


function resetLines() {
  window.setTimeout(() => {
    lineGridEl.classList.add('use-transition');

    lineEls.forEach((el, i) => {
      window.setTimeout(() => {
        el.style.transform = `rotate(0deg)`;
        el.style.backgroundColor = `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`;
      }, i * 5);
    });
  }, 50);

  window.setTimeout(() => {
    lineGridEl.classList.remove('use-transition');
  }, 3000);
}


function bindEvents() {
  document.addEventListener('mousemove', _.throttle(mouseWatcher, 50));
  document.addEventListener('mouseleave', resetLines);
}


function cacheElements() {
  lineEls = document.querySelectorAll('.line');
  // lineEls = [document.querySelector('.line')]; // for test
}


function init() {
  cacheElements();
  bindEvents();
}


init();
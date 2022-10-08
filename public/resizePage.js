function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
const reSizeHandle = () => {
  function reSize() {
    var width =
      document.documentElement.clientWidth || document.body.clientWidth;
    var ratio = width / 375;
    var fontSize = 100 * ratio;
    document.getElementsByTagName("html")[0].style["font-size"] =
      fontSize + "px";
  }
  window.addEventListener("resize", debounce(reSize, 200));
};

reSizeHandle();

// Measuring the Critical Rendering Path with Navigation Timing
// https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp

function logCRP() {
  var t = window.performance.timing,
    dcl = t.domContentLoadedEventStart - t.domLoading,
    complete = t.domComplete - t.domLoading;
  var stats = document.getElementById("crp-stats");
  stats.textContent = 'DCL: ' + dcl + 'ms, onload: ' + complete + 'ms';
}

function addCss(url, media) { 
  console.log("Loading CSS...")
  if (media) { 
    var HTMLlink = '<link href="' + url +'" rel="stylesheet" media="' + media + '">'; 
  } else { 
    var HTMLlink = '<link href="' + url +'" rel="stylesheet">'; 
  } 
 
  console.log(HTMLlink); 
 
  document.querySelectorAll("head")[0].insertAdjacentHTML('beforeend', HTMLlink) 
} 

window.addEventListener("load", function(event) {
  logCRP();

  addCss("css/style.css"); 
  addCss("css/print.css", "print") 
});
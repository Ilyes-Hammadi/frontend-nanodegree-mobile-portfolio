/*! frontend-nanodegree-mobile-portfolio 2017-04-10 */

function logCRP(){var a=window.performance.timing,b=a.domContentLoadedEventStart-a.domLoading,c=a.domComplete-a.domLoading;document.getElementById("crp-stats").textContent="DCL: "+b+"ms, onload: "+c+"ms"}window.addEventListener("load",function(a){logCRP()});
var inp = document.querySelector('#inp');
var sear = document.querySelector('.search_text');
inp.onfocus = function () {
  sear.style.display = 'block';
};
inp.onblur = function () {
  sear.style.display = 'none';
};

// 导航栏二级菜单
var cont = document.getElementById('cont');
var lis = cont.children;
for (var i = 0; i < lis.length; i++) {
  lis[i].onmouseover = function () {
    this.children[1].style.display = 'block';
    this.children[0].style.color = '#ff6700';
    this.children[0].style.transition = 'all .2s';
    sear.style.display = 'none';
    btn.style.borderColor = '#e0e0e0';
    inp.style.borderColor = '#e0e0e0';
  };
  lis[i].onmouseout = function () {
    this.children[1].style.display = 'none';
    this.children[0].style.color = '#333333';
  };
}

// 搜索框
var inp = document.querySelector('#inp');
var nav_search = document.querySelector('.nav_search');
var btn = nav_search.querySelector('button');
var sear = document.querySelector('.search_text');
inp.onfocus = function () {
  sear.style.display = 'block';
  this.style.borderColor = '#ff6700';
  btn.style.borderColor = '#ff6700';
};
inp.onblur = function () {
  sear.style.display = 'none';
  this.style.borderColor = '#e0e0e0';
  btn.style.borderColor = '#e0e0e0';
};

//按下s键直接定位到搜索框
document.addEventListener('keyup', fn);
function fn(e) {
  if (e.keyCode === 83) {
    inp.focus();
  }
}

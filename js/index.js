window.addEventListener('load', function () {
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

  //轮播图 开始
  //0.获取元素
  var arrowL = document.querySelector('#arrow-l');
  var arrowR = document.querySelector('#arrow-r');
  var navBox = document.querySelector('.nav_box');
  //5-1图片的宽度 因为左右按钮需要这个参数所以放到外面做全局变量
  var navBoxWidth = navBox.offsetWidth;
  //1.鼠标放到轮播图位置左右按钮显示
  navBox.addEventListener('mouseenter', function () {
    arrowL.style.display = 'block';
    arrowR.style.display = 'block';
    //鼠标经过清除定时器
    clearInterval(timer);
    timer = null;
  });
  // 2.鼠标放到轮播图位置左右按钮隐藏
  navBox.addEventListener('mouseleave', function () {
    arrowL.style.display = 'none';
    arrowR.style.display = 'none';
    timer = setInterval(function () {
      //手动调用点击事件
      arrowR.click();
    }, 3000);
  });
  //3. 动态生成小圆点，有几个图片救生成几个小圆点
  var ul = navBox.querySelector('ul');
  var ol = navBox.querySelector('.circle');
  for (var i = 0; i < ul.children.length; i++) {
    //3-1创建小li
    var li = document.createElement('li');
    // 5-2记录当前小圆圈的索引号 通过自定义属性来做
    li.setAttribute('data-index', i);
    //3-2 把创建的小li追加给ol
    ol.appendChild(li);
    //4.小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
    li.addEventListener('click', function () {
      //4-1 干掉所有人 把所有的小li 清除 current 类名
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
      }
      //4-2 留下我自己  当前的小li 设置current 类名
      this.className = 'current';
      // 5. 点击小圆圈，移动图片 当然移动的是 ul
      // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
      //5-2-1 当我们点击了某个小li 就拿到当前小li 的索引号
      //小圆圈的索引号
      var index = this.getAttribute('data-index');
      //6-1-6 当我们点击了某个小li 就要把这个li 的索引号给 num
      //这个是解决点击小圆点后再点击有按钮显示的不是下一张照片
      num = index;
      //6-1-7  当我们点击了某个小li 就要把这个li 的索引号给 circle
      circle = index;
      animate(ul, -index * navBoxWidth);
    });
  }
  //3-3把ol里面的第一个小li设置类名为current 这个是设置颜色
  ol.children[0].className = 'current';
  //6-2克隆ul第一张图片放到最后面
  var clone = ul.children[0].cloneNode(true);
  ul.appendChild(clone);
  //6.点击左侧按钮，图片滚动
  var num = 0;
  //6-1-1 circle 控制小圆圈的播放
  var circle = 0;
  //flag 节流阀
  var flag = true;
  //6-2 点击左侧按钮 图片滚动和左侧差不多
  arrowL.addEventListener('click', function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * navBoxWidth + 'px';
      }
      num--;
      animate(ul, -num * navBoxWidth, function () {
        flag = true;
      });
      circle--;
      // if (circle < 0) {
      //   circle = ol.children.length - 1;
      // }
      circle = circle < 0 ? ol.children.length - 1 : circle;
      //调用函数
      circleChange();
    }
  });
  //6-1点击右侧按钮，图片滚动 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
  arrowR.addEventListener('click', function () {
    if (flag) {
      flag = false;
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * navBoxWidth, function () {
        flag = true;
      });
      //6-1-2点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
      circle++;
      //6-1-3 如果circle == 3 说明走到最后我们克隆的这张图片了 我们就复原
      if (circle == ol.children.length) {
        circle = 0;
      }
      //调用函数
      circleChange();
    }
  });
  function circleChange() {
    // 6-1-4先清除其余小圆圈的current类名
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
    }
    //6-1-5 留下当前的小圆圈的current类名
    ol.children[circle].className = 'current';
  }
  //7.自动播放
  //封装函数
  var timer = setInterval(function () {
    //手动调用点击事件
    arrowR.click();
  }, 3000);
  //轮播图 结束
});

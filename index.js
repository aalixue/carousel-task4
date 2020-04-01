var showCarousel = (function () {
    function show(conf) {
        var html = '<div class="slider" id="slider">'
            + '<div class="slide"><img src="img/b5.png" alt=""></div>'
            + '<div class="slide"><img src="img/b1.png" alt=""></div>'
            + '<div class="slide"><img src="img/b2.png" alt=""></div>'
            + '<div class="slide"><img src="img/b3.png" alt=""></div>'
            + '<div class="slide"><img src="img/b4.png" alt=""></div>'
            + '<div class="slide"><img src="img/b5.png" alt=""></div>'
            + '<div class="slide"><img src="img/b1.png" alt=""></div>'
            + '</div>'
            + '<span id="left"><</span>'
            + '<span id="right">></span>'
            + '<ul class="nav" id="navs">'
            + '<li>1</li>'
            + '<li>2</li>'
            + '<li>3</li>'
            + '<li>4</li>'
            + '<li>5</li>'
            + '</ul>'

        var box = document.getElementById('box');
        box.innerHTML = html;
        var slider = document.getElementById('slider'),
            left = document.getElementById('left'),
            right = document.getElementById('right'),
            list = document.getElementById('navs').children;
        console.log(list);
        var index = 1; //打开页面生效的图片的下标为1
        var timer;
        var isMoving = false;
        //下一页
        function next() {
            if (isMoving) {
                return;
            }
            isMoving = true;
            index++;
            navMove();
            animate(slider, {
                left: -1200 * index
            }, function () {
                if (index == 6) {
                    slider.style.left = '-1200px';
                    index = 1;
                }
                isMoving = false;
            });
        }
        //上一页
        function prev() {
            if (isMoving) {
                return;
            }
            isMoving = true;
            index--;
            navMove();
            animate(slider, {
                left: -1200 * index
            }, function () {
                if (index == 0) {
                    slider.style.left = '-6000px';
                    index = 5;
                }
                isMoving = false;
            });
        }

        right.onclick = next;
        left.onclick = prev;

        //鼠标划上
        box.onmouseover = function () {
            animate(left, {
                opacity: 0.6
            })
            animate(right, {
                opacity: 0.6
            })
            clearInterval(timer); //图片停止滚动
        }
        //鼠标划出
        box.onmouseout = function () {
            animate(left, {
                opacity: 0
            })
            animate(right, {
                opacity: 0
            })
            timer = setInterval(next, 3000); //图片开始接着滚动
        }

        //按钮点击切换事件
        for (var i = 0; i < list.length; i++) {
            list[i].index = i;
            list[i].onclick = function () {
                index = this.index + 1;
                navMove();
                animate(slider, {
                    left: -1200 * index
                });
            }

        }
        //图片切换时按钮样式跟着切换
        function navMove() {
            for (var i = 0; i < list.length; i++) {
                list[i].className = "";
            }
            if (index > 5) {
                list[0].className = "active";
            } else if (index <= 0) {
                list[4].className = "active";
            } else {
                list[index - 1].className = "active";
            }
        }
        navMove(0);
        //页面打开时自动滚动切换
        timer = setInterval(next, 3000);

        function getStyle(obj, attr) { //返回值带有单位px
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, null)[attr];
            }
        }

        function animate(obj, json, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var flag = true;
                for (var attr in json) {
                    (function (attr) {
                        if (attr == "opacity") {
                            var now = parseInt(getStyle(obj, attr) * 100);
                            var dest = json[attr] * 100;
                        } else {
                            var now = parseInt(getStyle(obj, attr));
                            var dest = json[attr];
                        }
                        var speed = (dest - now) / 6;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        if (now != dest) {
                            flag = false;
                            if (attr == "opacity") {
                                obj.style[attr] = (now + speed) / 100;
                            } else {
                                obj.style[attr] = now + speed + "px";
                            }
                        }
                    })(attr);
                }
                if (flag) {
                    clearInterval(obj.timer);
                    callback && callback(); //如果回调函数存在，就调用回调函数
                }
            }, 30);
        }
        console.log('hello');
    }
    return {
        show: show
    };
}());
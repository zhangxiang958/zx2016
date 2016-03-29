window.onload = function(){
            canvas = document.getElementById("cas");
            context = canvas.getContext('2d');
            focallength = 250;  //焦距
            var textArray = ["前端", "IOS", "C++", "PHP", "JAVA", "安卓"];

            var dots = getimgData(textArray[0]);

            var pause = false;
            initAnimate();
            function initAnimate(){
                //记录每个像素点的位置。这里是初始的，所以是random的任意位置
                dots.forEach(function(){
                    this.x = Math.random()*canvas.width;
                    this.y = Math.random()*canvas.height;
                    this.z = Math.random()*focallength*2 - focallength;
                    //飞散开的位置
                    this.tx = Math.random()*canvas.width;
                    this.ty = Math.random()*canvas.height;
                    this.tz = Math.random()*focallength*2 - focallength;
                    this.paint();
                });
                animate();
            }
            //=============================
            function autoDraw(num) {
                            console.log(num);
                	dots = getimgData(textArray[num]);
                	derection = true;
                	pause = false;
                	initAnimate();
            	}

            var EventUtil = {
                addHandler: function(element, type, handler) {
                    if(element.addEventListener) {
                        element.addEventListener(type, handler ,false);
                    } else if (element.attachEvent) {
                        element.attachEvent("on" + type, handler);
                    } else {
                        element["on" + type] = handler;
                    }
                },
                getTarget: function(event) {
                    if(event.target) {
                        return event.target;
                    } else {
                        return window.event.srcElement;
                    }
                },
                getEvent: function(event) {
                    if(event) {
                        return event;
                    } else {
                        return window.event;
                    }
                },
                getWheelDelta: function(event) {
                    if ( event.wheelDelta) {
                        return event.wheelDelta;
                    } else {
                        return -event.detail * 40;
                    }
                }
            };
            (function () {
                var delta = 0;
                function handleMouseWheel(event) {
                    event = EventUtil.getEvent();
                    delta += EventUtil.getWheelDelta(event);
                    var i = delta / 120;
                    console.log(i);
                    if(i < -5 || i > 5) {
                        i = i % 6;
                    }
                    switch(i.toString()) {
                        case "0":
                            autoDraw(0);

                            break;
                        case "1":

                            autoDraw(1);

                            break;
                        case "2":
                            autoDraw(2);

                            break;
                        case "3":
                            autoDraw(3);

                            break;
                        case "4":
                            autoDraw(4);

                            break; 
                       case "5":
                            autoDraw(5);

                            break;
                       case "-5":
                            autoDraw(5);

                            break;
                        case "-4":
                            autoDraw(4);

                            break; 
                        case "-3":
                            autoDraw(3);

                            break;
                        case "-2":
                            autoDraw(2);

                            break;
                        case "-1":

                            autoDraw(1);

                            break;                                                
                    }
                }

                EventUtil.addHandler(document, "mousewheel", handleMouseWheel);
                EventUtil.addHandler(document, "DOMMouseScroll", handleMouseWheel); 
            })();
            //===================================

            //计算帧速率
            var lastTime;
            var derection = true;
            function animate(){  //动画函数
                animateRunning = true;
                var thisTime = +new Date();  //获取当前时间的毫秒值
                context.clearRect(0,0,canvas.width , canvas.height);  //绘制下一个之前清除画布
                dots.forEach(function(){
                    //遍历粒子
                    var dot = this;
                    //收缩动画算法
                    if(derection){
                        //如果粒子的原来位置和现在的位置相等 ，那么就让粒子处于原来位置
                        if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z)<0.1) {
                            dot.x = dot.dx;
                            dot.y = dot.dy;
                            dot.z = dot.dz;
                            if(thisTime - lastTime > 300) derection = false;
                        } else {  //否则就让粒子慢慢靠近原来位置
                            dot.x = dot.x + (dot.dx - dot.x) * 0.1;
                            dot.y = dot.y + (dot.dy - dot.y) * 0.1;
                            dot.z = dot.z + (dot.dz - dot.z) * 0.1;
                            lastTime = +new Date()
                        }
                    }
                    //扩散动画算法
                    else {
                        if (Math.abs(dot.tx - dot.x) < 0.1 && Math.abs(dot.ty - dot.y) < 0.1 && Math.abs(dot.tz - dot.z)<0.1) {
                            dot.x = dot.tx;
                            dot.y = dot.ty;
                            dot.z = dot.tz;
                            pause = true;  //停顿
                        } else {
                            dot.x = dot.x + (dot.tx - dot.x) * 0.1;
                            dot.y = dot.y + (dot.ty - dot.y) * 0.1;
                            dot.z = dot.z + (dot.tz - dot.z) * 0.1;
                            pause = false;
                        }
                    }
                    dot.paint();
                });
                if(!pause) {
                    if("requestAnimationFrame" in window){
                        requestAnimationFrame(animate);
                    }
                    else if("webkitRequestAnimationFrame" in window){
                        webkitRequestAnimationFrame(animate);
                    }
                    else if("msRequestAnimationFrame" in window){
                        msRequestAnimationFrame(animate);
                    }
                    else if("mozRequestAnimationFrame" in window){
                        mozRequestAnimationFrame(animate);
                    }
                }
            }
        }

        Array.prototype.forEach = function(callback){
            for(var i=0;i<this.length;i++){
                callback.call(this[i]);
            }
        }

        function getimgData(text){  //获取文字像素信息
            drawText(text);  //绘制文字
            var imgData = context.getImageData(0,0,canvas.width , canvas.height); //获取文字信息
            context.clearRect(0,0,canvas.width , canvas.height); //清除画布
            var dots = [];
            for(var x = 0; x < imgData.width; x += 6){

                for(var y = 0; y < imgData.height; y += 6){

                    var i = (y*imgData.width + x)*4;

                    if(imgData.data[i] >= 128){ //如果该像素点有颜色的话
                        var dot = new Dot(x-3 , y-3 , 0 , 3);
                        dots.push(dot);
                    }
                }
            }
            return dots;
        }

        function drawText(text){  //绘制文字
            context.save();
            context.font = "100px 微软雅黑 bold";
            context.fillStyle = "rgba(168,168,168,1)";
            context.textAlign = "center";
            context.textBaseline = "bottom";
            context.fillText(text , canvas.width/2 , canvas.height/2);
            context.restore();
        }


        var Dot = function(centerX , centerY , centerZ , radius){
            this.dx = centerX;   //保存原来的位置
            this.dy = centerY;
            this.dz = centerZ;
            this.tx = 0;         //保存粒子聚合后又飞散开的位置
            this.ty = 0;
            this.tz = 0;
            this.z = centerZ;
            this.x = centerX;
            this.y = centerY;
            this.radius = radius;
        }

        Dot.prototype = {
            paint:function(){
                context.save();
                context.beginPath(); 
                var scale = focallength/(focallength + this.z);
                context.arc(canvas.width/2 + (this.x-canvas.width/2)*scale , canvas.height/2 + (this.y-canvas.height/2) * scale, this.radius*scale , 0 , 2*Math.PI);
                context.fillStyle = "rgba(50,50,50,"+ scale +")";
                // context.fillStyle = "rgba(" + parseInt(Math.random() * 125 + 130) + "," + parseInt(Math.random() * 125 + 130) + "," + parseInt(Math.random() * 125 + 130) + " , 1)";
                context.fill();
                context.restore();
            }
}
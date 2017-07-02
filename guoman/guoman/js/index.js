/**
 * Created by tao on 2016/9/22.
 */
/*banner*/

$(function(){
    var num=$(".banner-span span").length;
    var i_num=0;
    var timer_banner=null;
    $(".banner-ul li:gt(0)").hide();/*让大于0的图隐藏*/
    /*小圆点切换*/
    $('.banner-span span').click(function(){
        $(this).addClass("active").siblings('span').removeClass('active');
        var i_num1=$('.banner-span span').index(this);
        /*图片显示*/
        $(".banner-ul li").eq(i_num1).fadeIn('slow').siblings('li').fadeOut('slow');
        i_num=i_num1;
    });
    /*左边和右边的按钮*/
    $(".banner").hover(function(){
        $(".banner-left").show();
        $(".banner-right").show();
    },function(){
        $(".banner-left").hide();
        $(".banner-right").hide();
    });
    /*左箭头点击*/
    $(".banner-left").click(function(){
        if(i_num==0){
            i_num=num;
        }
        /*图片切换*/
        $(".banner-ul li").eq(i_num-1).fadeIn('slow').siblings('li').fadeOut('slow');
        /*小圆点*/
        $(".banner-span span").eq(i_num-1).addClass("active").siblings('span').removeClass('active');
        i_num--;
    });
    /*  右箭头切换时*/
    $(".banner-right").click(function(){
        move_banner();
    });
    //自动播放函数
    function bannerMoveks(){
        timer_banner=setInterval(function(){
            move_banner();
        },2000)
    }
    bannerMoveks();
    //鼠标移动到banner上时停止播放
    $('.banner').mouseover(function(){
        clearInterval(timer_banner);
    });
    //鼠标离开 banner 弢�启定时播�?
    $('.banner').mouseout(function(){
        bannerMoveks();
    });
    //banner 右边点击执行函数
    function move_banner(){
        if(i_num==num-1){
            i_num=-1;
        }
        //大图切换
        $('.banner-ul li').eq(i_num+1).fadeIn('slow')
            .siblings('li').fadeOut('slow');
        //小图切换
        $('.banner-span span').eq(i_num+1).addClass('active')
            .siblings('span').removeClass('active');

        i_num++;

    }
})
/*动态文字*/
$(".text_s,.text_s1,.text_s2").addClass("animated fadeInUp");
$(".text_s3,.text_s4").addClass("animated swing");
$(".text_s5").addClass("animated rollIn");
$(".text_s8").addClass("animated zoomIn");
$(".text_s6,.text_s7").addClass("animated bounceInDown");

var banner=$(".banner1");
var bannerbox=$(".bannerbox")[0];//父容器
var as=$("a",bannerbox);
var button=$(".button")[0];
var btn=$(".btn",button);
var left=$(".left")[0];
var right=$(".right")[0];
//定动画开始之前的位置，第一张在框内，其余的在右侧
for (var i = 1; i < as.length; i++) {
    as[i].style.left="600px";
};
var now=0;
var next=0;
function moveLeft(){
    animate(as[now],{left:-600},291);//将框内图片动画到左侧
    next++;
    if (next>=5) {
        next=0
    }
    for (var i = 0; i < as.length; i++) {
      /*  btn[i].style.background="#000";*/
        as[next].style.left="600px";//将图片放到右侧
        animate(as[now],{left:-600},1000,Tween.Linear);
        animate(as[next],{left:0},1000,Tween.Linear);//右侧图片动画到框内
        as[next].style.zIndex=1;
    };
    /*btn[next].style.background="red";*/
    now=next;
}
var t=setInterval(moveLeft,2000);
//鼠标移上停止并出现左右按钮
bannerbox.onmouseover=function(){
    clearInterval(t);
    left.style.display="block";
    right.style.display="block";
};
bannerbox.onmouseout=function(){
    t=setInterval(moveLeft,2000);
    left.style.display="none";
    right.style.display="none";
};
//小按钮的移入事件
for (var i = 0; i < btn.length; i++) {
    btn[i].index=i;
    btn[i].onmouseover=function(){
        for (var j = 0; j < btn.length; j++) {
            btn[j].style.background="#000";
            as[j].style.zIndex=0;
            if (j>this.index) {
                as[j].style.left="500px"
            }
        }
        if (this.index==0) {
            as[as.length-1].style.left=0;
        }else{
            as[this.index-1].style.left=0;
            animate(as[this.index-1],{left:-500},1000,Tween.Linear);
        }
        btn[this.index].style.background="red";
        as[this.index].style.left="500px";
        animate(as[this.index],{left:0},1000,Tween.Linear);
        as[this.index].style.zIndex=1;
        now=this.index;
        next=this.index;
    }
}
left.onclick=function(){
    next--;
    if (next<=-1) {
        next=as.length-1
    };
    as[next].style.left="-600px";
    animate(as[next],{left:0},1000,Tween.Linear);
    animate(as[now],{left:600},1000,Tween.Linear);
    for (var i = 0; i < as.length; i++) {
        btn[i].style.background="#000";
        as[i].style.zIndex=0
    };
    btn[next].style.background="red";
    as[next].style.zIndex=1;
    now=next
}
right.onclick=function(){
    moveLeft();
};

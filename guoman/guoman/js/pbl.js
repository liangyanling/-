/**
 * Created by tao on 2016/5/4.
 */
/*function fun(parent,ele,myClass){
 var element =document.createElement("ele");
 element.className="myClass";
 parent.appendChild(element);
 return element;
 }*/
window.onload=function(){
    var dataImg={"data":[{src:"haizaiwang.jpg"},{src:"heibai.jpg"},{src:"juedi.jpg"},{src:"fei.jpg"},{src:"dou1.jpg"}],
             "data1":[{p:"海贼王"},{p:"《黑白无双》"},{p:"《绝地十日》"},{p:"《飞篮flying》"},{p:"《战斗装甲钢羽》"}],
        "data2":[{href:"ind.html"},{href:"ind.html"},{href:"ind.html"},{href:"ind.html"},{href:"ind.html"}]
    };

    pbl();
    window.onscroll=function(){
        //动态创建每个元素


        if(pbla()){
            var container1=document.getElementById("container1");
            for(var i=0;i<dataImg.data.length;i++ ){

                /*var box = fun(container1,"div","box");
                 var content = fun(box,"div","content");
                 var img1 = fun(content,"img",null);
                 img1.src = "images/"+dataImg.data[i].src;*/
                var pin=document.createElement("div");
                pin.className="box";
                container1.appendChild(pin);
                var content=document.createElement("div");
                content.className="content";
                pin.appendChild(content);

                var img=document.createElement("img");
                img.src="images/"+dataImg.data[i].src;
                var a=document.createElement("a");
                a.appendChild(img);
                a.href=dataImg.data2[i].href;
                content.appendChild(a);
                var text=document.createElement("P");
                text.className="ptext";
                text.innerHTML=dataImg.data1[i].p;
                content.appendChild(text);
            }
            pbl();
        }
    }
};


//布局函数  把所有图片放到数组里
function pbl(){
    var container1=document.getElementById("container1");
    var box1=document.getElementsByTagName("*");//获取所有的元素
    var box1push=[];//把所有图片放到数组里
    for(var i=0;i<box1.length;i++){
        // console.log(box1[i]);
        //获取的是所有的图片的内容
        if(box1[i].className=="box"){
            box1push.push(box1[i]);
        }
    }
    //console.log(box1[0]);

    //获取图片的宽度度   box1[0]第一个图片的宽度
    var pictureWidth=box1push[0].offsetWidth;
    //console.log(pictureWidth);
    var num=Math.floor(document.documentElement.clientWidth/pictureWidth);
    console.log(num);
    console.log(document.documentElement.clientWidth);
    //图片多宽，当前浏览器的宽度就有多宽
    container1.style.cssText = "width:" + pictureWidth * num + "px;margin:0 auto";
    //container1.style.cssText="width:"+pictureWidth * num+"px;margin:0 auto;";

    //创建一个数组，用来充放第一排的图片
    var firstarr=[];
    for(var j=0;j<box1push.length;j++){
        var ph=box1push[j].offsetHeight;
        if(j<num){
            firstarr[j]= ph;
        }else{
            //最小高度的那个
            var minh=Math.min.apply(null,firstarr);
            /*   var minIndex=0;*/
            var  mm=firstarr.indexOf(minh);//返回他的序列号
            console.log(mm);
            /* for(var m=0;m< firstarr.length;m++){
             if( ph[m] ==minh){
             minIndex=m;
             }
             }*/
            //存放第二排的图片
            box1push[j].style.position="absolute";
            box1push[j].style.left=box1push[mm].offsetLeft+"px";
            box1push[j].style.top= minh+"px";
            //重新计算他的高度
            9
            firstarr[ mm]+=box1push[j].offsetHeight;
        }

    }
    console.log(firstarr);

}



//布局函数
function pbla(){
    var container1=document.getElementById("container1");
    var box1=document.getElementsByTagName("*");
    var box1push=[];//把所有图片放到数组里
    for(var i=0;i<box1.length;i++){
        // console.log(box1[i]);
        //获取的是所有的图片的内容
        if(box1[i].className=="box"){
            box1push.push(box1[i]);
        }
    }
    //获取最后一张图片
    var lastImgh= box1push[box1push.length-1].offsetTop;
    //获取当前页面的高度
    var pageHeight=document.documentElement.clientHeight;
    //屏幕的高度+滚动的高度=document的高度
    //滚动的高度
    var scr=document.documentElement.scrollTop || document.body.scrollTop;
    return (pageHeight+scr)>lastImgh? true:false;

}


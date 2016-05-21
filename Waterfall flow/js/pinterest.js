// JavaScript Document

function getObj(id){return document.getElementById(id);}

window.onload=function(){
	
	getObj("toTop").onclick=function(){
	  javascript:scrollTo(0,0);
	}
	var titleIndex=11;
	getElementCount("container","box");
	
	//监听滚动条
	window.onscroll=function(){
		
		if( checkFlag()){
			var container=getObj("container");
			setTimeout(function(){
			  for(var i=1;i<11;i++){
			   
			   var newImage=document.createElement("img");
			   newImage.src="img/"+i+".jpg";
			   var imgBox=document.createElement("div");
			   imgBox.className="box-top-container";
			   imgBox.appendChild(newImage);
			   
			   var newTitle=document.createElement("span");
			   newTitle.innerHTML="标题"+titleIndex;
			   var newTitleBox=document.createElement("div");
			   newTitleBox.className="box-bot";
			   newTitleBox.appendChild(newTitle);
			  
			   var newElement=document.createElement("div");
			   newElement.className="box"+i;
			   newElement.appendChild(imgBox);
			   newElement.appendChild(newTitleBox);
			   
			   var newBox=document.createElement("div");
			   newBox.className="box";
			   newBox.appendChild(newElement);
			   
			   getObj("container").appendChild(newBox);
			   
			   titleIndex++;
			}
			
			getElementCount("container","box");
			
		
		    },500);
			
		}
		
	}

}

function checkFlag(){
    var containerObj=getObj("container");
	var elementArray=getChildElement(containerObj,"box");
	var lastElementHeight=elementArray[elementArray.length-1].offsetTop;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var pageScrollTop=document.documentElement.clientHeight||document.body.clientHeight;
	console.log("lastElementHeight:"+lastElementHeight)
	console.log("scrollTop:"+scrollTop)
	console.log("pageScrollTop:"+pageScrollTop)
	if(lastElementHeight<(scrollTop+pageScrollTop-410)){
	      return true;
	}
	
	if(scrollTop>100){
	  getObj("toTop").style.display="block";	
	}else{
	  getObj("toTop").style.display="none";
	}
}


//获取容器内的所有元素
function getElementCount(containerID,contentClassName){
	//容器对象
	var containerObj=getObj(containerID);
	//定义数组接收getChildElement(container,content)函数的返回值：数组
	var contentArray=getChildElement(containerObj,contentClassName);
	//获取每个元素的宽度，因为css中统一设置了宽度，所以这里随便取一个
	var elementWidth=contentArray[0].offsetWidth;
	//获取容器的宽度
	var containerWidth=containerObj.offsetWidth;
	//得到容器中每行可以放多少个元素,小数四舍五入向下取整
	var elementCountEveryRow=Math.floor(containerWidth/elementWidth);
	//数组，储存elementArray中所有元素高度
	var elementHeightArray=[];
	//遍历数组，依次把数组中每个元素的高度存入elementHeightArray
	for(var i=0;i<contentArray.length;i++){
		if(i<elementCountEveryRow){
		   elementHeightArray[i]=contentArray[i].offsetHeight;
		}else{
		   //获取第一中高度最小的元素的高度
	       var minHeight=Math.min.apply(null,elementHeightArray);
		    //获取高度最小的元素的位置
		   var minHeightElementIndex=getElementMinHeigthIndex(elementHeightArray,minHeight);
		   //把容器中第二行中第一个元素的样式设置为绝对定位
		   contentArray[i].style.position="absolute";
		   //把容器中第二行中第一个元素的top设置为第一行所有元素高度中的最小值
		   contentArray[i].style.top=minHeight+"px";
		  
		   //把容器中第二行中第一个元素的left设置为：（第一行所有元素高度最小元素的）*（该元素的位置）
		   contentArray[i].style.left=contentArray[minHeightElementIndex].offsetLeft+"px";
		   //重置元素高度数组中的最小值
		   elementHeightArray[minHeightElementIndex]=elementHeightArray[minHeightElementIndex]+contentArray[i].offsetHeight;
		}
	}
}

//获取高度最小的元素的位置
function getElementMinHeigthIndex(elementHeightArray,minHeight){
	for(var i in elementHeightArray){
	  if(elementHeightArray[i]==minHeight){
		 return i;  
	  }	
	}
}

//获取容器中className为box的元素且将其推入数组，把数组返回
function getChildElement(containerObj,contentClassName){
	//数组，存放container中className为box的元素
    var contentArray=[];
	//获取容器：container下所有元素
	var allContent =containerObj.getElementsByTagName("div");
	//遍历所有元素
	for(var i=0;i<allContent.length;i++){
	   //把className为box的元素依次推入数组contentArray的尾部
	   if(allContent[i].className==contentClassName){
		   contentArray.push(allContent[i]);
	   }	
	}
	//返回数组
	return contentArray;
}
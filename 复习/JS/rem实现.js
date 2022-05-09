
从上文可以知道，rem单位是以html的font-size作为基准实现页面尺寸布局的，那么这样子，如果根节点的font-size我们一直写死37.5px的话，页面的自适应便无法实现了。
为了达到不同的设备宽度对应不同的font-size样式，需要一个js文件，让它实时监听窗口的尺寸变化，从而改变font-size的值：
新建rem.js文件
var calcRem = function () {
	function resetFontSize() {
		var maxSize = 640;
		var screenSize = document.documentElement.clientWidth;
		screenSize = screenSize > maxSize ? maxSize : screenSize;
		// 前页面宽度相对于 320 宽的缩放比例，可根据自己需要修改。
		var basicFontSize = (screenSize / 320) * 16;
		document.getElementsByTagName("html")[0].style.fontSize =
			basicFontSize.toFixed(2) + "px";
	}
	resetFontSize();
	window.addEventListener("resize", resetFontSize, false);
	window.addEventListener("orientationchange", resetFontSize, false);
};
// 1 rem 对应 100px 一般都是2x图 750px 
fontSize = clientWidth / 7.5

// 1vw = 1% clientWidth  375 px / 100 vw = 3.75 的比率

const pxTovw = ($px, n= 2) => {
	let px = $px / n;
	px = px / 375;
	px = parseFloat(px.toFixed(3)) * 100;
	return `${px}vw`;
};

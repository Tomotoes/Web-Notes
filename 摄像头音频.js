/*【判断当前浏览器是否支持摄像头】*/
navigator.getUserMedia = navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia;

if(navigator.getUserMedia) {
	// 支持
} else {
	// 不支持
}

/*【语法】*/
/*getUserMedia方法接受三个参数。*/

navigator.getUserMedia({
	video: true,
	audio: true
}, onSuccess, onError);
/*
getUserMedia的第一个参数是一个对象， 表示要获取哪些多媒体设备， 上面的代码表示获取摄像头和麦克风;
onSuccess是一个回调函数， 在获取多媒体设备成功时调用； onError也是一个回调函数， 在取多媒体设备失败时调用。
*/


/*【例子】*/
var constraints = {
	video: true
};

function onSuccess(stream) {
	var video = document.querySelector("video");
	video.src = window.URL.createObjectURL(stream);
}

function onError(error) {
	console.log("navigator.getUserMedia error: ", error);
}

navigator.getUserMedia(constraints, onSuccess, onError);

/*
onError回调函数接受一个Error对象作为参数。Error对象的code属性有如下取值，说明错误的类型。

PERMISSION_DENIED：用户拒绝提供信息。
NOT_SUPPORTED_ERROR：浏览器不支持硬件设备。
MANDATORY_UNSATISFIED_ERROR：无法发现指定的硬件设备。
*/


/*【截屏】*/
/*
获取摄像头的主要用途之一，是让用户使用摄影头为自己拍照。
Canvas API有一个ctx.drawImage(video, 0, 0)方法，可以将视频的一个帧转为canvas元素。
这使得截屏变得非常容易。
*/

<video autoplay></video>
<img src="">
<canvas style="display:none;"></canvas>

<script>
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var localMediaStream = null;

  function snapshot() {
    if (localMediaStream) {
      ctx.drawImage(video, 0, 0);
      // “image/webp”对Chrome有效，
      // 其他浏览器自动降为image/png
      document.querySelector('img').src = canvas.toDataURL('image/webp');
    }
  }

  video.addEventListener('click', snapshot, false);

  navigator.getUserMedia({video: true}, function(stream) {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
  }, errorCallback);
</script>



范例：捕获麦克风声音
通过浏览器捕获声音，需要借助Web Audio API。


window.AudioContext = window.AudioContext ||
                      window.webkitAudioContext;

var context = new AudioContext();

function onSuccess(stream) {
	var audioInput = context.createMediaStreamSource(stream);
	audioInput.connect(context.destination);
}

navigator.getUserMedia({audio:true}, onSuccess);



捕获的限定条件
getUserMedia方法的第一个参数，除了指定捕获对象之外，还可以指定一些限制条件，比如限定只能录制高清（或者VGA标准）的视频。


var hdConstraints = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    }
  }
};

navigator.getUserMedia(hdConstraints, onSuccess, onError);

var vgaConstraints = {
  video: {
    mandatory: {
      maxWidth: 640,
      maxHeight: 360
    }
  }
};

navigator.getUserMedia(vgaConstraints, onSuccess, onError);

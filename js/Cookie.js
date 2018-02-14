function setCookie(key, value, date) {
	let oDate = new Date();
	oDate.setDate(oDate.getDate() + date);
	document.cookie = key + '=' + value + ';expires=' + oDate;
}

function getCookie(Key) {
	let Cookies = document.cookie.split(';');
	for(let i = 0; i < Cookies.length; ++i) {
		let Data = Cookies[i].split('=');
		if(Data[0] == Key) {
			return Data[1];
		}
	}
	return '';
}

function removeCookie(Key) {
	setCookie(Key, null, -1);
}

function Ajax(Url, Success, Fail) {
	if(window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest();
	} else {
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}

	oAjax.open('POST', Url + '?t=' + new Date().getTime(), true);

	oAjax.send();

	oAjax.onreadystatechange = function() {

		if(oAjax.readyState === 4) {

			if(oAjax.status === 200) {
				Success(oAjax.responseText);
			} else {
				Fail(oAjax.statusText);
			}
		}
	}
}
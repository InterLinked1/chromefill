chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		for (var i = 0; i < details.requestHeaders.length; ++i) {
			if (details.requestHeaders[i].name !== 'User-Agent') {
				continue;
			}
			var current_agent = details.requestHeaders[i].value;
			var chromeVersion = /Chrome\/([0-9.]+)/.exec(current_agent)[1];
			// Slack idiotically blocks old user agents for no reason, stick it to em by giving them something they can't refuse
			if (details.url.indexOf("slack.com") !== -1) { // document.domain isn't set, use details.url instead
				var chromeVersion = /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1];
				current_agent = current_agent.replace(chromeVersion, '150.0'); // bump the Chromium version to 150 (watcha gonna do Slack, block us for being too new??)
			}
			// medium.com / Cloudflare idiotically block user agents with the word "Iron" in them...
			// ditto for Slack
			// so make SRWare Iron look like regular Chrome
			if (current_agent.indexOf(' Iron ') != -1) {
				var new_agent = current_agent.replace(' Iron', '');
				details.requestHeaders[i].value = new_agent;
			}
			break;
		}
		return {requestHeaders: details.requestHeaders};
	}, {urls: ['<all_urls>']}, ['blocking', 'requestHeaders']);

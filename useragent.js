// medium.com / Cloudflare idiotically block user agents with the word "Iron" in them...
// so make SRWare Iron look like regular Chrome
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
				var current_agent = details.requestHeaders[i].value;
				if (current_agent.includes(' Iron ')) {
					var new_agent = current_agent.replace(' Iron', '');
					details.requestHeaders[i].value = new_agent;
				}
                break;
            }
        }
        return {requestHeaders: details.requestHeaders};
    }, {urls: ['<all_urls>']}, ['blocking', 'requestHeaders']);

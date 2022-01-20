// https://mathiasbynens.be/notes/globalthis
var actualCode = `
(function() {
	if (typeof globalThis === 'object') return;
	Object.defineProperty(Object.prototype, '__magic__', {
		get: function() {
			return this;
		},
		configurable: true
	});
	__magic__.globalThis = __magic__;
	delete Object.prototype.__magic__;
}());
`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();

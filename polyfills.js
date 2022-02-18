// globalThis: https://mathiasbynens.be/notes/globalthis
// fromEntries: https://stackoverflow.com/a/68655198/
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

function fromEntries(entries){
    var res = {};
    for(var i = 0; i < entries.length; i++) res[entries[i][0]] = entries[i][1];
    return res;
}
if(!Object.fromEntries) Object.fromEntries = fromEntries;

`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();

// globalThis: https://mathiasbynens.be/notes/globalthis
// fromEntries: https://stackoverflow.com/a/68655198/
// queueMicroTask: https://stackoverflow.com/a/61605098/
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



(function() {
'use strict';

// lazy get globalThis, there might be better ways
const globalObj = typeof globalThis === "object" ? globalThis :
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === 'object' ? self :
  Function('return this')();

if (typeof queueMicrotask !== "function") {

  const checkIsCallable = (callback) => {
    if( typeof callback !== 'function' ) {
      throw new TypeError( "Failed to execute 'queueMicrotask': the callback provided as parameter 1 is not a function" );
    }  
  };

  if( typeof Promise === "function" && typeof Promise.resolve === "function" ) {
    globalObj.queueMicrotask = (callback) => {
      checkIsCallable( callback );
      Promise.resolve()
        .then( () => callback() ) // call with no arguments
        // if any error occurs during callback execution,
        // throw it back to globalObj (using setTimeout to get out of Promise chain)
        .catch( (err) => setTimeout( () => { throw err; } ) );
   };
  }
  else if( typeof MutationObserver === 'function' ) {
    globalObj.queueMicrotask = (callback) => {
      checkIsCallable( callback );
      const observer = new MutationObserver( function() {
        callback();
        observer.disconnect();
      } );
      const target = document.createElement( 'div' );
      observer.observe( target, { attributes: true } );
      target.setAttribute( 'data-foo', '');
    };
  }
  else if( typeof process === "object" && typeof process.nextTick === "function" ) {
    globalObj.queueMicrotask = (callback) => {
      checkIsCallable( callback );
      process.nextTick( callback );
    };
  }
  else {
    globalObj.queueMicrotask = (callback) => {
      checkIsCallable( callback );
      setTimeout( callback, 0 );
    }
  }
}
})();

`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();

var actualCode = `
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
// implemented in Chrome 71
// https://mathiasbynens.be/notes/globalthis
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
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
// implemented in Chrome 73
// https://stackoverflow.com/a/68655198
// https://gitlab.com/moongoal/js-polyfill-object.fromentries/-/blob/master/index.js
// -> https://vanillajstoolkit.com/polyfills/objectfromentries/
if (!Object.fromEntries) {
	Object.fromEntries = function (entries) {
		if (!entries || !entries[Symbol.iterator]) { 
      throw new Error('Object.fromEntries() requires a single iterable argument');
    }
		let obj = {};
		for (let [key, value] of entries) {
			obj[key] = value;
		}
		return obj;
	};
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
// implemented in Chrome 85 
// https://github.com/ungap/promise-any
// copied from github-wc-polyfill
if (!('any' in Promise && typeof Promise.any == 'function')) Promise.any = function($) {
  return new Promise(function(D, E, A, L) {
    A = [];
    L = $.map(function($, i) {
      return Promise.resolve($).then(D, function(O) {
        return ((A[i] = O), --L) || E({
          errors: A
        });
      });
    }).length;
  });
};
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
// implemented in Chrome 76
// https://95yashsharma.medium.com/polyfill-for-promise-allsettled-965f9f2a003
if (!('allSettled' in Promise && typeof Promise.allSettled == 'function')) Promise.allSettled = function (promises) {
  let mappedPromises = promises.map((p) => {
    return p
      .then((value) => {
        return {
          status: 'fulfilled',
          value,
        };
      })
      .catch((reason) => {
        return {
          status: 'rejected',
          reason,
        };
      });
  });
  return Promise.all(mappedPromises);
};
// https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask
// implemented in Chrome 71
// https://stackoverflow.com/a/61569775
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
    if (typeof callback !== "function") {
      throw new TypeError("Failed to execute 'queueMicrotask': the callback provided as parameter 1 is not a function");
    }  
  };

  if (typeof Promise === "function" && typeof Promise.resolve === "function") {
    globalObj.queueMicrotask = (callback) => {
      checkIsCallable(callback);
      Promise.resolve()
        .then(() => callback()) // call with no arguments
        // if any error occurs during callback execution,
        // throw it back to globalObj (using setTimeout to get out of Promise chain)
        .catch((err) => setTimeout(() => {throw err;}));
   };
  }
  else if (typeof MutationObserver === "function") {
    globalObj.queueMicrotask = (callback) => {
      checkIsCallable(callback);
      const observer = new MutationObserver(function() {
        callback();
        observer.disconnect();
      });
      const target = document.createElement('div');
      observer.observe(target, {attributes: true});
      target.setAttribute('data-foo', '');
    };
  }
  else if (typeof process === "object" && typeof process.nextTick === "function") {
    globalObj.queueMicrotask = (callback) => {
      checkIsCallable(callback);
      process.nextTick(callback);
    };
  }
  else {
    globalObj.queueMicrotask = (callback) => {
      checkIsCallable(callback);
      setTimeout(callback, 0);
    }
  }
}
})();

queueMicrotask(() => console.log('microtask'));
console.log('sync');
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
// implemented in Chrome 85
// https://vanillajstoolkit.com/polyfills/stringreplaceall/
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(str, newStr) {
    // If a regex pattern
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr);
    }
    // If a string
    return this.replace(new RegExp(str, 'g'), newStr);
  };
};
// https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/replaceChildren
// implemented in Chrome 86
// https://github.com/XboxYan/dom-polyfill
// copied from github-wc-polyfill
(function() {
  if (Element.prototype.replaceChildren === undefined) {
    Element.prototype.replaceChildren = function(...nodesOrDOMStrings) {
      while (this.lastChild) {
        this.removeChild(this.lastChild)
      }
      if (nodesOrDOMStrings.length) {
        this.append(...nodesOrDOMStrings)
      }
    }
  }
}());
`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat
// implemented in Chrome 71
var intlocscript = document.createElement('script');
intlocscript.src= 'https://polyfill.io/v3/polyfill.min.js?features=Intl.RelativeTimeFormat,Intl.RelativeTimeFormat.~locale.en';
(document.head||document.documentElement).appendChild(intlocscript);

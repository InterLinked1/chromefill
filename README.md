# ChromeFill

Automatically injects polyfills for old Chromium into webpages

### Note for (very) old versions of Chromium

This extension will no longer work well for *very* old versions of Chromium (released prior to 2020). This is because, as of 2023, a large majority of sites are now using functionality that can no longer be polyfilled in old versions of Chromium (see nullish coalescing and optional chaining section, below), and there is no way such functionality can be polyfilled.

This extension is thus severely degraded in the Chromium version it was initially written to target (Chromium 70), but may still allow slightly newer browsers (e.g. Chromium 109) to function.

## Background

Many users of non-recent Chromium and Firefox browsers noticed in Q4 of 2021 that a lot of websites suddenly stopped working, partially (and in rare cases, completely), within a few weeks of each other. This was due to the adoption of newer JavaScript standards, many bleeding-edge or vendor-specific, and highly-compatible standards-based JavaScript was replaced with this newer code that caused sites to malfunction in older (in the case of Chromium) and other (in the case of non-Chromium and Firefox) browsers. This meant that sites which *used* to work perfectly fine in these browsers no longer did.

The problem is not that these browsers aren't capable of running these sites properly - they did, just fine, for a long time. Rather, highly compatible JavaScript code was replaced with less compatible JavaScript, which basically killed off support for the majority of browsers overnight. As many libraries included these changes in their code, this "mass breakage" of the World Wide Web occured within a few weeks of each other.

This hardly went unnoticed - many retrocomputers and computer enthusiasts on the MSFN Forums decried the breakages. The problem turn out to *not* just affect old versions of Chromium. Pale Moon, for instance, is also affected, as are most "alternative" browsers that don't toe the Chromium and Firefox line. Thus, these changes have seriously threatened the open and standards-based foundations of the World Wide Web.

For more information, see: <https://blog.interlinked.us/66/when-the-world-wide-web-goes-on-strike-how-do-you-fight-back>

## What Does This Extension Do?

Polyfills are designed to address just this problem. Polyfills are JavaScript "hacks" that add support for a JavaScript feature which isn't natively supported by the browser.

The ChromeFill extension dynamically injects polyfills into webpages before they load in order to add support for JavaScript that wasn't supported when the browser was released. By adding the extension, the polyfills are injected on every page you visit, automatically adding support for these newer browser features so that sites which use this newer JavaScript are better supported.

## Browser Support

This is intended for use with older versions of Chromium-based browsers (Chrome, Iron, etc.). If you are using a recent or supported version of Chrome, you do not need this extension.

## How To Install

This isn't available in the Chrome Web Store, but it's as easy as 1-2-3 to install it:

1. Navigate to chrome://extensions/ in your browser

2. Toggle "Developer Mode" to on.

3. Click "Load Unpackaged" and upload the unzipped [download](https://github.com/InterLinked1/chromefill/archive/refs/heads/master.zip) of this repository.

That's it! Sites that no longer work properly in older versions of Chromium (such as StackOverflow, for instance) that can benefit from ChromeFill will now do so. No manual action on sites is needed.

## Specific Polyfills

- [globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis), which provides `this` in global scope. This was only added to Chromium in version 71.
- [fromEntries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries), which was only added to Chromium in version 73
- [queueMicroTask](https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask), which was only added to Chromium in version 71.
- [Promise.any](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any), which was only added to Chromium in version 85.
- [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled), which was only added to Chromium in version 76.
- [String.replaceAll](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll), which was only added to Chromium in version 85.
- [replaceChildren](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren), which was only added to Chromium in version 86.
- [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat), which was only added to Chromium in version 71.
- [String.matchAll](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll), which was only added to Chromium in version 73 (version 69 with optional flag enabled).
- [Array.toReversed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed), which was only added to Chromium in version 110.
- [Array.toSpliced](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced), which was only added to Chromium in version 110.
- [Array.with](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with), which was only added to Chromium in version 110.

More polyfills may be added over time to expand compatability, especially as breakage continues to increase. Contributions to add more polyfills are welcome.

## Other Fixes
Medium.com sites erroneously block certain user agents, in particular user agents with the word "Iron" in them. This extension removes the word Iron from any offending user agents so that medium.com sites work.

## Sites Known To Have Breakage Fixed By This Extension*
- **GitHub** (globalThis) - currently partially broken again due to nullish coalescing and optional chaining (see below)
- **StackExchange** (globalThis)
- **Canvas** (globalThis)
- **Discord** (fromEntries)
- **Discourse** (queueMicroTask)
- **Rockstar Social Club** (Intl.RelativeTimeFormat)
- **Spotify** (Intl.RelativeTimeFormat)
- **Medium**, **Slack** (user agent blocking)

\* Some breakage historically has been fixed, but new breakage may well have later been introduced that remains unaddressed.

## Nullish Coalescing and Optional Chaining

[Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) and [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) are the two villains at large today, completely unsupported by UXP and Chromium < 80. These operators likely can't be polyfilled, and will need to be transpiled on the fly. This is a known issue that will need to be addressed to unbreak a growing amount of the breakage that exists on the web today.

If you encounter either of these operators on a website, you should complain to the webmaster or file a support ticket. Because these can't be polyfilled, the use of these operators forms a serious accessibility barrier for browsers and they should be avoided in all web development.

## Will the extension be upgraded to Manifest V3?

No, because that wouldn't make any sense.

Manifest V3 is the [most recent version of manifests for extensions](https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/). As of January 2022, new public and unlisted Manifest V2 extensions can no longer be published in the Chrome Web Store, and they'll essentially be deprecated throughout 2022. However, [Manifest V3 only supports Chromium 88+](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/), so it would be pointless to use the newer manifest type for this extension. This extension is specifically targeted at older versions of Chromium, so the older manifest must be used.

This extension will be available open-source for the public and will not be published in the Chrome Web Store, since that is moving to Manifest V3 exclusively, which would preclude support for Chrome 87 and earlier. You can always install it manually in Chrome by enabling Developer Mode for extensions.

## Doesn't this promote the usage of outdated/obsolete browsers?

Nobody's telling you to use an outdated browser or to use this extension. Fundamentally, however, we believe in browser choice (as well as operating system choice). Chromium version 70 (released Oct. 2018) is the last version of Chromium that allows use of the old UI (naturally, `globalThis` was added in Chromium 71). However, some people do not like the new UI and prefer to the use the older one. We believe that individuals who assume the relevant risks have the right to use the software they wish, and the reality is some people are going to use these older browsers, whether Google wants them to or not. This project specifically aims to bridge this gap in support for older Chromium browsers. This project assumes no liability for security issues arising from use of an older browser version.

With that, happy browsing!

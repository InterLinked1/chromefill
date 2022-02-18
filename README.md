# ChromeFill

Automatically injects polyfills for old Chromium into webpages

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

More polyfills may be added over time to expand compatability, especially as breakage continues to increase. Contributions to add more polyfills are welcome.

## Sites Known To Have Breakage Fixed By This Extension
- **StackExchange** (globalThis)
- **Canvas** (globalThis)
- **Discord** (fromEntries)

## Will the extension be upgraded to Manifest V3?

No, because that wouldn't make any sense.

Manifest V3 is the [most recent version of manifests for extensions](https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/). As of January 2022, new public and unlisted Manifest V2 extensions can no longer be published in the Chrome Web Store, and they'll essentially be deprecated throughout 2022. However, [Manifest V3 only supports Chromium 88+](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/), so it would be pointless to use the newer manifest type for this extension. This extension is specifically targeted at older versions of Chromium, so the older manifest must be used.

This extension will be available open-source for the public and will not be published in the Chrome Web Store, since that is moving to Manifest V3 exclusively, which would preclude support for Chrome 87 and earlier. You can always install it manually in Chrome by enabling Developer Mode for extensions.

## Doesn't this promote the usage of outdated/obsolete browsers?

Nobody's telling you to use an outdated browser or to use this extension. Fundamentally, however, we believe in browser choice (as well as operating system choice). Chromium version 70 (released Oct. 2018) is the last version of Chromium that allows use of the old UI (naturally, `globalThis` was added in Chromium 71). However, some people do not like the new UI and prefer to the use the older one. We believe that individuals who assume the relevant risks have the right to use the software they wish, and the reality is some people are going to use these older browsers, whether Google wants them to or not. This project specifically aims to bridge this gap in support for older Chromium browsers. This project assumes no liability for security issues arising from use of an older browser version.

With that, happy browsing!

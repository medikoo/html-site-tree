# html-site-tree
##  HTML based [SiteTree](https://github.com/medikoo/site-tree)

`HtmlSiteTree` allows configuration of SiteTree's with plain HTML. Additionaly HTML templates can be enriched with dynamic data insterted using [ES6 template strings](https://hacks.mozilla.org/2015/05/es6-in-depth-template-strings-2/) format, which is resolved by [html-template-to-dom](https://github.com/medikoo/html-template-to-dom#html-template-to-dom) utility

##### Basic example:

Let's say we have following HTML files:

_head.html_
```html
<link rel="icon" href="/favicon.png" />
<link rel="stylesheet" href="/style.css" />
```

_body.html_
```html
<header>
  <nav><ul>
    <li><a href="/">Main page</a></li>
  </ul></nav>
</header>
<main>
  <!-- To be filled by extension views -->
</main>
<footer><p>© footer example</p></footer>
```

_homepage.html_
```html
<h1>Homepage of ${ websiteTitle }</h1>
<p>Homepage content ...</p>
```

_subpage.html_
```html
<h1>Subpage of ${ websiteTitle }</h1>
<p>Subpage content ...</p>
```

SiteTree configuration for them may look as:

```javascript
var HtmlSiteTree = require('html-site-tree');

// Initialize SiteTree instance:
var siteTree = new HtmlSiteTree(document, { websiteTitle: "SiteTree demo" });

// Configure view nodes:
// Root node
var baseView = {
  title: "SiteTree test page",
	head: require('./head'), // assure that your CJS bundler allows require of HTML files
	body: require('./body')
};

// Homepage node
var homepageView = {
	_parent: baseView,
  main: require('./homepage')
};

// Subpage node
var subpageView = {
	_parent: baseView,
  main: require('subpage')
};

// Switch between views in document:
// Present homepage
siteTree.load(homepageView);

// Switch to subpage
siteTree.load(subpageView);

// Switch back to homepage
siteTree.load(homepageView)
```

### Installation

	$ npm install html-site-tree

### API

#### new HtmlSiteTree(document, inserts)

```javascript
var HtmlSiteTree = require('html-site-tree');
var siteTree = new HtmlSiteTree(document, {
	... // inserts map
});
```

On initialization _HTMLDocument_ instance needs to be provided, and map for inserts used in HTML markup.
Inserts are resolved with [html-template-to-dom](https://github.com/medikoo/html-template-to-dom#html-template-to-dom) utility, refer to its documentation for more details

#### Templates format

Only HTML string (enriched with eventual ES6 template literal inserts) is allowed

For detailed documentation of configuration of SiteTree, please refer to [SiteTree documentation](https://github.com/medikoo/site-tree#configuration-of-view-nodes)

## Tests [![Build Status](https://travis-ci.org/medikoo/html-site-tree.svg)](https://travis-ci.org/medikoo/html-site-tree)

	$ npm test

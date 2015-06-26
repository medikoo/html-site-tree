'use strict';

var normalizeOptions    = require('es5-ext/object/normalize-options')
  , setPrototypeOf      = require('es5-ext/object/set-prototype-of')
  , ensureObject        = require('es5-ext/object/valid-object')
  , ensureStringifiable = require('es5-ext/object/validate-stringifiable-value')
  , d                   = require('d')
  , htmlToDom           = require('html-template-to-dom')
  , SiteTree            = require('site-tree')

  , defineProperties = Object.defineProperties;

var HtmlSiteTree = defineProperties(setPrototypeOf(function (document, inserts/*, options*/) {
	var options;
	if (!(this instanceof HtmlSiteTree)) return new HtmlSiteTree(document, inserts, arguments[3]);
	options = Object(arguments[3]);
	SiteTree.call(this, document);
	defineProperties(this, {
		inserts: d(ensureObject(inserts)),
		reEvaluateScriptsOptions: d(options.reEvaluateScripts)
	});
}, SiteTree), {
	ensureTemplate: d(ensureStringifiable)
});

HtmlSiteTree.prototype = Object.create(SiteTree.prototype, {
	constructor: d(HtmlSiteTree),
	_resolveTemplate: d(function (tpl, context) {
		return htmlToDom(this.document, tpl, normalizeOptions(this.inserts, context),
			{ reEvaluateScripts: this.reEvaluateScriptsOptions });
	})
});

module.exports = HtmlSiteTree;

'use strict';

var normalizeOptions    = require('es5-ext/object/normalize-options')
  , setPrototypeOf      = require('es5-ext/object/set-prototype-of')
  , ensureObject        = require('es5-ext/object/valid-object')
  , ensureStringifiable = require('es5-ext/object/validate-stringifiable-value')
  , d                   = require('d')
  , htmlToDom           = require('html-template-to-dom')
  , SiteTree            = require('site-tree')

  , defineProperty = Object.defineProperty, defineProperties = Object.defineProperties;

var HtmlTemplateSiteTree = defineProperties(setPrototypeOf(function (document, inserts) {
	if (!(this instanceof HtmlTemplateSiteTree)) return new HtmlTemplateSiteTree(document, inserts);
	SiteTree.call(this, document);
	defineProperty(this, 'inserts', d(ensureObject(inserts)));
}, SiteTree), {
	ensureTemplate: d(ensureStringifiable)
});

HtmlTemplateSiteTree.prototype = Object.create(SiteTree.prototype, {
	constructor: d(HtmlTemplateSiteTree),
	resolveTemplate: d(function (tpl, context) {
		return htmlToDom(this.document, tpl, normalizeOptions(this.inserts, context));
	})
});

module.exports = HtmlTemplateSiteTree;

'use strict';

var toArray = require('es5-ext/array/to-array');

module.exports = function (T, a) {
	var tree = new T(document, {})
	  , header, content, foo, bar, context = {}, partialContent = {}, conf;

	var rootPage = {
		_name: 'root',
		body: '<div id="header">Header</div>' +
			'<div id="content">' +
			'<div id="foo">' +
			'<p>foo</p>' +
			'<p>bar</p></div>' +
			'<div><div id="bar">,' +
			'<p>Other foo</p>' +
			'<p>Other bar</p></div></div></div>' +
			'<div id="partial-content"> melon </div>'
	};

	var page1 = {
		_name: 'page1',
		_parent: rootPage,
		foo: '<span>foo 1 </span>' +
			'<span>foo 2</span>',
		bar: '<span>bar 1 </span>' +
			'<span>bar 2</span>',
		'partial-content': {
			class: { active: true },
			prepend: '<span>prepended 1 </span>' +
				'<span>prepended 2</span>',
			append: '<span>appended 1 </span>' +
				'<span>appended 2</span>'
		}
	};

	tree.load(page1, context);
	header = document.getElementById('header');
	content = document.getElementById('content');
	foo = document.getElementById('foo');
	bar = document.getElementById('bar');
	partialContent = document.getElementById('partial-content');

	a(foo.textContent, 'foo 1 foo 2', "Replace content #1");
	a(bar.textContent, 'bar 1 bar 2', "Replace content #2");
	a(partialContent.className, 'active', "Classname");
	a(partialContent.textContent, 'prepended 1 prepended 2 melon appended 1 appended 2',
		"Append/Prepend");

	tree.load(rootPage, context);
	a.deep(toArray(document.body.childNodes), [header, content, partialContent], "Reload home #1");
	a.deep(toArray(content.childNodes), [foo, bar.parentNode], "Reload home #2");
	a(partialContent.className, '');
	a(partialContent.textContent, ' melon ', "Append/Prepend");

	tree.load(page1, context);
	a(foo.textContent, 'foo 1 foo 2', "Replace content #1");
	a(bar.textContent, 'bar 1 bar 2', "Replace content #2");
	a(partialContent.className, 'active', "Classname");
	a(partialContent.textContent, 'prepended 1 prepended 2 melon appended 1 appended 2',
		"Append/Prepend");
};

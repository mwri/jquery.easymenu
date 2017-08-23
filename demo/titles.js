let menu = $('<table/>');

let menu_items = [

	{ label: 'Option 1',
		title: 'all about option 1',
		callback: function () { alert('simple menu option 1'); } },

	{ label: 'Option 2',
		title: 'all about option 2',
		callback: function () { alert('simple menu option 2'); } },

	{ label: 'Option 3',
		title: 'all about option 3',
		callback: function () { alert('simple menu option 3'); } },

];

menu.easymenu({
	menu_items: menu_items,
});

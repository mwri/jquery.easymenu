let menu = $('<table/>');

let menu_items = [

	{ type: 'header', label: 'Header:' },

	{ label: 'Option 1',
		callback: function () { alert('simple menu option 1'); } },

	{ label: 'Option 2',
		callback: function () { alert('simple menu option 2'); } },

	{ type: 'separator' },

	{ label: 'Option 3',
		callback: function () { alert('simple menu option 3'); } },

];

menu.easymenu({
	menu_items: menu_items,
});

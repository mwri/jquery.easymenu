let menu = $('<table/>');

let menu_items = [

	{ label: 'Option 1',
		callback: function () { alert('simple menu option 1'); } },

	{ type: 'block',
		label: '<span style="margin: 0.5em; border: 1px dotted red; background: yellow;">Surprise!</span>',
		callback: function () { alert('simple menu option 2'); } },

	{ label: 'Option 3',
		callback: function () { alert('simple menu option 3'); } },

];

menu.easymenu({
	menu_items: menu_items,
});

let menu = $('<table/>');

let menu_items = [

	{ label: 'Facebook',
		icon: { file: 'facebook.jpg' },
		callback: function () { alert('Go Facebook'); } },

	{ label: 'Twitter',
		icon: { file: 'twitter.jpg' },
		callback: function () { alert('Go Twitter'); } },

	{ label: 'Google +',
		icon: { file: 'gplus.jpg' },
		callback: function () { alert('Go Google'); } },

];

menu.easymenu({
	menu_items: menu_items,
});

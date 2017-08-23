let menu = $('<table/>');

let menu_items = [

	{ label: 'Picture/image',
		icon: { class: 'fa fa-picture-o' },
		callback: function () { alert('Picture/image'); } },

	{ label: 'Bar chart',
		icon: { class: 'fa fa-bar-chart' },
		callback: function () { alert('Bar chart'); } },

	{ type: 'separator' },

	{ label: 'Open folder',
		icon: { class: 'fa fa-folder-open' },
		callback: function () { alert('Open folder'); } },

];

menu.easymenu({
	menu_items: menu_items,
});

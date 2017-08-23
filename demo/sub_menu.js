let menu = $('<table/>');

let menu_items = [

	{ label: 'Facebook',
		icon: { file: 'facebook.jpg' },
		callback: function () { alert('Go Facebook'); },
		},

	{ label: 'Twitter',
		icon: { file: 'twitter.jpg' },
		callback: function () { alert('Go Twitter'); },
		},

	{ label: 'Google +',
		icon: { file: 'gplus.jpg' },
		sub_menu: {
			menu_items: [
				{ label: 'Like',
					icon: { file: 'like.png' },
					callback: function () { alert('Like'); },
					},
				{ label: 'Hate',
					icon: { file: 'hate.png' },
					callback: function () { alert('Hate'); },
					},
				],
			},
		},

];

menu.easymenu({
	menu_items: menu_items,
});

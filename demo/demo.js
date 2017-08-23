$(document).ready(function () {

	let demos = [
		{
			descr: 'Simple menu with three options and callbacks. Right click anywhere in the coloured box to access the menu, and click on the options for an alert dialogue.',
			code:  'simple.js',
		}, {
			descr: 'Add a separator to the simple menu.',
			code:  'simple_sep.js',
		}, {
			descr: 'Add a header to the simple menu. You could do this by adding classes to build up a menu field like this, but this is a short cut.',
			code:  'simple_hdr.js',
		}, {
			descr: 'Add icons to a menu by incorporating images. Any sized image can be used, but sizes that do not match the text obviously look a bit wrong. These images are 20x20.',
			code:  'col_icons.js',
		}, {
			descr: 'Add icons by way of classes (font awesome used here).',
			code:  'fa_icons.js',
		}, {
			descr: 'A menu \'row\' can be turned into a dump block, and label will become the block content.',
			code:  'block.js',
		}, {
			descr: 'The colour icon menu with a sub menu added. The \'sub_menu\' option is just like \'menu_items\' and the structure can be recursed as many times as required.',
			code:  'sub_menu.js',
		}, {
			descr: 'Add hover descriptions to the menu options with \'title\'. Get the menu and hover over the options.',
			code:  'titles.js',
		}, {
			descr:   'Attaching can be with a different event (the dafault is \'contextmenu\'). Here \'click\' is specified instead. Left click to get the menu.',
			code:    'simple.js',
			ev_name: 'click',
		},
	];

	let demo_cols = [
		'#ffcccc', '#ffd9cc', '#ffe6cc', '#fff2cc', '#ffffcc',
		'#f2ffcc', '#e6ffcc', '#d9ffcc', '#ccffcc', '#ccffd9',
		'#ccffe6', '#ccfff2', '#ccffff', '#ccf2ff', '#cce6ff',
		'#ccd9ff', '#ccccff', '#d9ccff', '#e6ccff', '#f2ccff',
		'#ffccff', '#ffccf2', '#ffcce6', '#ffccd9', '#ffcccc',
	];

	for (let i = 0; i < demos.length; i++) {

		let demo = demos[i];
		let target = $('<div class="em_demo_target"/>');
		target.html(demo.descr);
		target.css({background:demo_cols.pop()});
		$('#targets_wrapper').append(target);
	
		let http_req = new XMLHttpRequest();
		http_req.addEventListener('load', function () {
			if (this.status === 200) {

				let ev_name = demo.ev_name || 'contextmenu';

				let code_box = $('<pre class="em_demo_code_box"/>');
				let js = this.responseText;
				js += 'return menu;'
				code_box.text(this.responseText+'\n\n$(\'body\').append(menu);\n\nmenu.easymenu(\'attach\', target' + (ev_name === 'contextmenu' ? '' : ', \''+ev_name+'\'') + ');');
				target.append(code_box);
				js_fun = new Function(js);
				let menu;
				try {
					menu = js_fun();
					$('body').append(menu);
					menu.easymenu('attach', target, ev_name);
				} catch (err) {
					console.log(err.stack);
					let err_box = $('<pre class="em_demo_error_box"/>');
					err_box.text('ERROR (example not working)\n\n'+err);
					target.append(err_box);
				}
			}
		});
		http_req.open("GET", demo.code);
		http_req.setRequestHeader('Cache-Control', 'no-cache');
		http_req.send();

	}

});

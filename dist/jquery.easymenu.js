// Package: jquery.easymenu v1.0.1 (built 2017-08-25 10:09:05)
// Copyright: (C) 2017 Michael Wright <mjw@methodanalysis.com>
// License: MIT


(function ($) {

	'use strict';


	$.fn.easymenu = function(first_arg) {

		if (typeof first_arg === 'string') {
			return jqp_method(this, arguments);
		} else if (typeof first_arg === 'object') {
			return jqp_method(this, ['constructor', first_arg]);
		} else {
			throw 'easymenu requires a string (method) or object (constructor) first parameter';
		}

	};


	function jqp_method(jqp_obj, args) {

		let method = args[0];

		if (method in methods) {
			args[0] = jQuery.data(jqp_obj, 'easymenu');
			return methods[method].apply(jqp_obj, args);
		}

		throw 'easymenu has no method "'+method+'"';

	}


	let methods = {

		constructor: function (data, params) {

			params = jQuery.extend(
				{ menu_items: [] },
				params
				);

			if (!('root' in params))
				params.root = this;

			this.addClass('easym_menu');
			this.hide();

			let tbody = $('<tbody></tbody>');
			this.append(tbody);

			let menu_items = params.menu_items;

			let has_icons = false;
			for (let i = 0; i < menu_items.length; i++)
				if ('icon' in menu_items[i])
					has_icons = true;

			let sub_menus = [];
			for (let i = 0; i < menu_items.length; i++) {
				let mi_params = menu_items[i];
				if ('sub_menu' in mi_params && mi_params.sub_menu.menu_items.length > 0) {
					let sub_menu = $('<table/>');
					$('body').append(sub_menu);
					let sub_menu_params = mi_params.sub_menu;
					sub_menu_params.root = params.root;
					sub_menu.easymenu(sub_menu_params);
					sub_menus.push(sub_menu);
					mi_params.sub_menu.menu_element = sub_menu;
				}
			}

			for (let i = 0; i < menu_items.length; i++) {

				let mi_params = jQuery.extend({
					classes: [],
					type: 'option',
					}, menu_items[i]);
				mi_params.classes.push('easym_item');

				if (mi_params.type === 'option') {

					mi_params.classes.push('easym_option');

					if (mi_params.callback !== undefined || mi_params.sub_menu !== undefined)
						mi_params.classes.push('easym_action');

					let tr = $('<tr class="'+mi_params.classes.join(' ')+'"/>');
					tbody.append(tr);

					if (has_icons) {
						let icon_td_html = '<td class="easym_icon';
						icon_td_html += '">';
						if (mi_params.icon && 'file' in mi_params.icon)
							icon_td_html += '<img src="'+mi_params.icon.file+'"/>';
						icon_td_html += '</td>';
						let td = $(icon_td_html);
						if (mi_params.icon && 'class' in mi_params.icon)
							td.append($('<span class="'+mi_params.icon.class+'"/>'));
						tr.append(td);
					}

					let label_td_html = has_icons ? '<td' : '<td colspan="2"';
					if (mi_params.title)
						label_td_html += ' title="'+mi_params.title+'"';
					label_td_html += ' class="easym_label">'+mi_params.label;
					if (mi_params.sub_menu !== undefined && mi_params.sub_menu.length !== 0)
						label_td_html += '<span class="easym_submenu_icon pull-right"/>';
					label_td_html += '</td>';

					let label_td = $(label_td_html);
					tr.append(label_td);

					if (mi_params.callback !== undefined) {
						tr.click(function (ev) { // jshint ignore:line
							$('#easym_background_click_capture').remove();
							recursive_hide(params.root);
							mi_params.callback(ev, this);
						});
					}

					if ('sub_menu' in mi_params && mi_params.sub_menu.menu_items.length > 0) {
						let sub_menu = mi_params.sub_menu.menu_element;
						tr.click(function (event) { // jshint ignore:line
							let sub_menu_pos = on_page_position({
								x: $(this).offset().left + $(this).width() + 1,
								y: $(tr).offset().top,
								}, sub_menu);
							for (let j = 0; j < sub_menus.length; j++)
								recursive_hide(sub_menus[j]);
							sub_menu.css({zIndex:10000, left: sub_menu_pos.x, top: sub_menu_pos.y});
							sub_menu.show();
						});
					}

				} else if (mi_params.type === 'header') {

					mi_params.classes.push('easym_header');

					let tr = $('<tr class="'+mi_params.classes.join(' ')+'"/>');
					tbody.append(tr);

					let cols = $('<td colspan="2">'+mi_params.label+'</td>');
					tr.append(cols);

				} else if (mi_params.type === 'block') {

					mi_params.classes.push('easym_block');

					let tr = $('<tr class="'+mi_params.classes.join(' ')+'"/>');
					tbody.append(tr);

					let cols = $('<td colspan="2">'+mi_params.label+'</td>');
					tr.append(cols);

				} else if (mi_params.type === 'separator') {

					mi_params.classes.push('easym_separator');

					let tr = $('<tr class="'+mi_params.classes.join(' ')+'"/>');
					tbody.append(tr);

					let cols = $('<td colspan="2"><hr/></td>');
					tr.append(cols);

				}

			}

			data = {
				menu_items: menu_items,
				sub_menus:  sub_menus,
				c: new Date(),
				};

			jQuery.data(this, 'easymenu', data);

			return this;

		},

		attach: function (data, target, event_name, show_cb) {

			if (event_name === undefined)
				event_name = 'contextmenu';

			let this_menu = this;
			target.on(event_name, function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
				let menu_pos = on_page_position({
					x: ev.pageX + 1,
					y: ev.pageY + 1,
					}, this_menu);
				jqp_method(this_menu, ['show', menu_pos.x, menu_pos.y]);
				if (show_cb !== undefined)
					show_cb(this_menu, target);
				return false;
			});

			return false;

		},


		show: function (data, x, y) {

			this.css({zIndex: 10000, left: x, top: y})
				.on('contextmenu', function() { return false; });

			if (this.shown)
				return false;

			this.show();

			let this_menu = this;

			let background = $('<div id="easym_background_click_capture"/>')
				.css({ position: 'fixed', top: 0, left: 0, width: $('body').width(), height: $('body').height() })
				.on('contextmenu click', function () {
					jqp_method(this_menu, ['hide']);
					return false;
				});
			$('body').append(background);

			this.shown = true;

			return false;

		},


		hide: function (data) {

			$('#easym_background_click_capture').remove();
			recursive_hide(this, data);

			return false;

		},

	};


	function recursive_hide (menu, data) {

		if (data === undefined)
			data = jQuery.data(menu, 'easymenu');

		menu.hide();
		menu.shown = false;

		let sub_menus = data.sub_menus;

		if (sub_menus === undefined)
			return;

		for (let i = 0; i < sub_menus.length; i++) {
			let sub_menu_data = jQuery.data(sub_menus[i], 'easymenu');
			recursive_hide(sub_menus[i], sub_menu_data);
		}

	}


	function on_page_position (pos, ele) {

		let window_extrude = $(window).width() - (pos.x - window.pageXOffset + ele.width());
		let window_eytrude = $(window).height() - (pos.y - window.pageYOffset + ele.height());

		if (window_extrude < 0)
			pos.x += window_extrude - 3;

		if (window_eytrude < 0)
			pos.y += window_eytrude - 3;

		return pos;

	}


} (jQuery));

/* HDForms Script
------------------------------------------------------------------ */

/* TODO:
 * add URL block
 * Allow toggle_value to be array split
------------------------------------------------------------------ */

const HDF = {
	init: async function (form, elements = []) {
		let id = form.getAttribute("id");
		console.log("HDForms init: " + id);
		// default settings
		let submit_text = window["hdf_submit_text_" + id.replace("hdf-", "")];

		const settings = {
			paginate: false, // converts heading 2 into pagination
			editors: [],
			data: {},
			message: true, // if we should show success/fail message on form submit
			labels: {
				submit: submit_text,
			},
			email: true,
			submit: [], // store any custom actions
			time: new Date().getTime(),
		};

		HDF.VARS[id] = settings;

		form.classList.add("hdf-form");
		form.innerHTML = await HDF.construct.item(elements, true, form);

		await HDF.construct.editors(form);
		HDF.construct.toggle(elements);

		// set item init events
		for (let i = 0; i < HDF.VARS.init.length; i++) {
			if (typeof HDF.events[HDF.VARS.init[i]] === "function") {
				HDF.events[HDF.VARS.init[i]](form);
			}
		}

		if (HDF.VARS[id].paginate) {
			HDF.paginate.init(form);
		}

		let form_id = id.replace("hdf-", "");
		let init_actions = window["hdf_actions_" + form_id];
		if (typeof init_actions != "undefined" && init_actions != null) {
			for (let i = 0; i < init_actions.length; i++) {
				if (init_actions[i].priority == "init") {
					if (typeof window[init_actions[i].action] === "function" || init_actions[i].action === "function") {
						await window[init_actions[i].action](form_id);
					}
				}
			}
		}
	},
	VARS: {
		init: ["submit", "radio", "checkbox", "upload"],
	},
	events: {
		submit: function (form) {
			let submit = form.getElementsByClassName("hdf-submit");
			for (let i = 0; i < submit.length; i++) {
				submit[i].addEventListener("click", async function () {
					if (this.classList.contains("hdf-disabled")) {
						return;
					}
					isValid = await HDF.validate.init(form, null, true);
					if (isValid) {
						// check time it took to complete the form
						let id = form.getAttribute("id");
						let t = new Date().getTime() - HDF.VARS[id].time;
						if (t >= 3500) {
							HDF.submit(form);
						} else {
							console.log("you are too quick... you are sus");
						}
					}
				});
			}
		},
		radio: function (form) {
			let radio = form.getElementsByClassName("hdf-radio-input");
			for (let i = 0; i < radio.length; i++) {
				radio[i].addEventListener("change", HDF.validate.radio);
			}
		},
		checkbox: function (form) {
			let checkbox = form.getElementsByClassName("hdf-checkbox-input");
			for (let i = 0; i < checkbox.length; i++) {
				checkbox[i].addEventListener("change", HDF.validate.checkbox);
			}
		},
		upload: function (form) {
			let id = form.getAttribute("id");
			let upload = form.getElementsByClassName("hdf-upload-input");
			let xhr = new XMLHttpRequest();
			for (let i = 0; i < upload.length; i++) {
				upload[i].addEventListener(
					"change",
					function (ev) {
						HDF.validate.upload(ev, id);
					},
					false
				);

				// dragndrop
				if (xhr.upload) {
					upload[i].nextSibling.nextSibling.addEventListener("dragover", HDF.uploads.dragHover, false);
					upload[i].nextSibling.nextSibling.addEventListener("dragleave", HDF.uploads.dragHover, false);
					upload[i].nextSibling.nextSibling.addEventListener(
						"drop",
						function (ev) {
							HDF.uploads.fileDropped(ev, upload[i]);
						},
						false
					);
				}
			}
		},
	},
	uploads: {
		dragHover: function (ev, el = null) {
			ev.stopPropagation();
			ev.preventDefault();
			if (ev.type === "dragover") {
				this.classList.add("hdf-upload-active");
			} else if (ev.type == "dragleave") {
				this.classList.remove("hdf-upload-active");
			} else {
				el.nextSibling.nextSibling.classList.remove("hdf-upload-active");
			}
		},
		fileDropped: function (ev, el) {
			ev.stopPropagation();
			ev.preventDefault();

			let files = ev.target.files || ev.dataTransfer.files;
			el.files = files;
			el.nextSibling.nextSibling.classList.remove("hdf-upload-active");

			// trigger the onChange. I smrt
			let evt = document.createEvent("Event");
			evt.initEvent("change", true, true);
			el.dispatchEvent(evt);
		},
	},
	construct: {
		item: async function (elements, submit = true, form) {
			let id = form.getAttribute("id");
			let d = elements;
			let html = "";

			for (let i = 0; i < d.length; i++) {
				let required = await HDF.construct.required(d[i]);
				if (required != "") {
					required = "true";
				} else {
					required = "false";
				}

				let toggable = await HDF.construct.toggable(d[i]);

				d[i].name = await HDF.construct.name(d[i], i); // make sure a unique name is used

				html +=
					`<div class="hdf-item hdf-item-${d[i].type} ${toggable}" data-id = "${d[i].name}" data-type = "${d[i].type}" data-required = "${required}">` +
					(await HDF.construct.label(d[i])) +
					(await HDF.construct.hint(d[i])) +
					(await HDF.construct.element(d[i], form)) +
					(await HDF.construct.notification(d[i])) +
					`</div>`;
			}

			if (submit) {
				if (HDF.VARS[id].message) {
					html += await HDF.construct.message();
				}
				html += await HDF.construct.submit(form);
			}

			return html;
		},
		element: async function (d, form) {
			// construct the input
			let html = "";
			if (typeof HDF.construct.elements[d.type] === "function") {
				if (typeof d.prefix != "undefined" && d.prefix != "") {
					html = '<div class = "hdf-prefix">';
					html += await HDF.construct.prefix(d);
					html += await HDF.construct.elements[d.type](d, form);
					html += "</div>";
				} else if (typeof d.postfix != "undefined" && d.postfix != "") {
					html = '<div class = "hdf-postfix">';
					html += await HDF.construct.elements[d.type](d, form);
					html += await HDF.construct.postfix(d);
					html += "</div>";
				} else {
					html = await HDF.construct.elements[d.type](d, form);
				}
			} else {
				console.log(d.type + " is not a set block");
			}
			return html;
		},
		editors: async function (form) {
			let id = form.getAttribute("id");
			const op = {
				buttonList: [
					["formatBlock"],
					["bold", "underline", "italic"],
					,
					["link"],
					,
					["removeFormat", "undo", "redo"],
					"/", // Line break
				],
				formats: ["p", "blockquote", "h2", "h3"],
			};
			let editors = form.querySelectorAll(".hdf-editor");
			for (let i = 0; i < editors.length; i++) {
				let fid = editors[i].getAttribute("id");
				HDF.VARS[id].editors[fid] = SUNEDITOR.create(editors[i], op);
			}
		},
		submit: async function (form) {
			let id = form.getAttribute("id");
			return `<div class = "button hdf-button hdf-submit" title = "submit form" role = "button">${HDF.VARS[id].labels.submit}</div>`;
		},
		message: async function () {
			return '<div class = "hdf-message"></div>';
		},
		name: async function (d, i) {
			if (typeof d.name == "undefined") {
				// Remove invalid chars
				d.name = d.label
					.replace(/^[a-zA-Z0-9]{4,20}$/g, "")
					.replace(/\s+/g, "_")
					.replace(/-+/g, "_");

				d.name = d.name.toLowerCase() + i;
			}
			return d.name;
		},
		toggable: async function (d) {
			if (typeof d.toggle_element == "undefined" || d.toggle_element == "") {
				return "";
			}
			return "hdf-hidden";
		},
		toggle: function (items) {
			/*
				Toggle value types: exact, range, includes, exists
					exact: direct 1:1 match
					range: >10, <10, >10,<22
					includes: "hello"
					exists: doesn't matter what the value is, as long as the value exists
			*/

			createToggleAction(items);

			function createToggleAction(items) {
				for (let i = 0; i < items.length; i++) {
					if (typeof items[i].children != "undefined") {
						createToggleAction(items[i].children);
					}
					if (typeof items[i].toggle_element != "undefined" && items[i].toggle_element != "") {
						let isSpecial = false;
						let t = items[i];

						let el = document.getElementById(t.toggle_element);

						if (typeof el == "undefined" || el == null) {
							el = document.getElementById("hdf-item-wrapper_" + t.toggle_element);
							isSpecial = true; // select, radio, checkbox
						}

						if (typeof el != "undefined" && el != null) {
							el.addEventListener("change", function () {
								let v = "";
								if (!isSpecial) {
									v = this.value;
								} else {
									v = this.getAttribute("data-value");
								}

								let el = document.getElementById(items[i].name);
								if (typeof el != "undefined") {
									el = el.parentElement;
									if (t.toggle_type === "exact") {
										// yaya, technically not "exact", but 99.9% of the time this is preferable
										if (v.toLocaleLowerCase() == t.toggle_value.toLocaleLowerCase()) {
											el.classList.remove("hdf-hidden");
										} else {
											el.classList.add("hdf-hidden");
										}
									} else if (t.toggle_type === "exists") {
										if (v != "" && v != null && v.length > 0) {
											el.classList.remove("hdf-hidden");
										} else {
											el.classList.add("hdf-hidden");
										}
									} else if (t.toggle_type === "includes") {
										if (v.toLocaleLowerCase().includes(t.toggle_value.toLocaleLowerCase())) {
											el.classList.remove("hdf-hidden");
										} else {
											el.classList.add("hdf-hidden");
										}
									} else if (t.toggle_type === "range") {
										v = parseFloat(v); // convert value into float so that this will work with textboxes too
										// figure out what the range of this is...
										let r = t.toggle_value.split(",");
										let range = [];
										for (let i = 0; i < r.length; i++) {
											let data = {};
											if (r[i][0] === ">") {
												data.type = ">";
												data.value = parseFloat(r[i].substring(1));
											} else if (r[i][0] === "<") {
												data.type = "<";
												data.value = parseFloat(r[i].substring(1));
											}

											range.push(data);
										}

										// now to make sure our value meets all the critiria
										let valid = true;
										for (let i = 0; i < range.length; i++) {
											if (range[i].type === ">") {
												if (v <= range[i].value) {
													valid = false;
												}
											} else if (range[i].type === "<") {
												if (v >= range[i].value) {
													valid = false;
												}
											}
										}

										if (valid) {
											el.classList.remove("hdf-hidden");
										} else {
											el.classList.add("hdf-hidden");
										}
									}
								}
							});
						}
					}
				}
			}
		},
		label: async function (d) {
			if (d.type == "heading" || d.type == "content" || d.type == "columns" || d.type == "column" || (d.type == "section" && d.label != "" && d.label != " ")) {
				return "";
			}
			let isRequired = await HDF.construct.required(d);
			let r = "";
			if (isRequired != "") {
				r = '<span class = "hdf-required-symbol">*</span>';
			}
			let label = `<label class="hdf-label" for="${d.name}">${d.label}${r}</label>`;
			return label;
		},
		hint: async function (d) {
			let hint = "";
			if (typeof d.hint != "undefined" && d.hint.length > 0) {
				hint = `<p class="hdf-hint">${d.hint}</p>`;
			}
			return hint;
		},
		notification: async function (d) {
			let notification = "";
			if (typeof d.notification != "undefined" && d.notification.length > 0) {
				notification = `<p class="hdf-notification">${d.notification}</p>`;
			}
			return notification;
		},
		required: async function (d) {
			let required = "";
			if (typeof d.required != "undefined" && d.required == "yes") {
				required = `required = ""`;
			}
			return required;
		},
		placeholder: async function (d) {
			let placeholder = "";
			if (typeof d.placeholder != "undefined" && d.placeholder.length > 0) {
				placeholder = d.placeholder;
			}
			return placeholder;
		},
		prefix: async function (d) {
			let html = "";
			if (typeof d.prefix != "undefined" && d.prefix != "") {
				html = `<span class = "hdf-fix">${d.prefix}</span>`;
			}
			return html;
		},
		postfix: async function (d) {
			let html = "";
			if (typeof d.postfix != "undefined" && d.postfix != "") {
				html = `<span class = "hdf-fix">${d.postfix}</span>`;
			}
			return html;
		},
		meta: async function (d) {
			let meta = "";
			if (typeof d.meta != "undefined") {
				for (const key in d.meta) {
					meta += key + " = " + `"${d.meta[key]}" `;
				}
			}
			return meta;
		},
		elements: {
			section: async function (d, form) {
				let children = await getChildren(d);
				return `<div class = "hdf-section" id = "${d.name}">${children}</div>`;

				async function getChildren(d) {
					let children = [];
					if (typeof d.children != "undefined" && d.children.length > 0) {
						children = d.children;
					}
					return HDF.construct.item(children, false, form);
				}
			},
			columns: async function (d, form) {
				let type = "col-1-1"; // default to two cols
				if (typeof d.columns != "undefined" && d.columns != "") {
					type = d.columns;
				}
				let children = await getChildren(d);
				return `<div class = "hdf-columns hdf-${type}" id = "${d.name}">${children}</div>`;

				async function getChildren(d) {
					let children = [];
					if (typeof d.children != "undefined") {
						children = d.children;
					}
					return HDF.construct.item(children, false, form);
				}
			},
			column: async function (d, form) {
				let children = await getChildren(d);
				return `<div class = "hdf-column" id = "${d.name}">${children}</div>`;

				async function getChildren(d) {
					let children = [];
					if (typeof d.children != "undefined") {
						children = d.children;
					}
					return HDF.construct.item(children, false, form);
				}
			},
			heading: async function (d, form) {
				let type = "h2";
				if (typeof d.heading_type != "undefined" && d.heading_type != "") {
					type = d.heading_type;
				}
				return `<${type} class = "hdf-heading hdf-heading-${type}">${d.label}</${type}>`;
			},
			content: async function (d, form) {
				let content = "";
				if (typeof d.content != "undefined") {
					content = d.content;
				}
				return content;
			},
			text: async function (d, form) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				return `<input type = "text" id = "${d.name}" ${meta} class = "hdf-input hdf-text" placeholder = "${placeholder}" ${required}/>`;
			},
			email: async function (d, form) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				return `<input type = "email" id = "${d.name}" ${meta} class = "hdf-input hdf-email" placeholder = "${placeholder}" ${required}/>`;
			},
			textarea: async function (d, form) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				// set default rows
				const ROWS = 8;
				if (typeof d.meta == "undefined" || typeof d.meta.rows == "undefined") {
					if (typeof d.meta == "undefined") {
						d.meta = {};
						d.meta.rows = ROWS;
					} else {
						d.meta.rows = ROWS;
					}
				}
				let meta = await HDF.construct.meta(d);
				return `<textarea id = "${d.name}"  ${meta} class = "hdf-input hdf-textarea" placeholder = "${placeholder}" ${required}></textarea>`;
			},
			editor: async function (d, form) {
				let formId = form.getAttribute("id");
				// not ready yet
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				const ROWS = 12;
				if (typeof d.meta == "undefined" || typeof d.meta.rows == "undefined") {
					if (typeof d.meta == "undefined") {
						d.meta = {};
						d.meta.rows = ROWS;
					} else {
						d.meta.rows = ROWS;
					}
				}
				let meta = await HDF.construct.meta(d);
				return `<textarea id = "${d.name}"  ${meta} data-form = "${formId}" class = "hdf-input hdf-editor" placeholder = "${placeholder}" ${required}></textarea>`;
			},
			integer: async function (d, form) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				return `<input type = "number" id = "${d.name}" ${meta} class = "hdf-input hdf-integer hdf-number" placeholder = "${placeholder}" ${required}/>`;
			},
			float: async function (d, form) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				return `<input type = "number" id = "${d.name}" ${meta} class = "hdf-input hdf-float hdf-number" placeholder = "${placeholder}" ${required}/>`;
			},
			phone: async function (d, form) {
				let required = await HDF.construct.required(d);
				let placeholder = "(xxx) xxx xxxx";
				let meta = await HDF.construct.meta(d);
				return `<input type = "text" id = "${d.name}" ${meta} class = "hdf-input hdf-phone" placeholder = "${placeholder}" ${required}/>`;
			},
			website: async function (d, form) {
				let required = await HDF.construct.required(d);
				let placeholder = "https://";
				let meta = await HDF.construct.meta(d);
				return `<input type = "text" id = "${d.name}" ${meta} class = "hdf-input hdf-website" placeholder = "${placeholder}" ${required}/>`;
			},
			date: async function (d, form) {
				let required = await HDF.construct.required(d);
				// let meta = await HDF.construct.meta(d); // no meta for dates... yet

				let day = `<div>${await HDF.construct.label({
					type: "text",
					label: "day",
					required: required,
					name: d.name + "_day",
				})}<input type = "number" step = "1" min = "1" max = "31" class = "hdf-input hdf-number hdf-number" id = "${d.name}_day" placeholder = "DD" ${required}></div>`;
				let month = `<div>${await HDF.construct.label({
					type: "text",
					label: "month",
					required: required,
					name: d.name + "_month",
				})}<input type = "number" step = "1" min = "1" max = "12" class = "hdf-input hdf-number hdf-number" id = "${d.name}_month" placeholder = "MM" ${required}></div>`;
				let year = `<div>${await HDF.construct.label({
					type: "text",
					label: "year",
					required: required,
					name: d.name + "_year",
				})}<input type = "number" step = "1" min = "1900" max = "2030" class = "hdf-input hdf-number hdf-number" id = "${d.name}_year" placeholder = "YYYY" ${required}></div>`;

				let children = day + month + year;
				return `<div id = "${d.name}" class = "hdf-date hdf-columns hdf-col-1-1-1"/>${children}</div>`;
			},
			upload: async function (d, blockData = null) {
				let formId = 0;
				if (blockData != null) {
					formId = blockData.getAttribute("data-id");
				}

				let max = "";
				if (typeof d.max_file_size != "undefined" && d.max_file_size != "") {
					max = parseInt(d.max_file_size);
				}

				let accept = "*";
				if (typeof d.allowed_files != "undefined" && d.allowed_files != "") {
					accept = d.allowed_files;
				}

				let limits = "";
				if (max > 0) {
					limits += `<br/><small>max filesize ${max}kB</small>`;
				}

				const icon = `<svg class = "hdf-upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.056 512.056"><path d="M426.635 188.224C402.969 93.946 307.358 36.704 213.08 60.37 139.404 78.865 85.907 142.542 80.395 218.303 28.082 226.93-7.333 276.331 1.294 328.644c7.669 46.507 47.967 80.566 95.101 80.379h80v-32h-80c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64 8.837 0 16-7.163 16-16-.08-79.529 64.327-144.065 143.856-144.144 68.844-.069 128.107 48.601 141.424 116.144a16 16 0 0013.6 12.8c43.742 6.229 74.151 46.738 67.923 90.479-5.593 39.278-39.129 68.523-78.803 68.721h-64v32h64c61.856-.187 111.848-50.483 111.66-112.339-.156-51.49-35.4-96.241-85.42-108.46z"/><path d="M245.035 253.664l-64 64 22.56 22.56 36.8-36.64v153.44h32v-153.44l36.64 36.64 22.56-22.56-64-64c-6.241-6.204-16.319-6.204-22.56 0z"/></svg>`;

				return `<input id="${d.name}" type="file" data-form = "${formId}" data-size = "${max}" name="${d.name}" class = "hdf-upload-input" accept="${accept}" />
				<label for="${d.name}" class="hdf-file-drag">
					<div class="hdf-upload-start">
						<div class = "hdf-upload-message">select a file or drag here${limits}</div>
						<span class="hdf-file-upload-button" title = "upload a file">
							<span class = "hdf-upload-icon">${icon}</span>
							<span class = "hdf-upload-text">select a file</span>
						</span>
					</div>
					<div class="hdf-uploading-bar"><span class = "hdf-uploading-text">uploading...</span></div>
				</label>`;
			},
			currency: async function (d, form) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				return `<div class = "hdf-prefix hdf-currency"><div class = "hdf-fix">$</div><input type = "number" id = "${d.name}" ${meta} class = "hdf-input" placeholder = "${placeholder}" ${required}/></div>`;
			},
			select: async function (d, form) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				let options = "";
				if (placeholder != "") {
					options += `<option value = "">${placeholder}</option>`;
				}
				if (required != "" && placeholder == "") {
					options += `<option value = ""> - - </option>`;
				}

				if (typeof (d.options != "undefined")) {
					for (let i = 0; i < d.options.length; i++) {
						options += `<option value = "${d.options[i].value}">${d.options[i].label}</option>`;
					}
				}

				return `<select id = "${d.name}" ${meta} class = "hdf-input hdf-select" ${required}>${options}</select>`;
			},
			radio: async function (d, form) {
				let required = await HDF.construct.required(d);
				let options = "";
				if (typeof (d.options != "undefined")) {
					for (let i = 0; i < d.options.length; i++) {
						options += `<div class="hdf-options-check">
							<input type="checkbox" id="${d.name}_${i}" class = "hdf-radio-input" data-id = "${d.name}" value="${d.options[i].value}" name="${d.name}_${i}"/>
							<label for="${d.name}_${i}" data-title="null" title="null"></label>
						</div>
						<label class="non-block" for="${d.name}_${i}" data-title="null" title="null">${d.options[i].label}</label>`;
					}
				}
				return `<div class="hdf-check-row" data-value = "" id = "hdf-item-wrapper_${d.name}">${options}</div>`;
			},
			checkbox: async function (d, form) {
				let required = await HDF.construct.required(d);
				let options = "";
				if (typeof (d.options != "undefined")) {
					for (let i = 0; i < d.options.length; i++) {
						options += `<div class="hdf-options-check">
							<input type="checkbox" id="${d.name}_${i}" class = "hdf-checkbox-input" data-id = "${d.name}" value="${d.options[i].value}" name="${d.name}_${i}"/>
							<label for="${d.name}_${i}" data-title="null" title="null"></label>
						</div>
						<label class="non-block" for="${d.name}_${i}" data-title="null" title="null">${d.options[i].label}</label>`;
					}
				}
				return `<div class="hdf-check-row" data-value = "" id = "hdf-item-wrapper_${d.name}">${options}</div>`;
			},
		},
	},
	validate: {
		init: async function (form, items = null, save = false) {
			let id = form.getAttribute("id");
			if (items === null) {
				items = form.getElementsByClassName("hdf-item");
			}
			let validated = true;

			for (let i = 0; i < items.length; i++) {
				let type = items[i].getAttribute("data-type");
				if (type != null && type != "columns" && type != "column" && type != "section") {
					let v = await HDF.validate.value[type](items[i]);
					if (v.value == "") {
						// if element is required
						if (items[i].getAttribute("data-required") === "true") {
							// only check required if the element is "visible"
							// needed for dynamic forms
							if (items[i].offsetParent !== null) {
								let valid = await HDF.validate.required(items[i]);
								console.log(valid);
								if (valid !== true) {
									validated = false;
									await HDF.validate.notification(items[i]);
								} else {
									await HDF.validate.notification(items[i], false);
								}
							}
						}
					} else {
						// make sure that value is what data-type expects
						if (v.valid == true) {
							await HDF.validate.notification(items[i], false);
						} else {
							validated = false;
							await HDF.validate.notification(items[i]);
						}
					}
					if (save) {
						HDF.VARS[id].data[items[i].getAttribute("data-id")] = v;
					}
				}
			}

			if (validated) {
				return true;
			} else {
				let firstError = form.getElementsByClassName("hdf-error")[0];
				if (typeof firstError != "undefined") {
					if (!isInViewport(firstError)) {
						firstError.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
					}
				}
				return false;
			}

			function isInViewport(element) {
				const rect = element.getBoundingClientRect();
				return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
			}
		},
		getFormParent: async function (element, includeHidden) {
			let style = getComputedStyle(element);
			let excludeStaticParent = style.position === "absolute";
			let overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

			if (style.position === "fixed") return document.body;
			for (var parent = element; (parent = parent.parentElement); ) {
				style = getComputedStyle(parent);
				if (excludeStaticParent && style.position === "static") {
					continue;
				}
				if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
			}
			return document.body;
		},
		radio: function () {
			// make sure only one can be selected at a time
			let id = this.getAttribute("data-id");
			let radio = document.getElementById("hdf-item-wrapper_" + id);
			let radios = radio.getElementsByClassName("hdf-radio-input");
			for (let i = 0; i < radios.length; i++) {
				if (radios[i] != this) {
					if (this.checked) {
						radios[i].checked = false;
					} else {
						if (radios.length === 2) {
							radios[i].checked = true;
							radio.setAttribute("data-value", radios[i].value);
						}
					}
				}
			}

			if (this.checked) {
				radio.setAttribute("data-value", this.value);
			}
		},
		checkbox: async function () {
			// update data value in case of toggle
			let id = this.getAttribute("data-id");
			let checkbox = document.getElementById("hdf-item-wrapper_" + id);
			let v = await HDF.validate.value.checkbox(checkbox);
			checkbox.setAttribute("data-value", v.value);
		},
		upload: async function (ev, formId) {
			let el = ev.target;
			el = el.nextSibling.nextSibling.getElementsByClassName("hdf-file-upload-button");

			let v = await HDF.validate.value.upload(ev.target.parentElement);
			let file = null;

			if (v.value != null && v.value != "") {
				file = JSON.parse(v.value);
				ev.target.parentElement.classList.remove("hdf-error");

				if (el.length > 0) {
					el[0].getElementsByClassName("hdf-upload-text")[0].innerHTML = file.name;
				}
			}

			if (!v.valid || v.value == "" || v.value == null) {
				ev.target.parentElement.getElementsByClassName("hdf-upload-message")[0].innerHTML = "please check the file type and filesize";
				ev.target.parentElement.classList.add("hdf-error");
			} else {
				uploadFile(ev.target.files[0], ev.target.parentElement);
			}

			function uploadFile(file, form) {
				let xhr = new XMLHttpRequest();
				if (xhr.upload) {
					// once upload starts
					xhr.upload.addEventListener(
						"loadstart",
						function () {
							let p = ev.target.parentElement.getElementsByClassName("hdf-uploading-bar");
							if (p.length > 0) {
								p[0].style.display = "block";
							}

							let submit = document.getElementById(formId).getElementsByClassName("hdf-submit");
							for (let i = 0; i < submit.length; i++) {
								submit[i].classList.add("hdf-disabled");
							}
						},
						false
					);

					// File received / failed
					xhr.onreadystatechange = function (e) {
						if (xhr.readyState == 4) {
							console.log(xhr.response);
							let res = JSON.parse(xhr.response);
							if (res.status == "success") {
								form.setAttribute("data-value", res.file);
								form.setAttribute("data-date", res.date);
								let allow = form.getAttribute("accept");
								let isImage = /\.(?=gif|jpg|png|jpeg)/gi.test(file.name);
								if (isImage) {
									let img = document.createElement("img");
									img.setAttribute("src", URL.createObjectURL(file));
									ev.target.parentElement.getElementsByClassName("hdf-upload-message")[0].innerHTML = "";
									ev.target.parentElement.getElementsByClassName("hdf-upload-message")[0].insertAdjacentElement("beforeend", img);
								} else {
									ev.target.parentElement.getElementsByClassName("hdf-upload-message")[0].innerHTML = "upload sucessful";
								}
							} else {
								ev.target.parentElement.getElementsByClassName("hdf-upload-message")[0].innerHTML = res.message;
								form.setAttribute("data-value", "");
							}

							let p = ev.target.parentElement.getElementsByClassName("hdf-uploading-bar");
							if (p.length > 0) {
								p[0].style.display = "none";
							}

							let submit = document.getElementById(formId).getElementsByClassName("hdf-submit");
							for (let i = 0; i < submit.length; i++) {
								submit[i].classList.remove("hdf-disabled");
							}
						}
					};

					xhr.open("POST", hdf_ajaxurl, true);
					xhr.setRequestHeader("X-File-Name", encodeURIComponent(file.name));
					xhr.setRequestHeader("X-File-Size", file.size);
					let data = new FormData();
					data.append("file", file);
					data.append("action", "hdf_file_upload");
					data.append("formId", formId);
					data.append("uid", HDF.VARS[formId].time);
					xhr.send(data);
				}
			}
		},
		value: {
			heading: async function (item) {
				let value = item.getElementsByClassName("hdf-heading")[0].innerHTML;
				return {
					value: value,
					type: "heading",
					valid: true,
				};
			},
			content: async function (item) {
				let value = ""; // don't return anything for content
				return {
					value: value,
					type: "content",
					valid: true,
				};
			},
			text: async function (item) {
				return {
					value: item.getElementsByClassName("hdf-input")[0].value || "",
					type: "text",
					valid: true,
				};
			},
			email: async function (item) {
				let v = item.getElementsByClassName("hdf-input")[0].value || "";
				return {
					value: v,
					type: "email",
					valid: await isValid(v),
				};

				async function isValid(email = "") {
					let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return re.test(String(email).toLowerCase());
				}
			},
			textarea: async function (item) {
				return {
					value: item.getElementsByClassName("hdf-input")[0].value || "",
					type: "textarea",
					valid: true,
				};
			},
			editor: async function (item) {
				let eid = item.getElementsByClassName("hdf-input")[0].getAttribute("id");
				let fid = item.getElementsByClassName("hdf-input")[0].getAttribute("data-form");
				HDF.VARS[fid].editors[eid].save();

				if (item.getElementsByClassName("hdf-input")[0].value == "<p><br></p>") {
					item.getElementsByClassName("hdf-input")[0].value = "";
				}

				return {
					value: item.getElementsByClassName("hdf-input")[0].value || "",
					type: "editor",
					valid: true,
				};
			},
			integer: async function (item) {
				item = item.getElementsByClassName("hdf-input")[0];
				let l = item.value.length;
				let valid = true;
				let v = "";
				if (item.value !== "") {
					v = parseInt(item.value || 0);
				} else {
					valid = false;
				}

				if (typeof item.getAttribute("min") != "undefined" && item.getAttribute("min") != null && v < parseInt(item.getAttribute("min"))) {
					valid = false;
				}
				if (typeof item.getAttribute("max") != "undefined" && item.getAttribute("min") != null && v > parseInt(item.getAttribute("max"))) {
					valid = false;
				}
				if (typeof item.getAttribute("maxlength") != "undefined" && item.getAttribute("maxlength") != null && l > parseInt(item.getAttribute("maxlength"))) {
					valid = false;
				}
				if (typeof item.getAttribute("minlength") != "undefined" && item.getAttribute("minlength") != null && l < parseInt(item.getAttribute("minlength"))) {
					valid = false;
				}

				return {
					value: v,
					type: "integer",
					valid: valid,
				};
			},
			float: async function (item) {
				item = item.getElementsByClassName("hdf-input")[0];
				let valid = true;
				let v = "";
				if (item.value !== "") {
					v = parseFloat(item.value || 0);
				} else {
					valid = false;
				}

				if (typeof item.getAttribute("min") != "undefined" && v < parseInt(item.getAttribute("min"))) {
					valid = false;
				}
				if (typeof item.getAttribute("max") != "undefined" && v > parseInt(item.getAttribute("max"))) {
					valid = false;
				}
				if (typeof item.getAttribute("maxlength") != "undefined" && v.length > parseInt(item.getAttribute("maxlength"))) {
					valid = false;
				}
				if (typeof item.getAttribute("minlength") != "undefined" && v.length < parseInt(item.getAttribute("minlength"))) {
					valid = false;
				}
				return {
					value: v,
					type: "float",
					valid: valid,
				};
			},
			phone: async function (item) {
				let v = item.getElementsByClassName("hdf-input")[0].value || "";
				// not perfect formatting... but better than just a textfield
				v = v.trim();

				// in case it's alread xxx-xxx-xxxx format
				if (v.includes("-")) {
					v = v.split("-");
					v = v.join("");
				}

				if (!v.includes(" ") && (await isValid(v))) {
					// safer to go rtl so we don't break formatting
					let num = [];
					num.push(v.substr(v.length - 4));
					v = v.substr(0, v.length - 4);

					num.push(v.substr(v.length - 3));
					v = v.substr(0, v.length - 3);

					num.push(v.substr(v.length - 3));
					v = v.substr(0, v.length - 3);

					if (v != "") {
						num.push(v);
					}

					num.reverse();
					num = num.join("-");
					v = num;
				}

				v = v.split(" ").join("-");
				return {
					value: v,
					type: "phone",
					valid: await isValid(v),
				};

				async function isValid(phoneNumber = "") {
					let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
					return re.test(String(phoneNumber).toLowerCase());
				}
			},
			website: async function (item) {
				let v = item.getElementsByClassName("hdf-input")[0].value || "";
				// not perfect formatting... but better than just a textfield
				v = v.trim();

				return {
					value: v,
					type: "website",
					valid: await isValid(v),
				};

				async function isValid(phoneNumber = "") {
					let re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/; // #http://urlregex.com

					return re.test(String(phoneNumber).toLowerCase());
				}
			},
			date: async function (item) {
				let valid = true;

				let el = item.getElementsByClassName("hdf-number");
				let v = [];
				let val = "";
				v[0] = el[0].value;
				v[1] = el[1].value;
				v[2] = el[2].value;

				for (let i = 0; i < v.length; i++) {
					if (v[i] == "" || v[i] == null) {
						valid = false;
					}
				}

				if (v[0] > 31) {
					valid = false;
				} else if (v[1] > 12) {
					valid = false;
				} else if (v[2] > 2030 || v[2] < 1900) {
					valid = false;
				}

				if (v[0] == "" && v[1] == "" && v[2] == "") {
					valid = true;
					val = "";
				} else {
					// force 2-digits
					if (v[0] < 10) {
						v[0] = "0" + v[0];
					}
					if (v[1] < 10) {
						v[1] = "0" + v[1];
					}
					// TODO: allow for different date formats (IE: YYYY, MM, DD)
					val = v.join("-");
				}

				return {
					value: val,
					type: "date",
					valid: valid,
				};
			},
			upload: async function (item) {
				let upload = item.getElementsByClassName("hdf-upload-input")[0];
				let max = parseInt(upload.getAttribute("data-size"));
				let formId = upload.getAttribute("data-form");
				let v = "";
				let valid = true;
				if (upload.files.length > 0) {
					let f = upload.files[0];
					v = {
						name: f.name,
						size: f.size,
						type: f.type,
						location: item.getAttribute("data-value"),
						date: item.getAttribute("data-date"),
						id: [formId, HDF.VARS["hdf-" + formId].time],
					};

					// check max allowed filesize
					if (max > 0) {
						if (v.size / 1000 > max) {
							valid = false;
						}
					}

					// check allowed filetypes
					let accept = upload.getAttribute("accept");
					accept = accept.split(",");
					let ext = "." + v.name.split(".").pop();
					if (accept.includes(ext)) {
						v = JSON.stringify(v);
					} else {
						v = "";
					}
				}

				return {
					value: v,
					type: "upload",
					valid: valid,
				};
			},
			currency: async function (item) {
				item = item.getElementsByClassName("hdf-input")[0];
				let valid = true;
				let v = "";
				if (item.value !== "") {
					v = parseFloat(item.value || 0).toFixed(2);
				} else {
					valid = false;
				}

				if (typeof item.getAttribute("min") != "undefined" && v < parseInt(item.getAttribute("min"))) {
					valid = false;
				}
				if (typeof item.getAttribute("max") != "undefined" && v > parseInt(item.getAttribute("max"))) {
					valid = false;
				}
				return {
					value: v,
					type: "currency",
					valid: valid,
				};
			},
			select: async function (item) {
				return {
					value: item.getElementsByClassName("hdf-input")[0].value || "",
					type: "select",
					valid: true,
				};
			},
			radio: async function (item) {
				item = item.getElementsByClassName("hdf-check-row")[0];
				return {
					value: item.getAttribute("data-value"),
					type: "radio",
					valid: true,
				};
			},
			checkbox: async function (item) {
				let items = item.getElementsByClassName("hdf-checkbox-input");
				let data = [];
				for (let i = 0; i < items.length; i++) {
					if (items[i].checked) {
						data.push(items[i].value);
					}
				}

				data = data.join(", ");

				return {
					value: data,
					type: "checkbox",
					valid: true,
				};
			},
		},
		notification: async function (item, show = true) {
			if (show) {
				item.classList.add("hdf-error");
			} else {
				item.classList.remove("hdf-error");
			}
		},
		required: async function (item) {
			let type = item.getAttribute("data-type");
			let v = await HDF.validate.value[type](item);
			v = v.value;
			if (typeof v != "undefined" && v !== "") {
				return true;
			} else {
				return false;
			}
		},
	},
	paginate: {
		init: async function (form) {
			await HDF.paginate.construct(form);
			await HDF.paginate.listeners(form);
		},
		construct: async function (form) {
			const headings = form.getElementsByClassName("hdf-heading-h2");
			for (let i = 0; i < headings.length; i++) {
				let h = headings[i];
				let p = h.parentNode;
				let paginateBegin = `<div class = "hdf-button hdf-next hdf-item" data-index = "${i}" id = "hdf-paginate-${i}" role = "button" title = "progress to the next section">NEXT</div>`;
				p.insertAdjacentHTML("beforebegin", paginateBegin);
			}

			// create "steps" indicator
			if (headings.length > 0) {
				let step = `<div class = "hdf-step-active" data-index = "0"></div><div class = "hdf-step"></div>`;
				for (let i = 0; i < headings.length; i++) {
					step += `<div class = "hdf-step"></div>`;
				}
				const steps = `<div class = "hdf-steps-wrapper">${step}</div>`;
				form.insertAdjacentHTML("afterbegin", steps);
			}

			await hide(headings[0]);

			async function hide(el) {
				let p = el.parentNode;
				let all = document.getElementsByClassName("hdf-item");
				startHide = false;
				for (let i = 0; i < all.length; i++) {
					if (!startHide) {
						if (all[i] == p) {
							startHide = true;
						}
					}
					if (startHide) {
						all[i].style.display = "none";
					}
				}

				document.getElementsByClassName("hdf-submit")[0].style.display = "none";
			}
		},
		listeners: async function (form) {
			let nextButtons = form.getElementsByClassName("hdf-next");
			for (let i = 0; i < nextButtons.length; i++) {
				nextButtons[i].addEventListener("click", function () {
					HDF.paginate.next(this, form);
				});
			}
		},
		next: async function (el, form) {
			let index = parseInt(el.getAttribute("data-index"));
			let all = document.getElementsByClassName("hdf-item");
			let buttons = document.getElementsByClassName("hdf-next");
			let last = false;
			if (index == buttons.length - 1) {
				last = true;
			}

			let valid = await validateSection(form, el, all);
			if (valid) {
				paginate(el, all, buttons, last);
			}

			async function validateSection(form, el, all) {
				// get list of elements in the section
				let list = [];
				let toValidate = true;
				for (let i = 0; i < all.length; i++) {
					if (el == all[i]) {
						toValidate = false;
						break;
					}
					if (toValidate) {
						list.push(all[i]);
					}
				}
				return await HDF.validate.init(form, list);
			}

			function paginate(el, all, buttons, last) {
				let hide = true;
				for (let i = 0; i < all.length; i++) {
					let isButton = false;
					if (!last) {
						if (all[i] == el) {
							hide = false;
							isButton = true;
						}
						if (all[i] == buttons[buttons.length - 1]) {
							hide = true;
							isButton = true;
						}
					} else {
						if (all[i] == el) {
							hide = false;
							isButton = true;
						}
					}

					if (hide) {
						if (!isButton) {
							all[i].style.display = "none";
						} else {
							all[i].style.display = "inline-block";
						}
					} else {
						if (!isButton) {
							all[i].style.display = "block";
						} else {
							all[i].style.display = "none";
						}

						if (last) {
							document.getElementsByClassName("hdf-submit")[0].style.display = "inline-block";
						}
					}
				}

				HDF.paginate.updateProgress();
			}
		},
		updateProgress: function () {
			let steps = document.getElementsByClassName("hdf-step")[0];
			steps = steps.offsetWidth;
			let progress = document.getElementsByClassName("hdf-step-active")[0];
			let index = parseInt(progress.getAttribute("data-index")) + 1;
			progress.setAttribute("data-index", index);
			progress.style.width = steps * index + "px"; // offset of 2 to deal with border
		},
	},
	send: async function (id) {
		// send data
		jQuery.ajax({
			type: "POST",
			data: {
				action: "hdf_submit_form",
				hdf: id,
				data: HDF.VARS[id].data,
			},
			url: hdf_ajaxurl,
			success: function (data) {
				let form = document.getElementById(id);
				console.log(data);
				data = JSON.parse(data);
				if (data.status == "error") {
					if (HDF.VARS[id].message) {
						form.getElementsByClassName("hdf-message")[0].innerHTML = `<p>${data.message}</p>`;
						form.getElementsByClassName("hdf-message")[0].style.display = "block";
						submit.style.display = "block";
					}
				} else if (data.status == "success") {
					if (HDF.VARS[id].message) {
						data.message = decodeURIComponent(data.message);
						form.getElementsByClassName("hdf-message")[0].innerHTML = `<p>${data.message}</p>`;
						form.getElementsByClassName("hdf-message")[0].style.display = "block";
					}
				} else {
					form.getElementsByClassName("hdf-message")[0].innerHTML = `<p>an unknown error occured</p>`;
					form.getElementsByClassName("hdf-message")[0].style.display = "block";
					submit.style.display = "block";
				}
			},
			complete: function () {
				//
			},
			error: function () {
				submit.style.display = "block";
				alert("There was an error sending your form");
			},
		});
	},
	submit: async function (form) {
		let id = form.getAttribute("id");

		let form_id = id.replace("hdf-", "");
		let items = form.getElementsByClassName("hdf-item");
		let submit = form.getElementsByClassName("hdf-submit")[0];

		// remove uploads since form has now been submitted
		let uploads = form.getElementsByClassName("hdf-upload-input");
		for (let i = 0; i < uploads.length; i++) {
			uploads[i].remove();
		}

		submit.style.display = "none";
		if (HDF.VARS[id].message) {
			form.getElementsByClassName(
				"hdf-message"
			)[0].innerHTML = `<div class='hdf-loader'><div class='hdf-loader-dot'></div><div class='hdf-loader-dot'></div><div class='hdf-loader-dot'></div><div class='hdf-loader-dot'></div><div class='hdf-loader-dot'></div><div class='hdf-loader-dot'></div></div>`;
			form.getElementsByClassName("hdf-message")[0].style.display = "block";
		}

		if (HDF.VARS[id].paginate) {
			for (let i = 0; i < items.length; i++) {
				items[i].style.display = "none";
			}
			HDF.paginate.updateProgress();
		}

		let extra = {};

		let init_actions = window["hdf_actions_" + form_id];
		// before_submit = before sending data to server
		if (typeof init_actions != "undefined" && init_actions != null) {
			for (let i = 0; i < init_actions.length; i++) {
				if (init_actions[i].priority == "before_submit") {
					if (typeof window[init_actions[i].action] === "function") {
						let n_extra = await window[init_actions[i].action](form_id, HDF.VARS[id].data);
						extra = Object.assign(extra, n_extra);
					}
				}
			}
		}

		if (HDF.VARS[id].email) {
			console.log(HDF.VARS[id]);
			await HDF.send(id);
		}

		// after_submit = what to do once data has been sent and form is now fully completed
		if (typeof init_actions != "undefined" && init_actions != null) {
			for (let i = 0; i < init_actions.length; i++) {
				if (init_actions[i].priority == "after_submit") {
					if (typeof window[init_actions[i].action] === "function") {
						await window[init_actions[i].action](form_id, HDF.VARS[id].data);
					}
				}
			}
		}
	},
};

// Load up forms
const hdf_forms = hdf_form_id;
for (let i = 0; i < hdf_forms.length; i++) {
	const form = document.getElementById("hdf-" + String(hdf_forms[i]));
	if (form != null) {
		let data = window["hdf_form_blocks_" + String(hdf_forms[i])];
		data = JSON.parse(decodeURIComponent(data));
		HDF.init(form, data);
	}
}

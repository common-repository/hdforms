/* HDForms Builder Script
------------------------------------------------------------------ */

// add localization for date, phone, and currency

const HDF = {
	VARS: {
		data: [],
		blocks: {},
		sort: {
			document: null,
		},
		id: hdf_form_id,
		init: {
			form: hdf_form_data,
			blocks: hdf_form_blocks,
		},
	},
	blocks: {
		document: {
			name: "document",
			label: "Form Settings",
			show: false,
			allowChildren: false,
			allowToggle: false,
			options: [
				{
					type: "heading",
					name: "heading_submit_messages",
					meta: { type: "h4" },
					label: "Email settings",
				},
				{
					type: "email",
					name: "send_to_email",
					label: "Send to email address",
					placeholder: "comma separated",
					required: true,
				},
				{
					type: "text",
					name: "reply_to_name",
					label: "ReplyTo: Name",
					placeholder: "enter element id",
				},
				{
					type: "text",
					name: "reply_to_email",
					label: "ReplyTo: Email",
					placeholder: "enter element id",
				},
				{
					type: "heading",
					name: "heading_submit_messages",
					meta: { type: "h4" },
					label: "Form Labels",
				},
				{
					name: "success_message",
					label: "Success message",
					type: "text",
				},
				{
					name: "submit_text",
					label: "Submit button text",
					type: "text",
				},
			],
			extra: [
				{
					type: "heading",
					label: "Custom actions",
					meta: { type: "h4" },
				},
				{
					type: "content",
					name: "hdf_action_hint",
					content:
						"<p><small>Note, only use these settings if you know what you are doing. Muliple actions can be separated with a <code>,</code></small></p>",
				},
				{
					type: "text",
					name: "hdf_action_init",
					label: "Form init",
				},
				{
					type: "text",
					name: "hdf_action_before_submit",
					label: "Before submit",
				},
				{
					type: "text",
					name: "hdf_action_after_submit",
					label: "After submit",
				},
			],
		},
		heading: {
			name: "heading",
			label: "Heading",
			icon: "<strong>H</strong>",
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					type: "select",
					name: "heading_type",
					label: "Heading size",
					toggleMeta: true,
					options: [
						{
							label: "Main Heading",
							value: "h2",
						},
						{
							label: "Subheading",
							value: "h3",
						},
						{
							label: "Small header",
							value: "h4",
						},
					],
				},
			],
		},
		text: {
			label: "Text input",
			name: "text",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464.707 457l-194-432h-29.58l-186 432H0v30h160v-30H87.79l47.792-111h176.392l49.847 111H312v30h200v-30h-47.293zM148.498 316l73.423-170.53L298.501 316H148.498z"/></svg>`,
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "placeholder",
					label: "Placeholder",
					type: "text",
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
			extra: [
				{
					type: "text",
					name: "prefix",
					label: "Prefix",
				},
				{
					type: "text",
					name: "postfix",
					label: "Postfix",
				},
			],
		},
		textarea: {
			label: "Textarea (multi-line)",
			name: "textarea",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333 333"><path d="M323 31.5H10c-5.5 0-10 4.5-10 10s4.5 10 10 10h313c5.5 0 10-4.5 10-10s-4.5-10-10-10zM230 114.5H10c-5.5 0-10 4.5-10 10s4.5 10 10 10h220c5.5 0 10-4.5 10-10s-4.5-10-10-10zM323 198.5H10c-5.5 0-10 4.5-10 10s4.5 10 10 10h313c5.5 0 10-4.5 10-10s-4.5-10-10-10zM151 281.5H10c-5.5 0-10 4.5-10 10s4.5 10 10 10h141c5.5 0 10-4.5 10-10s-4.5-10-10-10z"/></svg>`,
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "placeholder",
					label: "Placeholder",
					type: "text",
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
		},
		integer: {
			label: "Integer (whole number)",
			name: "integer",
			icon: "1",
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "placeholder",
					label: "Placeholder",
					type: "text",
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
			extra: [
				{
					type: "text",
					name: "prefix",
					label: "Prefix",
				},
				{
					type: "text",
					name: "postfix",
					label: "Postfix",
				},
			],
		},
		float: {
			label: "Float (allow decimals)",
			name: "float",
			icon: "2",
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "placeholder",
					label: "Placeholder",
					type: "text",
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
			extra: [
				{
					type: "text",
					name: "prefix",
					label: "Prefix",
				},
				{
					type: "text",
					name: "postfix",
					label: "Postfix",
				},
			],
		},
		select: {
			label: "Select (dropdown)",
			name: "select",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 444 444"><path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"/></svg>`,
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "options",
					label: "Options (one per line)",
					hint: `separate label and value with <code>|</code>`,
					type: "textarea",
					required: true,
				},
				{
					name: "placeholder",
					label: "Placeholder",
					type: "text",
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
			extra: [
				{
					type: "text",
					name: "prefix",
					label: "Prefix",
				},
				{
					type: "text",
					name: "postfix",
					label: "Postfix",
				},
			],
		},
		radio: {
			label: "Radio (only select one)",
			name: "radio",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewbox = "0 0 555 555"><path d="M255 127.5c-71.4 0-127.5 56.1-127.5 127.5S183.6 382.5 255 382.5 382.5 326.4 382.5 255 326.4 127.5 255 127.5zM255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm0 459c-112.2 0-204-91.8-204-204S142.8 51 255 51s204 91.8 204 204-91.8 204-204 204z"/></svg>`,
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "options",
					label: "Options (one per line)",
					hint: `separate label and value with <code>|</code>`,
					type: "textarea",
					required: true,
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
		},
		checkbox: {
			label: "Checkboxes (can select many)",
			name: "checkbox",
			icon: `
            <svg viewBox="0 0 555 555" xmlns="http://www.w3.org/2000/svg"><path d="m452 512h-392c-33.085938 0-60-26.914062-60-60v-392c0-33.085938 26.914062-60 60-60h392c33.085938 0 60 26.914062 60 60v392c0 33.085938-26.914062 60-60 60zm-392-472c-11.027344 0-20 8.972656-20 20v392c0 11.027344 8.972656 20 20 20h392c11.027344 0 20-8.972656 20-20v-392c0-11.027344-8.972656-20-20-20zm370.898438 111.34375-29.800782-26.6875-184.964844 206.566406-107.351562-102.046875-27.558594 28.988281 137.21875 130.445313zm0 0"/></svg>`,
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "options",
					label: "Options (one per line)",
					hint: `separate label and value with <code>|</code>`,
					type: "textarea",
					required: true,
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
		},
		email: {
			label: "Email input",
			name: "email",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M371.496 485.52C327.36 505.384 289.104 512 236.872 512 114.76 512 7.352 424.456 7.352 280.28 7.352 130.208 116.224 0 282.488 0c129.472 0 222.16 89.016 222.16 212.6 0 107.4-60.32 175.08-139.768 175.08-34.576 0-59.584-17.656-63.264-56.648h-1.472c-22.8 37.52-55.904 56.648-94.896 56.648-47.816 0-82.392-35.312-82.392-95.64 0-89.744 66.208-171.4 172.136-171.4 32.368 0 69.144 8.096 87.544 18.392l-22.064 136.096c-7.352 43.392-2.208 63.264 18.392 63.992 31.632.736 71.352-39.728 71.352-124.32 0-95.632-61.792-169.936-175.824-169.936-112.544 0-211.128 88.28-211.128 228.784 0 122.848 78.712 192.736 188.328 192.736 37.52 0 77.248-8.088 106.664-23.544l13.24 42.68zm-65.472-303.816c-5.888-1.472-13.248-2.944-22.808-2.944-48.544 0-86.808 47.816-86.808 104.456 0 27.952 12.512 45.608 36.784 45.608 27.216 0 55.912-34.576 62.528-77.24l10.304-69.88z"/></svg>`,
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "placeholder",
					label: "Placeholder",
					type: "text",
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
			extra: [
				{
					type: "text",
					name: "prefix",
					label: "Prefix",
				},
				{
					type: "text",
					name: "postfix",
					label: "Postfix",
				},
			],
		},
		phone: {
			label: "Phone number",
			name: "phone",
			icon: `
            <svg id="Layer_1" enable-background="new 0 0 512.021 512.021" viewBox="0 0 512.021 512.021" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m367.988 512.021c-16.528 0-32.916-2.922-48.941-8.744-70.598-25.646-136.128-67.416-189.508-120.795s-95.15-118.91-120.795-189.508c-8.241-22.688-10.673-46.108-7.226-69.612 3.229-22.016 11.757-43.389 24.663-61.809 12.963-18.501 30.245-33.889 49.977-44.5 21.042-11.315 44.009-17.053 68.265-17.053 7.544 0 14.064 5.271 15.645 12.647l25.114 117.199c1.137 5.307-.494 10.829-4.331 14.667l-42.913 42.912c40.482 80.486 106.17 146.174 186.656 186.656l42.912-42.913c3.838-3.837 9.361-5.466 14.667-4.331l117.199 25.114c7.377 1.581 12.647 8.101 12.647 15.645 0 24.256-5.738 47.224-17.054 68.266-10.611 19.732-25.999 37.014-44.5 49.977-18.419 12.906-39.792 21.434-61.809 24.663-6.899 1.013-13.797 1.518-20.668 1.519zm-236.349-479.321c-31.995 3.532-60.393 20.302-79.251 47.217-21.206 30.265-26.151 67.49-13.567 102.132 49.304 135.726 155.425 241.847 291.151 291.151 34.641 12.584 71.866 7.64 102.132-13.567 26.915-18.858 43.685-47.256 47.217-79.251l-95.341-20.43-44.816 44.816c-4.769 4.769-12.015 6.036-18.117 3.168-95.19-44.72-172.242-121.772-216.962-216.962-2.867-6.103-1.601-13.349 3.168-18.117l44.816-44.816z"/></g></svg>`,
			hint: "North American use only. THis will validate as xxx-xxx-xxxx",
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
			extra: [
				{
					type: "text",
					name: "prefix",
					label: "Prefix",
				},
				{
					type: "text",
					name: "postfix",
					label: "Postfix",
				},
			],
		},
		website: {
			label: "Website URL",
			name: "website",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.997 511.997"><path d="M212.26 390.24l-60.331 60.331c-25.012 25.012-65.517 25.012-90.508.005-24.996-24.996-24.996-65.505-.005-90.496l120.683-120.683c24.991-24.992 65.5-24.992 90.491 0 8.331 8.331 21.839 8.331 30.17 0 8.331-8.331 8.331-21.839 0-30.17-41.654-41.654-109.177-41.654-150.831 0L31.247 329.909c-41.654 41.654-41.654 109.177 0 150.831 41.649 41.676 109.177 41.676 150.853 0l60.331-60.331c8.331-8.331 8.331-21.839 0-30.17s-21.84-8.33-30.171.001z"/><path d="M480.751 31.24c-41.654-41.654-109.199-41.654-150.853 0l-72.384 72.384c-8.331 8.331-8.331 21.839 0 30.17 8.331 8.331 21.839 8.331 30.17 0l72.384-72.384c24.991-24.992 65.521-24.992 90.513 0 24.991 24.991 24.991 65.5 0 90.491L317.845 284.638c-24.992 24.992-65.5 24.992-90.491 0-8.331-8.331-21.839-8.331-30.17 0s-8.331 21.839 0 30.17c41.654 41.654 109.177 41.654 150.831 0l132.736-132.736c41.654-41.654 41.654-109.178 0-150.832z"/></svg>`,
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
			extra: [
				{
					type: "text",
					name: "prefix",
					label: "Prefix",
				},
				{
					type: "text",
					name: "postfix",
					label: "Postfix",
				},
			],
		},
		currency: {
			label: "Dollar Amount",
			name: "currency",
			icon: "$",
			hint: "this will force two decimal points",
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
		},
		date: {
			label: "Date input",
			name: "date",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.867 477.867"><path d="M119.467 0C110.041 0 102.4 7.641 102.4 17.067V51.2h34.133V17.067C136.533 7.641 128.892 0 119.467 0zM358.4 0c-9.426 0-17.067 7.641-17.067 17.067V51.2h34.133V17.067C375.467 7.641 367.826 0 358.4 0zM426.667 51.2h-51.2v68.267c0 9.426-7.641 17.067-17.067 17.067s-17.067-7.641-17.067-17.067V51.2h-204.8v68.267c0 9.426-7.641 17.067-17.067 17.067s-17.067-7.641-17.067-17.067V51.2H51.2C22.923 51.2 0 74.123 0 102.4v324.267c0 28.277 22.923 51.2 51.2 51.2h375.467c28.277 0 51.2-22.923 51.2-51.2V102.4c0-28.277-22.923-51.2-51.2-51.2zm17.066 375.467c0 9.426-7.641 17.067-17.067 17.067H51.2c-9.426 0-17.067-7.641-17.067-17.067V204.8h409.6v221.867z"/><path d="M136.533 238.933H102.4c-9.426 0-17.067 7.641-17.067 17.067s7.641 17.067 17.067 17.067h34.133c9.426 0 17.067-7.641 17.067-17.067s-7.641-17.067-17.067-17.067zM256 238.933h-34.133c-9.426 0-17.067 7.641-17.067 17.067s7.641 17.067 17.067 17.067H256c9.426 0 17.067-7.641 17.067-17.067s-7.641-17.067-17.067-17.067zM375.467 238.933h-34.133c-9.426 0-17.067 7.641-17.067 17.067s7.641 17.067 17.067 17.067h34.133c9.426 0 17.067-7.641 17.067-17.067s-7.642-17.067-17.067-17.067zM136.533 307.2H102.4c-9.426 0-17.067 7.641-17.067 17.067s7.641 17.067 17.067 17.067h34.133c9.426 0 17.067-7.641 17.067-17.067s-7.641-17.067-17.067-17.067zM256 307.2h-34.133c-9.426 0-17.067 7.641-17.067 17.067s7.641 17.067 17.067 17.067H256c9.426 0 17.067-7.641 17.067-17.067S265.426 307.2 256 307.2zM375.467 307.2h-34.133c-9.426 0-17.067 7.641-17.067 17.067s7.641 17.067 17.067 17.067h34.133c9.426 0 17.067-7.641 17.067-17.067-.001-9.426-7.642-17.067-17.067-17.067zM136.533 375.467H102.4c-9.426 0-17.067 7.641-17.067 17.067S92.974 409.6 102.4 409.6h34.133c9.426 0 17.067-7.641 17.067-17.067s-7.641-17.066-17.067-17.066zM256 375.467h-34.133c-9.426 0-17.067 7.641-17.067 17.067s7.641 17.067 17.067 17.067H256c9.426 0 17.067-7.641 17.067-17.067s-7.641-17.067-17.067-17.067zM375.467 375.467h-34.133c-9.426 0-17.067 7.641-17.067 17.067s7.641 17.067 17.067 17.067h34.133c9.426 0 17.067-7.641 17.067-17.067s-7.642-17.067-17.067-17.067z"/></svg>`,
			allowChildren: false,
			allowToggle: true,
			hint: "note: dates are stored as <code>dd-mm-yyyy</code>",
			options: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "required",
					label: "Required",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
					],
				},
				{
					name: "hint",
					label: "Hint",
					type: "text",
				},
				{
					name: "notification",
					label: "Notification <small>(if the field has invalid data)</small>",
					type: "text",
				},
			],
		},
    // upload block not ready for primetime	
// 		upload: {
// 			label: "File Uplod",
// 			name: "upload",
// 			icon: "F",
// 			hint: "upload a file",
// 			allowChildren: false,
// 			allowToggle: true,
// 			options: [
// 				{
// 					name: "label",
// 					label: "Label",
// 					type: "text",
// 					required: true,
// 				},
// 				{
// 					name: "required",
// 					label: "Required",
// 					type: "radio",
// 					options: [
// 						{
// 							label: "Yes",
// 							value: "yes",
// 						},
// 					],
// 				},
// 				{
// 					name: "allowed_files",
// 					label: "Allowed files",
// 					type: "text",
// 					hint: "separate filetype extentions with comma"
// 				},
// 				{
// 					name: "max_file_size",
// 					label: "Maximum filesize",
// 					type: "text",
// 					hint: "enter max allowed filesize in bytes"
// 				},			
// 				{
// 					name: "hint",
// 					label: "Hint",
// 					type: "text",
// 				},
// 				{
// 					name: "notification",
// 					label: "Notification <small>(if the field has invalid data)</small>",
// 					type: "text",
// 				},
// 			],
// 		},		
		content: {
			label: "Content",
			name: "content",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 502.664 502.664"><g fill="#010002"><path d="M153.821 358.226L0 274.337v-46.463l153.821-83.414v54.574L46.636 250.523l107.185 53.431v54.272zM180.094 387.584L282.103 115.08h32.227L212.084 387.584h-31.99zM348.843 358.226v-54.272l107.164-52.999-107.164-52.59v-53.927l153.821 83.522v46.183l-153.821 84.083z"/></g></svg>`,
			hint: "Use this to add custom text or HTML",
			allowChildren: false,
			allowToggle: true,
			options: [
				{
					type: "textarea",
					label: "Content",
					name: "content",
					required: true,
					meta: {
						rows: 5,
					},
				},
			],
		},
		section: {
			label: "Section",
			name: "section",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><path d="M4.922 105.704l143.857 61.572c1.015.443 2.099.654 3.185.654s2.165-.222 3.185-.654l143.854-61.572a8.103 8.103 0 004.914-7.615 8.093 8.093 0 00-5.221-7.403L154.838 35.973a8.062 8.062 0 00-5.759 0L5.226 90.685a8.108 8.108 0 00-5.224 7.403 8.107 8.107 0 004.92 7.616zm147.037-53.495l122.233 46.488-122.233 52.32L29.724 98.698l122.235-46.489z"/><path d="M4.922 140.743l147.037 62.936 147.034-62.936a8.097 8.097 0 004.261-10.634c-1.756-4.103-6.502-6.03-10.631-4.261L151.959 186.06 11.29 125.848c-4.116-1.764-8.873.153-10.634 4.261-1.761 4.116.151 8.873 4.266 10.634z"/><path d="M4.922 173.14l147.037 62.938 147.034-62.938a8.093 8.093 0 004.261-10.631c-1.756-4.103-6.502-6.033-10.631-4.261L151.959 218.46 11.29 158.249c-4.116-1.762-8.873.152-10.634 4.261-1.761 4.113.151 8.869 4.266 10.63z"/><path d="M4.922 205.541l147.037 62.938 147.034-62.938a8.094 8.094 0 004.261-10.632 8.099 8.099 0 00-10.631-4.261L151.959 250.86 11.29 190.648c-4.116-1.761-8.873.153-10.634 4.261-1.761 4.113.151 8.87 4.266 10.632z"/></svg>`,
			hint: "create a new section that can be easily duplicated, re-ordered, or toggled",
			allowChildren: true,
			allowToggle: true,
			options: [
				{
					name: "duplicate",
					label: "Duplicate this section",
					type: "button",
					onClick: "HDF.construct.duplicate",
					hint: "create an exact copy of this section with all sub elements and settings",
				},
			],
		},
		columns: {
			label: "Columns",
			name: "columns",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469.333 469.333"><path d="M448 0H21.333C9.552 0 0 9.552 0 21.333V448c0 11.781 9.552 21.333 21.333 21.333H448c11.781 0 21.333-9.552 21.333-21.333V21.333C469.333 9.552 459.781 0 448 0zM138.667 426.667h-96v-384h96v384zm149.333 0H181.333v-384H288v384zm138.667 0h-96v-384h96v384z"/></svg>`,
			allowChildren: true,
			allowToggle: true,
			children: [],
			options: [
				{
					name: "columns",
					label: "Column Type",
					type: "select",
					options: [
						{
							label: "Two Columns",
							value: "col-1-1",
						},
						{
							label: "Three Columns",
							value: "col-1-1-1",
						},
					],
				},
			],
		},
// 		hidden: {
// 			label: "Hidden",
// 			name: "hidden",
// 			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M17.3 3.3c-.4-.4-1.1-.4-1.6 0l-2.4 2.4a9.6 9.6 0 0 0-3.3-.6c-3.8.1-7.2 2.1-9 5.4c.2.4.5.8.8 1.2c.8 1.1 1.8 2 2.9 2.7L3 16.1c-.4.4-.5 1.1 0 1.6c.4.4 1.1.5 1.6 0L17.3 4.9c.4-.5.4-1.2 0-1.6zm-10.6 9l-1.3 1.3c-1.2-.7-2.3-1.7-3.1-2.9C3.5 9 5.1 7.8 7 7.2c-1.3 1.4-1.4 3.6-.3 5.1zM10.1 9c-.5-.5-.4-1.3.1-1.8c.5-.4 1.2-.4 1.7 0L10.1 9zm8.2.5c-.5-.7-1.1-1.4-1.8-1.9l-1 1c.8.6 1.5 1.3 2.1 2.2C15.9 13.4 13 15 9.9 15h-.8l-1 1c.7-.1 1.3 0 1.9 0c3.3 0 6.4-1.6 8.3-4.3c.3-.4.5-.8.8-1.2c-.3-.3-.5-.7-.8-1zM14 10l-4 4c2.2 0 4-1.8 4-4z"/></svg>`,
// 			hint: "This is a hidden field and cannot be filled out by your users. It is meant to autofill with <code>POST</code> or <code>GET</code> requests",
// 			allowChildren: false,
// 			allowToggle: false,
// 			options: [
// 				{
// 					name: "label",
// 					label: "Label",
// 					type: "text",
// 					required: true,
// 				}
// 			]
// 		},		
		column: {
			label: "Column",
			name: "column",
			show: false,
			allowChildren: true,
			allowToggle: true,
			options: [],
			allowNew: false,
		},
		genesis: {
			label: "Placeholder",
			hint: `This is just a placeholder block and will not be saved`,
			name: "genesis",
			show: false,
			allowChildren: false,
			sortable: false,
			options: [],
		},
	},
	init: async function () {
		console.log("HDForms builder init");

		HDF.setWindowVars();
		window.addEventListener("resize", HDF.setWindowVars);

		HDF.VARS.init.form = JSON.parse(decodeURIComponent(HDF.VARS.init.form));
		HDF.VARS.init.blocks = JSON.parse(decodeURIComponent(HDF.VARS.init.blocks));
		HDF.VARS.init.form.id = HDF.VARS.id;

		HDF.VARS.blocks.hdf_document = {};

		let data = {
			form: HDF.VARS.init.form,
			blocks: HDF.VARS.init.blocks,
		};
		if (data.form.id != null) {
			await HDF.load(data);
		}

		HDF.events.init(); // set ititial events
		document.getElementById("hdf_title").focus(); // focus the form title
		await HDF.construct.init(HDF.blocks.document); // show document sidebar

		// show document sidebar if content is selected that isn't a block
		document.getElementById("hdf_content").addEventListener("click", function (e) {
			if (e.target == this) {
				HDF.construct.init(HDF.blocks.document);
				let active = document.getElementsByClassName("active_block");
				while (active.length > 0) {
					active[0].classList.remove("active_block");
				}
			}
		});
	},
	setWindowVars: function () {
		let height = window.innerHeight;
		let adminbar = document.getElementById("wpadminbar");
		if (adminbar != null) {
			let footer = document.getElementById("wpfooter");
			if (footer != null) {
				footer.remove();
			}
			height = height - adminbar.offsetHeight;
		}
		document.documentElement.style.setProperty("--hdf-height", height + "px");

		let width = window.innerWidth;
		let menu = document.getElementById("adminmenu");
		if (menu != null) {
			width = width - menu.offsetWidth;
			width = width - getScrollbarWidth();
		}
		document.documentElement.style.setProperty("--hdf-width", width + "px");

		// https://stackoverflow.com/a/13382873/5656447
		function getScrollbarWidth() {
			// Creating invisible container
			const outer = document.createElement("div");
			outer.style.visibility = "hidden";
			outer.style.overflow = "scroll"; // forcing scrollbar to appear
			outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
			document.body.appendChild(outer);

			// Creating inner element and placing it in the container
			const inner = document.createElement("div");
			outer.appendChild(inner);

			// Calculating difference between container's full width and the child width
			const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

			// Removing temporary elements from the DOM
			outer.parentNode.removeChild(outer);

			return scrollbarWidth;
		}
	},
	events: {
		init: function () {
			HDF.events.addNewBlock();
			HDF.events.setActiveBlock();
			HDF.events.deleteBlock();
			HDF.events.sortable();
		},
		sortable: function () {
			let el = document.getElementById("hdf_form_wrapper");

			Sortable.create(el, {
				handle: ".handle_icon",
				draggable: ".hdf-item",
				ghostClass: "hdf-sortable-destination",
				group: { name: "document", put: true, pull: true },
				filter: '[data-sort="no"]',
				animation: 150,
				onRemove: HDF.events.checkEmptyParent,
				onAdd: checkForGenesis,
				onChange: updateParentClass,
				onEnd: removeParentClass,
			});

			let blocks = document.getElementById("hdf_form_wrapper").getElementsByClassName("hdf-item");
			for (let i = 0; i < blocks.length; i++) {
				if (blocks[i].parentNode.getAttribute("data-children") == "yes" && blocks[i].parentNode.getAttribute("data-sort") != "no") {
					// allow child section to be sortable
					Sortable.create(blocks[i].parentNode, {
						handle: ".handle_icon",
						draggable: ".hdf-item",
						ghostClass: "hdf-sortable-destination",
						filter: '[data-sort="no"]',
						group: {
							name: "document" + i,
							put: true,
							pull: true,
						},
						animation: 150,
						onRemove: HDF.events.checkEmptyParent,
						onAdd: checkForGenesis,
						onChange: updateParentClass,
						onEnd: removeParentClass,
					});
				}
			}

			async function removeParentClass(ev) {
				let active = document.getElementsByClassName("hdf_active_parent");
				while (active.length > 0) {
					active[0].classList.remove("hdf_active_parent");
				}
			}

			async function updateParentClass(ev) {
				await removeParentClass();
				let to = ev.to;
				to.classList.add("hdf_active_parent");
			}

			function checkForGenesis(block) {
				block = block.to;
				let genesis = block.querySelectorAll(":scope > .hdf-item-genesis");
				if (genesis.length > 0) {
					genesis[0].remove();
				}
			}
		},
		checkEmptyParent: async function (block, isDelete = false) {
			if (!isDelete) {
				block = block.from;
			}
			let children = block.querySelectorAll(":scope > .hdf-item");
			if (children.length == 0) {
				let active = document.getElementsByClassName("active_block");

				while (active.length > 0) {
					active[0].classList.remove("active_block");
				}
				block.classList.add("active_block");
				block.innerHTML = await HDF.construct.block({ name: await HDF.construct.id({ type: "genesis" }), type: "genesis" }, false);
				HDF.events.init();
			}
		},
		addNewBlock: async function () {
			// add new block icon
			let blocks = document.getElementsByClassName("add_new_block");
			for (let i = 0; i < blocks.length; i++) {
				let ev = blocks[i].getAttribute("data-event-add-new-block");
				if (ev == null) {
					blocks[i].addEventListener("click", async function () {
						let data = await createBlocklist();
						let blockSelector = document.getElementById("hdf_block_selector");
						blockSelector.innerHTML = data;

						blockSelector.style.opacity = "0";
						blockSelector.style.display = "grid";
						let w = blockSelector.clientWidth / 2;
						let h = blockSelector.clientHeight / 2 - 10;
						let pos = this.getBoundingClientRect();
						blockSelector.style.top = pos.top - h + "px";
						blockSelector.style.left = pos.left + w / 2 + "px";
						blockSelector.style.opacity = "1";
					});
					blocks[i].setAttribute("data-event-add-new-block", "true");
				}

				async function createBlocklist() {
					blocks = HDF.blocks;
					let data = "";
					for (let k in HDF.blocks) {
						if (HDF.blocks[k].icon == null) {
							// set icon to first char of title
							HDF.blocks[k].icon = HDF.blocks[k].label[0];
						}

						if (typeof HDF.blocks[k].show == "undefined" || HDF.blocks[k].show != false) {
							data += `<span class = "hdf_tooltip hdf_add_new_block_toolbar_item" onclick = "HDF.construct.create(this)" data-block = "${HDF.blocks[k].name}" title = "${HDF.blocks[k].label}">${HDF.blocks[k].icon}<span class="hdf_tooltip_content"><span>${HDF.blocks[k].label}</span></span></span>`;
						}
					}
					return data;
				}
			}
		},
		setActiveBlock: function () {
			// set the selected block as active
			let blocks = document.getElementById("hdf_form_wrapper").getElementsByClassName("hdf-item");
			for (let i = 0; i < blocks.length; i++) {
				let ev = blocks[i].getAttribute("data-event-set-active");
				if (ev == null) {
					blocks[i].addEventListener("click", setActive);
					blocks[i].setAttribute("data-event-set-active", "true");
				}
			}

			function setActive(e) {
				e.bubbles = false;
				e.cancelBubble = true;
				let active = document.getElementsByClassName("active_block");
				if (!this.classList.contains("active_block") || active.length > 1) {
					while (active.length > 0) {
						active[0].classList.remove("active_block");
					}
					this.classList.add("active_block");
				}
				if (!e.target.classList.contains("add_new_block") && !e.target.classList.contains("block_delete")) {
					HDF.construct.edit(this);
				}
			}
		},
		deleteBlock: function () {
			const items = document.getElementsByClassName("block_delete");

			for (let i = 0; i < items.length; i++) {
				let ev = items[i].getAttribute("data-delete-event");
				if (ev == null) {
					items[i].addEventListener("click", checkState);
					items[i].setAttribute("data-delete-event", "true");
				}
				items[i].classList.remove("delete_state_2");
			}

			function checkState(e) {
				if (this.classList.contains("delete_state_2")) {
					removeBlock(this);
				} else {
					this.classList.add("delete_state_2");
				}
			}

			async function removeBlock(el) {
				let section = el.parentElement.parentElement.parentElement;
				el = el.parentElement.parentElement;
				let id = el.getAttribute("data-id");
				el.remove();
				delete HDF.VARS.blocks[id];
				await HDF.construct.init(HDF.blocks.document);

				if (section.getAttribute("data-children") == "yes") {
					HDF.events.checkEmptyParent(section, true);
				}

				let blocks = document.getElementById("hdf_form_wrapper").getElementsByClassName("hdf-item");
				if (blocks.length == 0) {
					// TODO: update this with same markup as builder.html
					let html = `<div id="hdf-init-block" class="hdf-item hdf-item-section hdf-genesis-block" data-type="section">
					<div class="block_title">placeholder</div>
					<div class="block_handle">
						<!-- cannot manually delete or sort genesis block -->
						
					</div>
					<div class="add_new_block" data-block="paragraph" title="add new block">+</div>
					<div class="hdf-section" id="hdf-init-block">
						<p style="text-align: center; padding: 0.4em; margin: 0">please add your first field</p>
					</div>
				</div>`;
					document.getElementById("hdf_form_wrapper").innerHTML = html;
					HDF.events.init();
				}
			}
		},
		radioSelect: function () {
			let radio = document.getElementsByClassName("hdf-radio-input");
			for (let i = 0; i < radio.length; i++) {
				radio[i].addEventListener("change", HDF.validate.radio);
			}
		},
		blockSubmit: async function () {
			let submit = document.getElementById("hdf_save_element");
			submit.addEventListener("click", async function () {
				if (this.classList.contains("disabled")) {
					return;
				}
				let submit_text = this.innerHTML;
				submit.innerHTML = "...";
				this.classList.add("disabled");
				isValid = await HDF.validate.init();
				if (isValid) {
					let type = submit.getAttribute("data-type");
					if (type != "document") {
						await HDF.construct.block();
					} else {
						await HDF.save(); // save the form
					}
				}
				setTimeout(function () {
					// since this can happen so quick there,
					// create delay for visual feedback
					submit.innerHTML = "UPDATE";
				}, 100);
				this.classList.remove("disabled");
			});

			// get every sidebar element that matters
			let input = document.getElementById("hdf_sidebar").getElementsByClassName("hdf-input");
			let radio = document.getElementById("hdf_sidebar").getElementsByClassName("hdf-radio-input");
			for (let i = 0; i < input.length; i++) {
				setOnKey(input[i]);
			}
			for (let i = 0; i < radio.length; i++) {
				setOnKey(radio[i]);
			}

			function setOnKey(el) {
				// TODO: maybe only make select input on change, but keep the others as keyup 'cause it's cooler
				el.addEventListener("change", async function () {
					setTimeout(async function () {
						let submit = document.getElementById("hdf_save_element");
						if (submit.classList.contains("disabled")) {
							return;
						}

						let submit_text = submit.innerHTML;
						submit.innerHTML = "...";
						submit.classList.add("disabled");

						isValid = await HDF.validate.init();
						if (isValid) {
							let type = submit.getAttribute("data-type");
							if (type != "document") {
								await HDF.construct.block();
								submit.innerHTML = "UPDATE";
							} else {
								await HDF.save(); // save the form
							}
						}
						submit.innerHTML = submit_text;
						submit.classList.remove("disabled");
					}, 10);
				});
			}
		},
		extraToggle: function () {
			let extra = document.getElementById("hdf_extra_toggle");
			if (extra != null) {
				extra.addEventListener("click", function () {
					document.getElementById("hdf_extra_fields").classList.toggle("extra_active");
				});
			}
		},
		documentSidebar: function () {
			// auto save document sidebar inputs on change
			// NOTE: only works for inputs - not select or radio etc
			const items = document.getElementById("hdf_sidebar").getElementsByClassName("hdf-input");
			for (let i = 0; i < items.length; i++) {
				let ev = items[i].getAttribute("data-event-change");
				if (ev != "true") {
					items[i].addEventListener("change", updateDocumentOption);
					items[i].setAttribute("data-event-change", "true");
				}
			}

			async function updateDocumentOption() {
				let parent = this.parentElement;
				let type = parent.getAttribute("data-type");
				if (type != null) {
					let valid = await HDF.validate.value[type](parent);
					if (valid.valid == true) {
						let id = this.getAttribute("id");
						HDF.VARS.blocks.hdf_document[id] = valid.value;
						parent.classList.remove("hdf-error");
					} else {
						parent.classList.add("hdf-error");
					}
				}
			}
		},
	},
	construct: {
		init: async function (block, data = null) {
			if (block.name === "document") {
				if (typeof HDF.VARS.blocks.hdf_document != "undefined") {
					data = HDF.VARS.blocks.hdf_document;
				}
			}

			document.getElementById("hdf_block_selector").innerHTML = "";
			document.getElementById("hdf_sidebar").innerHTML = await HDF.construct.sidebar(block, data);

			HDF.events.radioSelect();
			HDF.events.blockSubmit();
			HDF.events.extraToggle();

			let document_toggles = document.getElementsByClassName("hdf_sidebar_block_form_toggle");
			for(let i = 0; i < document_toggles.length; i++){
				document_toggles[i].addEventListener("click", function(){					
					let id = this.getAttribute("data-id");
					if(id === "form"){
						HDF.construct.init(HDF.blocks.document);
					}
				})
			}
			
			if (block.name === "document") {
				let active = document.getElementsByClassName("active_block");
				while (active.length > 0) {
					active[0].classList.remove("active_block");
				}
				HDF.events.documentSidebar();
			}
		},
		id: async function (d) {
			let data = Math.random().toString(36).substr(2, 6);
			data = "hdf_" + d.name + "_" + data;
			return data;
		},
		focus: function () {
			// TODO: improve this so the order doesn't matter
			let firstInput = document.getElementById("hdf_sidebar").getElementsByTagName("input");
			let f = setFocus(firstInput);
			if (!f) {
				firstInput = document.getElementById("hdf_sidebar").getElementsByTagName("select");
				f = setFocus(firstInput);
			}
			if (!f) {
				firstInput = document.getElementById("hdf_sidebar").getElementsByTagName("checkbox");
				f = setFocus(firstInput);
			}

			function setFocus(el) {
				if (el.length > 0) {
					el[0].focus();
					return true;
				} else {
					return false;
				}
			}
		},
		block: async function (blockData = null, print = true) {
			// add or update block to the form
			let data = {};
			let type = "";
			if (blockData === null) {
				data = await getBlockData();
				if (data == false) {
					return;
				}
			} else {
				type = blockData.type;
				data = blockData;
				HDF.VARS.blocks[blockData.name] = data;
			}

			// create block html
			let html = await createBlock(data);
			if (!print) {
				return html;
			} else if (
				document.getElementById(data.name) !== null &&
				document.getElementById(data.name).getElementsByClassName("hdf-item").length > 0
			) {
				return html;
			} else {
				addBlock(html);
			}

			async function getBlockData() {
				let d = HDF.VARS.data;
				type = d.hdf_type;
				let block = HDF.blocks[type];
				if (typeof block.options != "undefined") {
					block = block.options;
				}

				let data = await getData(d, block);

				HDF.VARS.blocks[HDF.VARS.data.hdf_id] = data;
				if (HDF.VARS.data.hdf_id == "hdf_document") {
					return false; // not a real block - don't add
				} else {
					return data;
				}
			}

			async function createBlock(data) {
				if(typeof HDF.blocks[type] === "undefined"){
					console.warn(type + " is no longer and active block");
					return "";
				}
				let required = await HDF.construct.required(data);
				if (required != "") {
					required = "true";
				} else {
					required = "false";
				}

				let nested = "no";
				if (typeof HDF.blocks[type].allowChildren != "undefined" && HDF.blocks[type].allowChildren == true) {
					nested = "yes";
				}

				let sort = "yes";
				if (typeof HDF.blocks[type].allowSort != "undefined" && HDF.blocks[type].allowSort != true) {
					sort = "no";
				}

				let sortable = true;
				if (typeof HDF.blocks[type].sortable != "undefined" && HDF.blocks[type].sortable != true) {
					sortable = false;
				}

				let html = "";
				let block_handle = `<div class="block_handle">                        
				<div class="handle_icon" title="Drag to reorder">≡</div>
				<div class="block_delete" data-state="0" title="Delete this block">x</div>
			</div>`;

				if (!sortable) {
					block_handle = "";
				}

				let add_new = `<div class="add_new_block" data-block = "${data.type}" title="add new block">+</div>`;

				if (typeof HDF.blocks[type].allowNew != "undefined" && HDF.blocks[type].allowNew == false) {
					block_handle = "";
					add_new = "";
				}

				html +=
					`<div class="active_block hdf-item hdf-item-${data.type}" data-sort = "${sort}" data-children = "${nested}" data-id = "${data.name}" data-type = "${data.type}" data-required = "${required}">                
                    <div class="block_title">${data.type}</div>
                    ${block_handle}
					${add_new}` +
					(await HDF.construct.label(data)) +
					(await HDF.construct.hint(data)) +
					(await HDF.construct.notification(data)) +
					(await HDF.construct.element(data)) +
					`</div>`;
				return html;
			}

			function addBlock(html) {
				let isNew = true;
				let active = document.getElementsByClassName("active_block")[0];

				let id = active.getAttribute("data-id");
				if (id == data.name) {
					active.classList.add("hdf-delete-me");
					isNew = false;
				}
				active.insertAdjacentHTML("afterend", html);

				if (isNew) {
					active.classList.remove("active_block");
					if (active.classList.contains("hdf-item-genesis")) {
						active.remove();
					}

					let initBlock = document.getElementById("hdf-init-block");
					if (initBlock != null) {
						initBlock.remove();
					}
				} else {
					active.remove();
				}

				HDF.events.init();
			}

			async function getData(d, block) {
				// create master object
				for (let i = 0; i < block.length; i++) {
					block[i].value = d;
					if (typeof d[block[i].name] != "undefined") {
						if (typeof block[i].toggleMeta != "undefined") {
							if (typeof block[i].meta == "undefined") {
								block[i].meta = {};
							}
							block[i].meta[block[i].name] = d[block[i].name].value;
						}
						block[i].value = d[block[i].name].value;
					}
				}

				let data = {};
				data.type = type;
				data.name = HDF.VARS.data.hdf_id;
				for (let i = 0; i < block.length; i++) {
					data[block[i].name] = block[i].value;
				}

				if (typeof data.options != "undefined") {
					let o = data.options.split("\n");
					for (let i = 0; i < o.length; i++) {
						if (o[i] != "") {
							o[i] = o[i].split("|");
							if (o[i].length === 1) {
								o[i] = {
									label: o[i].join(""),
									value: o[i].join(""),
								};
							} else {
								o[i] = {
									label: o[i][0],
									value: o[i][1],
								};
							}
						}
					}
					await removeEmpty(o);
					data.options = o;

					async function removeEmpty(arr) {
						// in case of empty lines
						let i = 0;
						while (i < arr.length) {
							if (arr[i] === "") {
								arr.splice(i, 1);
							} else {
								++i;
							}
						}
						return arr;
					}
				}

				if (typeof HDF.blocks[type].extra != "undefined") {
					for (let i = 0; i < HDF.blocks[type].extra.length; i++) {
						data[HDF.blocks[type].extra[i].name] = HDF.VARS.data[HDF.blocks[type].extra[i].name].value;
					}
				}

				if (typeof HDF.blocks[type].allowToggle != "undefined" && HDF.blocks[type].allowToggle == true) {
					data.toggle_element = HDF.VARS.data.toggle_element.value;
					data.toggle_type = HDF.VARS.data.toggle_type.value;
					data.toggle_value = HDF.VARS.data.toggle_value.value;
				}

				return data;
			}
		},
		create: async function (el) {
			let type = el.getAttribute("data-block");
			await HDF.construct.init(HDF.blocks[type]);
			HDF.construct.focus();
		},
		edit: async function (el) {
			let id = el.getAttribute("data-id");
			if (typeof id == "undefined" || id == null || id == "") {
				return;
			}

			let data = HDF.VARS.blocks[id];
			let type = data.type;

			HDF.construct.init(HDF.blocks[type], data);
		},
		sidebar: async function (fields, data) {
			let d = [];
			let save_title = "UPDATE";

			if (fields.name == "document") {
				save_title = "SAVE FORM";
			}

			if (data == null) {
				save_title = "ADD";

				if (fields.name == "document") {
					save_title = "PUBLISH FORM";
				}
			}

			if (typeof fields.options != "undefined") {
				d = fields.options;
			} else if (typeof fields.children != "undefined") {
				d = fields;
			}			


			let html = "";
			html += `<div id = "hdf_sidebar_actions"><div id = "hdf_save_element" data-type = "${fields.name}" title = "save / update element" role = "button">${save_title}</div></div>`;
			
			html += `<div id = "hdf_sidebar_block_form_toggle">`;
			
			let active_form_toggle = "";
			if(save_title.includes("FORM")){
				active_form_toggle = "hdf_sidebar_block_form_toggle_active";
			}			
			
			html += `<div data-id = "form" title = "Edit Form Settings" class = "hdf_sidebar_block_form_toggle ${active_form_toggle}">
				Form
			</div>`;
			
			if(active_form_toggle === ""){
				active_form_toggle = "hdf_sidebar_block_form_toggle_active";
			} else {
				active_form_toggle = "";
			}
			
			html += `<div data-id = "block" title = "Editing Block Settings" class = "hdf_sidebar_block_form_toggle ${active_form_toggle}">
				Block
			</div>
		</div>`;	

			html += `<h3 class = "hdf_sidebar_heading">${fields.label}</h3>`;
			if (data === null && fields.name != "document") {
				let id = await HDF.construct.id(fields);
				html += `<code id = "hdf_id" data-id = "${id}">${id}</code>`;
			} else if (fields.name != "document") {
				html += `<code id = "hdf_id" data-id = "${data.name}">${data.name}</code>`;
			} else {
				if (HDF.VARS.id != "") {
					html += `<code id = "hdf_id">[hdf form = "${HDF.VARS.id}"]</code>`;
				}
			}

			if (typeof fields.hint != "undefined") {
				html += `<p class = "hdf-hint">${fields.hint}</p>`;
			}

			for (let i = 0; i < d.length; i++) {
				let required = await HDF.construct.required(d[i]);
				if (required != "") {
					required = "true";
				} else {
					required = "false";
				}

				html +=
					`<div class="hdf-item hdf-item-${d[i].type}" data-id = "${d[i].name}" data-type = "${d[i].type}" data-required = "${required}">` +
					(await HDF.construct.label(d[i])) +
					(await HDF.construct.hint(d[i])) +
					(await HDF.construct.notification(d[i])) +
					(await HDF.construct.element(d[i], data)) +
					`</div>`;
			}

			let extra_data = JSON.stringify(fields);
			extra_data = JSON.parse(extra_data); // am I smart?
			if (
				typeof extra_data.extra != "undefined" ||
				(typeof extra_data.allowToggle != "undefined" && extra_data.allowToggle == true)
			) {
				html += `<div id = "hdf_sidebar_extra">
							<h4 id = "hdf_extra_toggle" title = "show additional options">extra +</h4>
							<div id = "hdf_extra_fields">`;

				if (typeof extra_data.extra == "undefined") {
					extra_data.extra = [];
				}
				if (typeof extra_data.allowToggle != "undefined" && extra_data.allowToggle == true) {
					extra_data.extra.push({
						type: "heading",
						meta: { type: "h4" },
						name: "toggle_heading",
						label: "Toggle This Element",
					});
					extra_data.extra.push({
						type: "text",
						name: "toggle_element",
						label: "Target Element (field id)",
					});
					extra_data.extra.push({
						type: "select",
						name: "toggle_type",
						label: "Match type",
						options: [
							{
								label: "Exists",
								value: "exists",
							},
							{
								label: "Exact",
								value: "exact",
							},
							{
								label: "Includes",
								value: "includes",
							},
							{
								label: "Range",
								value: "range",
							},
						],
					});
					extra_data.extra.push({
						type: "text",
						name: "toggle_value",
						label: "Match value",
					});
				}

				for (let i = 0; i < extra_data.extra.length; i++) {
					html +=
						`<div class="hdf-item hdf-item-${extra_data.extra[i].type}" data-id = "${extra_data.extra[i].name}" data-type = "${extra_data.extra[i].type}">` +
						(await HDF.construct.label(extra_data.extra[i])) +
						(await HDF.construct.hint(extra_data.extra[i])) +
						(await HDF.construct.notification(extra_data.extra[i])) +
						(await HDF.construct.element(extra_data.extra[i], data)) +
						`</div>`;
				}

				html += "</div></div>";
			}
			return html;
		},
		duplicate: async function (el) {
			let id = document.getElementById("hdf_form_wrapper").getElementsByClassName("active_block");
			if (id.length == 0) {
				return;
			}

			id = id[0].getAttribute("data-id");
			let block = HDF.VARS.blocks[id];

			if (typeof block.children == "undefined" || block.children.length == 0) {
				alert("You may need to save the form before being able to duplicate this section");
				return; // no point in dupicating an empty section
			}

			id = await HDF.construct.id({ name: "section" });
			// set a new block with data from the old
			HDF.VARS.blocks[id] = JSON.stringify(block);
			HDF.VARS.blocks[id] = JSON.parse(HDF.VARS.blocks[id]); // smrt
			HDF.VARS.blocks[id].name = id;
			// loop through the children to also generate new IDs
			for (let i = 0; i < HDF.VARS.blocks[id].children.length; i++) {
				let c = HDF.VARS.blocks[id].children[i];
				c.name = await HDF.construct.id({ name: c.type });
			}

			// great! now let's actually add the block group to the page
			await HDF.construct.block(HDF.VARS.blocks[id]);

			// reset active
			let active = document.getElementsByClassName("active_block");
			while (active.length > 0) {
				active[0].classList.remove("active_block");
			}

			active = document.querySelector('.hdf-item[data-id="' + id + '"]');
			if (active != null) {
				active.click();
			}
		},
		required: async function (d) {
			let required = "";
			if (typeof d.required != "undefined" && (d.required == true || d.required == "yes")) {
				required = `required = ""`;
			}
			return required;
		},
		label: async function (d) {
			// TODO: create a label: false param
			if (
				d.type == "heading" ||
				d.type == "content" ||
				d.type == "columns" ||
				d.type == "column" ||
				d.type == "section" ||
				d.type == "genesis"
			) {
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
		placeholder: async function (d) {
			let placeholder = "";
			if (typeof d.placeholder != "undefined" && d.placeholder.length > 0) {
				placeholder = d.placeholder;
			}
			return placeholder;
		},
		prefix: async function (d) {
			let html = "";
			if (typeof d.prefix != "undefined") {
				html = `<span class = "hdf-fix">${d.prefix}</span>`;
			}
			return html;
		},
		postfix: async function (d) {
			let html = "";
			if (typeof d.postfix != "undefined") {
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
		element: async function (d, blockData = null) {
			// construct the input
			let html = "";
			if (typeof d.prefix != "undefined" && d.prefix != "") {
				html = '<div class = "hdf-prefix">';
				html += await HDF.construct.prefix(d);
				html += await HDF.construct.elements[d.type](d, blockData);
				html += "</div>";
			} else if (typeof d.postfix != "undefined" && d.postfix != "") {
				html = '<div class = "hdf-postfix">';
				html += await HDF.construct.elements[d.type](d, blockData);
				html += await HDF.construct.postfix(d);
				html += "</div>";
			} else {
				html = await HDF.construct.elements[d.type](d, blockData);
			}
			return html;
		},
		getValue: async function (d, blockData) {
			let v = "";
			if (blockData != null) {
				if (typeof blockData[d.name] != "undefined") {
					v = blockData[d.name];

					// TODO: check to make sure this is an array before continuing
					if (d.name === "options") {
						// convert array into text again
						let data = "";
						for (let i = 0; i < v.length; i++) {
							if (v[i].value != "") {
								data += v[i].label + "|" + v[i].value;
								if (i != v.length) {
									data += "\n";
								}
							}
						}
						v = data;
					}
				}
			}
			return v;
		},
		elements: {
			document: async function (d, blockData = null) {
				return "";
			},
			section: async function (d, blockData = null) {
				let children = "";
				if (typeof d.children != "undefined" && d.children.length > 0) {
					children = await getChildren(d);
				} else {
					let block = {
						type: "genesis",
						name: await HDF.construct.id({ name: "genesis" }),
					};
					children = await HDF.construct.block(block, false);
				}

				return `<div class = "hdf-section-container hdf-section" data-children = "yes" id = "${d.name}">${children}</div>`;

				async function getChildren(d) {
					let children = [];
					if (typeof d.children != "undefined") {
						children = d.children;
					}
					// HDF.construct.item(children, false)
					let html = "";
					for (let i = 0; i < children.length; i++) {
						html += await HDF.construct.block(children[i], false);
					}
					return html;
				}
			},
			genesis: async function (d) {
				return `<p style="text-align: center; padding: 0.4em; margin: 0"> - - </p>`;
			},
			button: async function (d) {
				let onclick = "";
				if (typeof d.onClick != "undefined") {
					onclick = d.onClick + "(this)";
				}
				return `<div class = "hdf-button2" onClick = "${onclick}">${d.name}</div>`;
			},
			columns: async function (d, blockData = null) {
				let type = "col-1-1";
				if (typeof d.meta != "undefined" && typeof d.meta.type != "undefined") {
					type = d.meta.type;
				} else {
					if (typeof d.columns != "undefined") {
						type = d.columns;
					}
				}
				let children = "";

				if (type == "col-1-1") {
					if (typeof d.children != "undefined" && d.children.length > 0) {
						children = await getChildren(d);
					} else {
						let column1 = {
							type: "column",
							name: await HDF.construct.id({ name: "column" }),
						};
						let column2 = {
							type: "column",
							name: await HDF.construct.id({ name: "column" }),
						};

						children += await HDF.construct.block(column1, false);
						children += await HDF.construct.block(column2, false);
					}
				} else if (type == "col-1-1-1") {
					if (typeof d.children != "undefined" && d.children.length > 0) {
						children = await getChildren(d);
					} else {
						let column1 = {
							type: "column",
							name: await HDF.construct.id({ name: "column" }),
						};
						let column2 = {
							type: "column",
							name: await HDF.construct.id({ name: "column" }),
						};
						let column3 = {
							type: "column",
							name: await HDF.construct.id({ name: "column" }),
						};

						children += await HDF.construct.block(column1, false);
						children += await HDF.construct.block(column2, false);
						children += await HDF.construct.block(column3, false);
					}
				}

				async function getChildren(d) {
					let children = [];
					if (typeof d.children != "undefined") {
						children = d.children;
					}
					let html = "";
					for (let i = 0; i < children.length; i++) {
						html += await HDF.construct.block(children[i], false);
					}
					return html;
				}

				return `<div class = "hdf-columns hdf-${type}" data-sort = "no" data-children = "yes" id = "${d.name}">${children}</div>`;
			},
			column: async function (d, blockData = null) {
				if (typeof d.children != "undefined" && d.children.length > 0) {
					let children = await getChildren(d);
					return children;
				} else {
					let block = {
						type: "genesis",
						name: await HDF.construct.id({ name: "genesis" }),
					};
					return await HDF.construct.block(block, false);
				}

				async function getChildren(d) {
					let children = [];
					if (typeof d.children != "undefined") {
						children = d.children;
					}
					// HDF.construct.item(children, false)
					let html = "";
					for (let i = 0; i < children.length; i++) {
						html += await HDF.construct.block(children[i], false);
					}
					return html;
				}
			},
			heading: async function (d, blockData = null) {
				let type = "h2";
				if (typeof d.meta != "undefined" && typeof d.meta.type != "undefined") {
					type = d.meta.type;
				}
				if (typeof d.heading_type != "undefined") {
					type = d.heading_type;
				}
				return `<${type} class = "hdf-heading hdf-heading-${type}">${d.label}</${type}>`;
			},
			content: async function (d, blockData = null) {
				let content = "";
				if (typeof d.content != "undefined") {
					content = d.content;
				}
				return content;
			},
			text: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);

				let v = await HDF.construct.getValue(d, blockData);
				return `<input type = "text" id = "${d.name}"  ${meta} class = "hdf-input hdf-text" placeholder = "${placeholder}" ${required} value = "${v}"/>`;
			},
			email: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				let v = await HDF.construct.getValue(d, blockData);
				return `<input type = "email" id = "${d.name}"  ${meta} class = "hdf-input hdf-email" placeholder = "${placeholder}" ${required} value = "${v}"/>`;
			},
			textarea: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				// set default rows
				// TODO: allow for row size in meta
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
				let v = await HDF.construct.getValue(d, blockData);
				return `<textarea id = "${d.name}"  ${meta} class = "hdf-input hdf-textarea" placeholder = "${placeholder}" ${required}>${v}</textarea>`;
			},
			editor: async function (d, blockData = null) {
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
				let v = "This textarea will be replaced with the editor on when the full form is created";
				return `<textarea id = "${d.name}"  ${meta} class = "hdf-input hdf-editor" placeholder = "${placeholder}" ${required}>${v}</textarea>`;
			},
			integer: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				let v = await HDF.construct.getValue(d, blockData);
				return `<input type = "number" id = "${d.name}" ${meta} class = "hdf-input hdf-integer hdf-number" placeholder = "${placeholder}" ${required} value = "${v}"/>`;
			},
			float: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				let v = await HDF.construct.getValue(d, blockData);
				return `<input type = "number" id = "${d.name}" ${meta} class = "hdf-input hdf-float hdf-number" placeholder = "${placeholder}" ${required} value = "${v}"/>`;
			},
			phone: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let placeholder = "(xxx) xxx xxxx";
				let meta = await HDF.construct.meta(d);
				let v = await HDF.construct.getValue(d, blockData);
				return `<input type = "text" id = "${d.name}" ${meta} class = "hdf-input hdf-phone" placeholder = "${placeholder}" ${required} value = "${v}"/>`;
			},
			website: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let placeholder = "https://";
				let meta = await HDF.construct.meta(d);
				let v = await HDF.construct.getValue(d, blockData);
				return `<input type = "text" id = "${d.name}" ${meta} class = "hdf-input hdf-website" placeholder = "${placeholder}" ${required} value = "${v}"/>`;
			},
			date: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let meta = await HDF.construct.meta(d);

				let day = `<div>${await HDF.construct.label({
					type: "text",
					label: "day",
					required: required,
				})}<input type = "number" step = "1" min = "1" max = "31" class = "hdf-input hdf-number hdf-number" placeholder = "DD" ${required}></div>`;
				let month = `<div>${await HDF.construct.label({
					type: "text",
					label: "month",
					required: required,
				})}<input type = "number" step = "1" min = "1" max = "12" class = "hdf-input hdf-number hdf-number" placeholder = "MM" ${required}></div>`;
				let year = `<div>${await HDF.construct.label({
					type: "text",
					label: "year",
					required: required,
				})}<input type = "number" step = "1" min = "1900" max = "2030" class = "hdf-input hdf-number hdf-number" placeholder = "YYYY" ${required}></div>`;

				let children = day + month + year;
				let v = await HDF.construct.getValue(d, blockData);
				// TODO: figure out best way to set this
				return `<div id = "${d.name}" class = "hdf-date hdf-columns hdf-col-1-1-1"/>${children}</div>`;
			},
// 			upload: async function (d, blockData = null) {
// 				let max = "";
// 				if (typeof d.max_file_size != "undefined" && d.max_file_size != "") {
// 					max = parseInt(d.max_file_size);
// 				}

// 				let accept = "*";
// 				if (typeof d.allowed_files != "undefined" && d.allowed_files != "") {
// 					accept = d.allowed_files;
// 				}

// 				let limits = "";
// 				if (max > 0) {
// 					limits += `<br/><small>max filesize ${max}kB</small>`;
// 				}

// 				const icon = `<svg class = "hdf-upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.056 512.056"><path d="M426.635 188.224C402.969 93.946 307.358 36.704 213.08 60.37 139.404 78.865 85.907 142.542 80.395 218.303 28.082 226.93-7.333 276.331 1.294 328.644c7.669 46.507 47.967 80.566 95.101 80.379h80v-32h-80c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64 8.837 0 16-7.163 16-16-.08-79.529 64.327-144.065 143.856-144.144 68.844-.069 128.107 48.601 141.424 116.144a16 16 0 0013.6 12.8c43.742 6.229 74.151 46.738 67.923 90.479-5.593 39.278-39.129 68.523-78.803 68.721h-64v32h64c61.856-.187 111.848-50.483 111.66-112.339-.156-51.49-35.4-96.241-85.42-108.46z"/><path d="M245.035 253.664l-64 64 22.56 22.56 36.8-36.64v153.44h32v-153.44l36.64 36.64 22.56-22.56-64-64c-6.241-6.204-16.319-6.204-22.56 0z"/></svg>`;

// 				return `<label for="${d.name}" class="hdf-file-drag">
// 					<div class="hdf-upload-start">
// 						<div class = "hdf-upload-message">select a file or drag here${limits}</div>
// 						<span class="hdf-file-upload-button" title = "upload a file">
// 							<span class = "hdf-upload-icon">${icon}</span>
// 							<span class = "hdf-upload-text">select a file</span>
// 						</span>
// 					</div>
// 				</label>`;
// 			},
			currency: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				let v = await HDF.construct.getValue(d, blockData);
				return `<div class = "hdf-prefix hdf-currency"><div class = "hdf-fix">$</div><input type = "number" id = "${d.name}" ${meta} class = "hdf-input" placeholder = "${placeholder}" ${required} value = "${v}"/></div>`;
			},
			select: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let placeholder = await HDF.construct.placeholder(d);
				let meta = await HDF.construct.meta(d);
				let options = "";
				let v = await HDF.construct.getValue(d, blockData);
				if (placeholder != "") {
					options += `<option value = "">${placeholder}</option>`;
				}
				if (required != "" && placeholder == "") {
					options += `<option value = ""> - - </option>`;
				}

				if (typeof (d.options != "undefined")) {
					for (let i = 0; i < d.options.length; i++) {
						let selected = "";
						if (v == d.options[i].value) {
							selected = "selected";
						}
						options += `<option value = "${d.options[i].value}" ${selected}>${d.options[i].label}</option>`;
					}
				}

				return `<select id = "${d.name}" ${meta} class = "hdf-input hdf-select" ${required}>${options}</select>`;
			},
			radio: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let options = "";
				let v = await HDF.construct.getValue(d, blockData);
				if (typeof (d.options != "undefined")) {
					for (let i = 0; i < d.options.length; i++) {
						let checked = "";
						if (v == d.options[i].value) {
							checked = "checked";
						}
						options += `<div class="hdf-options-check">
							<input type="checkbox" id="${d.name}_${i}" class = "hdf-radio-input" data-id = "${d.name}" value="${d.options[i].value}" name="${d.name}_${i}" ${checked}/>
							<label for="${d.name}_${i}" data-title="null" title="null"></label>
						</div>
						<label class="non-block" for="${d.name}_${i}" data-title="null" title="null">${d.options[i].label}</label>`;
					}
				}
				return `<div class="hdf-check-row" data-value = "${v}" id = "hdf-item-wrapper_${d.name}">${options}</div>`;
			},
			checkbox: async function (d, blockData = null) {
				let required = await HDF.construct.required(d);
				let options = "";
				let v = await HDF.construct.getValue(d, blockData);
				if (typeof (d.options != "undefined")) {
					for (let i = 0; i < d.options.length; i++) {
						let checked = "";
						if (v == d.options[i].value) {
							checked = "checked";
						}
						options += `<div class="hdf-options-check">
							<input type="checkbox" id="${d.name}_${i}" class = "hdf-checkbox-input" data-id = "${d.name}" value="${d.options[i].value}" name="${d.name}_${i}" ${checked}/>
							<label for="${d.name}_${i}" data-title="null" title="null"></label>
						</div>
						<label class="non-block" for="${d.name}_${i}" data-title="null" title="null">${d.options[i].label}</label>`;
					}
				}
				return `<div class="hdf-check-row" data-value = "" id = "hdf-item-wrapper_${d.name}">${options}</div>`;
			},
// 			hidden: async function (d, blockData = null) {
// 				let v = await HDF.construct.getValue(d, blockData);
// 				return `<input type = "text" id = "${d.name}" class = "hdf-input hdf-hidden" value = "this is a hidden field" readonly/>`;
// 			},			
		},
	},
	validate: {
		init: async function () {
			HDF.VARS.data = []; // clear any prev data
			HDF.VARS.data.hdf_type = document.getElementById("hdf_save_element").getAttribute("data-type");
			HDF.VARS.data.hdf_id = "hdf_document";

			let block_id = document.getElementById("hdf_id");
			if (typeof block_id != "undefined" && block_id != null) {
				HDF.VARS.data.hdf_id = block_id.getAttribute("data-id");
			}

			let items = document.getElementById("hdf_sidebar").getElementsByClassName("hdf-item");

			let validated = await getValues(items);

			if (validated) {
				return true;
			} else {
				return false;
			}

			async function getValues(items) {
				// loop though each field and validate the input
				let validated = true;
				for (let i = 0; i < items.length; i++) {
					let type = items[i].getAttribute("data-type");
					if (type != null && type != "column" && type != "section" && type != "content") {
						let v = await HDF.validate.value[type](items[i]);
						if (v.value == "") {
							// if element is required
							if (items[i].getAttribute("data-required") === "true") {
								let valid = await HDF.validate.required(items[i]);
								if (valid !== true) {
									validated = false;
									await HDF.validate.notification(items[i]);
								} else {
									await HDF.validate.notification(items[i], false);
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

						HDF.VARS.data[items[i].getAttribute("data-id")] = v;
					}
				}
				return validated;
			}
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
			} else {
				if (radios.length == 1) {
					radio.setAttribute("data-value", "");
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
			text: async function (item) {
				return {
					value: item.getElementsByClassName("hdf-input")[0].value || "",
					type: "text",
					valid: true,
				};
			},
			email: async function (item) {
				let v = item.getElementsByClassName("hdf-input")[0].value || "";
				let vv = v.split(",");
				let valid = true;
				for(let i = 0; i < vv.length; i++){
					 vv[i] = vv[i].trim();
					 if(!await isValid(vv[i])){
						 valid = false;
					 }
				}				
				v = vv.join(",");				
				return {
					value: v,
					type: "email",
					valid: valid,
				};

				async function isValid(email = "") {
					var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
				let id = item.getElementsByClassName("hdf-input")[0].getAttribute("id");
				HDF.VARS.editors[id].save();

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

				if (
					typeof item.getAttribute("min") != "undefined" &&
					item.getAttribute("min") != null &&
					v < parseInt(item.getAttribute("min"))
				) {
					valid = false;
				}
				if (
					typeof item.getAttribute("max") != "undefined" &&
					item.getAttribute("min") != null &&
					v > parseInt(item.getAttribute("max"))
				) {
					valid = false;
				}
				if (
					typeof item.getAttribute("maxlength") != "undefined" &&
					item.getAttribute("maxlength") != null &&
					l > parseInt(item.getAttribute("maxlength"))
				) {
					valid = false;
				}
				if (
					typeof item.getAttribute("minlength") != "undefined" &&
					item.getAttribute("minlength") != null &&
					l < parseInt(item.getAttribute("minlength"))
				) {
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
					var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
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
				data = data.join(",");
				return {
					value: data,
					type: "checkbox",
					valid: true,
				};
			},
			button: async function () {
				return {
					type: "button",
					value: "",
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
	save: async function () {
		let form = await getForm();
		if (form.valid) {
			form.data = HDF.VARS.blocks.hdf_document;
			form.data.id = HDF.VARS.id;
			// SEND TO DATABASE
			console.log(form);
			let hdfnonce = document.getElementById("hdforms_nonce").value;
			// send data to admin_ajax
			form.action = "hdf_save_form";
			let admin_ajax = ajaxurl;
			let response = await fetch(admin_ajax, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
				},
				body: "action=hdf_save_form&hdfnonce=" + hdfnonce + "&hdform=" + JSON.stringify(form),
				credentials: "same-origin",
			});
			let result = await response.text();
			console.log(result);
			result = JSON.parse(result);
			if (result.success == true) {
				HDF.VARS.id = result.id;
				HDF.construct.sidebar(HDF.blocks.document);
			}

			let submit = document.getElementById("hdf_save_element");
			submit.classList.remove("disabled");
		}

		async function getForm() {
			let data = {
				valid: true,
				data: [],
				blocks: [],
			};

			data.valid = await checkMandatory();

			if (data.valid) {
				data.blocks = await getData();
			}

			async function checkMandatory() {
				let valid = true;
				let title = document.getElementById("hdf_title").value;
				if (title == "") {
					document.getElementById("hdf_title").classList.add("hdf_error_validate");
					valid = false;
				} else {
					document.getElementById("hdf_title").classList.remove("hdf_error_validate");
					HDF.VARS.blocks.hdf_document.title = title;
				}

				if (typeof HDF.VARS.blocks.hdf_document == "undefined" || HDF.VARS.blocks.hdf_document.send_to_email == "") {
					await HDF.construct.init(HDF.blocks.document);
					document.getElementById("send_to_email").parentElement.classList.add("hdf-error");
					valid = false;
				}
				return valid;
			}

			return data;
		}

		async function getData() {
			let data = [];
			const all_items = document.getElementById("hdf_form_wrapper").getElementsByClassName("hdf-item");
			let document_items = [];
			for (let i = 0; i < all_items.length; i++) {
				let parent = all_items[i].parentElement.getAttribute("id");
				if (parent == "hdf_form_wrapper") {
					document_items.push(all_items[i]);
				}
			}

			data = await getBlocks(document_items);

			async function getBlocks(items) {
				let data = [];
				// need to figure out best way to save data with nested elements
				for (let i = 0; i < items.length; i++) {
					let d = await getBlockData(items[i]);

					if (d != null) {
						let nested = items[i].getAttribute("data-children");
						if (nested == "yes") {
							let children = [];
							let type = items[i].getAttribute("data-type");
							if (type == "columns") {
								children = items[i].querySelectorAll(":scope > .hdf-columns > .hdf-item");
							} else if (type == "section") {
								children = items[i].querySelectorAll(":scope > .hdf-section > .hdf-item");
							} else {
								children = items[i].querySelectorAll(":scope > .hdf-item");
							}

							if (children.length > 0) {
								d.children = await getBlocks(children);
							}
						}
						data.push(d);
					}
				}
				return data;
			}

			return data;

			async function getBlockData(el) {
				let id = el.getAttribute("data-id");
				let block = null;
				if (typeof HDF.VARS.blocks[id] != "undefined") {
					block = HDF.VARS.blocks[id];
				}
				return block;
			}
		}
	},
	load: async function (data) {
		console.log(data);

		// set document data
		HDF.VARS.blocks.hdf_document = {};
		let form = data.form;
		for (k in form) {
			HDF.VARS.blocks.hdf_document[k] = form[k];
		}

		document.getElementById("hdf_title").value = HDF.VARS.blocks.hdf_document.title;

		let blocks = data.blocks;
		let html = "";
		for (let i = 0; i < blocks.length; i++) {
			html += await HDF.construct.block(blocks[i], false);
		}

		document.getElementById("hdf_form_wrapper").innerHTML = html;
	},
};
HDF.init();

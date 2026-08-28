/* ------------------------------------------------------------
   classic.js - small helper script
   Deniz Meral - Engineering site
   Plain JavaScript, no libraries required.
   ------------------------------------------------------------ */

(function () {
	"use strict";

	/* Highlight the navigation tab matching the current page.
	   The class is normally set in the markup; this is a fallback
	   for cases where the page is opened without a file name. */
	function markCurrentTab() {
		var links = document.getElementById("navbar");
		var path, i, anchors, href;

		if (!links) { return; }

		path = window.location.pathname;
		if (path === "/" || path === "") { path = "/index.html"; }

		anchors = links.getElementsByTagName("a");
		for (i = 0; i < anchors.length; i++) {
			href = anchors[i].getAttribute("href");
			if (href === path) {
				anchors[i].className = "current";
			}
		}
	}

	/* Zebra-stripe any data table that was not striped by hand. */
	function stripeTables() {
		var tables = document.getElementsByTagName("table");
		var t, rows, r, count;

		for (t = 0; t < tables.length; t++) {
			if (tables[t].className.indexOf("data") === -1) { continue; }

			rows = tables[t].getElementsByTagName("tr");
			count = 0;
			for (r = 0; r < rows.length; r++) {
				if (rows[r].getElementsByTagName("th").length > 0) { continue; }
				count++;
				if (count % 2 === 0 && rows[r].className === "") {
					rows[r].className = "alt";
				}
			}
		}
	}

	/* Print the document modification date in the footer. */
	function showLastUpdated() {
		var el = document.getElementById("lastUpdated");
		var months = strings().months;
		var d;

		if (!el || !document.lastModified) { return; }

		d = new Date(document.lastModified);
		if (isNaN(d.getTime())) { return; }

		el.innerHTML = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
	}

	/* Wording for the two languages the site is published in.
	   The page declares its own language on the <html> element. */
	var TEXT = {
		en: {
			empty: "Please write a message before sending.",
			confirm: "This will open a new message in your own mail program, " +
			         "addressed to deniztunameral@gmail.com. Continue?",
			months: ["January", "February", "March", "April", "May", "June",
			         "July", "August", "September", "October", "November", "December"]
		},
		tr: {
			empty: "L\u00fctfen g\u00f6ndermeden \u00f6nce bir ileti yaz\u0131n.",
			confirm: "Bu i\u015flem, deniztunameral@gmail.com adresine yaz\u0131lm\u0131\u015f yeni bir iletiyi " +
			         "kendi posta program\u0131n\u0131zda a\u00e7acak. Devam edilsin mi?",
			months: ["Ocak", "\u015eubat", "Mart", "Nisan", "May\u0131s", "Haziran",
			         "Temmuz", "A\u011fustos", "Eyl\u00fcl", "Ekim", "Kas\u0131m", "Aral\u0131k"]
		}
	};

	function strings() {
		var lang = document.documentElement.getAttribute("lang");
		return (lang === "tr") ? TEXT.tr : TEXT.en;
	}

	/* Confirm before handing the contact form to the mail client,
	   since the message is composed locally rather than sent by the site. */
	function prepareContactForm() {
		var form = document.getElementById("contactForm");
		if (!form) { return; }

		form.onsubmit = function () {
			var body = document.getElementById("messageBody");
			var t = strings();
			if (body && body.value.replace(/^\s+|\s+$/g, "") === "") {
				window.alert(t.empty);
				body.focus();
				return false;
			}
			return window.confirm(t.confirm);
		};
	}

	function init() {
		markCurrentTab();
		stripeTables();
		showLastUpdated();
		prepareContactForm();
	}

	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", init, false);
	} else {
		window.onload = init;
	}
}());

//#region src/js/hbi_common.js
var e = {}, t = {
	THESE: {
		icon: "fa-graduation-cap",
		title_en: "Thesis",
		label_en: "thesis"
	},
	ART: {
		icon: "fa-newspaper",
		title_en: "Journal articles",
		label_en: "articles"
	},
	UNDEFINED: {
		icon: "fa-file-pen",
		title_en: "Preprint",
		label_en: "preprints"
	},
	COMM: {
		icon: "fa-microphone",
		title_en: "Communications",
		label_en: "congress"
	},
	POSTER: {
		icon: "fa-image",
		title_en: "Poster",
		label_en: "posters"
	},
	OUV: {
		icon: "fa-book",
		title_en: "Book",
		label_en: "books"
	},
	COUV: {
		icon: "fa-book",
		title_en: "Book Chapters",
		label_en: "chapters"
	},
	LECTURE: {
		icon: "fa-book-open",
		title_en: "Lectures",
		label_en: "lectures"
	},
	PATENT: {
		icon: "fa-lightbulb",
		title_en: "Patents",
		label_en: "patents"
	},
	SOFTWARE: {
		icon: "fa-microchip",
		title_en: "Softwares",
		label_en: "softwares"
	},
	PROCEEDINGS: {
		icon: "fa-file",
		title_en: "Proceedings",
		label_en: "proceedings"
	}
};
function n(e = null) {
	let t = document.createElement("div");
	t.classList = "hbi-spinner", e && (t.id = e);
	let n = document.createElement("div");
	n.classList.add("lds-ellipsis");
	for (let e = 1; e <= 4; e++) n.appendChild(document.createElement("div"));
	return t.appendChild(n), t;
}
//#endregion
export { e as n, t as r, n as t };

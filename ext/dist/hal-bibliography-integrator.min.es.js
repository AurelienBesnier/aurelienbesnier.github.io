import { n as e, r as t, t as n } from "./hbi_common-BSIFbbe7.js";
//#region src/js/hbi_api.js
var r = "https://api.archives-ouvertes.fr/search";
async function i(e, t = !1) {
	try {
		let i = new URLSearchParams(e);
		var n = new URL(r);
		return n.search = i.toString(), t && console.log("[HAL API REQUEST]", n.toString()), (await (await fetch(n)).json()).response.docs;
	} catch (e) {
		throw console.error("HAL API ERROR", {
			url: n?.toString(),
			error: e.message
		}), e;
	}
}
//#endregion
//#region src/js/hbi_utils.js
var a = "hal-bibliography-integrator", o = "hbiMainDone", s = "hbiArticleDone";
function c(e) {
	let t = new Event(e);
	document.dispatchEvent(t);
}
function l() {
	c(s);
}
function u() {
	c(o);
}
function d(e) {
	if (e === void 0) throw Error("hbi_config is not defined");
	if (e.id === void 0) throw Error("No 'id' defined in hbi_config");
	if (e.id == "") throw Error("'id' defined in hbi_config cannot be empty");
	if (e.typeList === void 0) throw Error("'typeList' key is not defined in hbi_config");
	return e.doit === void 0 && (e.doit = !0), e.debug === void 0 && (e.debug = !1), e.debug && console.log("HBI CONFIG INFO: Debug mode is activated for HBI"), (e.onLoad === void 0 || e.onLoad !== "expanded" && e.onLoad !== "collapsed") && (e.onLoad = "expanded", e.debug && console.log("HBI CONFIG INFO: 'onLoad' key undefined, default behavior is set to expanded")), !0;
}
//#endregion
//#region src/js/hbi_collapse.js
function f(e) {
	e.preventDefault();
	let t = e.target.closest("button"), n = document.getElementById(t.getAttribute("data-target").replace("#", ""));
	n.style.display === "none" ? (n.style.display = "block", t.querySelector(".icon-drop_down").classList.remove("fa-rotate-by")) : (n.style.display = "none", t.querySelector(".icon-drop_down").classList.add("fa-rotate-by"));
}
//#endregion
//#region src/js/hbi_citations.js
function p(e, t = !1) {
	let n = "hbi-citation-biblatex-" + e, r = document.getElementById(n);
	navigator.clipboard.writeText(r.innerText), t && (console.log("Copy text to clipboard"), console.log(r.innerText));
	let i = r.parentElement.querySelector("[id='hbi-copy-success']");
	i.classList.remove("hidden"), i.classList.add("visible"), setTimeout(function() {
		i.classList.add("hidden"), i.classList.remove("visible");
	}, 3e3);
}
//#endregion
//#region src/js/hbi_publications.js
function m(e, r, i = !1) {
	let a = document.createElement("div");
	a.classList.add("hbi-list"), a.id = `hbi-${e}`;
	let o = document.createElement("button");
	o.id = `hbi-btn-${e}`, o.classList.add("hbi-btn"), o.setAttribute("data-target", `#${e}`);
	let s = document.createElement("i");
	s.classList.add("hbi-icon", "fa-solid", t[e].icon), o.appendChild(s);
	let c = document.createElement("a");
	c.id = `hbi-${e}-card-title`, c.textContent = t[e].title_en, o.appendChild(c);
	let l = document.createElement("i");
	l.classList.add("hbi-icon", "icon-drop_down", "fa-solid", "fa-caret-down"), o.appendChild(l), o.addEventListener("click", f), a.appendChild(o);
	let u = n(`hbi-${e}-spinner`);
	a.appendChild(u);
	let d = document.createElement("div");
	d.classList.add("hbi-content"), d.id = e;
	let p = document.createElement("table");
	p.classList.add("hbi-results-table");
	let m = document.createElement("tbody");
	return m.id = `hbi-${e}-table`, p.appendChild(m), d.appendChild(p), a.appendChild(d), a;
}
async function h(n, r, a, o = !1) {
	let s = {
		q: `authIdHal_s: ${n}`,
		rows: "10000",
		fl: [
			"title_s",
			"halId_s",
			"citationRef_s",
			"defenseDateY_i",
			"journalTitle_s",
			"authFullName_s",
			"publicationDate_tdate",
			"fileMain_s",
			"thumbId_i",
			"label_bibtex",
			"en_keyword_s",
			"journalIssn_s",
			"journalEissn_s",
			"doiId_s",
			"docid",
			"producedDateY_i",
			"publicationDateY_i",
			"docType_s",
			"keyword_s",
			"fr_keyword_s",
			"domain_s",
			"doi_s"
		],
		fq: `docType_s: ${r}`,
		sort: "publicationDate_tdate desc",
		wt: "json"
	};
	return o && (console.log(`API request parameters for type: ${r}`), console.log(s)), i(s, o).then((n) => {
		e[r] = n, document.getElementById(`hbi-${r}-card-title`).innerText = `${t[r].title_en} (${n.length})`;
		var i = document.getElementById(`hbi-${r}-table`);
		for (let e of n) {
			o && console.log(e);
			let t = document.createElement("tr");
			t.id = `row-${e.halId_s}`;
			let n = document.createElement("td");
			if (n.classList.add("d-sm-table-cell"), e.thumbId_i) {
				let t = document.createElement("a");
				t.href = e.fileMain_s, t.target = "_blank";
				let r = document.createElement("div");
				r.classList.add("hbi-media", "d-sm-block");
				let i = document.createElement("img");
				i.src = `https://thumb.ccsd.cnrs.fr/${e.thumbId_i}/thumb`, i.alt = "Image document", r.appendChild(i), t.appendChild(r), n.appendChild(t);
			}
			let r = document.createElement("td");
			r.classList.add("hbi-title");
			let a = document.createElement("a");
			a.href = `https://hal.science/${e.halId_s}`, a.target = "_blank";
			let s = document.createElement("h3");
			s.classList.add("title-results"), s.textContent = e.title_s[0], a.appendChild(s), r.appendChild(a);
			let c = e.authFullName_s.length;
			for (let t of e.authFullName_s) {
				let e = document.createElement("a");
				e.href = `https://hal.science/search/?q=*&authFullName_s=${t}`, e.alt = "Documents de l auteur", e.target = "_blank", e.textContent = t, r.appendChild(e), --c && r.appendChild(document.createTextNode(" ; "));
			}
			let l = document.createElement("div");
			l.classList.add("citation-results"), l.innerHTML = e.citationRef_s, r.appendChild(document.createElement("br")), r.appendChild(l);
			let u = document.createElement("div");
			if (u.classList.add("export-result"), e.thumbId_i) {
				let t = document.createElement("a");
				t.href = e.fileMain_s, t.target = "_blank", t.classList.add("hbi-export-pdf");
				let n = document.createElement("i");
				n.classList.add("fa-regular", "fa-file-pdf"), t.appendChild(n), u.appendChild(t);
			}
			let d = document.createElement("a");
			d.classList.add("hbi-export-cite"), d.addEventListener("click", () => {
				p(e.halId_s, o);
			}), d.title = "Copy BibLatex Citation";
			let f = document.createElement("i");
			f.classList.add("fa-solid", "fa-quote-right");
			let m = document.createElement("a");
			m.id = "hbi-copy-success", m.classList.add("hbi-citation-copy-success", "hidden"), m.textContent = "BibLatex citation copied";
			let h = document.createElement("p");
			h.classList.add("hbi-biblatex-citation"), h.id = `hbi-citation-biblatex-${e.halId_s}`, h.textContent = e.label_bibtex, d.appendChild(f), d.appendChild(m), d.appendChild(h), u.appendChild(d), r.appendChild(u), t.appendChild(n), t.appendChild(r), i.appendChild(t);
		}
		document.getElementById("hbi-" + r + "-spinner").style.display = "none", document.getElementById("hbi-" + r).style.display = "block", a.toLowerCase() === "collapsed" && (document.getElementById(r).style.display = "none", document.getElementById("hbi-btn-" + r).querySelector(".icon-drop_down").classList.add("fa-rotate-by")), MathJax.typesetPromise([document.getElementById(r)]), r === "ART" && l();
	}).catch((e) => console.error(e));
}
function g(e, t, n, r, i) {
	var a = [];
	for (let o of t) n.appendChild(m(o, r)), a.push(h(e, o, r, i));
	return Promise.all(a).then(() => {
		u();
	}), !0;
}
//#endregion
//#region src/js/main.js
function _(e, t, n, r) {
	var i = document.getElementById(a);
	if (!i) throw Error("HBI: No HAL publication div found on this page");
	r && (console.log("HBI DEBUG: Target container"), console.log(i)), g(e, t, i, n, r);
}
function v(e) {
	try {
		d(e);
	} catch (e) {
		return console.error("HBI CONFIG ERROR:", e), -1;
	}
	let t = e.debug;
	if (!e.doit) return t && console.warn("HBI: Execution skipped because 'doit' is false."), 0;
	t && (console.log("HBI INFO: config"), console.log(e)), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", _(e.id, e.typeList, e.onLoad, t)) : _(e.id, e.typeList, e.onLoad, t);
}
//#endregion
export { v as hbi_start };

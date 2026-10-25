/* ==========================================================
   VOLTIX ENERGY — shared site script (no build step needed)
   ========================================================== */
(function () {
  "use strict";
  var C = window.VOLTIX_CONFIG || {};
  var P = window.VOLTIX_PRODUCTS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  /* ---------- icons ---------- */
  var IC = {
    battery: '<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 10.5v3M6 12h5"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    bike: '<circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M5.5 17L9 8h5l4.5 9M9 8H7M14 8l-2 9"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/>',
    plug: '<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    support: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chat: '<path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
    leaf: '<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l8-8"/>'
  };
  function icon(n, w) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[n] || "") + "</svg>"; }
  window.VoltixIcon = icon;

  /* ---------- logo ---------- */
  var MARK = '<img src="logo.png" alt="Voltix Energy logo" width="38" height="38">';
  /* ---------- config helpers ---------- */
  var digits = function (s) { return String(s || "").replace(/\D/g, ""); };
  var hasWA = function () { return digits(C.whatsappNumber).length >= 10; };
  function waUrl(text) {
    if (!hasWA()) return "contact.html#inquiry";
    return "https://wa.me/" + digits(C.whatsappNumber) + "?text=" + encodeURIComponent(text || C.messages.general);
  }
  function waMsg(key, extra) { var m = C.messages[key] || C.messages.general; return extra ? m + "\n" + extra : m; }
  var base = function () { return (C.siteUrl || "").replace(/\/$/, ""); };

  /* ---------- header / footer ---------- */
  var NAV = [
    ["index.html", "Home"], ["batteries.html", "Batteries"], ["electric-cycles.html", "Electric Cycles"],
    ["spare-parts.html", "Spare Parts"], ["repair.html", "Repair & Maintenance"], ["home-service.html", "Home Service"],
    ["about.html", "About Us"], ["contact.html", "Contact Us"]
  ];
  function currentPage() { var p = location.pathname.split("/").pop(); return p || "index.html"; }

  function buildHeader() {
    var host = $("#site-header"); if (!host) return;
    var cur = currentPage();
    var links = NAV.map(function (n) {
      return '<li><a href="' + n[0] + '"' + (n[0] === cur ? ' class="active" aria-current="page"' : "") + ">" + n[1] + "</a></li>";
    }).join("");
    host.innerHTML =
      '<header class="header"><div class="container"><nav class="nav" aria-label="Main">' +
      '<a class="logo" href="index.html" aria-label="Voltix Energy home">' + MARK + '<span>VOLTIX<small>ENERGY</small></span></a>' +
      '<ul class="nav-links" id="nav-links">' + links + "</ul>" +
      '<div class="nav-actions">' +
      '<button class="icon-btn" id="search-toggle" aria-label="Search products" aria-expanded="false">' + icon("search") + "</button>" +
      '<a class="btn btn-primary btn-sm nav-cta" href="home-service.html">Book a Service</a>' +
      '<button class="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">' + icon("menu") + "</button>" +
      "</div></nav>" +
      '<div class="search-bar" id="search-bar"><form action="search.html" method="get" role="search"><input type="search" name="q" placeholder="Search batteries, parts, cycles…" aria-label="Search products"><button class="btn btn-primary btn-sm" type="submit">Search</button></form></div>' +
      "</div></header>";
    var burger = $("#burger"), nl = $("#nav-links");
    burger.addEventListener("click", function () {
      var o = nl.classList.toggle("open");
      burger.setAttribute("aria-expanded", o); burger.innerHTML = icon(o ? "x" : "menu");
      burger.setAttribute("aria-label", o ? "Close menu" : "Open menu");
    });
    nl.addEventListener("click", function (e) { if (e.target.tagName === "A") nl.classList.remove("open"); });
    var st = $("#search-toggle"), sb = $("#search-bar");
    st.addEventListener("click", function () {
      var o = sb.classList.toggle("open"); st.setAttribute("aria-expanded", o);
      if (o) $("input", sb).focus();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { nl.classList.remove("open"); sb.classList.remove("open"); } });
  }

  function buildFooter() {
    var host = $("#site-footer"); if (!host) return;
    var contact = [];
    if (C.phone) contact.push('<li>' + icon("phone", 2).replace("<svg", '<svg width="14" height="14" style="display:inline;vertical-align:-2px"') + ' <a href="tel:' + esc(C.phone.replace(/[^\d+]/g, "")) + '">' + esc(C.phone) + "</a></li>");
    if (C.email) contact.push('<li><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li>");
    if (C.address) contact.push("<li>" + esc(C.address) + "</li>");
    if (C.hours) contact.push("<li>" + esc(C.hours) + "</li>");
    contact.push('<li><a href="' + esc(waUrl(waMsg("general"))) + '"' + (hasWA() ? ' target="_blank" rel="noopener"' : "") + ">" + (hasWA() ? "Message us on WhatsApp" : "Send us an inquiry") + "</a></li>");
    var soc = Object.keys(C.social || {}).filter(function (k) { return C.social[k]; }).map(function (k) {
      return '<li><a href="' + esc(C.social[k]) + '" target="_blank" rel="noopener">' + k.charAt(0).toUpperCase() + k.slice(1) + "</a></li>";
    }).join("");
    host.innerHTML =
      '<footer class="footer"><div class="container"><div class="fgrid">' +
      '<div><a class="logo" href="index.html" style="margin-bottom:14px">' + MARK + '<span>VOLTIX<small>ENERGY</small></span></a>' +
      "<p>Your complete partner for electric mobility — batteries, spare parts, expert repairs, home service and electric cycles.</p></div>" +
      '<div><h4>Shop</h4><ul><li><a href="batteries.html">Batteries</a></li><li><a href="electric-cycles.html">Electric Cycles</a></li><li><a href="spare-parts.html">Spare Parts</a></li></ul></div>' +
      '<div><h4>Services</h4><ul><li><a href="repair.html">Repair &amp; Maintenance</a></li><li><a href="home-service.html">Home Service</a></li><li><a href="batteries.html#inquiry">Battery Consultation</a></li><li><a href="about.html">About Us</a></li><li><a href="policies.html">Policies</a></li></ul></div>' +
      "<div><h4>Contact</h4><ul>" + contact.join("") + soc + "</ul></div>" +
      '</div><div class="fbottom"><span>&copy; ' + new Date().getFullYear() + " Voltix Energy. All rights reserved.</span><span>Voltix Energy is an independent brand.</span></div></div></footer>";
  }

  function buildFloat() {
    var a = document.createElement("a");
    a.className = "wa-float"; a.href = waUrl(waMsg("general"));
    if (hasWA()) { a.target = "_blank"; a.rel = "noopener"; }
    a.setAttribute("aria-label", hasWA() ? "Chat with Voltix Energy on WhatsApp" : "Contact Voltix Energy");
    a.innerHTML = icon("chat", 2) + "<span>" + (hasWA() ? "WhatsApp" : "Contact us") + "</span>";
    document.body.appendChild(a);
  }

  /* ---------- data-attribute bindings ---------- */
  function bindStatic() {
    $$("[data-wa]").forEach(function (el) {
      el.href = waUrl(waMsg(el.getAttribute("data-wa")));
      if (hasWA()) { el.target = "_blank"; el.rel = "noopener"; }
      else if (el.getAttribute("data-wa-fallback")) el.textContent = el.getAttribute("data-wa-fallback");
    });
    $$("[data-cfg]").forEach(function (el) {
      var k = el.getAttribute("data-cfg"), v = C[k];
      if (!v) { var row = el.closest("[data-hide-empty]"); if (row) row.hidden = true; el.textContent = ""; return; }
      if (el.tagName === "A") { el.href = (k === "phone" ? "tel:" + v.replace(/[^\d+]/g, "") : k === "email" ? "mailto:" + v : v); }
      el.textContent = v;
    });
    $$("[data-map]").forEach(function (el) {
      if (C.mapEmbedUrl) el.innerHTML = '<iframe src="' + esc(C.mapEmbedUrl) + '" width="100%" height="320" style="border:0;border-radius:14px" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Voltix Energy location map"></iframe>';
      else el.innerHTML = '<div class="empty">Map will appear here once the business location is verified.</div>';
    });
    $$("[data-social]").forEach(function (el) {
      var list = Object.keys(C.social || {}).filter(function (k) { return C.social[k]; });
      el.innerHTML = list.length ? list.map(function (k) { return '<a class="btn btn-ghost btn-sm" href="' + esc(C.social[k]) + '" target="_blank" rel="noopener">' + k.charAt(0).toUpperCase() + k.slice(1) + "</a>"; }).join(" ") : "<span class='hint'>Social media links will be added here.</span>";
    });
    $$("[data-areas]").forEach(function (el) {
      el.textContent = (C.serviceAreas && C.serviceAreas.length) ? "Currently covering: " + C.serviceAreas.join(", ") + ". Coverage is confirmed by our team for each request." : "Home-visit coverage is confirmed by our team for each request, based on your location.";
    });
    var faq = $("#faq-list");
    if (faq) faq.innerHTML = (C.faq || []).map(function (f) { return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>"; }).join("");
    var t = $("#testimonials");
    if (t) {
      if (C.testimonials && C.testimonials.length) {
        t.innerHTML = '<div class="grid g3">' + C.testimonials.map(function (x) { return '<figure class="card quote" style="margin:0"><p>&ldquo;' + esc(x.text) + '&rdquo;</p><cite>' + esc(x.name) + (x.vehicle ? " — " + esc(x.vehicle) : "") + "</cite></figure>"; }).join("") + "</div>";
      } else { var sec = t.closest("section"); if (sec) sec.hidden = true; }
    }
    var ab = $("#about-story");
    if (ab) { if (C.about && C.about.story) ab.textContent = C.about.story; else ab.closest("[data-hide-empty]").hidden = true; }
    $$("[data-policy]").forEach(function (el) {
      var v = C.policies && C.policies[el.getAttribute("data-policy")];
      if (v) el.textContent = v; else el.innerHTML = "<em>This policy will be published here once confirmed by Voltix Energy. Please contact us for details.</em>";
    });
  }

  /* ---------- catalogue ---------- */
  var LABELS = { chemistry: "Battery chemistry", voltage: "Nominal voltage", capacityAh: "Capacity (Ah)", motor: "Motor rating", battery: "Battery", range: "Estimated range", chargingTime: "Charging time", topSpeed: "Maximum speed", weight: "Weight", load: "Load capacity", vehicle: "Vehicle type" };
  function art(p) {
    var n = p.type === "battery" ? "battery" : p.type === "cycle" ? "bike" : "cpu";
    return p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" width="640" height="480">' : icon(n, 1.1);
  }
  function priceHTML(p) { return p.price != null ? '<span class="price">Rs ' + Number(p.price).toLocaleString("en-PK") + "</span>" : '<span class="price quote">Request a Quote</span>'; }
  function availHTML(p) { return '<span class="tag">' + esc(p.availability || "Ask for availability") + "</span>"; }
  function productCard(p) {
    var msg = waMsg(p.type === "battery" ? "battery" : p.type === "cycle" ? "cycle" : "parts", "Product: " + p.name);
    var label = p.type === "battery" ? "Battery" : p.type === "cycle" ? "Electric cycle" : (p.category || "Spare part");
    return '<article class="card pcard"><a class="pimg" href="product.html?id=' + encodeURIComponent(p.id) + '" aria-label="View ' + esc(p.name) + '">' + art(p) + "</a>" +
      '<div class="pbody"><div><span class="tag">' + esc(label) + "</span> " + availHTML(p) + "</div><h3>" + esc(p.name) + "</h3><p>" + esc(p.short) + "</p>" + priceHTML(p) +
      '<div class="pactions"><a class="btn btn-ghost btn-sm" href="product.html?id=' + encodeURIComponent(p.id) + '">Details</a><a class="btn btn-wa btn-sm" href="' + esc(waUrl(msg)) + '"' + (hasWA() ? ' target="_blank" rel="noopener"' : "") + ">" + (hasWA() ? "WhatsApp" : "Inquire") + "</a></div></div></article>";
  }
  function catalogue(host) {
    var type = host.getAttribute("data-type") || "all", limit = parseInt(host.getAttribute("data-limit") || "0", 10);
    var showTools = host.getAttribute("data-tools") !== "off";
    var list = P.filter(function (p) { return type === "all" || p.type === type; });
    var q = (new URLSearchParams(location.search).get("q") || "").trim().toLowerCase();
    var state = { q: q, chip: "All", sort: "default" };
    var chipKey = type === "part" ? "category" : type === "battery" ? "vehicle" : null;
    var chips = chipKey ? ["All"].concat(list.map(function (p) { return p[chipKey]; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; })) : [];
    var hasPrice = list.some(function (p) { return p.price != null; });
    var hasAvail = list.some(function (p) { return p.availability; });
    var availOpts = hasAvail ? ["All"].concat(list.map(function (p) { return p.availability; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; })) : [];
    state.avail = "All";
    host.innerHTML = (showTools ? '<div class="toolbar"><input type="search" id="cq" placeholder="Search products" aria-label="Search products" value="' + esc(q) + '">' +
      '<select id="csort" aria-label="Sort products"><option value="default">Sort: Featured</option><option value="az">Name A–Z</option><option value="za">Name Z–A</option>' + (hasPrice ? '<option value="lo">Price: low to high</option><option value="hi">Price: high to low</option>' : "") + "</select>" +
      (hasAvail ? '<select id="cav" aria-label="Filter by availability">' + availOpts.map(function (a) { return "<option>" + esc(a) + "</option>"; }).join("") + "</select>" : "") + "</div>" +
      (chips.length > 2 ? '<div class="chips" id="cchips" role="group" aria-label="Filter">' + chips.map(function (c, i) { return '<button type="button" class="chip' + (i === 0 ? " on" : "") + '" data-c="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + "</div>" : "") : "") +
      '<div class="grid g3" id="cgrid" aria-live="polite"></div>';
    function draw() {
      var out = list.filter(function (p) {
        if (state.chip !== "All" && chipKey && p[chipKey] !== state.chip) return false;
        if (state.avail !== "All" && p.availability !== state.avail) return false;
        if (state.q) { var hay = (p.name + " " + p.short + " " + (p.category || "") + " " + (p.vehicle || "") + " " + (p.chemistry || "")).toLowerCase(); if (hay.indexOf(state.q) < 0) return false; }
        return true;
      });
      if (state.sort === "az") out.sort(function (a, b) { return a.name.localeCompare(b.name); });
      if (state.sort === "za") out.sort(function (a, b) { return b.name.localeCompare(a.name); });
      if (state.sort === "lo") out.sort(function (a, b) { return (a.price == null) - (b.price == null) || a.price - b.price; });
      if (state.sort === "hi") out.sort(function (a, b) { return (a.price == null) - (b.price == null) || b.price - a.price; });
      if (limit) out = out.slice(0, limit);
      $("#cgrid", host).innerHTML = out.length ? out.map(productCard).join("") :
        '<div class="empty" style="grid-column:1/-1"><h3>No matching products</h3><p>Try a different search, or tell us what you need and we will help.</p><a class="btn btn-primary" href="' + esc(waUrl(waMsg("general"))) + '">Ask our team</a></div>';
    }
    var cq = $("#cq", host); if (cq) cq.addEventListener("input", function () { state.q = cq.value.trim().toLowerCase(); draw(); });
    var cs = $("#csort", host); if (cs) cs.addEventListener("change", function () { state.sort = cs.value; draw(); });
    var ca = $("#cav", host); if (ca) ca.addEventListener("change", function () { state.avail = ca.value; draw(); });
    var cc = $("#cchips", host); if (cc) cc.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", cc).forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); state.chip = b.getAttribute("data-c"); draw();
    });
    draw();
  }

  function productPage(host) {
    var id = new URLSearchParams(location.search).get("id");
    var p = P.filter(function (x) { return x.id === id; })[0];
    if (!p) { host.innerHTML = '<div class="empty"><h3>Product not found</h3><p>This product may have been moved. Browse our catalogue or contact us.</p><a class="btn btn-primary" href="batteries.html">Browse batteries</a></div>'; return; }
    document.title = p.name + " | Voltix Energy";
    var md = $('meta[name="description"]'); if (md) md.setAttribute("content", p.short);
    var rows = [];
    ["vehicle", "chemistry", "voltage", "capacityAh", "motor", "battery", "range", "chargingTime", "topSpeed", "weight", "load"].forEach(function (k) { if (p[k]) rows.push([LABELS[k], p[k]]); });
    if (p.colors && p.colors.length) rows.push(["Available colors", p.colors.join(", ")]);
    Object.keys(p.specs || {}).forEach(function (k) { if (p.specs[k]) rows.push([k, p.specs[k]]); });
    var msg = waMsg(p.type === "battery" ? "battery" : p.type === "cycle" ? "cycle" : "parts", "Product: " + p.name);
    var related = P.filter(function (x) { return x.type === p.type && x.id !== p.id; }).slice(0, 3);
    host.innerHTML = '<div class="pd-grid"><div class="pd-img">' + art(p) + "</div><div>" +
      '<span class="tag">' + esc(p.type === "battery" ? "Battery" : p.type === "cycle" ? "Electric cycle" : (p.category || "Spare part")) + "</span> " + availHTML(p) +
      '<h2 style="font-size:2rem;margin-top:12px">' + esc(p.name) + "</h2><p>" + esc(p.description) + "</p><p>" + priceHTML(p) + "</p>" +
      (rows.length ? '<table class="spec"><tbody>' + rows.map(function (r) { return "<tr><th>" + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join("") + "</tbody></table>" : '<div class="note info">Detailed specifications are confirmed with you on inquiry, so you only receive verified information.</div>') +
      (p.compatibility && p.compatibility.length ? "<h3 style='margin-top:20px'>Compatible vehicles</h3><ul class='checks'>" + p.compatibility.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" : "") +
      '<div class="pactions" style="margin-top:20px"><a class="btn btn-primary" href="#inquiry">Request a Quote</a><a class="btn btn-wa" href="' + esc(waUrl(msg)) + '"' + (hasWA() ? ' target="_blank" rel="noopener"' : "") + ">" + (hasWA() ? "WhatsApp inquiry" : "Contact us") + "</a></div>" +
      (p.type === "battery" ? '<div class="note" style="margin-top:16px"><b>Compatibility matters.</b> We never confirm a battery by appearance or brand alone. Send your vehicle model and current battery details with your inquiry.</div>' : "") +
      "</div></div>" + (related.length ? '<h2 style="margin-top:56px">Related products</h2><div class="grid g3">' + related.map(productCard).join("") + "</div>" : "");
    var f = $("#product-field"); if (f) f.value = p.name;
    if (p.price != null) {
      var ld = document.createElement("script"); ld.type = "application/ld+json";
      ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, offers: { "@type": "Offer", priceCurrency: "PKR", price: p.price } });
      document.head.appendChild(ld);
    }
  }

  function compareCycles(host) {
    var cycles = P.filter(function (p) { return p.type === "cycle"; });
    if (cycles.length < 2) { host.hidden = true; return; }
    var keys = ["motor", "battery", "range", "chargingTime", "topSpeed", "weight", "load"].filter(function (k) { return cycles.some(function (c) { return c[k]; }); });
    host.innerHTML = '<h2>Compare models</h2><div class="compare-wrap"><table class="spec"><thead><tr><th>Specification</th>' + cycles.map(function (c) { return "<th>" + esc(c.name) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      keys.map(function (k) { return "<tr><th>" + LABELS[k] + "</th>" + cycles.map(function (c) { return "<td>" + esc(c[k] || "—") + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
  }

  /* ---------- forms ---------- */
  function validPhone(v) { var d = digits(v); return d.length >= 10 && d.length <= 15; }
  function initForm(form) {
    var label = form.getAttribute("data-form") || "Inquiry";
    var status = $(".status", form), btn = $('button[type="submit"]', form);
    var d = $('input[type="date"]', form); if (d) d.min = new Date().toISOString().slice(0, 10);
    var pre = new URLSearchParams(location.search).get("product");
    if (pre) { var pf = $('[name="product"]', form); if (pf) { var m = P.filter(function (x) { return x.id === pre; })[0]; pf.value = m ? m.name : pre; } }

    function setErr(field, msg) { var w = field.closest(".field"); if (!w) return; w.classList.toggle("err", !!msg); var e = $(".errmsg", w); if (e) e.textContent = msg || ""; field.setAttribute("aria-invalid", msg ? "true" : "false"); }
    function validate() {
      var ok = true, first = null;
      $$("[required]", form).forEach(function (f) {
        var v = (f.value || "").trim(), msg = "";
        if (!v) msg = "This field is required.";
        else if (f.type === "tel" && !validPhone(v)) msg = "Enter a valid phone number (10–15 digits).";
        else if (f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) msg = "Enter a valid email address.";
        setErr(f, msg); if (msg) { ok = false; first = first || f; }
      });
      $$('input[type="tel"]:not([required]), input[type="email"]:not([required])', form).forEach(function (f) {
        var v = (f.value || "").trim(), msg = "";
        if (v && f.type === "tel" && !validPhone(v)) msg = "Enter a valid phone number (10–15 digits).";
        if (v && f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) msg = "Enter a valid email address.";
        setErr(f, msg); if (msg) { ok = false; first = first || f; }
      });
      var file = $('input[type="file"]', form);
      if (file && file.files[0]) { var big = file.files[0].size > 5 * 1024 * 1024; setErr(file, big ? "Please choose an image under 5 MB." : ""); if (big) { ok = false; first = first || file; } }
      if (first) first.focus();
      return ok;
    }
    function show(kind, html) { status.className = "status show " + kind; status.innerHTML = html; }
    function summary() {
      var lines = [];
      $$("input,select,textarea", form).forEach(function (f) {
        if (!f.name || f.type === "file" || f.name.charAt(0) === "_" || !(f.value || "").trim()) return;
        var l = $('label[for="' + f.id + '"]', form); lines.push((l ? l.textContent.replace("*", "").trim() : f.name) + ": " + f.value.trim());
      });
      return lines.join("\n");
    }
    function fallbackHTML(reason) {
      var waKey = form.getAttribute("data-wa") || "general";
      var out = "<b>" + reason + "</b><br>Your request has <u>not</u> been sent.";
      if (hasWA()) out += '<br><br><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + esc(waUrl(waMsg(waKey) + "\n\n" + summary())) + '">Send this request on WhatsApp instead</a>';
      else if (C.phone || C.email) out += "<br>Please contact us directly: " + [C.phone, C.email].filter(Boolean).map(esc).join(" · ");
      else out += "<br>Please try again later.";
      return out;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) { show("bad", "Please fix the highlighted fields and try again."); return; }
      var hp = $('[name="_gotcha"]', form); if (hp && hp.value) return;
      // service-area check (home service)
      var city = $('[name="city"]', form);
      if (city && C.serviceAreas && C.serviceAreas.length) {
        var ok = C.serviceAreas.some(function (a) { return a.toLowerCase() === city.value.trim().toLowerCase(); });
        if (!ok) { setErr(city, "Not currently covered."); show("bad", "Sorry — home visits are not currently available in <b>" + esc(city.value.trim()) + "</b>. We currently cover: " + esc(C.serviceAreas.join(", ")) + ". You can still send a repair request or WhatsApp us to discuss options."); return; }
      }
      if (!C.formEndpoint) { show("bad", fallbackHTML("Online submission is not connected yet.")); return; }
      btn.disabled = true; form.classList.add("loading"); show("ok", "Sending your request…");
      var fd = new FormData(form); fd.append("_subject", "Voltix Energy — " + label); fd.append("form_type", label);
      var ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 20000);
      fetch(C.formEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" }, signal: ctl.signal })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) throw new Error(j && j.error || "Server returned " + r.status); return j; }); })
        .then(function () {
          form.innerHTML = '<div class="success-screen" role="status"><div class="tick">' + icon("check", 2.5) + "</div><h2>Request received</h2><p>" + esc(form.getAttribute("data-success") || "Thank you. Our team will contact you soon.") + '</p><a class="btn btn-primary" href="index.html">Back to home</a></div>';
          form.scrollIntoView({ behavior: "smooth", block: "center" });
        })
        .catch(function (err) { show("bad", fallbackHTML(err.name === "AbortError" ? "The request timed out." : "We couldn't deliver your request.")); })
        .finally(function () { clearTimeout(to); btn.disabled = false; form.classList.remove("loading"); });
    });
    $$("input,select,textarea", form).forEach(function (f) { f.addEventListener("blur", function () { if (f.hasAttribute("required") && !(f.value || "").trim()) return; }); });
  }

  /* ---------- SEO ---------- */
  function seo() {
    var b = base();
    if (b) {
      var path = currentPage() === "index.html" ? "/" : "/" + currentPage();
      var link = document.createElement("link"); link.rel = "canonical"; link.href = b + path; document.head.appendChild(link);
      var og = document.createElement("meta"); og.setAttribute("property", "og:url"); og.content = b + path; document.head.appendChild(og);
    }
    var org = { "@context": "https://schema.org", "@type": (C.address || C.phone) ? "LocalBusiness" : "Organization", name: "Voltix Energy" };
    if (b) { org.url = b; org.logo = b + "/logo.svg"; }
    if (C.phone) org.telephone = C.phone; if (C.email) org.email = C.email;
    if (C.address) org.address = { "@type": "PostalAddress", streetAddress: C.address, addressCountry: "PK" };
    var sa = Object.keys(C.social || {}).map(function (k) { return C.social[k]; }).filter(Boolean); if (sa.length) org.sameAs = sa;
    var s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(org); document.head.appendChild(s);
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader(); buildFooter(); buildFloat(); bindStatic();
    $$("[data-catalog]").forEach(function (h) { h.setAttribute("data-type", h.getAttribute("data-catalog")); catalogue(h); });
    var pp = $("#product-detail"); if (pp) productPage(pp);
    var cc = $("#compare"); if (cc) compareCycles(cc);
    $$("form[data-form]").forEach(initForm);
    $$("[data-icon]").forEach(function (el) { el.innerHTML = icon(el.getAttribute("data-icon")); });
    seo();
  });
})();

#!/usr/bin/env python3
"""Generates the Voltix Energy static pages. Run: python3 build.py"""
import os
OUT = os.path.dirname(os.path.abspath(__file__))

BIKE = '''<svg viewBox="0 0 440 440" role="img" aria-label="Illustration of an electric bike with a lithium battery pack">
<circle cx="220" cy="230" r="190" fill="#1769FF" opacity=".14"/><circle cx="220" cy="230" r="140" fill="#1769FF" opacity=".12"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<circle cx="120" cy="300" r="62" stroke="#fff" stroke-width="6" opacity=".9"/><circle cx="320" cy="300" r="62" stroke="#fff" stroke-width="6" opacity=".9"/>
<circle cx="120" cy="300" r="8" stroke="#18C8E8" stroke-width="5"/><circle cx="320" cy="300" r="8" stroke="#18C8E8" stroke-width="5"/>
<path d="M120 300L210 300L185 215L290 205L300 235L320 300" stroke="#18C8E8" stroke-width="7"/><path d="M210 300L300 235" stroke="#18C8E8" stroke-width="7"/>
<path d="M185 215L120 300" stroke="#18C8E8" stroke-width="5" opacity=".7"/>
<path d="M290 205L286 178L318 178" stroke="#fff" stroke-width="6"/><path d="M165 208L202 208" stroke="#fff" stroke-width="8"/>
</g>
<g transform="rotate(-35 255 268)"><rect x="217" y="254" width="76" height="28" rx="6" fill="#101827" stroke="#fff" stroke-width="3"/>
<rect x="223" y="260" width="16" height="16" rx="3" fill="#18C8E8"/><rect x="243" y="260" width="16" height="16" rx="3" fill="#18C8E8"/><rect x="263" y="260" width="16" height="16" rx="3" fill="#1769FF"/></g>
<circle cx="350" cy="110" r="34" fill="#1769FF"/><path d="M355 90l-14 24h10l-4 18 16-26h-10z" fill="#fff"/>
</svg>'''

BATT = '''<svg viewBox="0 0 440 300" role="img" aria-label="Illustration of a lithium battery pack with energy cells">
<rect x="40" y="60" width="330" height="180" rx="22" fill="#101827" stroke="#18C8E8" stroke-width="5"/><rect x="370" y="115" width="26" height="70" rx="8" fill="#18C8E8"/>
<rect x="64" y="84" width="62" height="132" rx="10" fill="#1769FF"/><rect x="138" y="84" width="62" height="132" rx="10" fill="#1769FF"/><rect x="212" y="84" width="62" height="132" rx="10" fill="#1769FF" opacity=".75"/><rect x="286" y="84" width="62" height="132" rx="10" fill="#1769FF" opacity=".4"/>
<path d="M213 108l-30 46h22l-8 38 38-54h-24z" fill="#fff"/></svg>'''

HOME_ART = '''<svg viewBox="0 0 440 300" role="img" aria-label="Illustration of a technician visiting a home">
<rect x="30" y="140" width="190" height="120" rx="6" fill="#16213a" stroke="#18C8E8" stroke-width="4"/><path d="M20 145L125 62l105 83" fill="none" stroke="#18C8E8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="105" y="190" width="40" height="70" rx="4" fill="#1769FF"/><circle cx="330" cy="220" r="34" fill="none" stroke="#fff" stroke-width="5"/><circle cx="410" cy="220" r="34" fill="none" stroke="#fff" stroke-width="5"/>
<path d="M330 220L365 220 355 170 400 168 410 220M365 220L395 195" fill="none" stroke="#18C8E8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M300 120l-14 24h10l-4 18 16-26h-10z" fill="#18C8E8"/></svg>'''

HEAD = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#101827">
{robots}<meta property="og:type" content="website"><meta property="og:site_name" content="Voltix Energy"><meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:locale" content="en_PK">
<meta name="twitter:card" content="summary">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div id="site-header"></div>
<main id="main">
'''
TAIL = '''</main>
<div id="site-footer"></div>
<script src="config.js"></script>
<script src="data.js"></script>
<script src="app.js"></script>
</body>
</html>
'''

def page(name, title, desc, body, robots=""):
    r = '<meta name="robots" content="noindex">\n' if robots else ""
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(HEAD.format(title=title, desc=desc, robots=r) + body + TAIL)

def hero(h1, p, crumb):
    return ('<section class="page-hero"><div class="container"><div class="crumbs"><a href="index.html">Home</a> / %s</div><h1>%s</h1><p>%s</p></div></section>\n' % (crumb, h1, p))

def field(fid, label, name, typ="text", req=False, full=False, opts=None, ph="", hint="", ac=""):
    cls = "field full" if full else "field"
    star = ' <span class="req" aria-hidden="true">*</span>' if req else ""
    r = " required" if req else ""
    a = (' autocomplete="%s"' % ac) if ac else ""
    if typ == "select":
        inner = '<select id="%s" name="%s"%s><option value="">Select…</option>%s</select>' % (fid, name, r, "".join("<option>%s</option>" % o for o in opts))
    elif typ == "textarea":
        inner = '<textarea id="%s" name="%s" placeholder="%s"%s></textarea>' % (fid, name, ph, r)
    elif typ == "file":
        inner = '<input id="%s" name="%s" type="file" accept="image/*">' % (fid, name)
    else:
        inner = '<input id="%s" name="%s" type="%s" placeholder="%s"%s%s>' % (fid, name, typ, ph, r, a)
    h = '<div class="hint">%s</div>' % hint if hint else ""
    return '<div class="%s"><label for="%s">%s%s</label>%s%s<div class="errmsg" role="alert"></div></div>' % (cls, fid, label, star, inner, h)

def form(label, wa, success, fields, btn, extra=""):
    return ('<form class="form-card" data-form="%s" data-wa="%s" data-success="%s" novalidate>%s<div class="form-grid">%s</div>'
            '<div class="hp" aria-hidden="true"><label>Leave empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>'
            '<p style="margin-top:18px"><button class="btn btn-primary" type="submit"><span class="spinner"></span>%s</button></p>'
            '<div class="status" role="status" aria-live="polite"></div></form>') % (label, wa, success, extra, "".join(fields), btn)

VEH = ["Electric bike", "Electric scooty / scooter", "Electric cycle", "Other"]
TIMES = ["Morning (9am – 12pm)", "Afternoon (12pm – 4pm)", "Evening (4pm – 8pm)"]

battery_form = form("Battery Inquiry", "battery",
    "Thank you. Our team will review your vehicle and battery details and get back to you with compatibility guidance and a quotation.",
    [field("b-name", "Your name", "name", req=True, ac="name"), field("b-phone", "Phone number", "phone", "tel", req=True, ac="tel", ph="03XX XXXXXXX"),
     field("b-wa", "WhatsApp number (if different)", "whatsapp", "tel"), field("b-veh", "Vehicle type", "vehicle_type", "select", req=True, opts=VEH),
     field("b-model", "Vehicle brand &amp; model", "vehicle_model", ph="e.g. brand and model name"),
     field("b-prod", "Product of interest (optional)", "product", ph="Select from the catalogue or leave blank"),
     field("b-spec", "Current battery specifications", "current_battery", full=True, ph="Voltage, capacity (Ah), chemistry, connector — whatever is printed on your battery", hint="A photo sent on WhatsApp also helps. We never confirm compatibility by appearance or brand alone."),
     field("b-req", "Your requirements", "requirements", "textarea", full=True, ph="Range, budget, charging needs, anything else we should know")],
    "Send Battery Inquiry")

repair_form = form("Repair & Maintenance Request", "repair",
    "Thank you. Our team will review your request and contact you to confirm service availability and next steps.",
    [field("r-name", "Your name", "name", req=True, ac="name"), field("r-phone", "Phone number", "phone", "tel", req=True, ac="tel", ph="03XX XXXXXXX"),
     field("r-wa", "WhatsApp number (if different)", "whatsapp", "tel"), field("r-veh", "Vehicle type", "vehicle_type", "select", req=True, opts=VEH),
     field("r-model", "Brand &amp; model", "vehicle_model"), field("r-loc", "Service location (city / area)", "location"),
     field("r-prob", "Describe the problem", "problem", "textarea", req=True, full=True, ph="What is happening? When did it start?"),
     field("r-date", "Preferred date", "preferred_date", "date"), field("r-time", "Preferred time", "preferred_time", "select", opts=TIMES),
     field("r-img", "Photo (optional)", "photo", "file", full=True, hint="Image up to 5 MB.")],
    "Submit Repair Request")

home_form = form("Home Service Request", "home",
    "Thank you. This is a service request — it is not confirmed until our team contacts you to confirm coverage, timing and details.",
    [field("h-name", "Your name", "name", req=True, ac="name"), field("h-phone", "Phone number", "phone", "tel", req=True, ac="tel", ph="03XX XXXXXXX"),
     field("h-veh", "Vehicle type", "vehicle_type", "select", req=True, opts=VEH), field("h-city", "City / service area", "city", req=True, ac="address-level2"),
     field("h-issue", "Issue or service required", "issue", "textarea", req=True, full=True, ph="e.g. battery not charging, routine service, replacement battery"),
     field("h-addr", "Full visit address", "address", "textarea", req=True, full=True, ac="street-address"),
     field("h-date", "Preferred date", "preferred_date", "date"), field("h-time", "Preferred time", "preferred_time", "select", opts=TIMES),
     field("h-notes", "Additional notes", "notes", "textarea", full=True), field("h-img", "Photo of the problem or vehicle (optional)", "photo", "file", full=True, hint="Image up to 5 MB.")],
    "Request Home Visit")

contact_form = form("Contact Inquiry", "general",
    "Thank you for contacting Voltix Energy. Our team will reply as soon as possible.",
    [field("c-name", "Your name", "name", req=True, ac="name"), field("c-phone", "Phone number", "phone", "tel", req=True, ac="tel", ph="03XX XXXXXXX"),
     field("c-email", "Email (optional)", "email", "email", ac="email"), field("c-topic", "Topic", "topic", "select", opts=["Batteries", "Electric cycles", "Spare parts", "Repair &amp; maintenance", "Home service", "Bulk / business inquiry", "Other"]),
     field("c-msg", "Message", "message", "textarea", req=True, full=True)],
    "Send Message")

ICON = lambda n: '<div class="ico" data-icon="%s"></div>' % n

# ---------------- HOME ----------------
cats = [("battery", "Electric Bike Batteries", "Replacement batteries for electric bikes, matched to your vehicle.", "batteries.html"),
        ("bolt", "Lithium Battery Solutions", "Lighter, energy-dense battery options for compatible vehicles.", "#lithium"),
        ("bike", "Electric Cycles", "Electric cycles built for everyday mobility.", "electric-cycles.html"),
        ("cpu", "Spare Parts &amp; Accessories", "Chargers, controllers, wiring, brakes, lights and more.", "spare-parts.html"),
        ("wrench", "Repair &amp; Home Maintenance", "Expert diagnosis and service, including home visits.", "repair.html")]
cat_html = "".join('<a class="card cat-card" href="%s" style="text-decoration:none">%s<h3>%s</h3><p>%s</p><span class="more">Explore &rarr;</span></a>' % (h, ICON(i), t, d) for i, t, d, h in cats)

why = [("battery", "Battery Solutions for Different Needs", "Options for electric bikes, scooties and compatible vehicles."), ("wrench", "Skilled Repair &amp; Maintenance", "Diagnosis and servicing for battery, charging and electrical issues."),
       ("home", "Convenient Home-Visit Services", "Request a visit, subject to service-area availability."), ("bike", "Electric Cycle Manufacturing", "Electric cycles for everyday electric mobility."),
       ("cpu", "Spare Parts &amp; Technical Support", "Identify the right part with guidance from our team."), ("support", "Customer-Focused After-Sales Service", "Support that continues after your purchase.")]
why_html = "".join('<div class="card">%s<h3>%s</h3><p>%s</p></div>' % (ICON(i), t, d) for i, t, d in why)

svc = [("battery", "Battery health checks"), ("plug", "Battery replacement &amp; installation"), ("bolt", "Charging issues"), ("cpu", "Electrical system troubleshooting"), ("gear", "Routine maintenance"), ("wrench", "Compatible spare parts replacement")]
svc_html = "".join('<div class="card">%s<h3>%s</h3></div>' % (ICON(i), t) for i, t in svc)

home = '''<section class="hero"><div class="container hero-grid"><div>
<span class="eyebrow" style="color:#18C8E8">Electric mobility, Pakistan</span>
<h1>Power Your Ride. <span>Trust the Experts.</span></h1>
<p class="sub">Premium electric bike batteries, lithium battery solutions, electric cycles, genuine spare parts, and professional repair services — delivered with convenience and care.</p>
<div class="hero-ctas"><a class="btn btn-primary" href="batteries.html">Explore Products</a><a class="btn btn-outline" href="home-service.html">Book a Home Service</a></div>
<p class="tagline">Electric Mobility Solutions. Battery Expertise. Reliable Service.</p></div>
<div class="hero-art">''' + BIKE + '''</div></div></section>

<section class="section" style="padding-top:0"><div class="container cat-strip"><div class="grid g5">''' + cat_html + '''</div></div></section>

<section class="section"><div class="container"><div class="sec-head"><span class="eyebrow">Featured</span><h2>Featured products</h2><p class="lead">Browse our range. Prices and availability are confirmed with you on inquiry.</p></div>
<div data-catalog="all" data-limit="6" data-tools="off"></div>
<p style="margin-top:28px"><a class="btn btn-ghost" href="batteries.html">View all batteries</a> <a class="btn btn-ghost" href="spare-parts.html">View spare parts</a></p></div></section>

<section class="section alt"><div class="container"><div class="sec-head center"><span class="eyebrow">Why choose us</span><h2>Why choose Voltix Energy?</h2></div><div class="grid g3">''' + why_html + '''</div></div></section>

<section class="section dark" id="lithium"><div class="container split"><div><span class="eyebrow">Lithium solutions</span><h2>Smarter Battery Solutions for Electric Mobility</h2>
<p class="lead">Suitable lithium batteries can support electric mobility through lower weight compared with some alternative battery types, useful energy density, and convenient everyday operation.</p>
<p class="lead" style="margin-top:12px">Performance, lifespan, charging time and range depend on battery chemistry, capacity, the vehicle, operating conditions and proper maintenance — so we help you choose the right one.</p>
<p style="margin-top:24px"><a class="btn btn-primary" href="batteries.html#inquiry">Find the Right Battery</a></p></div><div class="art-box">''' + BATT + '''</div></div></section>

<section class="section"><div class="container"><div class="sec-head"><span class="eyebrow">Repair &amp; maintenance</span><h2>Keep Your Electric Ride Running Smoothly</h2><p class="lead">Voltix Energy helps you diagnose and address battery, charging, electrical and other supported vehicle problems.</p></div>
<div class="grid g3">''' + svc_html + '''</div><p style="margin-top:28px"><a class="btn btn-primary" href="repair.html#request">Book a Repair</a></p></div></section>

<section class="section dark"><div class="container split"><div><span class="eyebrow">At-home service</span><h2>Expert EV Service, Right at Your Doorstep</h2>
<p class="lead">Need help with your electric bike or scooty? Request a home visit from Voltix Energy for convenient repair, maintenance, and battery assistance, subject to service-area availability.</p>
<div class="steps s3" style="grid-template-columns:1fr;margin:22px 0"><div class="step"><h3>Submit your service request</h3></div><div class="step"><h3>Receive confirmation from our team</h3></div><div class="step"><h3>Get assistance at your location, subject to availability</h3></div></div>
<a class="btn btn-primary" href="home-service.html">Schedule a Home Visit</a></div><div class="art-box">''' + HOME_ART + '''</div></div></section>

<section class="section"><div class="container split"><div class="art-box">''' + BIKE.replace('role="img" aria-label="Illustration of an electric bike with a lithium battery pack"', 'role="img" aria-label="Illustration of a Voltix electric cycle"') + '''</div><div><span class="eyebrow">Electric cycles</span><h2>Built for Everyday Electric Mobility</h2>
<p class="lead">Voltix Energy builds electric cycles for everyday journeys. Contact us for current models and variants, specifications, customization options, and bulk or business inquiries.</p>
<p style="margin-top:22px"><a class="btn btn-primary" href="electric-cycles.html">Explore Electric Cycles</a></p></div></div></section>

<section class="section alt"><div class="container"><div class="sec-head center"><span class="eyebrow">How it works</span><h2>Simple from start to finish</h2></div><div class="steps s4">
<div class="step"><h3>Choose a product or service</h3><p>Browse batteries, cycles, parts or repair services.</p></div><div class="step"><h3>Tell us what you need</h3><p>Share your vehicle and requirements.</p></div>
<div class="step"><h3>Receive guidance &amp; a quotation</h3><p>Our team confirms compatibility and pricing.</p></div><div class="step"><h3>Purchase or arrange service</h3><p>Order your product or schedule your service.</p></div></div></div></section>

<section class="section"><div class="container"><div id="testimonials"></div></div></section>

<section class="section alt"><div class="container" style="max-width:820px"><div class="sec-head center"><span class="eyebrow">FAQ</span><h2>Frequently asked questions</h2></div><div class="faq" id="faq-list"></div></div></section>

<section class="cta"><div class="container"><h2>Ready to Power Your Electric Journey?</h2><p>Talk to Voltix Energy about batteries, electric cycles, spare parts, or professional maintenance.</p>
<div class="hero-ctas"><a class="btn btn-primary" href="contact.html">Contact Our Team</a><a class="btn btn-outline" href="home-service.html">Book a Service</a></div></div></section>
'''
page("index.html", "Voltix Energy | Electric Bike Batteries, Lithium Batteries & EV Repair in Pakistan",
     "Electric bike and scooty batteries, lithium battery solutions, electric cycles, spare parts, repair and home-visit service in Pakistan. Voltix Energy — your complete electric mobility partner.", home)

# ---------------- BATTERIES ----------------
page("batteries.html", "Electric Bike & Scooty Batteries | Lithium Battery Solutions | Voltix Energy",
     "Browse electric bike batteries, electric scooty battery replacement and lithium battery solutions in Pakistan. Send your vehicle details for a compatibility check and quotation.",
     hero("Batteries", "Electric bike and scooty batteries and lithium solutions. Compatibility is confirmed with you before you buy.", "Batteries") +
     '<section class="section"><div class="container"><div data-catalog="battery"></div>'
     '<div class="note" style="margin-top:28px"><b>Compatibility first.</b> We never guarantee compatibility from appearance or vehicle brand alone. Use the form below and we will confirm a suitable battery for your vehicle.</div></div></section>'
     '<section class="section alt" id="inquiry"><div class="container"><div class="formside"><div><div class="sec-head"><span class="eyebrow">Battery inquiry</span><h2>Find the Right Battery</h2><p class="lead">Tell us about your vehicle and current battery and we will guide you to a compatible option and send a quotation.</p></div>' + battery_form + '</div>'
     '<aside class="card"><h3>What to include</h3><ul class="checks"><li>Vehicle brand and model</li><li>Current battery voltage and capacity (Ah)</li><li>Battery chemistry, if known</li><li>Connector type or a photo</li><li>Your range and budget needs</li></ul><p><a class="btn btn-wa btn-sm" data-wa="battery" data-wa-fallback="WhatsApp not configured yet" href="#">Ask on WhatsApp</a></p></aside></div></div></section>')

# ---------------- CYCLES ----------------
page("electric-cycles.html", "Electric Cycles | Built for Everyday Mobility | Voltix Energy",
     "Explore Voltix Energy electric cycles. Enquire about models, specifications, customization and bulk or business orders in Pakistan.",
     hero("Electric Cycles", "Built for everyday electric mobility. Ask us about current models, variants, specifications and customization.", "Electric Cycles") +
     '<section class="section"><div class="container"><div data-catalog="cycle"></div><div id="compare" style="margin-top:48px"></div>'
     '<div class="note info" style="margin-top:28px">Specifications such as motor, battery, range, charging time and speed are published only once verified. Range figures are shown only with their stated test conditions.</div></div></section>'
     '<section class="section alt"><div class="container split"><div><span class="eyebrow">Business &amp; bulk</span><h2>Customization and bulk inquiries</h2><p class="lead">Interested in electric cycles for your business or in larger quantities? Contact our team to discuss what is available.</p><p style="margin-top:20px"><a class="btn btn-primary" href="contact.html#inquiry">Contact Our Team</a> <a class="btn btn-wa" data-wa="cycle" data-wa-fallback="Contact us" href="#">WhatsApp</a></p></div><div class="art-box">' + BIKE + '</div></div></section>')

# ---------------- PARTS ----------------
page("spare-parts.html", "Electric Vehicle Spare Parts | Chargers, Controllers & More | Voltix Energy",
     "Compatible spare parts for electric bikes and scooties in Pakistan: chargers, controllers, motors, wiring, throttles, brakes and lights. Enquire with your model for a correct match.",
     hero("Spare Parts &amp; Accessories", "Compatible electric vehicle parts identified by model or specification to reduce wrong purchases.", "Spare Parts") +
     '<section class="section"><div class="container"><div data-catalog="part"></div><div class="note" style="margin-top:28px"><b>Not sure which part you need?</b> Send your vehicle model and a photo of the part on WhatsApp or via the contact form and we will help identify it.</div>'
     '<p style="margin-top:20px"><a class="btn btn-primary" href="contact.html#inquiry">Send a parts inquiry</a></p></div></section>')

# ---------------- REPAIR ----------------
rsvc = [("battery", "Battery diagnosis", "Checking battery condition and performance."), ("plug", "Battery replacement", "Replacement and installation of a suitable battery."), ("bolt", "Charging-system checks", "Charger, port and charging-related faults."),
        ("cpu", "Electrical troubleshooting", "Tracing wiring and electrical faults."), ("gear", "Controller &amp; motor diagnostics", "Where supported for your vehicle."), ("wrench", "Routine servicing", "Preventive servicing and maintenance guidance."),
        ("check", "Compatible parts replacement", "Replacing worn parts with compatible ones.")]
page("repair.html", "Electric Bike & Scooty Repair and Maintenance | Voltix Energy",
     "Electric bike and scooty repair and maintenance in Pakistan: battery diagnosis and replacement, charging checks, electrical troubleshooting and servicing. Submit a service request online.",
     hero("Repair &amp; Maintenance", "Keep your electric ride running smoothly with battery, charging and electrical support.", "Repair &amp; Maintenance") +
     '<section class="section"><div class="container"><div class="sec-head"><span class="eyebrow">Services</span><h2>What we can help with</h2></div><div class="grid g3">' + "".join('<div class="card">%s<h3>%s</h3><p>%s</p></div>' % (ICON(i), t, d) for i, t, d in rsvc) + '</div>'
     '<div class="note" style="margin-top:28px"><b>Please note:</b> Service availability depends on your vehicle, the fault and your location. Submitting a request does not guarantee service until our team confirms it. We will tell you clearly if we cannot service your vehicle.</div></div></section>'
     '<section class="section alt"><div class="container"><div class="sec-head"><span class="eyebrow">How booking works</span><h2>Request a repair</h2></div><div class="steps s3" style="margin-bottom:36px"><div class="step"><h3>Submit the form</h3><p>Describe the problem and your vehicle.</p></div><div class="step"><h3>We review &amp; confirm</h3><p>Our team contacts you about availability.</p></div><div class="step"><h3>Get your vehicle serviced</h3><p>At our workshop or by home visit, where available.</p></div></div>'
     '<div id="request" style="max-width:820px">' + repair_form + '</div></div></section>')

# ---------------- HOME SERVICE ----------------
page("home-service.html", "Home Service for Electric Bikes & Scooties | Book a Visit | Voltix Energy",
     "Request a home visit for electric bike and scooty repair, maintenance and battery assistance in Pakistan, subject to service-area availability. Book with Voltix Energy.",
     '<section class="page-hero"><div class="container"><div class="crumbs"><a href="index.html">Home</a> / Home Service</div><h1>Expert EV Service, Right at Your Doorstep</h1><p>Request a home visit for convenient repair, maintenance and battery assistance, subject to service-area availability.</p></div></section>'
     '<section class="section"><div class="container"><div class="steps s3"><div class="step"><h3>Submit your service request</h3><p>Tell us about your vehicle, the issue and your address.</p></div><div class="step"><h3>Receive confirmation</h3><p>Our team contacts you to confirm coverage and timing.</p></div><div class="step"><h3>Get assistance at your location</h3><p>Subject to availability.</p></div></div></div></section>'
     '<section class="section alt" id="book"><div class="container"><div class="formside"><div><div class="sec-head"><span class="eyebrow">Book a visit</span><h2>Schedule a Home Visit</h2></div>'
     '<div class="note" style="margin-bottom:18px"><b>This is a request, not an instant booking.</b> Your visit is only confirmed once Voltix Energy contacts you. Coverage, timing and any charges are confirmed by our team.</div>' + home_form + '</div>'
     '<aside><div class="card"><h3>Service area</h3><p data-areas></p></div><div class="card" style="margin-top:20px"><h3>Prefer to chat?</h3><p>Ask about availability in your area on WhatsApp.</p><a class="btn btn-wa btn-sm" data-wa="home" data-wa-fallback="WhatsApp not configured yet" href="#">WhatsApp us</a></div></aside></div></div></section>')

# ---------------- ABOUT ----------------
page("about.html", "About Voltix Energy | Powering Better Electric Mobility",
     "Voltix Energy brings electric mobility products and practical support together: batteries, lithium solutions, electric cycles, spare parts, repairs and home-visit maintenance.",
     hero("Powering Better Electric Mobility", "Voltix Energy brings electric mobility products and practical support together in one place.", "About") +
     '<section class="section"><div class="container" style="max-width:820px"><p class="lead" style="max-width:none">Voltix Energy brings electric mobility products and practical support together in one place. From batteries and lithium battery solutions to electric cycles, spare parts, repairs, and convenient home-visit maintenance, our goal is to help customers keep their electric rides powered and ready for everyday journeys.</p>'
     '<div data-hide-empty style="margin-top:28px"><h2>Our story</h2><p id="about-story"></p></div></div></section>'
     '<section class="section alt"><div class="container"><div class="grid g3">'
     '<div class="card">' + ICON("bolt") + '<h3>What we do</h3><p>Batteries, lithium solutions, electric cycles, spare parts, repair and maintenance.</p></div>'
     '<div class="card">' + ICON("support") + '<h3>Customer service approach</h3><p>We guide you to the right product or service first, and support you after the sale.</p></div>'
     '<div class="card">' + ICON("home") + '<h3>Service coverage</h3><p data-areas></p></div></div>'
     '<p style="margin-top:32px"><a class="btn btn-primary" href="contact.html">Contact Our Team</a></p></div></section>')

# ---------------- CONTACT ----------------
def row(ic, label, inner, key):
    return '<li data-hide-empty>%s<div><b>%s</b><span>%s</span></div></li>' % ('<span style="color:var(--blue);width:22px" data-icon="%s"></span>' % ic, label, inner)
page("contact.html", "Contact Voltix Energy | Batteries, Cycles, Parts & Service",
     "Contact Voltix Energy for electric bike batteries, electric cycles, spare parts and repair or home-service requests in Pakistan.",
     hero("Contact Us", "Talk to Voltix Energy about batteries, electric cycles, spare parts or maintenance.", "Contact") +
     '<section class="section"><div class="container"><div class="formside" id="inquiry"><div>' + contact_form + '</div><aside><div class="card"><h3>Get in touch</h3><ul class="info-list">'
     + row("phone", "Phone", '<a data-cfg="phone" href="#"></a>', "phone") + row("mail", "Email", '<a data-cfg="email" href="#"></a>', "email")
     + row("pin", "Address", '<span data-cfg="address"></span>', "address") + row("clock", "Operating hours", '<span data-cfg="hours"></span>', "hours")
     + '<li>' + '<span style="color:var(--blue);width:22px" data-icon="home"></span><div><b>Home-service coverage</b><span data-areas></span></div></li></ul>'
     '<p style="margin-top:14px"><a class="btn btn-wa btn-sm" data-wa="general" data-wa-fallback="WhatsApp not configured yet" href="#">WhatsApp us</a></p><div data-social style="margin-top:14px"></div></div></aside></div>'
     '<div style="margin-top:36px" data-map></div></div></section>')

# ---------------- PRODUCT ----------------
page("product.html", "Product Details | Voltix Energy", "Product details, specifications and inquiry for Voltix Energy electric mobility products.",
     hero("Product details", "Verified specifications and inquiry options.", "Product") +
     '<section class="section"><div class="container"><div id="product-detail"></div></div></section>'
     '<section class="section alt" id="inquiry"><div class="container" style="max-width:820px"><div class="sec-head"><h2>Request a quote</h2><p class="lead">Tell us about your vehicle and we will confirm compatibility, availability and price.</p></div>'
     + battery_form.replace('id="b-prod" name="product"', 'id="product-field" name="product"') + '</div></section>')

# ---------------- SEARCH ----------------
page("search.html", "Search | Voltix Energy", "Search Voltix Energy batteries, electric cycles and spare parts.",
     hero("Search results", "Matching batteries, electric cycles and spare parts.", "Search") + '<section class="section"><div class="container"><div data-catalog="all"></div></div></section>', robots="noindex")

# ---------------- POLICIES ----------------
page("policies.html", "Warranty, Returns & Delivery Policies | Voltix Energy", "Voltix Energy warranty, return and delivery policies.",
     hero("Policies", "Warranty, returns and delivery information.", "Policies") +
     '<section class="section legal"><div class="container" style="max-width:820px"><h2>Warranty</h2><p data-policy="warranty"></p><h2>Returns</h2><p data-policy="returns"></p><h2>Delivery &amp; pickup</h2><p data-policy="delivery"></p></div></section>')

# ---------------- STATIC FILES ----------------
MARKSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="#1769FF"/><path d="M13 13l11 22" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M35 13L24 35" stroke="#18C8E8" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M24.5 6.5L19.5 15h3.6l-1.2 5.5 5-8.5h-3.6z" fill="#fff"/></svg>'
open(os.path.join(OUT, "favicon.svg"), "w").write(MARKSVG)
open(os.path.join(OUT, "logo.svg"), "w").write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 56"><rect width="280" height="56" fill="#101827"/><g transform="translate(4 4)"><g transform="scale(1)">' + MARKSVG.split('viewBox="0 0 48 48">')[1].replace("</svg>", "") + '</g></g><text x="62" y="30" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" letter-spacing="3" fill="#fff">VOLTIX</text><text x="62" y="46" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="10" letter-spacing="7" fill="#18C8E8">ENERGY</text></svg>')
open(os.path.join(OUT, "robots.txt"), "w").write("User-agent: *\nAllow: /\nDisallow: /search.html\n\n# Replace with your real domain:\nSitemap: https://YOUR-DOMAIN/sitemap.xml\n")
urls = ["", "batteries.html", "electric-cycles.html", "spare-parts.html", "repair.html", "home-service.html", "about.html", "contact.html", "policies.html"]
open(os.path.join(OUT, "sitemap.xml"), "w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join("  <url><loc>https://YOUR-DOMAIN/%s</loc></url>\n" % u for u in urls) + "</urlset>\n")
print("built")

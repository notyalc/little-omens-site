// ============================================================
//  LITTLE OMENS SITE CONTENT
//  This is the only file you need to edit. Save, redeploy, done.
//  Text in [BRACKETS] shows in pink on the site until you replace it.
//  Leave an image path as "" to keep the lit stand-in frame.
// ============================================================
window.CONTENT = {
  brand: {
    name: "little omens",
    tagline: "something small is coming.",
    city: "[CITY]",
    year: "2026"
  },

  // What the page says at the top right and in the marquee-style metadata
  drop: {
    label: "omen 01",
    dollName: "[Doll name]",
    date: "[DATE]",                       // shown in text, e.g. "nov 14"
    dateISO: "[YYYY-MM-DDT10:00:00-05:00]", // drives the countdown; leave in brackets until you know it
    scale: "[1/4 · 42 cm]",
    intro: "big eyes, bad mood, hand-painted faceup. the first omen, and the only one who gets to be first. blank or with faceup. cast to order.",
    specs: [
      ["scale · height", "[1/4 · 42 cm]"],
      ["resin colors", "[Normal · Grey · Tan]"],
      ["eyes · wig", "[14 mm · 7–8 in]"],
      ["joints", "double-jointed elbows and knees, magnetic hands and feet"],
      ["in the box", "[Doll · eyes · certificate · box]"],
      ["price", "[PRICE] · deposit [DEPOSIT]"],
      ["preorder window", "[DATE] to [DATE]"],
      ["estimated shipping", "[MONTH] to [MONTH]"]
    ]
  },

  statement: {
    kicker: "the studio",
    text: "a new ball-jointed doll studio. we make small runs of resin dolls that are ",
    highlight: "a little bit ominous",
    textAfter: " and entirely loved. the first one is almost here."
  },

  // Photos. Put files in the images/ folder and write the filename here.
  // Portrait orientation works best (4:5). JPG, 1600px on the long side, under 500 KB each.
  photos: {
    hero:  { src: "images/hero.jpg",  caption: "hero portrait" },
    fig2:  { src: "images/fig2.jpg",  caption: "full body, seated" },
    fig3:  { src: "images/fig3.jpg",  caption: "faceup, macro" },
    fig4:  { src: "images/fig4.jpg",  caption: "hands, resin detail" },
    fig5:  { src: "images/fig5.jpg",  caption: "blank resin, color options" }
  },
  photoNote: "shoot on a charcoal seamless with one soft key from above and a slight fill. the page is designed to disappear behind the doll.",

  roster: {
    kicker: "coming omens",
    title: "every doll is an omen.",
    lede: "little omens is a studio, not a doll. every release gets a name, a sign, a short run, and one muted color. the charcoal and fog never change.",
    items: [
      { num: "01", name: "[Doll name]", desc: "the crescent. sculpt finished, molds in progress.", status: "preorder [DATE]", live: true, sign: "crescent" },
      { num: "02", name: "Unnamed", desc: "the eye. in sculpt. softer, stranger, or both.", status: "in sculpt", live: false, sign: "eye" },
      { num: "03", name: "Unnamed", desc: "the comet. not yet a sketch. the list hears first.", status: "planned", live: false, sign: "comet" }
    ]
  },

  join: {
    kicker: "the list",
    title: "don't miss her.",
    lede: "the list gets the link a few hours before everyone else. that is the whole perk, and it matters when the run is small.",
    fine: "one email when the window opens. one when it closes. see the privacy note below.",
    // Where emails go. Options:
    //  "netlify"  -> Netlify Forms collects them (zero setup, see README)
    //  a URL      -> your Mailchimp / Klaviyo / ConvertKit form action URL
    formAction: "netlify",
    emailFieldName: "email"      // Mailchimp uses "EMAIL", Klaviyo uses "email"
  },

  // the scrolling band under the hero
  marquee: ["something small is coming", "resin · hand-cast · limited", "more omens to come"],

  social: [
    { label: "instagram", url: "https://instagram.com/" },
    { label: "tiktok",    url: "https://tiktok.com/" },
    { label: "x",         url: "https://x.com/" },
    { label: "email",     url: "mailto:hello@example.com" }
  ],

  // Legal. Fill these in before launch; the privacy page reads them.
  legal: {
    entity: "[YOUR COMPANY OR STUDIO LEGAL NAME]",
    contactEmail: "[privacy@yourdomain.com]",
    country: "[COUNTRY]",
    updated: "[DATE]"
  },

  // Used for link previews on social. Put a 1200x630 JPG in images/ and name it here.
  seo: {
    title: "little omens",
    description: "a new ball-jointed doll studio. something small is coming.",
    ogImage: "images/og.jpg"
  }
};

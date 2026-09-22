# little omens promo site

A one-page promo and waitlist site. No build step, no framework. Edit one file, drop in photos, deploy.

## Files

| File | What it is | Edit it? |
|---|---|---|
| `content.js` | All words, dates, specs, links, photo filenames | **Yes, this is the one** |
| `images/` | Your photos | **Yes, drop files here** |
| `index.html` | Page structure | Only to add a new section |
| `styles.css` | Look and feel, brand colors at the top | Only to restyle |
| `site.js` | Fills in content, loads photos, runs the parallax | No |
| `favicon.svg` | Browser tab icon | Swap when the logo is final |
| `privacy.html` | Privacy policy, reads names from content.js | Only the wording |
| `404.html` | Not-found page | No |
| `netlify.toml` | Hosting config and security headers | Only to allow a new script |
| `robots.txt`, `sitemap.xml` | Search engine files | Replace YOURDOMAIN |
| `.well-known/security.txt` | Where researchers report security issues | Replace the email |

## 1. Add your content

Open `content.js` in any text editor (TextEdit works; VS Code is nicer).
Anything still in `[BRACKETS]` shows in pink on the live site, so you can see what is left.

- `drop.dollName`, `drop.date`, `drop.specs`: the first doll
- `photos`: filenames of the pictures you put in `images/`
- `join.formAction`: where emails go (see step 3)
- `social`: your real handles
- `seo`: title, description, and the link-preview image
- `legal`: your legal entity name, privacy contact email, country, and date. The privacy page reads these.

Save the file. That is the whole content update.

## 2. Add your photos

Put them in `images/` with the names listed in `images/README.txt`, or use your own names and update `content.js`.
Portrait shots on a dark background look best. The page shows a lit stand-in frame for any photo that is missing.

## 3. Pick where emails go

Default is Netlify Forms, which needs zero setup if you host on Netlify: submissions appear under Forms in the Netlify dashboard and can be exported or forwarded to your email.

If you use Mailchimp, Klaviyo, or ConvertKit instead: create an embedded signup form there, copy the form's `action` URL, and paste it into `join.formAction`. Set `join.emailFieldName` to match (Mailchimp uses `EMAIL`).

## 4. Preview locally

Double-click `index.html`. It opens in your browser and works from disk. The form will not submit locally; that only works once deployed.

## 5. Deploy to Netlify (free)

1. Sign up at netlify.com.
2. On the dashboard, find the drag-and-drop area ("Deploy manually" or "Sites").
3. Drag this whole folder onto it.
4. You get a live URL like `something.netlify.app` within a minute.

To update the site later, drag the folder again. Every drop is a new deploy.

## 5b. Or deploy with GitHub Pages (free, no Netlify)

Works because this is plain static files. Two things differ from Netlify:

- **The email form.** GitHub Pages cannot receive form posts, so `formAction: "netlify"` will not work there. Sign up at formspree.io (free tier), create a form, and paste its endpoint into `join.formAction` in `content.js`, e.g. `"https://formspree.io/f/abcdwxyz"`. Mailchimp or Klaviyo form URLs work the same way.
- **Security headers.** GitHub Pages cannot send custom headers, so the policy from `netlify.toml` is also set as a `<meta>` tag in each page. You lose only the clickjacking and HSTS headers, which matter little for a promo page.

Steps:

1. On a free GitHub account the repo must be **public** for Pages. On GitHub Pro it can stay private.
2. Repo → Settings → Pages → Source: "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save.
3. The site appears at `https://<username>.github.io/little-omens-site/` within a minute or two. Every push to `main` redeploys.
4. Custom domain: in the same Pages settings, enter your domain and follow the DNS instructions (an A or CNAME record at your registrar). Tick "Enforce HTTPS" once it's verified.

## 6. Connect your domain

In Netlify: Site settings, then Domain management, then Add a domain. Follow the DNS steps it shows for wherever you bought the domain. HTTPS turns on automatically.

## Security and standards, what is included

- **HTTPS** is automatic on Netlify, and the site forces it (HSTS header).
- **Security headers** in `netlify.toml`: a Content Security Policy that only allows this site's own files and Google Fonts, plus clickjacking, MIME-sniffing, referrer, and permissions protections. Check them after deploy at securityheaders.com; you should see an A.
- **Form spam protection**: a hidden honeypot field bots fill and humans never see. Netlify drops those submissions. If spam still gets through, turn on Netlify's reCAPTCHA option in the form settings.
- **No third-party scripts, no cookies.** That is why there is no cookie banner. If you add analytics later, you will need one and a CSP update.
- **Privacy policy** at `/privacy.html`, linked from the footer. Fill in `legal` in `content.js`. Collecting emails without a privacy policy is a problem under GDPR, UK GDPR, CAN-SPAM, and CCPA.
- **Content is escaped** before it is written into the page, so nothing in `content.js` can inject HTML.
- **404 page**, `robots.txt`, `sitemap.xml`, and `security.txt` are present. Replace `YOURDOMAIN` in the two search files.
- **Attack surface** is very small because there is no server, database, login, or payment on this site. Those arrive with Shopify, which handles its own security.

## Before launch checklist

- [ ] Nothing pink left on the page
- [ ] All four photos and `og.jpg` in place
- [ ] Form tested with a real email after deploy
- [ ] Social links point to real profiles
- [ ] Checked on a phone
- [ ] Domain connected and loading over https
- [ ] `legal` block in content.js filled in and the privacy page read once
- [ ] `YOURDOMAIN` replaced in robots.txt and sitemap.xml
- [ ] securityheaders.com shows an A on your live URL

## When preorders open

This site is a promo page. When the ordering window opens, either link the "Join the list" button to your Shopify product page, or move the whole design onto Shopify. The colors, fonts, and copy carry over as they are.

# ROXX Hotel & Restaurant

A responsive Next.js landing page for ROXX on NH 139, AIIMS–Naubatpur Road, Motipur, Patna, Bihar.

## Run locally

```sh
npm install
npm run dev
```

Open the Local URL printed by Next.js. `npm run build` checks TypeScript and exports the production site to `out/`.

## Included

- Rich copper food photography, forest green, cream and gold styling, using the supplied ROXX crest and hotel artwork.
- Subtle scroll reveals, image parallax, hover effects, and reduced-motion support.
- All 138 dishes and prices from the five supplied menu pages remain browsable. The menu initially shows six starters, with six more available per “Show more” click. Category, search and dietary changes reset the visible selection to six and use animated transitions.
- An open signature-dish composition with one large arched photograph and three unboxed photo-and-text rows. Signature photography uses detailed masters with 1200px, 600px and 320px WebP variants.
- The full menu uses 138 distinct dish-specific AI photographs in WebP format, with 768px masters and 320px/160px responsive variants. Complete plates and bowls are centred with background space for the circular masks; images use contain sizing and no hover zoom. Generous typography and staggered filter transitions retain the open layout. Celebrations and booking forms use open layouts and fine divider lines.
- Original menu images available in an accessible native dialog.
- Four vegetarian celebration packages from the supplied poster: Veg Simple ₹499, Veg Silver ₹599, Veg Gold ₹799 and Veg Platinum ₹1,099, all plus tax. A forest green background with subtle botanical and gold detailing frames arched food photography and an open, image-led package selector. Keyboard-accessible tabs show one package’s original item quantities at a time, with a matching food photograph, package-specific WhatsApp enquiry draft and an expandable copy of the original poster.
- Full-width dining and celebration banners, plus birthday, wedding, anniversary and family-gathering cards.
- Wedding hall charge of ₹1,75,000, with all 21 venue-provided amenities grouped into spaces and stay, décor and seating, and guest facilities. Includes a wedding enquiry button that selects the wedding occasion in the existing form, a WhatsApp enquiry draft and a link to the booking/payment terms.
- An on-page event enquiry form with exactly four occasions: Birthday, Anniversary, Ring ceremony and Wedding. Celebration cards and booking shortcuts use the same choices, with Birthday selected initially. Includes name, phone, date, time, guest count and notes, a review table, copying enquiry details, and direct phone confirmation links.
- Venue-provided event booking highlights, payment terms and terms and conditions are displayed after the enquiry section, with a direct form link and an expandable original information image. All 13 points are retained, including the refundable ₹5,000 security deposit, 40% advance and the payment deadline.
- An interactive Google Maps embed and directions linked to the exact business listing supplied by the user (CID 8451218244387467601), plus the supplied Instagram profile.
- A floating WhatsApp link for +91 82928 39087. It opens an editable enquiry draft; no message is sent automatically. The top contact banner displays this number alongside +91 92412 89990.
- An asymmetric photo grid of the four supplied venue photographs, enhanced with the built-in image_gen tool. Two wide images sit beside two stacked narrower images, with captions over the photos. Mobile uses a wide–paired–wide composition. Responsive WebP variants and an accessible viewer with previous/next controls let guests view each full portrait image. Enhanced masters and prompts are retained in `output/imagegen/venue/` and `venue-photo-prompts.json`.
- The complete portrait hotel image is shown without cropping or a zoom effect.
- Responsive layouts, social metadata and branded icons.

## Content and bookings

Edit `app/menu.ts` for dishes and prices, `app/menu-catalog.tsx` for menu browsing, `app/menu-presentation.ts` for illustrative food images and descriptions, `app/menu-cards.css` for menu rows, `app/signature-dishes.tsx` and `app/editorial.css` for the open photography layout, `app/booking-form.tsx` for enquiries, `app/page.tsx` for venue copy and phone links, and `app/globals.css` for shared styling. Prices reflect the supplied menu, and guests are asked to confirm current prices and availability. Booking details stay in browser memory; bookings are confirmed by phone. There is no payment, order-processing or reservation backend.

The hotel image was supplied by the user. The generated hero is illustrative food photography, not a verified photograph of ROXX dishes. Image provenance and generation prompt are recorded in `ASSETS.md`.

## Deployment

The project uses Next.js static export. `.openai/hosting.json` retains the Sites project identity and declares `out/` as the deployment directory. The entire export can also be hosted on another static host.

# WishNu Website Setup

## Option B: Google Forms

An email address does not create a Google Form. The form must be created and published from the owner's Google account.

1. Sign in to Google Forms as `abilash6377@gmail.com` and create a project enquiry form.
2. Add Full Name, Email, Phone, Project Type, Project Location and Message. Make Full Name, Email, Project Type and Message required.
3. Publish the form with responder access for anyone with the link. Leave the one-response limit and sign-in requirement off if you want all website visitors to be able to enquire.
4. Use the form's More menu and choose Embed HTML. Older interfaces may have this under Send and the embed tab.
5. Copy only the iframe's `src` URL into `GOOGLE_FORM_EMBED_URL` in `src/data.ts`. Use the published `docs.google.com/forms/.../viewform?embedded=true` URL, not the edit link or a `forms.gle` short link.
6. In Responses, open the More menu and enable Get email notifications for new responses while signed in as `abilash6377@gmail.com`.
7. Submit a test response and check both the form's Responses tab and the email inbox. Google notifications link to the responses; they do not necessarily include every answer in the email body.

Until the embed URL is supplied, the existing built-in contact form uses FormSubmit. Delivery through that service requires the account owner to activate it using the confirmation email. Email delivery has not been verified from this project.

Google's current instructions:

- https://support.google.com/docs/answer/2839588
- https://support.google.com/docs/answer/139706

## Hotel Imagery

The All Inspiration, Hotel Exteriors and Interior Renovation filters now use only hotels in the supplied WishNu property list. The unrelated branded reference images have been removed, including the 3D hero's photographic fallback.

`src/propertyGallery.ts` defines six exterior photos and three interior photos, resolving every property name and location through `src/portfolio.ts`. Exterior images include Bliss Point Inn Kokomo and Marion, Days Inn Kokomo, Red Roof Inn Perrysburg, King's Inn and Dunes Inn Michigan City. Room photos are from the official Bliss Point Inn Kokomo, Marion and Wabash pages.

The gallery links to each photo's original source. Photographs remain the property of their respective owners. Obtain the required permissions or use licensed, owner-provided images before commercial publication.

This gallery never substitutes a stock hotel image: an unavailable property image shows a labelled image-unavailable state. Published photos are not dated before/after renovation evidence. Remote image loading still needs checking in the deployed browser.

## Company Experience and Portfolio

`COMPANY` and `COMPANY_EXPERIENCE` in `src/data.ts` hold the address and company-reported track record. The office address is 14214 Bergen Blvd, Suite 150, Noblesville, IN 46060, United States. The phone and email remain unchanged.

`src/portfolio.ts` contains the owner-supplied historical revenue schedule, major renovation scopes and PIP/targeted-improvement property list. The portfolio and the categorized exterior/interior gallery use the same property names and locations.

- The overview reports 20 completed hotel projects since 2013. The two scope groups list seven major projects and 13 PIP/targeted-improvement properties.
- The supplied revenue schedule has 19 rows. All 19 are available in the searchable, filterable results table and CSV export. No twentieth revenue record has been invented.
- Percentages are rounded from the supplied before/after revenue figures. The Quality Inn decline (-8%) and Dunes Inn unchanged result (0%) are preserved.
- Properties beginning at $0 are labelled as new revenue and absolute revenue growth, not assigned a percentage increase.
- The overview does not specify reporting periods or audited financial statements. The website describes figures as company-reported historical revenue, not annual revenue, profit or guaranteed future performance.
- New Buffalo is shown as MI, matching the detailed Best Western project scope. The supplied revenue table labels it IN; the owner should confirm this discrepancy.
- Anderson Inn and King's Inn are retained in the revenue schedule. America's Best Value Inn and Knights Inn are retained in the PIP scope list. Published hotel galleries identify these as former/current names and supply shared photography. Their project and financial records have not been merged.

Update the project figures and scope records here when new verified details or project photos are available.

## Property Photos

`src/propertyPhotos.ts` maps photographs to all 22 property-name entries appearing across the project scope lists and revenue schedule. This includes historical name variants; it is not a new claim of 22 completed projects. The reported total remains 20 projects.

- Official BlissPoint galleries supply images for Kokomo, Lawrence, Wabash, Marion and Muncie.
- Named hotel listings supply images for Days Inn in Kokomo and NW Indianapolis, Super 8 Fort Wayne, Best Western New Buffalo, Quality Inn Columbia City, Red Roof Inn Perrysburg, Express Motel Northwood, Anderson Inn, Kings/Knights Inn Michigan City, Dunes Inn Michigan City and Regency Inn Fort Wayne.
- H&K Motel has a credited photo from Ted Shideler's published 2026 photo essay. It is not presented as a photograph from the 2015 renovation.
- Days Inn Northwood and Roadway Inn Indianapolis use explicitly labelled representative motel imagery because an exact property identity/photo could not be confirmed from the supplied names alone.
- The Bliss Point Inn Indianapolis entry has a candidate photo of the Northwest location, labelled representative until the owner confirms the correct hotel.
- All photographs have descriptive alt text, source links and fallback handling. An unavailable remote image falls back to labelled representative photography, then to an image-unavailable placeholder.
- The hotel gallery and the revenue-table thumbnails open an accessible property-detail dialog with photos, project scopes and historical revenue where provided.

These are third-party published photographs, not owner-supplied dated before/after construction photos. Obtain the necessary image permissions or replace them with licensed/owner-provided images before commercial publication. Remote image availability and rights have not been verified in a deployed browser.

## Welcome Experience

`src/components/WelcomeScreen.tsx` provides a full-screen photographic entrance, a traditional WishNu crest, a subtle 3D pointer tilt, gold curtain transitions and an Enter WishNu button.

The welcome screen appears once per browser-tab session. Visitors can skip it with the Skip Welcome button or Escape. Links to site sections bypass it. Use `#welcome` in the URL or the footer's Replay the welcome experience button to display it again. Reduced-motion preferences are respected and no audio or automatic wait is required.

The supplied Arena reference URL returned only a JavaScript page shell to the research tools. Its exact welcome layout and animation could not be inspected, so this entrance is a WishNu-theme interpretation, not a verified visual reproduction. A screenshot or short recording of the reference would allow more precise matching.
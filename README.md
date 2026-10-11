# IRIS Sales Demo Prototype

This is a standalone public sales demo for IRIS, prepared for embedding in the Instinctready Squarespace website. It does not modify or deploy the production IRIS repository.

## Demo Positioning

The prototype demonstrates IRIS for a fictional senior-living organization: Harborview Senior Living Network.

All organization details, findings, actions, preparedness activities, advisor responses, evidence records, and activity trends are simulated demonstration data. Overall readiness percentages are deliberately omitted when evidence is insufficient.

## Kodeful Alignment

Reviewed against the exact IRIS-MVP-Developer-Packet-v1.1.zip sent to Kodeful on August 20, 2026. See KODEFUL_ALIGNMENT.md for requirements traceability, gaps found in the prior hosted version, implemented corrections, and intentionally excluded production features. This is a scoped senior-living adaptation, not the full 32-screen Cedar Valley prototype or the production MVP.

The local revision uses the official supplied IRIS logo and brand blue. It adds evidence provenance, a managed plan and human-reviewed draft, clarification without evidence upgrades, capability/evidence/validation distinctions, and session-only Improvement Action transitions. Completion never automatically validates an action.

Run `node --test demo.test.cjs` for the focused behavioral checks. These checks use a minimal DOM test double; they do not replace desktop/mobile browser rendering verification.

## Scope

- Operational emergency-management workspace first.
- Visitor-facing guided tour and free exploration.
- Final invitation to join the waitlist, with an optional discounted preorder link.
- Preserve the approved architecture:
  - Human operators retain final authority.
  - IRIS acts as the Emergency Management Intelligence Model.
  - vEM acts as the Virtual Emergency Manager Operating System.
  - Applications provide specialized preparedness workflows.
  - Data records, events, signals, and evidence remain separate from derived intelligence.
- Preserve human-approval boundaries:
  - AI may draft, analyze, summarize, organize, and recommend.
  - AI may not certify, approve, authorize, or validate operational truth.

## Included Prototype Areas

- Readiness Snapshot
- Contextual IRIS advisor
- Improvement Map and proposed-action-to-validation workflow
- Plans and four-stage review
- Clarification Queue
- Recurring preparedness program
- Preparedness Validation and illustrative activity trends
- Scoped sales-demo specification

## Not Included

- Production integrations
- Real customer data
- Production IRIS code changes
- A production advisor or autonomous operational execution
- Validated readiness scoring methodology
- Autonomous operational decisions

## Run Locally

Serve this folder with any local static server and open `index.html`.

## Squarespace Integration

The demo stays hosted on GitHub Pages. Use the markup in `squarespace-embed.html` in an HTML Code Block on the Instinctready demo page, with Display Source disabled. The new-tab link provides a full-window option on mobile. A supported Squarespace plan is required for iframe code.

Configure a real Squarespace newsletter/form block and its submission storage for the waitlist. Set its page's absolute HTTPS URL in `demo-config.js`. The demo does not collect, transmit, or store visitor contact information itself.

Set `preorderUrl` only after the real checkout and offer terms are ready. Set `preorderOffer` to the approved price/discount details. No price, discount, launch date, or payment collection is invented by this demo. Unconfigured links remain hidden.

Publish `index.html`, `styles.css`, `app.js`, `demo-config.js`, and `assets/iris-logo.png` together to the demo repository. Preserve the assets folder. `squarespace-embed.html` is the integration snippet, not the demo entry point.

Live Squarespace page: https://www.instinctready.com/iris . It embeds the existing GitHub Pages demo and includes a native IRIS Waitlist newsletter block, stored in Squarespace Contacts (no mailing list selected). The page is published under Not Linked, accessible by URL without a main-navigation entry.

Desktop/mobile layout, embedded advisor navigation, waitlist anchor, and required-email validation were checked. A real signup and contact-storage confirmation have not been tested. Preorder remains disabled pending approved offer terms.

This local package contains Kodeful-alignment and visitor-tour revisions that are not yet on GitHub Pages: the connector rejected repository writes, and the browser GitHub session is signed out. The Squarespace page embeds the prior hosted version, not these revised local files. The production IRIS repository was not modified. Recheck the new version in desktop/mobile browsers after upload before claiming release alignment.

Official references:
- https://support.squarespace.com/hc/en-us/articles/206543167-Add-custom-code-to-a-page-with-code-blocks
- https://support.squarespace.com/hc/en-us/articles/205826068-Newsletter-blocks

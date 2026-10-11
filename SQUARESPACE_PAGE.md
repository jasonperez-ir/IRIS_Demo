# IRIS Demo Page

Page title: IRIS
Live URL: https://www.instinctready.com/iris
Status: Published in Squarespace under Not Linked. Public by URL, not password-protected.

## Deployment Record

The published page contains an IRIS introduction, simulation notice, existing GitHub Pages demo iframe, full-window demo link, and native email-only IRIS Waitlist newsletter block. Human authority and the IRIS intelligence / vEM operating distinction are preserved. The main homepage and global styles were not intentionally changed.

Waitlist storage is connected to Squarespace Contacts with no mailing list selected (none exist in this account). Google reCAPTCHA remains enabled; confirmation email remains off. The waitlist anchor is iris-waitlist.

Verified desktop and 390px mobile layout, embedded advisor navigation, signup anchor, and required-email validation. No real signup was submitted; an owner test should confirm contact capture before broad promotion.

The local package now contains Kodeful-alignment corrections, additional visitor-tour revisions, and a configured waitlist link. These are not yet on GitHub Pages: the connector rejected repository writes and the GitHub browser session is signed out. The live iframe uses the prior hosted version. See KODEFUL_ALIGNMENT.md for traceability and verification limits. Production IRIS was not modified.

The following sections retain planning copy and setup guidance, not a claim that every proposed section was published.

## Page Copy

### IRIS

Preparedness intelligence for the work between emergencies.

Explore a fictional senior-living organization as IRIS interprets readiness gaps and vEM organizes recommended actions, evidence reviews, and a recurring preparedness program. Your team retains authority over operational decisions.

Primary button: Explore the Demo (link to #iris-demo)
Secondary button: Join the Waitlist (link to #iris-waitlist)

### Harborview's Preparedness Story

Three communities. Overnight staffing gaps. Evidence due for review.

All organization details, advisor responses, scores, and trends in this interactive demo are simulated. They are not customer results or validated readiness claims.

[Embed the demo here with squarespace-embed.html; set this section's anchor to iris-demo.]

### Join the IRIS Waitlist

Get updates about IRIS availability for your organization's preparedness program.

[Add a native Squarespace newsletter block. Set this section's anchor to iris-waitlist.]

Fields: Email address, required. Avoid unnecessary personal information.
Button label: Join the Waitlist
Signup consent: By joining, you agree to receive email updates from Instinct Ready about IRIS. You can unsubscribe at any time.
Success message: You're on the IRIS waitlist. We'll email you with availability updates.

## Setup And Verification

1. Create a new Squarespace page named IRIS, using the existing site header, footer, typography, and section styles.
2. Add the short opening copy and the demo section. Put the supplied embed markup in a Code Block. Keep the existing main homepage unchanged.
3. Add a native newsletter block below the demo. Connect its storage to the owner's selected Squarespace mailing list or existing supported service. Do not publish an unconnected form.
4. Configure the waitlist link in demo-config.js to the verified absolute page URL with the iris-waitlist anchor.
5. Publish the demo files together to jasonperez-ir/IRIS_Demo, then verify the hosted tour and final waitlist link.
6. Check desktop and mobile layouts on the Squarespace page. Confirm the embedded demo and full-window link work. Test one owner-approved signup and confirm the subscription arrives in the selected storage before showing the success message to visitors.
7. Publish the Squarespace page. Add a navigation link only when the owner chooses its placement.

## Preorder Option

No preorder button is currently connected. Before enabling it, obtain the approved price, discount, deliverables, launch expectations, and purchase/refund terms. Use an actual checkout page; do not collect payment inside the simulated demo.

## References

- Code Blocks: https://support.squarespace.com/hc/en-us/articles/206543167-Add-custom-code-to-a-page-with-code-blocks
- Newsletter Blocks: https://support.squarespace.com/hc/en-us/articles/205826068-Newsletter-blocks

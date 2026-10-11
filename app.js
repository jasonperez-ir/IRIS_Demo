const findings = [
  {
    id: "evacuation-roles",
    severity: "High",
    title: "Evacuation role assignments are incomplete",
    summary:
      "Two communities have overnight evacuation roles assigned to positions instead of named accountable staff.",
    evidence: "Simulated plan review, staff roster comparison, last update 11 months ago",
    recommendation:
      "Create a named-role evacuation accountability matrix for each shift and route it for administrator approval.",
    owner: "Community administrators",
    due: "14 days",
    domain: "Preparedness",
  },
  {
    id: "medication-cold-chain",
    severity: "High",
    title: "Medication refrigeration continuity lacks validation evidence",
    summary:
      "Backup power procedures mention refrigerated medication, but no recent test evidence is attached.",
    evidence: "Simulated continuity plan review and maintenance log gap",
    recommendation:
      "Run a controlled validation check for emergency refrigeration procedures and attach evidence.",
    owner: "Clinical director and facilities lead",
    due: "21 days",
    domain: "Recovery and Continuity",
  },
  {
    id: "after-hours-staffing",
    severity: "Medium",
    title: "After-hours staffing call tree is aging",
    summary:
      "Six contacts have not been validated this quarter, including two department leads.",
    evidence: "Simulated contact validation log, 88 days since last confirmation",
    recommendation:
      "Refresh the call tree, document confirmations, and schedule a quarterly validation cadence.",
    owner: "Business office manager",
    due: "10 days",
    domain: "Communication",
  },
  {
    id: "tabletop-followup",
    severity: "Medium",
    title: "Previous exercise corrective actions remain unresolved",
    summary:
      "Three actions from the severe-weather tabletop are still open past their target dates.",
    evidence: "Simulated exercise after-action record",
    recommendation:
      "Convert unresolved items into proposed Improvement Actions with leadership review at the next operating period close.",
    owner: "Regional operations",
    due: "30 days",
    domain: "Preparedness",
  },
];

const evidenceRecords = {
  plan: { title: "EOP v2.1 / Evacuation annex", category: "Documented", date: "2025-11-10", author: "Harborview administrators (fictional)", scope: "All three communities", text: "The adopted annex describes evacuation roles by position. Named overnight accountability is incomplete. Documentary intent does not establish demonstrated performance." },
  exercise: { title: "Severe-weather tabletop / Observation 03", category: "Exercise Evidence", date: "2026-06-18", author: "Exercise evaluator (fictional)", scope: "North Haven and Bay Terrace", text: "Participants could not identify the overnight resident-accountability owner. The finding remains unresolved. No successful evacuation performance was observed in this tabletop." },
  "cold-chain": { title: "Medication continuity / Evidence request", category: "Unknown / Unsupported", date: "2026-10-01", author: "IRIS-authored evidence-gap interpretation (simulated)", scope: "Cypress Court", text: "The continuity procedure references refrigerated medication, but no current test record was supplied. Test outcome is unknown. AI inference receives no direct positive validation credit." },
  contacts: { title: "After-hours contact validation log", category: "Documented", date: "2026-07-14", author: "Business office (fictional)", scope: "All three communities", text: "Six contacts lack current confirmation. Records are retained historically; current evidence currency remains limited." },
  implementation: { title: "Corrected accountability matrix / Draft demo evidence", category: "Documented", date: "2026-10-10", author: "Demo administrator", scope: "Selected improvement only", text: "A corrected matrix is attached to the simulated action. This supports implementation, not successful performance or validation." },
  retest: { title: "Targeted retest / Simulated observation", category: "Exercise Evidence", date: "2026-10-10", author: "Demo evaluator", scope: "Selected improvement only", text: "The selected deficiency was checked in a targeted retest. The human reviewer must determine whether the observed evidence supports resolution. One retest cannot establish sustained capability or overall readiness." },
};
const findingSources = {
  "evacuation-roles": ["plan", "exercise"],
  "medication-cold-chain": ["cold-chain"],
  "after-hours-staffing": ["contacts"],
  "tabletop-followup": ["exercise"],
};
const actionStates = new Map();
let selectedFindingId = findings[0].id;
let reviewStage = 0;

function sourceButtons(ids) {
  return ids.map(id => `<button class="source-link" type="button" data-source="${id}">${evidenceRecords[id].title}</button>`).join("");
}

function openEvidence(id) {
  const record = evidenceRecords[id];
  $("#evidence-title").textContent = record.title;
  $("#evidence-body").innerHTML = `<p><strong>Simulated evidence</strong></p><dl><dt>Provenance</dt><dd>${record.category}</dd><dt>Recorded date</dt><dd>${record.date}</dd><dt>Authorship</dt><dd>${record.author}</dd><dt>Scope</dt><dd>${record.scope}</dd></dl><p>${record.text}</p>`;
  $("#evidence-dialog").showModal();
}

const priorities = [
  {
    level: "H",
    severity: "high",
    title: "Evacuation accountability needs named ownership",
    body:
      "IRIS correlates outdated plan sections with overnight staffing patterns and identifies a likely execution gap.",
  },
  {
    level: "H",
    severity: "high",
    title: "Medication continuity evidence is missing",
    body:
      "The record shows a procedure, but IRIS cannot find recent validation evidence supporting emergency refrigeration readiness.",
  },
  {
    level: "M",
    severity: "medium",
    title: "Corrective action aging is degrading readiness confidence",
    body:
      "Open actions from the last tabletop are past due and should be pulled into a recurring preparedness cadence.",
  },
];

const advisorResponses = {
  posture:
      "Harborview's simulated readiness posture is mixed. Several critical procedures have aging or missing evidence. The first priority is to review whether evacuation and continuity procedures are workable during nights, weekends, and constrained staffing periods. This interpretation is advisory and requires human review.",
  action:
    "Review EOP v2.1 and tabletop Observation 03. IRIS recommends a corrected overnight accountability matrix. vEM can prepare an Improvement Action with proposed roles and a due date; it remains Proposed until an authorized administrator confirms assignment. Completion then requires separate evidence-based validation.",
  validation:
    "The validation trend is illustrative. It can show how evidence currency, training completion, exercise performance, and corrective-action closure might improve over time. It should not be presented as a certified readiness score or real customer outcome.",
};

const program = [
  {
    column: "This Month",
    items: [
      ["Plan review", "Refresh evacuation roles and resident movement assumptions."],
      ["Contact validation", "Confirm after-hours leadership and vendor contacts."],
      ["Evidence upload", "Attach generator and refrigeration test records."],
    ],
  },
  {
    column: "Next 30 Days",
    items: [
      ["Tabletop exercise", "Run severe-weather displacement scenario."],
      ["Corrective action review", "Close or escalate prior exercise findings."],
      ["Staff briefing", "Short shift-based readiness briefing for care teams."],
    ],
  },
  {
    column: "Next 90 Days",
    items: [
      ["Leadership review", "Review readiness posture and approve priorities."],
      ["External coordination", "Validate transport and receiving-site assumptions."],
      ["Operating period closeout", "Document trend movement and unresolved risk."],
    ],
  },
];

const trends = [
  ["Staff training coverage", 48, 65],
  ["Completed corrective work", 35, 60],
  ["Scheduled plan reviews done", 60, 75],
  ["Current evidence records", 79, 62],
];

const tourSteps = [
  {
    view: "overview",
    title: "A readiness gap comes into focus",
    copy:
      "Understand and assess: Harborview's administrators face gaps in overnight evacuation ownership and current evidence. The Readiness Snapshot preserves insufficient evidence without inventing a preparedness percentage.",
  },
  {
    view: "advisor",
    title: "Understand what needs attention",
    copy:
      "IRIS interprets the available records and explains why a gap matters. Harborview's administrators review the interpretation and decide what to do. Advisor responses in this demo are prepared scenarios.",
  },
  {
    view: "actions",
    title: "Turn findings into execution",
    copy:
      "For the evacuation finding, vEM drafts an accountable owner, a target date, and an evidence request. Administrator approval is required before any assignment becomes an operational commitment.",
  },
  {
    view: "plans",
    title: "Review the managed plan",
    copy: "The active EOP, its authoritative document version, and its overdue review condition are separate. Follow changes, findings, proposed updates, and a human review summary.",
  },
  {
    view: "clarification",
    title: "Resolve uncertainty without inventing evidence",
    copy: "A staff report can be recorded as Reported, but it does not become demonstrated performance. Medication continuity remains unknown until relevant evidence is supplied.",
  },
  {
    view: "program",
    title: "Sustain the program",
    copy:
      "Harborview's 90-day program connects plan reviews, exercises, evidence refresh, and leadership decisions. Each operating period provides another opportunity to review unresolved work.",
  },
  {
    view: "validation",
    title: "Review evidence over time",
    copy:
      "Training completion, exercise performance, and evidence currency help structure a leadership review. These trends are illustrative; they do not establish real-world readiness or customer results.",
  },
  {
    view: "conversation",
    title: "Stay connected with IRIS",
    copy:
      "Which preparedness priorities need clearer ownership or stronger evidence in your organization? Join the IRIS waitlist for availability updates.",
  },
];

let currentTourStep = 0;
let tourActive = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function setView(viewId) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".nav-item").forEach((item) => {
    const active = item.dataset.view === viewId;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  const view = document.getElementById(viewId);
  $("#view-title").textContent = view.dataset.title;
}

function renderPriorities() {
  $("#priority-list").innerHTML = priorities
    .map(
      (item) => `
        <article class="priority-item">
          <div class="severity ${item.severity}">${item.level}</div>
          <div>
            <strong>${item.title}</strong>
            <span>${item.body}</span>
            <button class="source-link" data-go="actions">Review finding and recommendation</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderAdvisor(prompt = "posture") {
  const transcript = [
    {
      who: "User",
      text:
        prompt === "posture"
          ? "What should I understand first about our readiness posture?"
          : prompt === "action"
            ? "Which finding should we act on first?"
            : "How should I explain these validation trends?",
      user: true,
    },
    {
      who: "IRIS Advisor",
      text: advisorResponses[prompt],
      user: false,
    },
  ];

  $("#advisor-transcript").innerHTML = transcript
    .map(
      (item) => `
        <article class="transcript-item ${item.user ? "user" : ""}">
          <strong>${item.who}</strong>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
  $("#advisor-transcript").insertAdjacentHTML("beforeend", `<p>Context: Harborview / EOP v2.1 / Evacuation capability. Interpretation: AI Inference, prepared scenario, not evidence.</p><div>${sourceButtons(prompt === "validation" ? ["exercise"] : ["plan", "exercise"])}</div><button class="secondary-button" data-go="actions">Review recommendation</button>`);
}

function renderAdvisorPrompts() {
  const prompts = [
    ["posture", "Explain posture"],
    ["action", "Recommend first action"],
    ["validation", "Explain trends"],
  ];

  $("#advisor-prompts").innerHTML = prompts
    .map(
      ([id, label]) =>
        `<button class="prompt-button" type="button" data-prompt="${id}">${label}</button>`,
    )
    .join("");

  $$(".prompt-button").forEach((button) => {
    button.addEventListener("click", () => renderAdvisor(button.dataset.prompt));
  });
}

function renderFindings(selectedId = findings[0].id) {
  $("#finding-list").innerHTML = findings
    .map(
      (finding) => `
        <article class="finding-item ${finding.id === selectedId ? "active" : ""}" data-finding="${finding.id}" tabindex="0" role="button" aria-pressed="${finding.id === selectedId}">
          <strong>${finding.title}</strong>
          <span>${finding.summary}</span>
          <div class="finding-meta">
            <span class="tag">${finding.severity}</span>
            <span class="tag">${finding.domain}</span>
            <span class="tag">Simulated</span>
          </div>
        </article>
      `,
    )
    .join("");

  $$(".finding-item").forEach((item) => {
    item.addEventListener("click", () => selectFinding(item.dataset.finding));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectFinding(item.dataset.finding);
      }
    });
  });

  renderActionDetail(selectedId);
}

function selectFinding(id) {
  selectedFindingId = id;
  renderFindings(id);
  document.querySelector(`[data-finding="${id}"]`).focus();
}

function renderActionDetail(id) {
  selectedFindingId = id;
  const finding = findings.find((item) => item.id === id);
  const state = actionStates.get(id);
  $("#action-title").textContent = finding.title;
  $("#action-detail").innerHTML = `
    <div class="action-detail-body">
      <div class="workflow-step">
        <strong>1. IRIS advisory interpretation</strong>
        <p>${finding.summary}</p>
      </div>
      <div class="workflow-step">
        <strong>2. Supporting evidence</strong>
        <p>${finding.evidence}. All evidence shown here is simulated. Authorship is separate from evidence provenance.</p>
        ${sourceButtons(findingSources[id])}
      </div>
      <div class="workflow-step">
        <strong>3. vEM recommended action</strong>
        <p>${finding.recommendation}</p>
      </div>
      <div class="workflow-step">
        <strong>4. Draft assignment</strong>
        <p>Owner: ${finding.owner}. Target: ${finding.due}. Status: drafted by vEM.</p>
      </div>
      <div class="workflow-step approval">
        <strong>5. Human approval required</strong>
        <p>Administrator approval is required before this becomes an operational commitment or readiness claim.</p>
      </div>
      <div class="workflow-step">
        <strong>Simulated action: ${state ? state.status : "Not created"}</strong>
        <p>Work completion: ${state?.completed ? "Completed" : "Not completed"}. Validation: ${state ? state.validation : "Not yet established"}.</p>
        <p>One action per recommendation. All decisions are session-only simulations; no real assignments, notifications, or operational changes occur.</p>
        ${state ? `<ol class="action-history">${state.history.map(h=>`<li>${h}</li>`).join("")}</ol>` : ""}
        <div class="topbar-actions">
          ${!state ? '<button class="primary-button" data-transition="propose">Prepare proposed action</button>' : actionControls(state)}
        </div>
      </div>
    </div>
  `;
}

function actionControls(state) {
  if (state.status === "Proposed") return '<label><input id="approve-action" type="checkbox" /> As the demo administrator, confirm the proposed owner and due date</label><button class="primary-button" data-transition="assign">Confirm simulated assignment</button>';
  if (state.status === "Assigned" || state.status === "Reopened") return '<button class="primary-button" data-transition="start">Start simulated work</button>';
  if (state.status === "In Progress") return `${sourceButtons(["implementation"])}<label><input id="approve-action" type="checkbox" /> Confirm implementation evidence reviewed</label><button class="primary-button" data-transition="complete">Record simulated completion</button>`;
  if (state.status === "Awaiting Validation") return `${sourceButtons(["retest"])}<label><input id="approve-action" type="checkbox" /> Confirm targeted retest evidence reviewed</label><button class="primary-button" data-transition="retest">Record successful demo retest</button><button class="secondary-button" data-transition="reopen">Retest failed: reopen</button>`;
  if (state.status === "Retested") return '<label><input id="approve-action" type="checkbox" /> Human reviewer accepts retest evidence for this action only</label><button class="primary-button" data-transition="validate">Confirm simulated validation</button>';
  return '<p>Selected action validated in this scenario only. Overall validation remains insufficient; repeated evidence is required for Sustained.</p>';
}

function transitionAction(transition) {
  let state = actionStates.get(selectedFindingId);
  if (transition === "propose") {
    if (state) return;
    state = { status: "Proposed", completed: false, validation: "Not yet established", history: ["IRIS-authored recommendation converted to proposed action; no assignment committed."] };
    actionStates.set(selectedFindingId, state);
  } else {
    if (!state) return;
    const allowed = { assign: ["Proposed"], start: ["Assigned", "Reopened"], complete: ["In Progress"], retest: ["Awaiting Validation"], reopen: ["Awaiting Validation"], validate: ["Retested"] };
    if (!allowed[transition]?.includes(state.status)) return;
    if (["assign", "complete", "retest", "validate"].includes(transition) && !$("#approve-action")?.checked) {
      $("#approve-action")?.reportValidity();
      $("#approve-action")?.focus();
      return;
    }
    const statuses = { assign: "Assigned", start: "In Progress", complete: "Awaiting Validation", retest: "Retested", reopen: "Reopened", validate: "Validated" };
    state.status = statuses[transition];
    if (transition === "complete") { state.completed = true; state.validation = "Awaiting Validation"; }
    if (transition === "retest") state.validation = "Retested - human decision pending";
    if (transition === "reopen") { state.completed = false; state.validation = "Deficiency persists"; }
    if (transition === "validate") state.validation = "Human accepted targeted retest";
    state.history.push(`Demo human decision: ${transition === "complete" ? "Completed work; validation still pending" : state.status}. No real operational state changed.`);
  }
  renderActionDetail(selectedFindingId);
}

function renderPlanReview() {
  const stages = [
    ["1. Changes since last review", "The June tabletop identified an overnight ownership gap. Staffing context needs administrator confirmation. EOP v2.1 remains authoritative."],
    ["2. IRIS findings", "Observation 03 and the adopted annex support a finding about accountability. Medication continuity remains an unresolved evidence request."],
    ["3. Proposed updates", "IRIS-authored draft: update named overnight accountability and request continuity-test evidence. Draft text is not adopted plan content."],
    ["4. Review summary", "Demo human reviewer accepted an update proposal for follow-up, not plan adoption. Active EOP v2.1 remains unchanged. Cold-chain uncertainty stays open."],
  ];
  const [title, text] = stages[reviewStage];
  $("#plan-review").innerHTML = `<div><strong>${title}</strong><span>${text}</span></div>${reviewStage === 2 ? '<label><input id="approve-review" type="checkbox" /> Confirm this simulated review decision; no plan adoption</label>' : ""}`;
  $("#review-next").textContent = reviewStage === 0 ? "Review findings" : reviewStage === 1 ? "Prepare draft updates" : reviewStage === 2 ? "Confirm review summary" : "Review complete";
  $("#review-next").disabled = reviewStage === 3;
}

function renderProgram() {
  $("#program-columns").innerHTML = program
    .map(
      (column) => `
        <section class="program-column">
          <h4>${column.column}</h4>
          ${column.items
            .map(
              ([title, body]) => `
                <article class="program-card">
                  <strong>${title}</strong>
                  <span>${body}</span>
                </article>
              `,
            )
            .join("")}
        </section>
      `,
    )
    .join("");
}

function renderTrends() {
  $("#trend-chart").innerHTML = trends
    .map(
      ([label, initial, current]) => `
        <div class="trend-row">
          <span>${label}</span>
          <div class="trend-track" role="img" aria-label="${label}, illustrative movement from ${initial} percent to ${current} percent; not a validation score">
            <div class="trend-fill" style="width: ${current}%"></div>
            <div class="trend-start" style="left: ${initial}%"></div>
          </div>
          <strong>${initial}% → ${current}%</strong>
        </div>
      `,
    )
    .join("");
  $("#validation-dimensions").innerHTML = [
    ["Risk & Hazard Management", "Limited - contextual risk review pending"],
    ["Plans & Procedures", "Documented - review overdue"],
    ["Training", "Limited - critical-role coverage not established"],
    ["Exercises & Drills", "Tabletop evidence - execution not demonstrated"],
    ["Incident & After-Action Learning", "Not yet established - no incident performance evidence supplied"],
    ["Continuous Improvement", "Pending - completion is not validation"],
  ].map(([label, condition])=>`<div><strong>${label}</strong><span>${condition}</span></div>`).join("");
}

function updateTour() {
  const step = tourSteps[currentTourStep];
  setView(step.view);
  $("#tour-title").textContent = step.title;
  $("#tour-copy").textContent = step.copy;
  $("#tour-progress").textContent = `${currentTourStep + 1} of ${tourSteps.length}`;
  $("#tour-prev").disabled = currentTourStep === 0;
  const lastStep = currentTourStep === tourSteps.length - 1;
  $("#tour-next").textContent = lastStep ? "Finish" : "\u2192";
  $("#tour-next").setAttribute("aria-label", lastStep ? "Finish guided tour" : "Next walkthrough step");
  $("#tour-next").title = lastStep ? "Finish guided tour" : "Next step";
}

function setTour(active) {
  tourActive = active;
  $("#tour-panel").classList.toggle("hidden", !active);
  $("#entry-band").classList.add("hidden");
  $("#tour-toggle").textContent = active ? "Exit Tour" : "Guided Tour";
  if (active) updateTour();
}

function resetDemo() {
  actionStates.clear();
  reviewStage = 0;
  renderPlanReview();
  document.querySelector('input[name="clarification-response"][value="unknown"]').checked = true;
  $("#clarification-result").textContent = "Unresolved. Direct performance evidence is missing.";
  currentTourStep = 0;
  setTour(false);
  setView("overview");
  renderAdvisor("posture");
  renderFindings(findings[0].id);
  $("#entry-band").classList.remove("hidden");
}

function configureConversionLinks() {
  const config = window.IRIS_DEMO_CONFIG || {};
  [["waitlist-link", config.waitlistUrl], ["preorder-link", config.preorderUrl]].forEach(([id, value]) => {
    if (!value) return;
    try {
      const url = new URL(value);
      if (url.protocol !== "https:") return;
      const link = document.getElementById(id);
      link.href = url.href;
      link.classList.remove("hidden");
    } catch {
      // Unconfigured destinations stay hidden rather than linking to a placeholder.
    }
  });
  if (config.preorderUrl && config.preorderOffer && !$("#preorder-link").classList.contains("hidden")) {
    $("#preorder-offer").textContent = config.preorderOffer;
    $("#preorder-offer").classList.remove("hidden");
  }
}

function init() {
  document.addEventListener("click", event => {
    const source = event.target.closest("[data-source]");
    if (source) openEvidence(source.dataset.source);
    const go = event.target.closest("[data-go]");
    if (go) { setTour(false); setView(go.dataset.go); $("#view-title").focus(); }
    const transition = event.target.closest("[data-transition]");
    if (transition) transitionAction(transition.dataset.transition);
  });
  $("#review-next").addEventListener("click", () => {
    if (reviewStage === 2 && !$("#approve-review").checked) { $("#approve-review").focus(); return; }
    reviewStage = Math.min(3, reviewStage + 1);
    renderPlanReview();
  });
  $("#review-reset").addEventListener("click", () => { reviewStage = 0; renderPlanReview(); });
  $("#save-clarification").addEventListener("click", () => {
    const reported = document.querySelector('input[name="clarification-response"]:checked').value === "reported";
    $("#clarification-result").textContent = reported ? "Human-reported response recorded for this session. Provenance: Reported. No test record supplied; performance remains unknown and evidence sufficiency remains insufficient." : "Human confirmed: Unknown / not yet provided. Evidence request remains open; no performance conclusion issued.";
  });
  $$(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      setView(item.dataset.view);
      if (tourActive) setTour(false);
    });
  });

  $("#tour-toggle").addEventListener("click", () => setTour(!tourActive));
  $("#start-tour").addEventListener("click", () => {
    currentTourStep = 0;
    setTour(true);
    $("#view-title").focus();
  });
  $("#explore-demo").addEventListener("click", () => {
    setTour(false);
    setView("overview");
    $("#view-title").focus();
  });
  $("#continue-exploring").addEventListener("click", () => {
    setTour(false);
    setView("overview");
    $("#view-title").focus();
  });
  $("#tour-next").addEventListener("click", () => {
    if (currentTourStep === tourSteps.length - 1) {
      setTour(false);
      $("#view-title").focus();
      return;
    }
    currentTourStep += 1;
    updateTour();
  });
  $("#tour-prev").addEventListener("click", () => {
    currentTourStep = Math.max(currentTourStep - 1, 0);
    updateTour();
  });
  $("#reset-demo").addEventListener("click", resetDemo);

  renderPriorities();
  renderAdvisor();
  renderAdvisorPrompts();
  renderFindings();
  renderProgram();
  renderTrends();
  renderPlanReview();
  configureConversionLinks();
  setView("overview");
}

init();

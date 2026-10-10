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
      "Convert unresolved items into a preparedness initiative with leadership review at the next operating period close.",
    owner: "Regional operations",
    due: "30 days",
    domain: "Preparedness",
  },
];

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
    "Harborview's simulated readiness posture is mixed. The strongest signal is not a single missing document; it is a pattern of aging evidence. IRIS would recommend focusing the demo conversation on whether the organization can prove that critical procedures still work during nights, weekends, and constrained staffing periods. This is advisory only and requires human review.",
  action:
    "The best first action is to convert evacuation accountability into a named-owner corrective action. vEM can draft the workflow, assign responsible roles, and schedule a review. A human administrator must approve the final assignments and accept operational responsibility.",
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
  ["Staff training completion", 48, 91],
  ["Corrective actions completed", 35, 88],
  ["Exercise performance", 62, 84],
  ["Plan review completion", 60, 100],
  ["Evidence currency", 42, 79],
];

const tourSteps = [
  {
    view: "overview",
    title: "Open with operational posture",
    copy:
      "Start here to show that IRIS gives a senior-living operator an immediate readiness picture, while labeling every score as simulated demo data.",
  },
  {
    view: "advisor",
    title: "Show IRIS as intelligence, not authority",
    copy:
      "Use the advisor to explain context and significance. The important sales point is expert guidance with human accountability preserved.",
  },
  {
    view: "actions",
    title: "Turn findings into execution",
    copy:
      "Select a finding and show how vEM turns advisory intelligence into tasks, evidence requests, and approval checkpoints.",
  },
  {
    view: "program",
    title: "Sustain the program",
    copy:
      "Move from one-time fixes to a recurring preparedness cadence: reviews, exercises, validation, and leadership closeout.",
  },
  {
    view: "validation",
    title: "Close with measured improvement",
    copy:
      "Illustrative trends show the kind of longitudinal preparedness story IRIS can support, without claiming certified readiness outcomes.",
  },
  {
    view: "spec",
    title: "Anchor the prototype scope",
    copy:
      "Finish by showing the boundaries: standalone sales prototype, fictional data, IRIS/vEM architecture preserved, and no production deployment.",
  },
];

let currentTourStep = 0;
let tourActive = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function setView(viewId) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".nav-item").forEach((item) =>
    item.classList.toggle("active", item.dataset.view === viewId),
  );
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
        <article class="finding-item ${finding.id === selectedId ? "active" : ""}" data-finding="${finding.id}" tabindex="0">
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
  renderFindings(id);
}

function renderActionDetail(id) {
  const finding = findings.find((item) => item.id === id);
  $("#action-title").textContent = finding.title;
  $("#action-detail").innerHTML = `
    <div class="action-detail-body">
      <div class="workflow-step">
        <strong>1. IRIS advisory interpretation</strong>
        <p>${finding.summary}</p>
      </div>
      <div class="workflow-step">
        <strong>2. Supporting evidence</strong>
        <p>${finding.evidence}. All evidence shown here is simulated.</p>
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
    </div>
  `;
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
          <div class="trend-track" aria-label="${label}, simulated improvement from ${initial} percent to ${current} percent">
            <div class="trend-fill" style="width: ${current}%"></div>
            <div class="trend-start" style="left: ${initial}%"></div>
          </div>
          <strong>${current}%</strong>
        </div>
      `,
    )
    .join("");
}

function updateTour() {
  const step = tourSteps[currentTourStep];
  setView(step.view);
  $("#tour-title").textContent = step.title;
  $("#tour-copy").textContent = step.copy;
  $("#tour-progress").textContent = `${currentTourStep + 1} of ${tourSteps.length}`;
}

function setTour(active) {
  tourActive = active;
  $("#tour-panel").classList.toggle("hidden", !active);
  $("#tour-toggle").textContent = active ? "Exit Guided Walkthrough" : "Start Guided Walkthrough";
  if (active) updateTour();
}

function resetDemo() {
  currentTourStep = 0;
  setTour(false);
  setView("overview");
  renderAdvisor("posture");
  renderFindings(findings[0].id);
}

function init() {
  $$(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      setView(item.dataset.view);
      if (tourActive) setTour(false);
    });
  });

  $("#tour-toggle").addEventListener("click", () => setTour(!tourActive));
  $("#tour-next").addEventListener("click", () => {
    currentTourStep = Math.min(currentTourStep + 1, tourSteps.length - 1);
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
}

init();

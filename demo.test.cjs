const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const code = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");

function setup() {
  const elements = new Map();
  function element(id, dataset = {}) {
    const classes = new Set();
    const result = { id, dataset, checked: false, disabled: false, textContent: "", innerHTML: "", listeners: {},
      classList: { add: x => classes.add(x), remove: x => classes.delete(x), contains: x => classes.has(x), toggle: (x, on) => on ? classes.add(x) : classes.delete(x) },
      addEventListener(type, callback) { this.listeners[type] = callback; },
      setAttribute() {}, removeAttribute() {}, focus() {}, reportValidity() {},
      insertAdjacentHTML(position, text) { this.innerHTML += text; }, showModal() { this.open = true; },
    };
    elements.set(id, result);
    return result;
  }
  for (const match of html.matchAll(/id="([^"]+)"/g)) element(match[1]);
  const views = [...html.matchAll(/class="view[^"]*" id="([^"]+)" data-title="([^"]+)"/g)].map(m => { const e = elements.get(m[1]); e.dataset.title = m[2]; return e; });
  const nav = [...html.matchAll(/class="nav-item[^"]*" data-view="([^"]+)"/g)].map(m => element(`nav-${m[1]}`, { view: m[1] }));
  const response = element("response"); response.value = "unknown";
  const unknown = element("unknown");
  const document = {
    querySelector(selector) {
      if (selector.startsWith("#")) return elements.get(selector.slice(1)) || null;
      if (selector.includes("clarification-response")) return selector.includes(":checked") ? response : unknown;
      if (selector.startsWith("[data-finding")) return element(selector);
      throw new Error(`Unexpected selector: ${selector}`);
    },
    querySelectorAll(selector) { return selector === ".view" ? views : selector === ".nav-item" ? nav : []; },
    getElementById(id) { return elements.get(id); }, addEventListener() {},
  };
  const context = vm.createContext({ document, window: {}, URL });
  vm.runInContext(code, context);
  return { context, elements, run: expression => vm.runInContext(expression, context), approve() { const e = element("approve-action"); e.checked = true; } };
}

test("actions require approval, cannot duplicate, and completion does not validate", () => {
  const s = setup();
  s.run('transitionAction("propose"); transitionAction("propose"); transitionAction("assign")');
  assert.equal(s.run("actionStates.size"), 1);
  assert.equal(s.run('actionStates.get("evacuation-roles").status'), "Proposed");
  s.approve();
  s.run('transitionAction("assign"); transitionAction("start"); transitionAction("complete")');
  assert.equal(s.run('actionStates.get("evacuation-roles").completed'), true);
  assert.equal(s.run('actionStates.get("evacuation-roles").status'), "Awaiting Validation");
  s.run('transitionAction("validate")');
  assert.equal(s.run('actionStates.get("evacuation-roles").status'), "Awaiting Validation");
  s.elements.get("approve-action").checked = false;
  s.run('transitionAction("retest")');
  assert.equal(s.run('actionStates.get("evacuation-roles").status'), "Awaiting Validation");
  s.approve(); s.run('transitionAction("retest"); transitionAction("validate")');
  assert.equal(s.run('actionStates.get("evacuation-roles").status'), "Validated");
});

test("failed retest reopens and other findings retain independent state", () => {
  const s = setup(); s.approve();
  s.run('transitionAction("propose"); transitionAction("assign"); transitionAction("start"); transitionAction("complete"); transitionAction("reopen")');
  assert.equal(s.run('actionStates.get("evacuation-roles").status'), "Reopened");
  assert.equal(s.run('actionStates.get("evacuation-roles").completed'), false);
  s.run('selectFinding("medication-cold-chain"); transitionAction("propose")');
  assert.equal(s.run("actionStates.size"), 2);
  assert.equal(s.run('actionStates.get("medication-cold-chain").status'), "Proposed");
  s.run("resetDemo()"); assert.equal(s.run("actionStates.size"), 0);
});

test("plan review needs human confirmation and never adopts a draft", () => {
  const s = setup(); const next = s.elements.get("review-next").listeners.click;
  next(); next();
  const approve = { checked: false, focus() {} }; s.elements.set("approve-review", approve);
  next(); assert.equal(s.run("reviewStage"), 2);
  approve.checked = true; next(); assert.equal(s.run("reviewStage"), 3);
  assert.match(s.elements.get("plan-review").innerHTML, /v2.1 remains unchanged/);
});

test("reported clarification remains unknown performance, with no provenance upgrade", () => {
  const s = setup(); s.elements.get("response").value = "reported";
  s.elements.get("save-clarification").listeners.click();
  assert.match(s.elements.get("clarification-result").textContent, /Provenance: Reported/);
  assert.match(s.elements.get("clarification-result").textContent, /performance remains unknown/);
  s.run('openEvidence("cold-chain")');
  assert.match(s.elements.get("evidence-body").innerHTML, /Unknown \/ Unsupported/);
  assert.match(s.elements.get("evidence-body").innerHTML, /2026-10-01/);
});

test("all navigation targets exist; no invented overall readiness score", () => {
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const m of html.matchAll(/data-(?:view|go)="([^"]+)"/g)) assert.ok(ids.includes(m[1]), m[1]);
  assert.doesNotMatch(html, /--score:|<strong>(72|64|59)<\/strong>/);
  assert.match(html, /Insufficient evidence/);
  assert.match(html, /No overall index issued/);
  assert.ok(fs.existsSync(path.join(__dirname, "assets/iris-logo.png")));
  const s = setup(); assert.ok(s.run("tourSteps.every(step => document.getElementById(step.view))"));
});

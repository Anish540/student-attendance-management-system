(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const I = {
    grid: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
    users: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M16 19v-1.8a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V19M9 9.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM22 19v-1.8a4 4 0 0 0-3-3.9M16 2.7a4 4 0 0 1 0 7.6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    cal: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M9 14.5l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    id: '<svg viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="9" cy="11" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.8 16.4c.6-1.4 1.8-2.2 3.2-2.2s2.6.8 3.2 2.2M15 10h4M15 14h3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    pulse: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M3 12h4l2.5-7 4 14 2.5-7h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    db: '<svg viewBox="0 0 24 24" width="18" height="18"><ellipse cx="12" cy="6" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
    term: '<svg viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M7 9.5l3 2.5-3 2.5M13 15h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    save: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 4v10m0 0l-4-4m4 4l4-4M5 19h14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    card: '<svg viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M7 10h4M7 14h7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    chart: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 20V11M10 20V4M16 20v-6M2 20h20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    layers: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    eye: '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
    down: '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    shield: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 3l8 3v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6l8-3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
  };

  const ROLES = {
    student: {
      badge: "STUDENT",
      title: "Student Login",
      sub: "Access your attendance record, subject percentages and history.",
      placeholder: "e.g. s001",
      demo: "s001 / student123",
      user: "s001",
      pass: "student123"
    },
    staff: {
      badge: "STAFF / MENTOR",
      title: "Staff Login",
      sub: "Attendance portal opens only for the sections you mentor.",
      placeholder: "e.g. staff",
      demo: "staff / staff123",
      user: "staff",
      pass: "staff123"
    },
    admin: {
      badge: "ADMINISTRATOR",
      title: "Admin Login",
      sub: "Campus-wide analytics, departments, mentor assignments and accounts.",
      placeholder: "e.g. admin",
      demo: "admin / admin123",
      user: "admin",
      pass: "admin123"
    },
    database: {
      badge: "DATABASE",
      title: "Database Login",
      sub: "Raw data layer: browse tables, run SQL, back up and restore.",
      placeholder: "e.g. root",
      demo: "root / root123",
      user: "root",
      pass: "root123"
    }
  };

  const NAV = {
    admin: [
      { id: "overview", label: "Overview", icon: I.grid },
      { id: "students", label: "Students", icon: I.users, badge: () => DB.all("students").length },
      { id: "mark", label: "Attendance Portal", icon: I.cal },
      { id: "records", label: "Attendance Records", icon: I.chart },
      { id: "departments", label: "Departments", icon: I.layers, badge: () => DB.all("departments").length },
      { id: "accounts", label: "Accounts & Mentors", icon: I.id },
      { id: "activity", label: "Audit Trail", icon: I.pulse },
      { id: "profile", label: "My Profile", icon: I.card }
    ],
    staff: [
      { id: "overview", label: "Overview", icon: I.grid },
      { id: "mark", label: "Attendance Portal", icon: I.cal },
      { id: "students", label: "My Section Students", icon: I.users },
      { id: "records", label: "Section Records", icon: I.chart },
      { id: "profile", label: "My Profile", icon: I.card }
    ],
    student: [
      { id: "dashboard", label: "My Dashboard", icon: I.grid },
      { id: "history", label: "My Attendance", icon: I.cal },
      { id: "profile", label: "My Profile", icon: I.card }
    ],
    database: [
      { id: "dbhome", label: "Data Overview", icon: I.grid },
      { id: "tables", label: "Table Browser", icon: I.db },
      { id: "console", label: "SQL Console", icon: I.term },
      { id: "backup", label: "Backup & Restore", icon: I.save },
      { id: "activity", label: "Audit Trail", icon: I.pulse }
    ]
  };

  let user = null;
  let currentView = null;
  let pendingRole = "student";
  let authMode = "login";
  let regRole = "student";
  let markDraft = { level: "", program: "", department: "", year: "", section: "", subject: DB.SUBJECTS[0], date: DB.today(), marks: {} };
  let browserTable = "students";
  let recordFilter = { date: "", status: "", subject: "", q: "" };
  let studentFilter = { q: "", section: "" };

  function esc(v) {
    return String(v === null || v === undefined ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function toast(msg, kind) {
    const wrap = $("#toast-wrap");
    const el = document.createElement("div");
    el.className = "toast " + (kind || "");
    const title = kind === "err" ? "Error" : kind === "warn" ? "Warning" : "Success";
    el.innerHTML = "<b>" + title + "</b>" + esc(msg);
    wrap.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 420);
    }, 3400);
  }

  function modal(html) {
    const back = document.createElement("div");
    back.className = "modal-back open";
    back.innerHTML = '<div class="modal">' + html + "</div>";
    back.addEventListener("click", (e) => {
      if (e.target === back) back.remove();
    });
    document.body.appendChild(back);
    return back;
  }

  function closeModal() {
    const m = $(".modal-back");
    if (m) m.remove();
  }

  function download(name, content, type) {
    const blob = new Blob([content], { type: type || "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  function toCSV(rows, cols) {
    const q = (v) => '"' + String(v === undefined || v === null ? "" : v).replace(/"/g, '""') + '"';
    return [cols.join(",")].concat(rows.map((r) => cols.map((c) => q(r[c])).join(","))).join("\n");
  }

  function pct(n) {
    return Math.round(n * 10) / 10;
  }

  function prettyDate(d) {
    if (!d) return "-";
    const dt = new Date(d + (d.length === 10 ? "T00:00:00" : ""));
    if (isNaN(dt)) return d;
    return dt.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
  }

  function statusTag(st) {
    if (st === "Present") return '<span class="tag p">P</span>';
    if (st === "Absent") return '<span class="tag a">A</span>';
    if (st === "Leave") return '<span class="tag l">L</span>';
    return '<span class="tag n">-</span>';
  }

  function roleTag(r) {
    const map = { admin: "p", staff: "info", student: "n", database: "l" };
    return '<span class="tag ' + (map[r] || "n") + '">' + esc(String(r).toUpperCase()) + "</span>";
  }

  function sectionChips() {
    return DB.SECTIONS.map((s) => '<span class="sec-chip">' + s + "</span>").join("");
  }

  function instOf(s) {
    return DB.instLabel(s.level, s.program);
  }

  function buildStars() {
    const box = $("#stars");
    if (!box) return;
    let html = "";
    for (let i = 0; i < 70; i++) {
      html += '<i style="left:' + (Math.random() * 100).toFixed(2) + "%;top:" + (Math.random() * 100).toFixed(2) +
        "%;animation-delay:" + (Math.random() * 3.4).toFixed(2) + 's"></i>';
    }
    box.innerHTML = html;
  }

  function tickClock() {
    const t = new Date().toLocaleTimeString();
    const c1 = $("#clock");
    const c2 = $("#top-clock");
    if (c1) c1.textContent = t;
    if (c2) c2.textContent = t;
  }

  function updateAuthChips() {
    const s = DB.stats();
    const a = $("#chip-students"), b = $("#chip-records"), c = $("#chip-rate");
    if (a) a.textContent = s.students;
    if (b) b.textContent = s.records;
    if (c) c.textContent = s.rate + "%";
  }

  function instOptionsHTML(selected) {
    return DB.INST_OPTIONS.map(
      (o) => '<option value="' + o.key + '"' + (selected === o.key ? " selected" : "") + ">" + esc(o.label) + "</option>"
    ).join("");
  }

  function parseInst(key) {
    const parts = String(key || "").split("|");
    return { level: parts[0], program: parts[1] };
  }

  function instKey(level, program) {
    const found = DB.INST_OPTIONS.find((o) => o.level === level && o.program === program);
    return found ? found.key : DB.INST_OPTIONS[0].key;
  }

  function fillDepartments(sel, level, program, keep) {
    const list = DB.departments(level, program);
    sel.innerHTML = list
      .map((d) => '<option value="' + esc(d.name) + '"' + (keep === d.name ? " selected" : "") + ">" + esc(d.name) + "</option>")
      .join("");
    return list;
  }

  function fillYears(sel, department, keep) {
    const years = DB.yearsFor(department);
    sel.innerHTML = years
      .map((y) => '<option value="' + y + '"' + (Number(keep) === y ? " selected" : "") + ">Year " + y + "</option>")
      .join("");
    return years;
  }

  function fillSections(sel, keep) {
    sel.innerHTML = DB.SECTIONS
      .map((s) => '<option value="' + s + '"' + (keep === s ? " selected" : "") + ">Section " + s + "</option>")
      .join("");
  }

  function bindCascade(inst, dept, year, sec) {
    const refresh = (keepDept) => {
      const meta = parseInst(inst.value);
      const list = fillDepartments(dept, meta.level, meta.program, keepDept);
      if (list.length) {
        fillYears(year, dept.value);
        fillSections(sec);
      }
    };
    inst.addEventListener("change", () => refresh());
    dept.addEventListener("change", () => fillYears(year, dept.value));
    refresh(dept.value || undefined);
  }

  function readClassFields(prefix) {
    const inst = parseInst($("#" + prefix + "-inst").value);
    const dept = $("#" + prefix + "-dept");
    const year = $("#" + prefix + "-year");
    const sec = $("#" + prefix + "-sec");
    return {
      level: inst.level,
      program: inst.program,
      department: dept ? dept.value : "",
      year: Number(year ? year.value : 0),
      section: sec ? sec.value : ""
    };
  }

  function fillClassFields(prefix, data) {
    const inst = $("#" + prefix + "-inst");
    const dept = $("#" + prefix + "-dept");
    const year = $("#" + prefix + "-year");
    const sec = $("#" + prefix + "-sec");
    inst.value = instKey(data.level, data.program);
    const meta = parseInst(inst.value);
    fillDepartments(dept, meta.level, meta.program, data.department);
    fillYears(year, data.department, data.year);
    fillSections(sec, data.section);
  }

  function setMode(mode) {
    authMode = mode;
    $$(".mode-btn").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
    $("#login-pane").hidden = mode !== "login";
    $("#register-pane").hidden = mode !== "register";
    $("#role-strip").style.display = mode === "login" ? "" : "none";
    const card = $("#auth-card");
    card.classList.remove("mode-anim");
    void card.offsetWidth;
    card.classList.add("mode-anim");
  }

  function setRegRole(r) {
    regRole = r;
    $$(".seg-btn").forEach((b) => b.classList.toggle("active", b.dataset.rrole === r));
    $("#rg-context").textContent =
      r === "student" ? "Your class (attendance will follow this section)" : "Section you will mentor";
    $("#rg-extra").style.display = r === "student" ? "" : "none";
    $("#reg-submit").querySelector("span").textContent =
      r === "student" ? "Create student account & enter" : "Create staff account & enter";
  }

  function applyRole(role) {
    pendingRole = role;
    const cfg = ROLES[role];
    $$(".role-btn").forEach((b) => b.classList.toggle("active", b.dataset.role === role));
    const flip = $("#flipper");
    flip.classList.add("flip");
    setTimeout(() => {
      $("#role-badge").textContent = cfg.badge;
      $("#login-title").textContent = cfg.title;
      $("#login-sub").textContent = cfg.sub;
      $("#login-user").placeholder = cfg.placeholder;
      $("#demo-creds").textContent = cfg.demo;
      $("#login-user").value = "";
      $("#login-pass").value = "";
      flip.classList.remove("flip");
    }, 320);
  }

  function doLogin(e) {
    e.preventDefault();
    const u = $("#login-user").value.trim();
    const p = $("#login-pass").value;
    const btn = $("#login-submit");
    if (!u || !p) return toast("Enter username and password", "warn");
    btn.classList.add("loading");
    btn.querySelector("span").textContent = "Authenticating...";
    setTimeout(() => {
      btn.classList.remove("loading");
      btn.querySelector("span").textContent = "Enter Portal";
      const res = DB.authenticate(u, p);
      if (!res.ok) return toast(res.message, "err");
      if (res.user.role !== pendingRole)
        return toast("This account belongs to the " + res.user.role.toUpperCase() + " layer, not " + ROLES[pendingRole].badge, "err");
      if ($("#remember").checked) localStorage.setItem("SAMS_REMEMBER", u);
      else localStorage.removeItem("SAMS_REMEMBER");
      startSession(res.user);
    }, 650);
  }

  function doRegister(e) {
    e.preventDefault();
    const payload = {
      name: $("#rg-name").value.trim(),
      email: $("#rg-email").value.trim(),
      username: $("#rg-user").value.trim(),
      password: $("#rg-pass").value,
      phone: $("#rg-phone").value.trim(),
      city: $("#rg-city").value.trim()
    };
    Object.assign(payload, readClassFields("rg"));

    const btn = $("#reg-submit");
    btn.classList.add("loading");
    btn.querySelector("span").textContent = "Creating account...";
    setTimeout(() => {
      btn.classList.remove("loading");
      const res = DB.register(regRole, payload);
      if (!res.ok) {
        setRegRole(regRole);
        return toast(res.message, "err");
      }
      const label = DB.sectionLabel(payload);
      toast(
        (regRole === "student" ? "Student account created · roll " + res.student.rollNo : "Staff account created as mentor") +
          " · " + label,
        "ok"
      );
      $("#reg-form").reset();
      startSession(res.user);
    }, 700);
  }

  function startSession(u) {
    user = u;
    sessionStorage.setItem("SAMS_SESSION", String(u.id));
    DB.log(u.username, "LOGIN", u.role + " session started");
    $("#view-auth").classList.remove("active");
    $("#view-app").classList.add("active");
    window.scrollTo({ top: 0 });
    $("#user-name").textContent = u.name;
    $("#user-role").textContent = u.role;
    $("#user-avatar").textContent = u.name.trim().charAt(0).toUpperCase();
    $("#top-role").textContent = ROLES[u.role].badge;
    renderShell();
  }

  function logout() {
    if (user) DB.log(user.username, "LOGOUT", "session ended");
    user = null;
    currentView = null;
    markDraft = { level: "", program: "", department: "", year: "", section: "", subject: DB.SUBJECTS[0], date: DB.today(), marks: {} };
    sessionStorage.removeItem("SAMS_SESSION");
    $("#view-app").classList.remove("active");
    $("#view-auth").classList.add("active");
    $("#login-form").reset();
    setMode("login");
    toast("Signed out safely", "ok");
  }

  function renderShell() {
    const items = NAV[user.role];
    const html =
      '<div class="nav-label">Navigation</div>' +
      items
        .map(
          (n) =>
            '<button class="nav-item" data-act="nav" data-id="' + n.id + '">' +
            n.icon + "<span>" + n.label + "</span>" +
            (n.badge ? '<span class="badge">' + n.badge() + "</span>" : "") +
            "</button>"
        )
        .join("") +
      '<div class="nav-label">Session</div>' +
      '<button class="nav-item" data-act="logout">' + I.save + "<span>Sign out</span></button>";
    $("#sidebar").innerHTML = html;
    const stillValid = currentView && items.some((n) => n.id === currentView);
    navigate(stillValid ? currentView : items[0].id);
  }

  function navigate(id) {
    currentView = id;
    $$(".nav-item").forEach((b) => b.classList.toggle("active", b.dataset.id === id));
    const main = $("#main");
    main.style.animation = "none";
    void main.offsetWidth;
    main.style.animation = "";
    main.innerHTML = (VIEWS[id] || VIEWS.overview)();
    main.scrollTop = 0;
    $("#sidebar").classList.remove("open");
    bindView(id);
  }

  function pageHead(title, sub, actions) {
    return (
      '<div class="page-head"><div><h2>' + title + "</h2><p>" + sub + "</p></div>" +
      (actions ? '<div class="head-actions">' + actions + "</div>" : "") +
      "</div>"
    );
  }

  function stat(label, value, sub, ico, accent) {
    return (
      '<div class="stat" style="--accent:' + accent + '">' +
      '<div class="s-ico">' + ico + "</div>" +
      '<div class="s-label">' + label + "</div>" +
      '<div class="s-value">' + value + "</div>" +
      '<div class="s-sub">' + sub + "</div></div>"
    );
  }

  function chart3d(points, unit) {
    if (!points.length) return '<div class="empty">No data available</div>';
    const max = Math.max.apply(null, points.map((p) => p.v)) || 1;
    return (
      '<div class="chart3d">' +
      points
        .map((p, i) => {
          const h = Math.max(6, Math.round((p.v / max) * 150));
          return (
            '<div class="bar3d" style="animation-delay:' + (i * 0.07).toFixed(2) + 's">' +
            '<span class="val">' + p.v + (unit || "") + "</span>" +
            '<div class="fill" style="height:' + h + 'px"></div>' +
            '<span class="lbl">' + esc(p.l) + "</span></div>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function ring(p, cap) {
    return (
      '<div class="ring-wrap"><div class="ring" id="ring"><div class="ring-val"><span id="ring-num">0</span><small>%</small></div></div>' +
      '<div class="ring-cap">' + cap + "</div></div>"
    );
  }

  function animateRing(target) {
    const el = $("#ring");
    if (!el) return;
    el.style.setProperty("--p", target);
    const num = $("#ring-num");
    let cur = 0;
    const step = () => {
      cur += Math.max(1, (target - cur) / 12);
      if (cur >= target) cur = target;
      num.textContent = pct(cur);
      if (cur < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function scopeBanner() {
    const scope = DB.scopeFor(user) || [];
    if (user.role === "admin") {
      return (
        '<div class="scope-banner any"><b>Admin override</b><span>You can open the attendance portal for every institution, department, year and section.</span></div>'
      );
    }
    if (!scope.length) {
      return (
        '<div class="scope-banner none"><b>No section assigned yet</b><span>The attendance portal opens only after the administrator assigns you as mentor of a section.</span></div>'
      );
    }
    return (
      '<div class="scope-banner ok"><b>Mentor access</b><span>' +
      scope.map((a) => esc(DB.sectionLabel(a))).join("  ·  ") +
      "</span></div>"
    );
  }

  function overviewView() {
    const s = DB.stats();
    const today = DB.today();
    const todayRows = DB.all("attendance").filter((r) => r.date === today);
    const todayRate = DB.dayRate(today);
    const trend = DB.trend(10).map((t) => ({ l: t.date.slice(5), v: t.rate }));
    const roster = DB.scopedStudents(user);
    const low = roster
      .map((st) => ({ st: st, sum: DB.studentSummary(st.id) }))
      .sort((a, b) => a.sum.pct - b.sum.pct)
      .slice(0, 5);
    const scope = DB.scopeFor(user);
    const myRoster = scope === null ? "All students" : roster.length + " students in your sections";

    return (
      pageHead(
        "Overview",
        esc(user.name) + " · " + esc(myRoster),
        (user.role === "staff" || user.role === "admin"
          ? '<button class="btn grad" data-act="nav" data-id="mark">Open attendance portal</button>'
          : "") +
          '<button class="btn" data-act="nav" data-id="' + (user.role === "student" ? "history" : "records") + '">View records</button>'
      ) +
      scopeBanner() +
      '<div class="stat-grid">' +
      stat("Students", scope === null ? s.students : roster.length, scope === null ? "Campus-wide enrolment" : "In your mentored sections", "ST", "rgba(79,240,212,.4)") +
      stat("Today Present", todayRate + "%", todayRows.length + " marks recorded today", "TD", "rgba(139,108,255,.4)") +
      stat("Overall Rate", s.rate + "%", s.present + " of " + s.records + " records present", "AV", "rgba(255,95,162,.4)") +
      stat("Sections", s.sections, "Mentor assignments active", "SC", "rgba(255,196,107,.4)") +
      "</div>" +
      '<div class="grid-2">' +
      '<div class="panel"><div class="panel-head"><div><h3>Attendance trend</h3><p>Present percentage over the last 10 working days</p></div><span class="tag info">3D</span></div>' +
      chart3d(trend, "%") +
      "</div>" +
      '<div class="panel"><div class="panel-head"><div><h3>Overall health</h3><p>Present vs total records</p></div></div>' +
      ring(s.rate, "Campus attendance") +
      '<div class="legend"><span><i style="background:#4ff0d4"></i>Present ' + s.present + "</span>" +
      '<span><i style="background:#ff6b81"></i>Absent ' + s.absent + "</span>" +
      '<span><i style="background:#ffc46b"></i>Leave ' + s.leave + "</span></div></div>" +
      "</div>" +
      '<div class="panel"><div class="panel-head"><div><h3>Needs attention</h3><p>Lowest attendance in your visible roster</p></div></div>' +
      '<div class="list-clean">' +
      (low.length
        ? low
            .map(
              (x) =>
                "<li><div><div class=\"nm\">" + esc(x.st.name) + "</div><div class=\"sub\">" + esc(x.st.rollNo) + " · " +
                esc(x.st.department) + " · Year " + esc(x.st.year) + " · Sec " + esc(x.st.section) + "</div></div>" +
                '<span class="tag ' + (x.sum.pct < 75 ? "a" : x.sum.pct < 85 ? "l" : "p") + '">' + x.sum.pct + "%</span></li>"
            )
            .join("")
        : '<div class="empty">No students in view</div>') +
      "</div></div>"
    );
  }

  function studentsView() {
    const canEdit = user.role === "admin";
    let rows = DB.scopedStudents(user);
    const totalVisible = rows.length;
    if (studentFilter.q) {
      const q = studentFilter.q.toLowerCase();
      rows = rows.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q)
      );
    }
    if (studentFilter.section) rows = rows.filter((s) => s.section === studentFilter.section);

    const sectionOptions = Array.from(new Set(DB.scopedStudents(user).map((s) => s.section))).sort();

    return (
      pageHead(
        user.role === "staff" ? "My Section Students" : "Students",
        rows.length + " of " + totalVisible + " records shown",
        (canEdit ? '<button class="btn grad" data-act="add-student">' + I.plus + " Add student</button>" : "") +
          '<button class="btn" data-act="export-students">' + I.down + " Download CSV</button>"
      ) +
      (user.role === "staff" ? scopeBanner() : "") +
      '<div class="panel"><div class="filters">' +
      '<label class="inp"><span>Search</span><input id="f-q" placeholder="Name, roll, department" value="' + esc(studentFilter.q) + '"></label>' +
      '<label class="inp"><span>Section</span><select id="f-section"><option value="">All sections</option>' +
      sectionOptions.map((c) => '<option value="' + c + '" ' + (studentFilter.section === c ? "selected" : "") + ">Section " + c + "</option>").join("") +
      "</select></label></div>" +
      '<div class="table-wrap"><table><thead><tr><th>#</th><th>Roll No</th><th>Name</th><th>Institution</th><th>Department</th><th>Year</th><th>Section</th><th>City</th><th>Attendance</th>' +
      (canEdit ? "<th>Actions</th>" : "") +
      "</tr></thead><tbody>" +
      (rows.length
        ? rows
            .map((s, i) => {
              const sum = DB.studentSummary(s.id);
              return (
                '<tr style="animation-delay:' + (i * 0.03).toFixed(2) + 's"><td class="mono muted">' + (i + 1) + "</td>" +
                '<td class="mono">' + esc(s.rollNo) + "</td><td><b>" + esc(s.name) + "</b></td><td class=\"muted\">" + esc(instOf(s)) +
                '</td><td>' + esc(s.department) + '</td><td class="mono">' + esc(s.year) + '</td><td><span class="sec-chip on">' +
                esc(s.section) + '</span></td><td>' + esc(s.city) + "</td>" +
                '<td><span class="tag ' + (sum.pct < 75 ? "a" : sum.pct < 85 ? "l" : "p") + '">' + sum.pct + "%</span></td>" +
                (canEdit
                  ? '<td><div class="mark-btns"><button class="mk" data-act="edit-student" data-id="' + s.id + '" title="Edit">E</button>' +
                    '<button class="mk" data-act="del-student" data-id="' + s.id + '" title="Delete">X</button></div></td>'
                  : "") +
                "</tr>"
              );
            })
            .join("")
        : '<tr><td colspan="' + (canEdit ? 10 : 9) + '"><div class="empty">No students match this filter</div></td></tr>') +
      "</tbody></table></div></div>"
    );
  }

  function classFormFields(prefix, data) {
    const d = data || {};
    return (
      '<label class="inp"><span>Institution</span><select id="' + prefix + '-inst">' + instOptionsHTML(instKey(d.level, d.program)) + "</select></label>" +
      '<label class="inp"><span>Department</span><select id="' + prefix + '-dept"></select></label>' +
      '<label class="inp"><span>Year / Class</span><select id="' + prefix + '-year"></select></label>' +
      '<label class="inp"><span>Section</span><select id="' + prefix + '-sec"></select></label>'
    );
  }

  function studentForm(s) {
    const v = (k, d) => esc(s && s[k] !== undefined && s[k] !== null ? s[k] : d || "");
    return (
      "<h3>" + (s ? "Edit student" : "Add new student") + "</h3>" +
      '<div class="form-grid">' +
      '<label class="inp"><span>Roll No</span><input id="m-roll" value="' + v("rollNo") + '" placeholder="STU-2026-017"></label>' +
      '<label class="inp"><span>Full name</span><input id="m-name" value="' + v("name") + '" placeholder="Student name"></label>' +
      '<label class="inp"><span>Email</span><input id="m-email" value="' + v("email") + '"></label>' +
      '<label class="inp"><span>Phone</span><input id="m-phone" value="' + v("phone") + '"></label>' +
      '<label class="inp"><span>City</span><input id="m-city" value="' + v("city") + '"></label>' +
      "</div>" +
      '<div class="form-grid" style="margin-top:16px">' + classFormFields("m", s || { level: "College", program: "Engineering" }) + "</div>" +
      '<div class="form-actions"><button class="btn" data-act="modal-close">Cancel</button>' +
      '<button class="btn grad" data-act="save-student" data-id="' + (s ? s.id : "") + '">Save student</button></div>'
    );
  }

  function saveStudent(id) {
    const cls = readClassFields("m");
    const data = {
      rollNo: $("#m-roll").value.trim(),
      name: $("#m-name").value.trim(),
      email: $("#m-email").value.trim(),
      level: cls.level,
      program: cls.program,
      department: cls.department,
      year: cls.year,
      section: cls.section,
      phone: $("#m-phone").value.trim(),
      city: $("#m-city").value.trim()
    };
    if (!data.rollNo || !data.name) return toast("Roll number and name are required", "warn");
    if (id) {
      DB.update("students", id, data);
      DB.log(user.username, "UPDATE", "Student " + data.rollNo + " moved to " + DB.sectionLabel(cls));
      toast("Student updated");
    } else {
      if (DB.find("students", (s) => s.rollNo.toLowerCase() === data.rollNo.toLowerCase()).length)
        return toast("That roll number already exists", "err");
      data.joined = DB.today();
      const saved = DB.insert("students", data);
      const seq = DB.all("students").length;
      DB.insert("users", {
        username: "s" + String(seq).padStart(3, "0"),
        password: "student123",
        role: "student",
        name: data.name,
        email: data.email,
        phone: data.phone,
        linkedId: saved.id,
        active: true,
        registered: "admin",
        createdAt: DB.today()
      });
      DB.log(user.username, "INSERT", data.rollNo + " added to " + DB.sectionLabel(cls));
      toast("Student added with a login account");
    }
    closeModal();
    navigate("students");
    renderShell();
  }

  function markRoster() {
    return DB.all("students")
      .filter(
        (s) =>
          s.level === markDraft.level &&
          s.program === markDraft.program &&
          s.department === markDraft.department &&
          Number(s.year) === Number(markDraft.year) &&
          s.section === markDraft.section
      )
      .sort((a, b) => (a.rollNo < b.rollNo ? -1 : 1));
  }

  function ensureDraftMarks(roster) {
    roster.forEach((s) => {
      if (!(s.id in markDraft.marks)) {
        const ex = DB.find(
          "attendance",
          (r) => r.studentId === s.id && r.date === markDraft.date && r.subject === markDraft.subject
        )[0];
        markDraft.marks[s.id] = ex ? ex.status : "";
      }
    });
  }

  function markView() {
    const isStaff = user.role === "staff";
    const scope = DB.scopeFor(user) || [];

    if (isStaff && !scope.length) {
      return (
        pageHead("Attendance Portal", "Restricted access") +
        '<div class="panel"><div class="empty"><b style="display:block;font-size:18px;color:#fff;margin-bottom:10px">Portal locked</b>' +
        "The attendance portal opens only for a section mentor.<br>Ask the administrator to assign you a section, then come back here." +
        '</div><div class="form-actions"><button class="btn" data-act="nav" data-id="profile">My profile</button></div></div>'
      );
    }

    if (isStaff) {
      const stillMine = scope.some(
        (a) =>
          a.level === markDraft.level &&
          a.program === markDraft.program &&
          a.department === markDraft.department &&
          Number(a.year) === Number(markDraft.year) &&
          a.section === markDraft.section
      );
      if (!markDraft.department || !stillMine) {
        const a = scope[0];
        markDraft.level = a.level;
        markDraft.program = a.program;
        markDraft.department = a.department;
        markDraft.year = a.year;
        markDraft.section = a.section;
        markDraft.marks = {};
      }
    } else if (!markDraft.department) {
      const d = DB.departments()[0];
      markDraft.level = d.level;
      markDraft.program = d.program;
      markDraft.department = d.name;
      markDraft.year = DB.yearsFor(d.name)[0];
      markDraft.section = "A";
    }

    const roster = markRoster();
    ensureDraftMarks(roster);
    const chosen = roster.filter((s) => markDraft.marks[s.id]).length;
    const already = roster.filter((s) =>
      DB.find("attendance", (r) => r.studentId === s.id && r.date === markDraft.date && r.subject === markDraft.subject).length
    ).length;

    const scopeSelect = isStaff
      ? '<label class="inp"><span>Your mentored section</span><select id="mk-scope">' +
        scope
          .map((a, i) => {
            const key = [a.level, a.program, a.department, a.year, a.section].join("|");
            const active =
              a.level === markDraft.level &&
              a.program === markDraft.program &&
              a.department === markDraft.department &&
              Number(a.year) === Number(markDraft.year) &&
              a.section === markDraft.section;
            return '<option value="' + i + '"' + (active ? " selected" : "") + ">" + esc(DB.sectionLabel(a)) + "</option>";
          })
          .join("") +
        "</select></label>"
      : '<label class="inp"><span>Institution</span><select id="mk-inst">' + instOptionsHTML(instKey(markDraft.level, markDraft.program)) + "</select></label>" +
        '<label class="inp"><span>Department</span><select id="mk-dept"></select></label>' +
        '<label class="inp"><span>Year / Class</span><select id="mk-year"></select></label>' +
        '<label class="inp"><span>Section</span><select id="mk-sec"></select></label>';

    return (
      pageHead(
        "Attendance Portal",
        esc(DB.sectionLabel(markDraft)) + " · " + roster.length + " students",
        '<button class="btn" data-act="preview-marks">' + I.eye + " Preview list</button>" +
          '<button class="btn" data-act="download-marks">' + I.down + " Download list</button>" +
          '<button class="btn grad" data-act="save-marks">Save marks</button>'
      ) +
      (isStaff ? scopeBanner() : "") +
      '<div class="panel"><div class="filters">' +
      scopeSelect +
      '<label class="inp"><span>Subject</span><select id="mk-sub">' +
      DB.SUBJECTS.map((c) => '<option ' + (markDraft.subject === c ? "selected" : "") + ">" + esc(c) + "</option>").join("") +
      "</select></label>" +
      '<label class="inp"><span>Date</span><input type="date" id="mk-date" value="' + markDraft.date + '"></label>' +
      '<button class="btn sm" data-act="mark-all-p">All present</button>' +
      '<span class="tag info">' + chosen + "/" + roster.length + " marked</span>" +
      (already ? '<span class="tag n">' + already + " already saved</span>" : "") +
      "</div>" +
      '<div class="table-wrap"><table><thead><tr><th>#</th><th>Roll</th><th>Student</th><th>Year</th><th>Section</th><th>Mark</th></tr></thead><tbody>' +
      (roster.length
        ? roster
            .map((s, i) => {
              const m = markDraft.marks[s.id];
              return (
                '<tr style="animation-delay:' + (i * 0.03).toFixed(2) + 's"><td class="mono muted">' + (i + 1) + "</td>" +
                '<td class="mono">' + esc(s.rollNo) + "</td><td><b>" + esc(s.name) + '</b></td><td class="mono">' + esc(s.year) +
                '</td><td><span class="sec-chip on">' + esc(s.section) + "</span></td>" +
                '<td><div class="mark-btns">' +
                '<button class="mk ' + (m === "Present" ? "on-p" : "") + '" data-act="set-mark" data-sid="' + s.id + '" data-st="Present">P</button>' +
                '<button class="mk ' + (m === "Absent" ? "on-a" : "") + '" data-act="set-mark" data-sid="' + s.id + '" data-st="Absent">A</button>' +
                '<button class="mk ' + (m === "Leave" ? "on-l" : "") + '" data-act="set-mark" data-sid="' + s.id + '" data-st="Leave">L</button>' +
                "</div></td></tr>"
              );
            })
            .join("")
        : '<tr><td colspan="6"><div class="empty">No students in this section yet</div></td></tr>') +
      "</tbody></table></div></div>"
    );
  }

  function previewHTML() {
    const roster = markRoster();
    ensureDraftMarks(roster);
    const count = (st) => roster.filter((s) => markDraft.marks[s.id] === st).length;
    const unmarked = roster.filter((s) => !markDraft.marks[s.id]).length;
    const rows = roster
      .map(
        (s, i) =>
          "<tr><td class=\"mono muted\">" + (i + 1) + '</td><td class="mono">' + esc(s.rollNo) + "</td><td><b>" +
          esc(s.name) + "</b></td><td>" + esc(s.department) + '</td><td class="mono">' + esc(s.year) +
          '</td><td class="sec-chip on">' + esc(s.section) + "</td><td>" +
          (markDraft.marks[s.id]
            ? statusTag(markDraft.marks[s.id]) + " <span class=\"muted\">" + markDraft.marks[s.id] + "</span>"
            : '<span class="tag n">not marked</span>') +
          "</td></tr>"
      )
      .join("");

    return (
      "<h3>Preview &amp; recheck attendance</h3>" +
      '<div class="preview-meta">' +
      "<span><b>Institution</b>" + esc(DB.instLabel(markDraft.level, markDraft.program)) + "</span>" +
      "<span><b>Department</b>" + esc(markDraft.department) + "</span>" +
      "<span><b>Year</b>" + esc(markDraft.year) + "</span>" +
      "<span><b>Section</b>" + esc(markDraft.section) + "</span>" +
      "<span><b>Subject</b>" + esc(markDraft.subject) + "</span>" +
      "<span><b>Date</b>" + esc(prettyDate(markDraft.date)) + "</span>" +
      "</div>" +
      '<div class="preview-stats">' +
      '<span class="tag p">Present ' + count("Present") + "</span>" +
      '<span class="tag a">Absent ' + count("Absent") + "</span>" +
      '<span class="tag l">Leave ' + count("Leave") + "</span>" +
      '<span class="tag n">Unmarked ' + unmarked + "</span>" +
      '<span class="tag info">Total ' + roster.length + "</span>" +
      "</div>" +
      '<div class="table-wrap" style="max-height:46vh"><table><thead><tr><th>#</th><th>Roll</th><th>Name</th><th>Department</th><th>Year</th><th>Sec</th><th>Status</th></tr></thead><tbody>' +
      (rows || '<tr><td colspan="7"><div class="empty">No students in this section</div></td></tr>') +
      "</tbody></table></div>" +
      '<div class="form-actions">' +
      '<button class="btn" data-act="modal-close">Back to editing</button>' +
      '<button class="btn" data-act="download-marks">' + I.down + " Download list</button>" +
      '<button class="btn grad" data-act="confirm-marks">Confirm &amp; save</button>' +
      "</div>"
    );
  }

  function downloadMarks() {
    const roster = markRoster();
    ensureDraftMarks(roster);
    const rows = roster.map((s) => ({
      rollNo: s.rollNo,
      student: s.name,
      institution: DB.instLabel(s.level, s.program),
      department: s.department,
      year: s.year,
      section: s.section,
      subject: markDraft.subject,
      date: markDraft.date,
      status: markDraft.marks[s.id] || "Not marked",
      markedBy: user.username
    }));
    const name =
      "attendance_" + markDraft.department.replace(/[^a-z0-9]+/gi, "-") + "_Y" + markDraft.year + "-Sec" +
      markDraft.section + "_" + markDraft.date + ".csv";
    download(name, toCSV(rows, ["rollNo", "student", "institution", "department", "year", "section", "subject", "date", "status", "markedBy"]), "text/csv");
    DB.log(user.username, "DOWNLOAD", "Attendance list downloaded for " + DB.sectionLabel(markDraft));
    toast("Attendance list downloaded");
  }

  function saveMarks() {
    const roster = markRoster();
    if (!roster.length) return toast("No students in this section", "warn");
    const unmarked = roster.filter((s) => !markDraft.marks[s.id]).length;
    if (unmarked) return toast(unmarked + " student(s) are still unmarked - use Preview to recheck", "warn");
    let n = 0;
    roster.forEach((s) => {
      const st = markDraft.marks[s.id];
      if (!st) return;
      const ex = DB.find(
        "attendance",
        (r) => r.studentId === s.id && r.date === markDraft.date && r.subject === markDraft.subject
      )[0];
      if (ex) DB.update("attendance", ex.id, { status: st, markedBy: user.username });
      else
        DB.insert("attendance", {
          studentId: s.id,
          subject: markDraft.subject,
          date: markDraft.date,
          status: st,
          markedBy: user.username
        });
      n++;
    });
    DB.log(user.username, "ATTENDANCE", n + " marks saved for " + DB.sectionLabel(markDraft) + " on " + markDraft.date);
    closeModal();
    toast(n + " attendance marks saved for " + markDraft.department + " Sec " + markDraft.section);
    navigate("mark");
    renderShell();
  }

  function recordsView() {
    const ids = DB.scopeFor(user) === null ? null : DB.scopedStudentIds(user);
    let rows = DB.all("attendance");
    if (ids) rows = rows.filter((r) => ids.includes(r.studentId));
    rows = rows.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
    if (recordFilter.date) rows = rows.filter((r) => r.date === recordFilter.date);
    if (recordFilter.status) rows = rows.filter((r) => r.status === recordFilter.status);
    if (recordFilter.subject) rows = rows.filter((r) => r.subject === recordFilter.subject);
    if (recordFilter.q) {
      const q = recordFilter.q.toLowerCase();
      rows = rows.filter((r) => {
        const st = DB.byId("students", r.studentId);
        return st && (st.name.toLowerCase().includes(q) || st.rollNo.toLowerCase().includes(q) || st.section.toLowerCase() === q);
      });
    }
    const shown = rows.slice(0, 250);

    return (
      pageHead(
        user.role === "staff" ? "Section Records" : "Attendance Records",
        rows.length + " matching rows · showing first " + shown.length,
        '<button class="btn" data-act="export-records">' + I.down + " Download CSV</button>"
      ) +
      (user.role === "staff" ? scopeBanner() : "") +
      '<div class="panel"><div class="filters">' +
      '<label class="inp"><span>Date</span><input type="date" id="r-date" value="' + recordFilter.date + '"></label>' +
      '<label class="inp"><span>Status</span><select id="r-status"><option value="">All</option>' +
      ["Present", "Absent", "Leave"].map((s) => '<option ' + (recordFilter.status === s ? "selected" : "") + ">" + s + "</option>").join("") +
      "</select></label>" +
      '<label class="inp"><span>Subject</span><select id="r-subject"><option value="">All</option>' +
      DB.SUBJECTS.map((s) => '<option ' + (recordFilter.subject === s ? "selected" : "") + ">" + esc(s) + "</option>").join("") +
      "</select></label>" +
      '<label class="inp"><span>Student / Section</span><input id="r-q" placeholder="name, roll or B" value="' + esc(recordFilter.q) + '"></label>' +
      '<button class="btn sm" data-act="reset-filters">Reset</button></div>' +
      '<div class="table-wrap"><table><thead><tr><th>ID</th><th>Student</th><th>Roll</th><th>Dept</th><th>Sec</th><th>Subject</th><th>Date</th><th>Status</th><th>Marked by</th></tr></thead><tbody>' +
      (shown.length
        ? shown
            .map((r, i) => {
              const st = DB.byId("students", r.studentId) || { name: "Unknown", rollNo: "-", department: "-", section: "-" };
              return (
                '<tr style="animation-delay:' + Math.min(i * 0.012, 0.4).toFixed(3) + 's"><td class="mono muted">' + r.id + "</td>" +
                "<td><b>" + esc(st.name) + '</b></td><td class="mono">' + esc(st.rollNo) + "</td><td class=\"muted\">" +
                esc(st.department) + '</td><td><span class="sec-chip on">' + esc(st.section) + "</span></td><td>" + esc(r.subject) +
                '</td><td class="mono">' + prettyDate(r.date) + "</td><td>" + statusTag(r.status) +
                '</td><td class="mono muted">' + esc(r.markedBy) + "</td></tr>"
              );
            })
            .join("")
        : '<tr><td colspan="9"><div class="empty">No records for this filter</div></td></tr>') +
      "</tbody></table></div></div>"
    );
  }

  function mentorModal(u) {
    const list = DB.mentorAssignments(u.id);
    return (
      "<h3>Mentor assignments · " + esc(u.name) + "</h3>" +
      (list.length
        ? '<div class="list-clean" style="margin-bottom:18px">' +
          list
            .map(
              (m) =>
                "<li><div><div class=\"nm\">" + esc(DB.sectionLabel(m)) + '</div><div class="sub">' +
                esc(DB.instLabel(m.level, m.program)) + "</div></div>" +
                '<button class="mk" data-act="mentor-del" data-id="' + m.id + '">X</button></li>'
            )
            .join("") +
          "</div>"
        : '<p class="muted" style="margin-bottom:16px">No section assigned yet - this staff cannot open the attendance portal.</p>') +
      '<div class="form-grid">' + classFormFields("mentor", DB.departments()[0]) + "</div>" +
      '<div class="form-actions"><button class="btn" data-act="modal-close">Close</button>' +
      '<button class="btn grad" data-act="mentor-add" data-id="' + u.id + '">' + I.plus + " Assign section</button></div>"
    );
  }

  function accountsView() {
    const users = DB.all("users");
    return (
      pageHead(
        "Accounts & Mentors",
        users.length + " login identities · " + DB.all("mentors").length + " section assignments",
        '<button class="btn grad" data-act="add-user">' + I.plus + " New account</button>"
      ) +
      '<div class="panel"><div class="table-wrap"><table><thead><tr><th>ID</th><th>Username</th><th>Name</th><th>Role</th><th>Mentor of</th><th>Registered</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
      users
        .map((u, i) => {
          const assigns = DB.mentorAssignments(u.id);
          return (
            '<tr style="animation-delay:' + (i * 0.02).toFixed(2) + 's"><td class="mono muted">' + u.id + "</td>" +
            '<td class="mono">' + esc(u.username) + "</td><td><b>" + esc(u.name) + "</b></td><td>" + roleTag(u.role) + "</td>" +
            "<td>" +
            (assigns.length
              ? assigns.map((m) => '<span class="tag info" title="' + esc(DB.instLabel(m.level, m.program)) + '">' + esc(m.department.slice(0, 18)) + " Y" + m.year + "-" + m.section + "</span> ").join("")
              : '<span class="muted">-</span>') +
            "</td>" +
            '<td class="mono muted">' + esc(u.registered || "seed") + "</td>" +
            "<td>" + (u.active ? '<span class="tag p">ACTIVE</span>' : '<span class="tag a">DISABLED</span>') + "</td>" +
            '<td><div class="mark-btns">' +
            (u.role === "staff" ? '<button class="mk" data-act="mentor-open" data-id="' + u.id + '" title="Mentor sections">M</button>' : "") +
            '<button class="mk" data-act="toggle-user" data-id="' + u.id + '" title="Toggle">' + (u.active ? "D" : "E") + "</button>" +
            '<button class="mk" data-act="reset-pass" data-id="' + u.id + '" title="Reset password">R</button>' +
            '<button class="mk" data-act="del-user" data-id="' + u.id + '" title="Delete">X</button></div></td></tr>'
          );
        })
        .join("") +
      "</tbody></table></div></div>"
    );
  }

  function departmentsView() {
    const list = DB.all("departments");
    return (
      pageHead("Departments", list.length + " departments across School, College Autonomous and College Engineering") +
      '<div class="panel"><div class="table-wrap"><table><thead><tr><th>#</th><th>Institution</th><th>Department</th><th>Years</th><th>Sections</th><th>Students</th><th>Mentors</th></tr></thead><tbody>' +
      list
        .map((d, i) => {
          const students = DB.find(
            "students",
            (s) => s.level === d.level && s.program === d.program && s.department === d.name
          );
          const mentors = DB.find(
            "mentors",
            (m) => m.level === d.level && m.program === d.program && m.department === d.name
          );
          return (
            '<tr style="animation-delay:' + (i * 0.03).toFixed(2) + 's"><td class="mono muted">' + (i + 1) + "</td>" +
            '<td><span class="tag info">' + esc(DB.instLabel(d.level, d.program)) + "</span></td>" +
            "<td><b>" + esc(d.name) + "</b></td><td class=\"mono\">" + d.years.join(", ") + "</td>" +
            "<td>" + sectionChips() + "</td>" +
            '<td class="mono">' + students.length + "</td>" +
            "<td>" +
            (mentors.length
              ? mentors
                  .map(
                    (m) =>
                      '<span class="tag p">' + esc((DB.mentorNameFor(m) || "").replace("Prof. ", "")) + " · Y" + m.year + "-" + m.section + "</span> "
                  )
                  .join("")
              : '<span class="muted">unassigned</span>') +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div></div>"
    );
  }

  function userForm() {
    return (
      "<h3>Create account</h3>" +
      '<div class="form-grid">' +
      '<label class="inp"><span>Username</span><input id="u-name" placeholder="login name"></label>' +
      '<label class="inp"><span>Display name</span><input id="u-full" placeholder="Full name"></label>' +
      '<label class="inp"><span>Email</span><input id="u-email" placeholder="name@sams.edu"></label>' +
      '<label class="inp"><span>Role</span><select id="u-role"><option value="student">Student</option><option value="staff">Staff / Mentor</option><option value="admin">Admin</option><option value="database">Database</option></select></label>' +
      '<label class="inp"><span>Password</span><input id="u-pass" value="welcome123"></label>' +
      "</div>" +
      '<div class="form-actions"><button class="btn" data-act="modal-close">Cancel</button>' +
      '<button class="btn grad" data-act="save-user">Create account</button></div>'
    );
  }

  function saveUser() {
    const username = $("#u-name").value.trim();
    const name = $("#u-full").value.trim();
    const pass = $("#u-pass").value;
    if (!username || !name || !pass) return toast("Username, name and password are required", "warn");
    if (DB.find("users", (u) => u.username.toLowerCase() === username.toLowerCase()).length)
      return toast("Username already taken", "err");
    DB.insert("users", {
      username: username,
      password: pass,
      role: $("#u-role").value,
      name: name,
      email: $("#u-email").value.trim(),
      phone: "",
      linkedId: null,
      active: true,
      registered: "admin",
      createdAt: DB.today()
    });
    DB.log(user.username, "INSERT", "Account created: " + username);
    toast("Account created");
    closeModal();
    navigate("accounts");
    renderShell();
  }

  function activityView() {
    const rows = DB.all("activity").slice().reverse();
    return (
      pageHead("Audit Trail", rows.length + " logged events", '<button class="btn" data-act="export-activity">' + I.down + " Export log</button>") +
      '<div class="panel"><div class="timeline">' +
      (rows.length
        ? rows
            .map(
              (r) =>
                '<div class="tl-item"><b>' + esc(r.action) + " · " + esc(r.actor) + "</b><p>" + esc(r.detail) +
                "</p><time>" + esc(r.at) + "</time></div>"
            )
            .join("")
        : '<div class="empty">No activity yet</div>') +
      "</div></div>"
    );
  }

  function profileView() {
    const isStudent = user.role === "student";
    const stu = isStudent ? DB.byId("students", user.linkedId) : null;
    const sum = stu ? DB.studentSummary(stu.id) : null;
    const assigns = DB.mentorAssignments(user.id);
    const recent = DB.find("activity", (a) => a.actor === user.username).slice(-6).reverse();

    return (
      pageHead("My Profile", "Account identity and session details") +
      '<div class="panel"><div class="profile-hero"><div class="p-ava">' + esc(user.name.charAt(0)) + "</div>" +
      '<div class="p-info"><h3>' + esc(user.name) + "</h3><p>" + esc(user.email) + "</p>" +
      '<div style="margin-top:10px">' + roleTag(user.role) +
      (assigns.length ? ' <span class="tag p">MENTOR</span>' : "") + "</div></div></div>" +
      '<div class="kv">' +
      "<div><span>Username</span><b>" + esc(user.username) + "</b></div>" +
      "<div><span>Role</span><b>" + esc(user.role.toUpperCase()) + "</b></div>" +
      "<div><span>Registered via</span><b>" + esc(user.registered || "seed") + "</b></div>" +
      "<div><span>Account created</span><b>" + esc(user.createdAt) + "</b></div>" +
      (stu
        ? "<div><span>Roll no</span><b>" + esc(stu.rollNo) + "</b></div><div><span>Class</span><b>" +
          esc(stu.department) + " · Year " + esc(stu.year) + " · Sec " + esc(stu.section) + "</b></div><div><span>Institution</span><b>" +
          esc(instOf(stu)) + "</b></div><div><span>Attendance</span><b>" + sum.pct + "%</b></div>"
        : "") +
      (assigns.length
        ? "<div><span>Mentor sections</span><b>" + assigns.length + "</b></div><div><span>Assignment</span><b>" +
          esc(assigns.map((m) => "Y" + m.year + "-" + m.section).join(", ")) + "</b></div>"
        : "") +
      "</div>" +
      (assigns.length
        ? '<div class="list-clean" style="margin-top:18px">' +
          assigns
            .map(
              (m) =>
                "<li><div><div class=\"nm\">" + esc(DB.sectionLabel(m)) + '</div><div class="sub">' +
                esc(DB.instLabel(m.level, m.program)) + "</div></div>" +
                '<span class="tag info">' + DB.find("students", (s) => s.level === m.level && s.program === m.program && s.department === m.department && Number(s.year) === Number(m.year) && s.section === m.section).length + " students</span></li>"
            )
            .join("") +
          "</div>"
        : user.role === "staff"
          ? '<p class="muted" style="margin-top:18px">No section assigned yet - the attendance portal stays locked until an admin assigns you.</p>'
          : "") +
      "</div>" +
      '<div class="panel"><div class="panel-head"><div><h3>Recent session activity</h3><p>Events tied to your login</p></div></div>' +
      (recent.length
        ? '<div class="list-clean">' +
          recent
            .map(
              (r) =>
                '<li><div><div class="nm">' + esc(r.action) + "</div><div class=\"sub\">" + esc(r.detail) + "</div></div>" +
                '<span class="tag n">' + esc(r.at.slice(11, 19)) + "</span></li>"
            )
            .join("") +
          "</div>"
        : '<div class="empty">No activity recorded</div>') +
      "</div>"
    );
  }

  function dashboardView() {
    const stu = DB.byId("students", user.linkedId);
    if (!stu) return '<div class="empty">No student profile linked to this account</div>';
    const sum = DB.studentSummary(stu.id);
    const trend = DB.trend(8).map((t) => {
      const rows = DB.find("attendance", (r) => r.studentId === stu.id && r.date === t.date);
      const p = rows.filter((r) => r.status === "Present").length;
      return { l: t.date.slice(5), v: rows.length ? Math.round((p / rows.length) * 100) : 0 };
    });
    const mentor = DB.find(
      "mentors",
      (m) =>
        m.level === stu.level &&
        m.program === stu.program &&
        m.department === stu.department &&
        Number(m.year) === Number(stu.year) &&
        m.section === stu.section
    )[0];

    return (
      pageHead(
        "Welcome back, " + esc(stu.name.split(" ")[0]),
        esc(stu.rollNo) + " · " + esc(stu.department) + " · Year " + esc(stu.year) + " · Section " + esc(stu.section) +
          " · " + esc(instOf(stu)),
        '<button class="btn" data-act="export-mine">' + I.down + " Download my record</button>"
      ) +
      '<div class="scope-banner ' + (mentor ? "ok" : "any") + '"><b>Section ' + esc(stu.section) +
      " mentor</b><span>" + (mentor ? esc(DB.mentorNameFor(mentor)) : "Not assigned yet") + "</span></div>" +
      '<div class="stat-grid">' +
      stat("Present", sum.present, "classes attended", "PR", "rgba(61,220,151,.4)") +
      stat("Absent", sum.absent, "classes missed", "AB", "rgba(255,107,129,.4)") +
      stat("Leave", sum.leave, "approved leaves", "LV", "rgba(255,196,107,.4)") +
      stat("Total classes", sum.total, "recorded sessions", "TC", "rgba(78,168,255,.4)") +
      "</div>" +
      '<div class="grid-2">' +
      '<div class="panel"><div class="panel-head"><div><h3>Subject-wise attendance</h3><p>Percentage of classes attended per subject</p></div></div><div class="bars-list">' +
      (sum.subjects.length
        ? sum.subjects
            .map(
              (s) =>
                '<div class="bar-row"><div class="bar-top"><span>' + esc(s.subject) + '</span><b>' + s.pct + "% · " +
                s.present + "/" + s.total + '</b></div><div class="track"><div class="fillbar ' + (s.pct < 75 ? "low" : "") +
                '" style="width:' + s.pct + '%"></div></div></div>'
            )
            .join("")
        : '<div class="empty">No attendance recorded yet</div>') +
      "</div></div>" +
      '<div class="panel"><div class="panel-head"><div><h3>Overall</h3><p>Your campus attendance</p></div></div>' +
      ring(sum.pct, sum.pct >= 75 ? "Eligible for exams" : "Below 75% threshold") +
      '<div class="legend"><span><i style="background:#4ff0d4"></i>Present ' + sum.present + "</span>" +
      '<span><i style="background:#ff6b81"></i>Absent ' + sum.absent + "</span>" +
      '<span><i style="background:#ffc46b"></i>Leave ' + sum.leave + "</span></div></div></div>" +
      '<div class="panel"><div class="panel-head"><div><h3>Recent performance</h3><p>Daily present percentage for the last 8 working days</p></div></div>' +
      chart3d(trend, "%") + "</div>"
    );
  }

  function historyView() {
    const stu = DB.byId("students", user.linkedId);
    if (!stu) return '<div class="empty">No student profile linked</div>';
    let rows = DB.find("attendance", (r) => r.studentId === stu.id).sort((a, b) => (a.date < b.date ? 1 : -1));
    if (recordFilter.status) rows = rows.filter((r) => r.status === recordFilter.status);
    if (recordFilter.subject) rows = rows.filter((r) => r.subject === recordFilter.subject);
    const sum = DB.studentSummary(stu.id);

    return (
      pageHead("My Attendance", sum.total + " recorded sessions · " + sum.pct + "% overall",
        '<button class="btn" data-act="export-mine">' + I.down + " Download my record</button>") +
      '<div class="panel"><div class="filters">' +
      '<label class="inp"><span>Status</span><select id="h-status"><option value="">All</option>' +
      ["Present", "Absent", "Leave"].map((s) => '<option ' + (recordFilter.status === s ? "selected" : "") + ">" + s + "</option>").join("") +
      "</select></label>" +
      '<label class="inp"><span>Subject</span><select id="h-subject"><option value="">All</option>' +
      DB.SUBJECTS.map((s) => '<option ' + (recordFilter.subject === s ? "selected" : "") + ">" + esc(s) + "</option>").join("") +
      "</select></label>" +
      '<button class="btn sm" data-act="reset-filters">Reset</button></div>' +
      '<div class="table-wrap"><table><thead><tr><th>Date</th><th>Subject</th><th>Status</th><th>Marked by</th></tr></thead><tbody>' +
      (rows.length
        ? rows
            .slice(0, 300)
            .map(
              (r, i) =>
                '<tr style="animation-delay:' + Math.min(i * 0.012, 0.4).toFixed(3) + 's"><td class="mono">' + prettyDate(r.date) +
                "</td><td>" + esc(r.subject) + "</td><td>" + statusTag(r.status) + '</td><td class="mono muted">' + esc(r.markedBy) + "</td></tr>"
            )
            .join("")
        : '<tr><td colspan="4"><div class="empty">Nothing to show</div></td></tr>') +
      "</tbody></table></div></div>"
    );
  }

  function dbhomeView() {
    const s = DB.stats();
    return (
      pageHead("Data Overview", "LocalStorage SQL engine · database SAMS_DB_V2",
        '<button class="btn" data-act="nav" data-id="console">Open console</button>') +
      '<div class="stat-grid">' +
      stat("Tables", DB.tables().length, DB.tables().join(" · "), "TB", "rgba(79,240,212,.4)") +
      stat("Rows stored", s.records + s.students + s.sections, "attendance + students + mentors", "RW", "rgba(139,108,255,.4)") +
      stat("Departments", s.departments, "School / Autonomous / Engineering", "DP", "rgba(255,95,162,.4)") +
      stat("Store size", (DB.exportJSON().length / 1024).toFixed(1) + "K", "characters persisted", "SZ", "rgba(255,196,107,.4)") +
      "</div>" +
      '<div class="panel"><div class="panel-head"><div><h3>Schema</h3><p>Column definitions of every table</p></div></div>' +
      '<div class="table-pick">' +
      DB.tables()
        .map(
          (t) =>
            '<div class="tbl-card" data-act="pick-table" data-table="' + t + '"><b>' + t + "</b><span>" +
            Object.keys(DB.schema(t)).length + " columns · " + DB.all(t).length + " rows</span></div>"
        )
        .join("") +
      "</div>" +
      '<div class="table-wrap"><table><thead><tr><th>Column</th><th>Type</th></tr></thead><tbody>' +
      Object.keys(DB.schema("students"))
        .map((c) => "<tr><td class=\"mono\">" + c + '</td><td class="muted mono">' + DB.schema("students")[c] + "</td></tr>")
        .join("") +
      "</tbody></table></div></div>"
    );
  }

  function tablesView() {
    const t = browserTable;
    const rows = DB.all(t);
    const cols = Object.keys(DB.schema(t));
    return (
      pageHead("Table Browser", "Inspect and prune raw rows",
        '<button class="btn danger" data-act="clear-table" data-table="' + t + '">Clear ' + t + "</button>") +
      '<div class="table-pick">' +
      DB.tables()
        .map(
          (x) =>
            '<div class="tbl-card ' + (x === t ? "active" : "") + '" data-act="pick-table" data-table="' + x + '"><b>' + x +
            "</b><span>" + DB.all(x).length + " rows</span></div>"
        )
        .join("") +
      "</div>" +
      '<div class="panel"><div class="panel-head"><div><h3>' + t + "</h3><p>" + rows.length + " rows · " + cols.length + " columns</p></div>" +
      '<button class="btn sm" data-act="export-table" data-table="' + t + '">' + I.down + " Export CSV</button></div>" +
      '<div class="table-wrap"><table><thead><tr>' + cols.map((c) => "<th>" + c + "</th>").join("") + "<th></th></tr></thead><tbody>" +
      (rows.length
        ? rows
            .slice(0, 300)
            .map(
              (r, i) =>
                '<tr style="animation-delay:' + Math.min(i * 0.01, 0.4).toFixed(3) + 's">' +
                cols.map((c) => "<td class=\"mono\">" + esc(Array.isArray(r[c]) ? r[c].join("|") : r[c]) + "</td>").join("") +
                '<td><button class="mk" data-act="del-row" data-table="' + t + '" data-id="' + r.id + '">X</button></td></tr>'
            )
            .join("")
        : '<tr><td colspan="' + (cols.length + 1) + '"><div class="empty">Table is empty</div></td></tr>') +
      "</tbody></table></div></div>"
    );
  }

  function consoleView() {
    return (
      pageHead("SQL Console", "Run SELECT · INSERT · UPDATE · DELETE against the live store") +
      '<div class="console"><div class="console-bar">' +
      '<span class="dotr" style="background:#ff6b81"></span><span class="dotr" style="background:#ffc46b"></span>' +
      '<span class="dotr" style="background:#3ddc97"></span><span class="t">sams@localhost : SAMS_DB_V2</span></div>' +
      '<textarea id="sql" spellcheck="false">SELECT name, department, year, section FROM students WHERE section = \'B\'</textarea>' +
      '<div class="console-actions"><button class="btn grad" data-act="run-sql">Run query</button>' +
      '<button class="btn" data-act="clear-sql">Clear</button></div>' +
      '<div class="console-out" id="sql-out"><div class="qok">Type HELP to list supported statements.</div></div></div>' +
      '<div class="panel" style="margin-top:24px"><div class="panel-head"><div><h3>Quick queries</h3><p>Click to load a statement into the console</p></div></div>' +
      '<div class="quick">' +
      ["SELECT * FROM departments", "SELECT * FROM mentors", "SELECT name, department, year, section FROM students WHERE section = 'B'",
        "SELECT * FROM users WHERE role = 'staff'", "SELECT name, status FROM attendance WHERE status = 'Absent' LIMIT 10",
        "SHOW TABLES", "DESC students"]
        .map((q) => '<button data-act="quick-sql" data-sql="' + esc(q) + '">' + esc(q) + "</button>")
        .join("") +
      "</div></div>"
    );
  }

  function runSql() {
    const sql = $("#sql").value;
    const out = $("#sql-out");
    try {
      const res = DB.query(sql);
      out.innerHTML =
        '<div class="qok">' + esc(res.message) + "</div>" +
        '<div class="table-wrap" style="max-height:none"><table><thead><tr>' +
        res.columns.map((c) => "<th>" + esc(c) + "</th>").join("") +
        "</tr></thead><tbody>" +
        (res.rows.length
          ? res.rows
              .slice(0, 200)
              .map(
                (r) =>
                  "<tr>" +
                  res.columns.map((c) => '<td class="mono">' + esc(Array.isArray(r[c]) ? r[c].join("|") : r[c]) + "</td>").join("") +
                  "</tr>"
              )
              .join("")
          : '<tr><td colspan="' + res.columns.length + '"><div class="empty">0 rows returned</div></td></tr>') +
        "</tbody></table></div>";
      DB.log(user.username, "SQL", sql.slice(0, 160));
    } catch (err) {
      out.innerHTML = '<div class="qerr">ERROR 1064 · ' + esc(err.message) + "</div>";
    }
  }

  function backupView() {
    return (
      pageHead("Backup & Restore", "Full JSON snapshot of the client-side database") +
      '<div class="grid-2 even">' +
      '<div class="panel"><div class="panel-head"><div><h3>Export</h3><p>Download every table as a portable backup file</p></div></div>' +
      '<div class="kv"><div><span>Tables</span><b>' + DB.tables().length + "</b></div>" +
      "<div><span>Attendance rows</span><b>" + DB.all("attendance").length + "</b></div>" +
      "<div><span>Students</span><b>" + DB.all("students").length + "</b></div>" +
      "<div><span>Mentor assignments</span><b>" + DB.all("mentors").length + "</b></div></div>" +
      '<div class="form-actions"><button class="btn grad" data-act="backup-export">' + I.down + " Download backup</button></div></div>" +
      '<div class="panel"><div class="panel-head"><div><h3>Restore</h3><p>Import a backup or rebuild the seed database</p></div></div>' +
      '<label class="inp"><span>Backup file (.json)</span><input type="file" id="restore-file" accept="application/json"></label>' +
      '<div class="form-actions"><button class="btn" data-act="backup-import">Restore file</button>' +
      '<button class="btn danger" data-act="db-reset">Rebuild seed data</button></div>' +
      '<p class="muted" style="margin-top:14px;font-size:13px">Rebuilding wipes all current rows and regenerates departments, mentors, students and attendance.</p></div></div>'
    );
  }

  const VIEWS = {
    overview: overviewView,
    students: studentsView,
    records: recordsView,
    mark: markView,
    accounts: accountsView,
    departments: departmentsView,
    activity: activityView,
    profile: profileView,
    dashboard: dashboardView,
    history: historyView,
    dbhome: dbhomeView,
    tables: tablesView,
    console: consoleView,
    backup: backupView
  };

  function bindView(id) {
    if (id === "overview" || id === "dashboard") {
      const s = DB.stats();
      const stu = user.role === "student" ? DB.byId("students", user.linkedId) : null;
      animateRing(stu ? DB.studentSummary(stu.id).pct : s.rate);
    }

    if (id === "students") {
      const q = $("#f-q");
      if (q)
        q.addEventListener("input", () => {
          studentFilter.q = q.value;
          const pos = q.selectionStart;
          navigate("students");
          const nq = $("#f-q");
          if (nq) {
            nq.focus();
            nq.setSelectionRange(pos, pos);
          }
        });
      const c = $("#f-section");
      if (c) c.addEventListener("change", () => { studentFilter.section = c.value.includes("Section ") ? c.value.replace("Section ", "") : c.value; navigate("students"); });
    }

    if (id === "records") {
      const bind = (sel, key) => {
        const el = $(sel);
        if (el) el.addEventListener("change", () => { recordFilter[key] = el.value; navigate("records"); });
      };
      bind("#r-date", "date");
      bind("#r-status", "status");
      bind("#r-subject", "subject");
      const q = $("#r-q");
      if (q)
        q.addEventListener("input", () => {
          recordFilter.q = q.value;
          const pos = q.selectionStart;
          navigate("records");
          const nq = $("#r-q");
          if (nq) {
            nq.focus();
            nq.setSelectionRange(pos, pos);
          }
        });
    }

    if (id === "history") {
      const s = $("#h-status");
      if (s) s.addEventListener("change", () => { recordFilter.status = s.value; navigate("history"); });
      const j = $("#h-subject");
      if (j) j.addEventListener("change", () => { recordFilter.subject = j.value; navigate("history"); });
    }

    if (id === "mark") {
      const isStaff = user.role === "staff";
      if (isStaff) {
        const sel = $("#mk-scope");
        if (sel)
          sel.addEventListener("change", () => {
            const a = (DB.scopeFor(user) || [])[Number(sel.value)];
            if (!a) return;
            markDraft.level = a.level;
            markDraft.program = a.program;
            markDraft.department = a.department;
            markDraft.year = a.year;
            markDraft.section = a.section;
            markDraft.marks = {};
            navigate("mark");
          });
      } else {
        const inst = $("#mk-inst"), dept = $("#mk-dept"), year = $("#mk-year"), sec = $("#mk-sec");
        if (inst) {
          bindCascade(inst, dept, year, sec);
          const apply = () => {
            const cls = readClassFields("mk");
            if (cls.department && (cls.department !== markDraft.department || cls.section !== markDraft.section)) {
              markDraft.level = cls.level;
              markDraft.program = cls.program;
              markDraft.department = cls.department;
              markDraft.year = cls.year;
              markDraft.section = cls.section;
              markDraft.marks = {};
              navigate("mark");
            }
          };
          dept.addEventListener("change", apply);
          year.addEventListener("change", apply);
          sec.addEventListener("change", apply);
        }
      }
      const sub = $("#mk-sub");
      if (sub) sub.addEventListener("change", () => { markDraft.subject = sub.value; markDraft.marks = {}; navigate("mark"); });
      const date = $("#mk-date");
      if (date) date.addEventListener("change", () => { markDraft.date = date.value || DB.today(); markDraft.marks = {}; navigate("mark"); });
    }

    if (id === "backup") {
      const f = $("#restore-file");
      if (f)
        f.addEventListener("change", () => {
          const file = f.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              DB.importJSON(reader.result);
              DB.log(user.username, "RESTORE", "Backup imported from " + file.name);
              toast("Backup restored");
              navigate("backup");
              renderShell();
            } catch (e) {
              toast(e.message, "err");
            }
          };
          reader.readAsText(file);
        });
    }
  }

  function onClick(e) {
    const t = e.target.closest("[data-act]");
    const modeBtn = e.target.closest("[data-mode]");
    if (modeBtn) {
      setMode(modeBtn.dataset.mode);
      if (modeBtn.dataset.mode === "register") setRegRole(regRole);
      return;
    }
    const rrole = e.target.closest("[data-rrole]");
    if (rrole) {
      setRegRole(rrole.dataset.rrole);
      return;
    }
    if (!t) return;
    const act = t.dataset.act;
    const id = t.dataset.id;

    if (act === "nav") return navigate(t.dataset.id);
    if (act === "logout") return logout();
    if (act === "modal-close") return closeModal();

    if (act === "add-student") {
      const m = modal(studentForm(null));
      bindCascade($("#m-inst"), $("#m-dept"), $("#m-year"), $("#m-sec"));
      return m;
    }
    if (act === "edit-student") {
      const s = DB.byId("students", id);
      const m = modal(studentForm(s));
      bindCascade($("#m-inst"), $("#m-dept"), $("#m-year"), $("#m-sec"));
      return m;
    }
    if (act === "save-student") return saveStudent(id);
    if (act === "del-student") {
      if (!confirm("Delete this student and their attendance history?")) return;
      DB.find("attendance", (r) => r.studentId === Number(id)).forEach((r) => DB.remove("attendance", r.id));
      DB.find("users", (u) => u.linkedId === Number(id)).forEach((u) => DB.remove("users", u.id));
      DB.remove("students", id);
      DB.log(user.username, "DELETE", "Student id " + id + " removed");
      toast("Student removed");
      navigate("students");
      return renderShell();
    }

    if (act === "set-mark") {
      markDraft.marks[Number(t.dataset.sid)] = t.dataset.st;
      return navigate("mark");
    }
    if (act === "mark-all-p") {
      markRoster().forEach((s) => (markDraft.marks[s.id] = "Present"));
      return navigate("mark");
    }
    if (act === "preview-marks") return modal(previewHTML());
    if (act === "download-marks") return downloadMarks();
    if (act === "confirm-marks") return saveMarks();
    if (act === "save-marks") {
      const roster = markRoster();
      const unmarked = roster.filter((s) => !markDraft.marks[s.id]).length;
      modal(previewHTML());
      if (unmarked) toast(unmarked + " student(s) still unmarked - recheck before confirming", "warn");
      return;
    }

    if (act === "mentor-open") {
      const m = modal(mentorModal(DB.byId("users", id)));
      bindCascade($("#mentor-inst"), $("#mentor-dept"), $("#mentor-year"), $("#mentor-sec"));
      return m;
    }
    if (act === "mentor-add") {
      const cls = readClassFields("mentor");
      const res = DB.addMentor(id, cls);
      if (!res.ok) return toast(res.message, "err");
      const u = DB.byId("users", id);
      DB.log(user.username, "MENTOR", u.username + " assigned to " + DB.sectionLabel(cls));
      toast(u.name + " now mentors " + DB.sectionLabel(cls));
      closeModal();
      return navigate("accounts");
    }
    if (act === "mentor-del") {
      const row = DB.byId("mentors", id);
      if (!row) return;
      const u = DB.byId("users", row.userId);
      DB.remove("mentors", id);
      DB.log(user.username, "MENTOR", "Removed section from " + (u ? u.username : "staff"));
      toast("Mentor section removed");
      closeModal();
      return navigate("accounts");
    }

    if (act === "add-user") {
      const m = modal(userForm());
      return m;
    }
    if (act === "save-user") return saveUser();
    if (act === "toggle-user") {
      const u = DB.byId("users", id);
      if (u.id === user.id) return toast("You cannot disable your own account", "warn");
      DB.update("users", id, { active: !u.active });
      DB.log(user.username, "UPDATE", "Account " + u.username + " " + (!u.active ? "enabled" : "disabled"));
      toast("Account " + (!u.active ? "enabled" : "disabled"));
      return navigate("accounts");
    }
    if (act === "reset-pass") {
      const u = DB.byId("users", id);
      if (!confirm("Reset password for " + u.username + " to welcome123?")) return;
      DB.update("users", id, { password: "welcome123" });
      DB.log(user.username, "SECURITY", "Password reset for " + u.username);
      toast("Password reset to welcome123");
      return navigate("accounts");
    }
    if (act === "del-user") {
      const u = DB.byId("users", id);
      if (u.id === user.id) return toast("You cannot delete your own account", "warn");
      if (!confirm("Delete account " + u.username + "?")) return;
      DB.find("mentors", (m) => m.userId === u.id).forEach((m) => DB.remove("mentors", m.id));
      DB.remove("users", id);
      DB.log(user.username, "DELETE", "Account " + u.username + " removed");
      toast("Account deleted");
      return navigate("accounts");
    }

    if (act === "reset-filters") {
      recordFilter = { date: "", status: "", subject: "", q: "" };
      return navigate(currentView);
    }

    if (act === "export-students") {
      const rows = DB.scopedStudents(user).map((s) => {
        const sum = DB.studentSummary(s.id);
        return {
          rollNo: s.rollNo,
          name: s.name,
          institution: DB.instLabel(s.level, s.program),
          department: s.department,
          year: s.year,
          section: s.section,
          city: s.city,
          attendancePct: sum.pct
        };
      });
      download("students.csv", toCSV(rows, ["rollNo", "name", "institution", "department", "year", "section", "city", "attendancePct"]), "text/csv");
      return toast("students.csv downloaded");
    }
    if (act === "export-records") {
      const ids = DB.scopeFor(user) === null ? null : DB.scopedStudentIds(user);
      let rows = DB.all("attendance");
      if (ids) rows = rows.filter((r) => ids.includes(r.studentId));
      if (recordFilter.date) rows = rows.filter((r) => r.date === recordFilter.date);
      if (recordFilter.status) rows = rows.filter((r) => r.status === recordFilter.status);
      if (recordFilter.subject) rows = rows.filter((r) => r.subject === recordFilter.subject);
      const withName = rows.map((r) => {
        const st = DB.byId("students", r.studentId) || {};
        return {
          id: r.id,
          rollNo: st.rollNo,
          student: st.name,
          department: st.department,
          section: st.section,
          subject: r.subject,
          date: r.date,
          status: r.status,
          markedBy: r.markedBy
        };
      });
      download(
        "attendance-list.csv",
        toCSV(withName, ["id", "rollNo", "student", "department", "section", "subject", "date", "status", "markedBy"]),
        "text/csv"
      );
      toast("attendance-list.csv downloaded");
      DB.log(user.username, "DOWNLOAD", withName.length + " attendance rows exported");
      return;
    }
    if (act === "export-mine") {
      const rows = DB.find("attendance", (r) => r.studentId === user.linkedId);
      download("my-attendance.csv", toCSV(rows, ["id", "date", "subject", "status", "markedBy"]), "text/csv");
      return toast("Record exported");
    }
    if (act === "export-activity") {
      download("audit-log.json", JSON.stringify(DB.all("activity"), null, 2), "application/json");
      return toast("Log exported");
    }
    if (act === "export-table") {
      const tb = t.dataset.table;
      const rows = DB.all(tb).map((r) => {
        const o = {};
        Object.keys(DB.schema(tb)).forEach((c) => (o[c] = Array.isArray(r[c]) ? r[c].join("|") : r[c]));
        return o;
      });
      download(tb + ".csv", toCSV(rows, Object.keys(DB.schema(tb))), "text/csv");
      return toast(tb + ".csv downloaded");
    }

    if (act === "pick-table") {
      browserTable = t.dataset.table;
      return navigate("tables");
    }
    if (act === "clear-table") {
      const tb = t.dataset.table;
      if (!confirm("Delete ALL rows from " + tb + "?")) return;
      DB.clearTable(tb);
      DB.log(user.username, "TRUNCATE", "Table " + tb + " cleared");
      toast(tb + " cleared");
      return navigate("tables");
    }
    if (act === "del-row") {
      if (!confirm("Delete row #" + id + " from " + t.dataset.table + "?")) return;
      DB.remove(t.dataset.table, id);
      DB.log(user.username, "DELETE", "Row #" + id + " from " + t.dataset.table);
      toast("Row deleted");
      return navigate("tables");
    }

    if (act === "run-sql") return runSql();
    if (act === "clear-sql") { $("#sql").value = ""; $("#sql").focus(); return; }
    if (act === "quick-sql") { $("#sql").value = t.dataset.sql; return runSql(); }

    if (act === "backup-export") {
      download("SAMS-backup-" + DB.today() + ".json", DB.exportJSON(), "application/json");
      DB.log(user.username, "BACKUP", "Full database exported");
      return toast("Backup downloaded");
    }
    if (act === "backup-import") { const f = $("#restore-file"); return f && f.click(); }
    if (act === "db-reset") {
      if (!confirm("Rebuild the database with seed data? All current rows will be lost.")) return;
      DB.reset();
      DB.log(user.username, "RESET", "Database rebuilt from seed");
      toast("Database rebuilt");
      navigate("dbhome");
      return renderShell();
    }
  }

  function init() {
    buildStars();
    tickClock();
    setInterval(tickClock, 1000);
    updateAuthChips();

    setMode("login");
    setRegRole("student");
    $("#rg-inst").innerHTML = instOptionsHTML();
    bindCascade($("#rg-inst"), $("#rg-dept"), $("#rg-year"), $("#rg-sec"));

    $$(".role-btn").forEach((b) => b.addEventListener("click", () => applyRole(b.dataset.role)));
    $$(".rcard").forEach((c) => {
      c.addEventListener("mousemove", (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        c.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
      c.addEventListener("click", () => {
        setMode("login");
        applyRole(c.dataset.role);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    $("#login-form").addEventListener("submit", doLogin);
    $("#reg-form").addEventListener("submit", doRegister);
    $("#pw-toggle").addEventListener("click", () => {
      const inp = $("#login-pass");
      const showing = inp.type === "text";
      inp.type = showing ? "password" : "text";
      $("#pw-toggle").textContent = showing ? "Show" : "Hide";
    });
    $("#fill-demo").addEventListener("click", () => {
      const cfg = ROLES[pendingRole];
      $("#login-user").value = cfg.user;
      $("#login-pass").value = cfg.pass;
      toast("Demo credentials filled for " + cfg.badge, "ok");
    });

    const remembered = localStorage.getItem("SAMS_REMEMBER");
    if (remembered) {
      $("#login-user").value = remembered;
      $("#remember").checked = true;
    }

    $("#logout-btn").addEventListener("click", logout);
    $("#nav-toggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
    document.addEventListener("click", onClick);

    const sid = sessionStorage.getItem("SAMS_SESSION");
    if (sid) {
      const u = DB.byId("users", sid);
      if (u && u.active) startSession(u);
      else sessionStorage.removeItem("SAMS_SESSION");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();

const DB = (function () {
  const KEY = "SAMS_DB_V2";
  let db = null;

  const SECTIONS = ["A", "B", "C", "D"];

  const DEPARTMENTS = [
    { level: "School", program: "School", name: "Class 12 Science", years: [11, 12] },
    { level: "School", program: "School", name: "Class 12 Commerce", years: [11, 12] },
    { level: "School", program: "School", name: "Class 11 Science", years: [11, 12] },
    { level: "College", program: "Autonomous", name: "B.Sc Computer Science", years: [1, 2, 3] },
    { level: "College", program: "Autonomous", name: "B.Sc Information Technology", years: [1, 2, 3] },
    { level: "College", program: "Autonomous", name: "BCA", years: [1, 2, 3] },
    { level: "College", program: "Autonomous", name: "B.Com", years: [1, 2, 3] },
    { level: "College", program: "Engineering", name: "B.Tech CSE", years: [1, 2, 3, 4] },
    { level: "College", program: "Engineering", name: "B.Tech ECE", years: [1, 2, 3, 4] },
    { level: "College", program: "Engineering", name: "B.Tech Mechanical", years: [1, 2, 3, 4] }
  ];

  const INST_OPTIONS = [
    { key: "School|School", label: "School (Class 11 - 12)", level: "School", program: "School" },
    { key: "College|Autonomous", label: "College - Autonomous", level: "College", program: "Autonomous" },
    { key: "College|Engineering", label: "College - Engineering", level: "College", program: "Engineering" }
  ];

  const SCHEMA = {
    users: {
      id: "INT PK",
      username: "VARCHAR(40)",
      password: "VARCHAR(40)",
      role: "ENUM(admin,staff,student,database)",
      name: "VARCHAR(90)",
      email: "VARCHAR(120)",
      phone: "VARCHAR(20)",
      linkedId: "INT NULL",
      active: "BOOLEAN",
      registered: "VARCHAR(30)",
      createdAt: "DATE"
    },
    students: {
      id: "INT PK",
      rollNo: "VARCHAR(20)",
      name: "VARCHAR(90)",
      email: "VARCHAR(120)",
      level: "ENUM(School,College)",
      program: "ENUM(School,Autonomous,Engineering)",
      department: "VARCHAR(70)",
      year: "INT",
      section: "ENUM(A,B,C,D)",
      phone: "VARCHAR(20)",
      city: "VARCHAR(60)",
      joined: "DATE"
    },
    departments: {
      id: "INT PK",
      level: "ENUM(School,College)",
      program: "ENUM(School,Autonomous,Engineering)",
      name: "VARCHAR(70)",
      years: "ARRAY",
      sections: "ARRAY"
    },
    mentors: {
      id: "INT PK",
      userId: "INT FK>users.id",
      level: "ENUM(School,College)",
      program: "ENUM(School,Autonomous,Engineering)",
      department: "VARCHAR(70)",
      year: "INT",
      section: "ENUM(A,B,C,D)"
    },
    attendance: {
      id: "INT PK",
      studentId: "INT FK>students.id",
      subject: "VARCHAR(50)",
      date: "DATE",
      status: "ENUM(Present,Absent,Leave)",
      markedBy: "VARCHAR(40)"
    },
    activity: {
      id: "INT PK",
      actor: "VARCHAR(60)",
      action: "VARCHAR(60)",
      detail: "VARCHAR(220)",
      at: "DATETIME"
    }
  };

  const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "English", "Computer Science", "General"];

  const SEED_STUDENTS = [
    ["STU-2026-001", "Aarav Sharma", "aarav.sharma@mail.com", "B.Tech CSE", 2, "A", "9812001101", "Jaipur"],
    ["STU-2026-002", "Diya Verma", "diya.verma@mail.com", "B.Tech CSE", 2, "A", "9812001102", "Lucknow"],
    ["STU-2026-003", "Kabir Singh", "kabir.singh@mail.com", "B.Tech CSE", 2, "B", "9812001103", "Delhi"],
    ["STU-2026-004", "Ananya Iyer", "ananya.iyer@mail.com", "B.Tech ECE", 2, "A", "9812001104", "Chennai"],
    ["STU-2026-005", "Rohan Gupta", "rohan.gupta@mail.com", "B.Tech ECE", 2, "B", "9812001105", "Indore"],
    ["STU-2026-006", "Meera Nair", "meera.nair@mail.com", "B.Sc Computer Science", 2, "B", "9812001106", "Kochi"],
    ["STU-2026-007", "Ishaan Bose", "ishaan.bose@mail.com", "B.Sc Computer Science", 2, "B", "9812001107", "Kolkata"],
    ["STU-2026-008", "Sara Khan", "sara.khan@mail.com", "B.Sc Computer Science", 2, "B", "9812001108", "Hyderabad"],
    ["STU-2026-009", "Vivaan Patel", "vivaan.patel@mail.com", "B.Tech CSE", 3, "A", "9812001109", "Ahmedabad"],
    ["STU-2026-010", "Ira Deshmukh", "ira.deshmukh@mail.com", "B.Tech CSE", 3, "A", "9812001110", "Pune"],
    ["STU-2026-011", "Aditya Rao", "aditya.rao@mail.com", "B.Tech Mechanical", 4, "B", "9812001111", "Mysuru"],
    ["STU-2026-012", "Tanvi Joshi", "tanvi.joshi@mail.com", "B.Tech Mechanical", 4, "B", "9812001112", "Nagpur"],
    ["STU-2026-013", "Ravi Malhotra", "ravi.malhotra@mail.com", "Class 12 Science", 12, "A", "9812001113", "Noida"],
    ["STU-2026-014", "Sneha Agarwal", "sneha.agarwal@mail.com", "Class 12 Science", 12, "B", "9812001114", "Noida"],
    ["STU-2026-015", "Arjun Pillai", "arjun.pillai@mail.com", "Class 12 Science", 12, "B", "9812001115", "Chennai"],
    ["STU-2026-016", "Nisha Roy", "nisha.roy@mail.com", "Class 12 Commerce", 11, "B", "9812001116", "Kolkata"]
  ];

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function dateMinus(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
  }

  function nowStamp() {
    return new Date().toISOString().replace("T", " ").slice(0, 19);
  }

  function isWeekday(dateStr) {
    const day = new Date(dateStr + "T00:00:00").getDay();
    return day !== 0 && day !== 6;
  }

  function uid(table) {
    return db[table].reduce((m, r) => Math.max(m, Number(r.id) || 0), 0) + 1;
  }

  function instMeta(level, program) {
    return (
      INST_OPTIONS.find((o) => o.level === level && o.program === program) ||
      INST_OPTIONS.find((o) => o.level === level) ||
      INST_OPTIONS[2]
    );
  }

  function instLabel(level, program) {
    return instMeta(level, program).label;
  }

  function deptMeta(name, level, program) {
    let d = db.departments.find((x) => x.name === name);
    if (d) return d;
    if (level && program) {
      d = db.departments.find((x) => x.level === level && x.program === program && x.name === name);
      if (d) return d;
    }
    return db.departments[0];
  }

  function classify(name) {
    const d = db.departments.find((x) => x.name === name);
    if (d) return { level: d.level, program: d.program };
    if (/^class\s/i.test(name)) return { level: "School", program: "School" };
    if (/b\.?tech|engineering/i.test(name)) return { level: "College", program: "Engineering" };
    return { level: "College", program: "Autonomous" };
  }

  function seed() {
    db = { users: [], students: [], departments: [], mentors: [], attendance: [], activity: [] };

    DEPARTMENTS.forEach((d, i) => {
      db.departments.push({
        id: i + 1,
        level: d.level,
        program: d.program,
        name: d.name,
        years: d.years.slice(),
        sections: SECTIONS.slice()
      });
    });

    SEED_STUDENTS.forEach((s, i) => {
      const meta = classify(s[3]);
      db.students.push({
        id: i + 1,
        rollNo: s[0],
        name: s[1],
        email: s[2],
        level: meta.level,
        program: meta.program,
        department: s[3],
        year: s[4],
        section: s[5],
        phone: s[6],
        city: s[7],
        joined: "2026-04-01"
      });
      db.users.push({
        id: i + 1,
        username: "s" + String(i + 1).padStart(3, "0"),
        password: "student123",
        role: "student",
        name: s[1],
        email: s[2],
        phone: s[6],
        linkedId: i + 1,
        active: true,
        registered: "seed",
        createdAt: "2026-04-01"
      });
    });

    db.users.push(
      {
        id: 17,
        username: "admin",
        password: "admin123",
        role: "admin",
        name: "Dr. Neha Kulkarni",
        email: "neha.kulkarni@sams.edu",
        phone: "9812009001",
        linkedId: null,
        active: true,
        registered: "seed",
        createdAt: "2026-03-15"
      },
      {
        id: 18,
        username: "staff",
        password: "staff123",
        role: "staff",
        name: "Prof. Arjun Menon",
        email: "arjun.menon@sams.edu",
        phone: "9812009002",
        linkedId: null,
        active: true,
        registered: "seed",
        createdAt: "2026-03-20"
      },
      {
        id: 19,
        username: "staff2",
        password: "staff123",
        role: "staff",
        name: "Prof. Kavya Reddy",
        email: "kavya.reddy@sams.edu",
        phone: "9812009003",
        linkedId: null,
        active: true,
        registered: "seed",
        createdAt: "2026-03-20"
      },
      {
        id: 20,
        username: "mentor",
        password: "staff123",
        role: "staff",
        name: "Prof. Sunita Rao",
        email: "sunita.rao@sams.edu",
        phone: "9812009004",
        linkedId: null,
        active: true,
        registered: "seed",
        createdAt: "2026-03-22"
      },
      {
        id: 21,
        username: "root",
        password: "root123",
        role: "database",
        name: "DB Superintendent",
        email: "dba@sams.edu",
        phone: "9812009005",
        linkedId: null,
        active: true,
        registered: "seed",
        createdAt: "2026-03-10"
      }
    );

    [
      [18, "College", "Autonomous", "B.Sc Computer Science", 2, "B"],
      [19, "College", "Engineering", "B.Tech CSE", 2, "A"],
      [19, "College", "Engineering", "B.Tech CSE", 2, "B"],
      [20, "School", "School", "Class 12 Science", 12, "A"],
      [20, "School", "School", "Class 12 Science", 12, "B"]
    ].forEach((m, i) => {
      db.mentors.push({
        id: i + 1,
        userId: m[0],
        level: m[1],
        program: m[2],
        department: m[3],
        year: m[4],
        section: m[5]
      });
    });

    let aid = 1;
    for (let back = 60; back >= 0; back--) {
      const date = dateMinus(back);
      if (!isWeekday(date)) continue;
      db.students.forEach((st) => {
        if (Math.random() < 0.06) return;
        const roll = Math.random();
        const status = roll < 0.87 ? "Present" : roll < 0.95 ? "Absent" : "Leave";
        const subjectPool =
          st.level === "School"
            ? ["Mathematics", "Science", "English", "Social Studies"].filter((x) => true)
            : SUBJECTS;
        db.attendance.push({
          id: aid++,
          studentId: st.id,
          subject: subjectPool[Math.floor(Math.random() * subjectPool.length)],
          date: date,
          status: status,
          markedBy: mentorUsernameFor(st) || "admin"
        });
      });
    }

    db.activity = [
      { id: 1, actor: "system", action: "BOOT", detail: "Database initialised with departments, mentors and seed data", at: nowStamp() },
      { id: 2, actor: "admin", action: "IMPORT", detail: "Loaded " + db.students.length + " students across 4 sections", at: nowStamp() },
      { id: 3, actor: "admin", action: "MENTOR", detail: "Mentor assignments created for 5 sections", at: nowStamp() }
    ];

    save();
  }

  function mentorUsernameFor(student) {
    const m = db.mentors.find(
      (x) =>
        x.level === student.level &&
        x.program === student.program &&
        x.department === student.department &&
        Number(x.year) === Number(student.year) &&
        x.section === student.section
    );
    if (!m) return null;
    const u = db.users.find((x) => x.id === m.userId);
    return u ? u.username : null;
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(db));
  }

  function migrate() {
    const wanted = ["users", "students", "departments", "mentors", "attendance", "activity"];
    wanted.forEach((t) => {
      if (!Array.isArray(db[t])) db[t] = [];
    });
    if (!db.departments.length) {
      DEPARTMENTS.forEach((d, i) => {
        db.departments.push({
          id: i + 1,
          level: d.level,
          program: d.program,
          name: d.name,
          years: d.years.slice(),
          sections: SECTIONS.slice()
        });
      });
    }
    db.students.forEach((s) => {
      if (!s.department) s.department = s.course || "B.Tech CSE";
      delete s.course;
      if (!s.level || !s.program) {
        const m = classify(s.department);
        s.level = m.level;
        s.program = m.program;
      }
      if (!s.section) s.section = "A";
      if (!s.year) s.year = 1;
    });
    db.users.forEach((u) => {
      if (!u.registered) u.registered = "seed";
      if (u.phone === undefined) u.phone = "";
    });
    db.mentors = db.mentors.filter((m) => db.users.some((u) => u.id === m.userId && u.role === "staff"));
    save();
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY) || localStorage.getItem("SAMS_DB_V1");
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.users || !parsed.students) return false;
      db = parsed;
      localStorage.setItem(KEY, JSON.stringify(db));
      migrate();
      return true;
    } catch (e) {
      return false;
    }
  }

  function boot() {
    if (!load()) seed();
    migrate();
    save();
  }

  function tables() {
    return Object.keys(SCHEMA);
  }

  function schema(table) {
    if (!SCHEMA[table]) throw new Error("Unknown table: " + table);
    return SCHEMA[table];
  }

  function all(table) {
    if (!SCHEMA[table]) throw new Error("Unknown table: " + table);
    return db[table].slice();
  }

  function find(table, predicate) {
    return all(table).filter(predicate);
  }

  function byId(table, id) {
    return all(table).find((r) => Number(r.id) === Number(id)) || null;
  }

  function insert(table, row) {
    if (!SCHEMA[table]) throw new Error("Unknown table: " + table);
    const record = Object.assign({}, row);
    record.id = uid(table);
    db[table].push(record);
    save();
    return record;
  }

  function update(table, id, patch) {
    const row = byId(table, id);
    if (!row) return null;
    Object.assign(row, patch);
    save();
    return row;
  }

  function remove(table, id) {
    if (!SCHEMA[table]) throw new Error("Unknown table: " + table);
    const before = db[table].length;
    db[table] = db[table].filter((r) => Number(r.id) !== Number(id));
    const removed = db[table].length !== before;
    if (removed) save();
    return removed;
  }

  function log(actor, action, detail) {
    db.activity.push({ id: uid("activity"), actor: actor, action: action, detail: detail, at: nowStamp() });
    if (db.activity.length > 300) db.activity = db.activity.slice(-300);
    save();
  }

  function departments(level, program) {
    return db.departments.filter(
      (d) => (!level || d.level === level) && (!program || d.program === program)
    );
  }

  function yearsFor(departmentName) {
    const d = db.departments.find((x) => x.name === departmentName);
    return d ? d.years.slice() : [1, 2, 3, 4];
  }

  function mentorAssignments(userId) {
    return db.mentors.filter((m) => Number(m.userId) === Number(userId));
  }

  function mentorNameFor(assignment) {
    const u = db.users.find((x) => x.id === assignment.userId);
    return u ? u.name : "-";
  }

  function addMentor(userId, a) {
    const exists = db.mentors.find(
      (m) =>
        Number(m.userId) === Number(userId) &&
        m.level === a.level &&
        m.program === a.program &&
        m.department === a.department &&
        Number(m.year) === Number(a.year) &&
        m.section === a.section
    );
    if (exists) return { ok: false, message: "That section is already assigned" };
    const row = insert("mentors", {
      userId: Number(userId),
      level: a.level,
      program: a.program,
      department: a.department,
      year: Number(a.year),
      section: a.section
    });
    return { ok: true, mentor: row };
  }

  function sameSection(s, a) {
    return (
      s.level === a.level &&
      s.program === a.program &&
      s.department === a.department &&
      Number(s.year) === Number(a.year) &&
      s.section === a.section
    );
  }

  function scopeFor(user) {
    if (!user) return null;
    if (user.role === "admin" || user.role === "database") return null;
    const list = mentorAssignments(user.id);
    if (user.role === "student") {
      const st = byId("students", user.linkedId);
      return st ? [{ level: st.level, program: st.program, department: st.department, year: st.year, section: st.section }] : [];
    }
    return list.map((m) => ({
      level: m.level,
      program: m.program,
      department: m.department,
      year: m.year,
      section: m.section
    }));
  }

  function scopedStudents(user) {
    const scope = scopeFor(user);
    if (scope === null) return all("students");
    if (user.role === "student") {
      const st = byId("students", user.linkedId);
      return st ? [st] : [];
    }
    return all("students").filter((s) => scope.some((a) => sameSection(s, a)));
  }

  function scopedStudentIds(user) {
    return scopedStudents(user).map((s) => s.id);
  }

  function sectionLabel(a) {
    return a.department + " · Year " + a.year + " · Section " + a.section;
  }

  function register(role, payload) {
    if (role !== "student" && role !== "staff")
      return { ok: false, message: "Registration is only open for Student and Staff accounts" };
    const username = String(payload.username || "").trim();
    const password = String(payload.password || "");
    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim();
    if (!name || !email) return { ok: false, message: "Name and email are required" };
    if (!/^[a-zA-Z0-9._-]{3,24}$/.test(username))
      return { ok: false, message: "Username must be 3-24 characters (letters, numbers, . _ -)" };
    if (password.length < 6) return { ok: false, message: "Password must be at least 6 characters" };
    if (db.users.some((u) => u.username.toLowerCase() === username.toLowerCase()))
      return { ok: false, message: "That username is already taken" };

    const base = {
      username: username,
      password: password,
      role: role,
      name: name,
      email: email,
      phone: payload.phone || "",
      linkedId: null,
      active: true,
      registered: "self",
      createdAt: today()
    };

    if (role === "student") {
      const dept = String(payload.department || "");
      const level = payload.level;
      const program = payload.program;
      const year = Number(payload.year);
      const section = String(payload.section || "");
      if (!dept || !level || !program || !year || !section)
        return { ok: false, message: "Institution, department, year and section are required" };
      if (!SECTIONS.includes(section)) return { ok: false, message: "Section must be A, B, C or D" };
      const known = db.departments.find((d) => d.name === dept && d.level === level && d.program === program);
      if (!known) return { ok: false, message: "Unknown department for this institution" };
      if (!known.years.includes(year)) return { ok: false, message: "Year not available for " + dept };

      const seq = db.students.length + 1;
      const roll = "STU-" + new Date().getFullYear() + "-" + String(seq).padStart(3, "0");
      const student = insert("students", {
        rollNo: roll,
        name: name,
        email: email,
        level: level,
        program: program,
        department: dept,
        year: year,
        section: section,
        phone: base.phone,
        city: payload.city || "",
        joined: today()
      });
      base.linkedId = student.id;
      const user = insert("users", base);
      log("system", "REGISTER", "Student " + roll + " registered for " + sectionLabel({ level: level, program: program, department: dept, year: year, section: section }));
      return { ok: true, user: user, student: student };
    }

    const dept = String(payload.department || "");
    const section = String(payload.section || "");
    const year = Number(payload.year);
    if (!dept || !payload.level || !payload.program || !year || !section)
      return { ok: false, message: "Mentor assignment: institution, department, year and section are required" };
    if (!SECTIONS.includes(section)) return { ok: false, message: "Section must be A, B, C or D" };

    const user = insert("users", base);
    addMentor(user.id, {
      level: payload.level,
      program: payload.program,
      department: dept,
      year: year,
      section: section
    });
    log("system", "REGISTER", "Staff " + username + " registered as mentor of " + sectionLabel({ level: payload.level, program: payload.program, department: dept, year: year, section: section }));
    return { ok: true, user: user };
  }

  function stats() {
    const total = db.attendance.length;
    const present = db.attendance.filter((r) => r.status === "Present").length;
    const absent = db.attendance.filter((r) => r.status === "Absent").length;
    const leave = db.attendance.filter((r) => r.status === "Leave").length;
    return {
      students: db.students.length,
      staff: db.users.filter((u) => u.role === "staff").length,
      sections: db.mentors.length,
      departments: db.departments.length,
      records: total,
      present: present,
      absent: absent,
      leave: leave,
      rate: total ? Math.round((present / total) * 1000) / 10 : 0
    };
  }

  function dayRate(date) {
    const rows = db.attendance.filter((r) => r.date === date);
    if (!rows.length) return 0;
    const p = rows.filter((r) => r.status === "Present").length;
    return Math.round((p / rows.length) * 1000) / 10;
  }

  function trend(days) {
    const out = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = dateMinus(i);
      if (!isWeekday(d)) continue;
      out.push({ date: d, rate: dayRate(d) });
    }
    return out;
  }

  function studentSummary(studentId) {
    const rows = db.attendance.filter((r) => Number(r.studentId) === Number(studentId));
    const total = rows.length;
    const present = rows.filter((r) => r.status === "Present").length;
    const absent = rows.filter((r) => r.status === "Absent").length;
    const leave = rows.filter((r) => r.status === "Leave").length;
    const bySubject = {};
    rows.forEach((r) => {
      if (!bySubject[r.subject]) bySubject[r.subject] = { total: 0, present: 0 };
      bySubject[r.subject].total++;
      if (r.status === "Present") bySubject[r.subject].present++;
    });
    const subjects = Object.keys(bySubject).map((k) => ({
      subject: k,
      total: bySubject[k].total,
      present: bySubject[k].present,
      pct: bySubject[k].total ? Math.round((bySubject[k].present / bySubject[k].total) * 100) : 0
    }));
    return {
      total: total,
      present: present,
      absent: absent,
      leave: leave,
      pct: total ? Math.round((present / total) * 1000) / 10 : 0,
      subjects: subjects,
      recent: rows.slice().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 12)
    };
  }

  function authenticate(username, password) {
    const u = db.users.find(
      (x) => x.username.toLowerCase() === String(username).toLowerCase() && x.password === String(password)
    );
    if (!u) return { ok: false, message: "Invalid username or password" };
    if (!u.active) return { ok: false, message: "Account is deactivated" };
    return { ok: true, user: u };
  }

  function parseValue(raw) {
    const v = raw.trim();
    if (/^'.*'$/.test(v) || /^".*"$/.test(v)) return v.slice(1, -1);
    if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
    if (/^true$/i.test(v)) return true;
    if (/^false$/i.test(v)) return false;
    return v;
  }

  function matchWhere(row, clause) {
    const parts = clause.split(/\s+and\s+/i);
    return parts.every((p) => {
      const m = p.trim().match(/^([a-zA-Z_]+)\s*(=|!=|<>|>=|<=|>|<|like)\s*(.+)$/i);
      if (!m) throw new Error("Cannot parse condition: " + p.trim());
      const col = m[1];
      const op = m[2].toLowerCase();
      const val = parseValue(m[3]);
      if (!(col in row)) throw new Error("Unknown column: " + col);
      const cell = row[col];
      switch (op) {
        case "=":
          return String(cell).toLowerCase() === String(val).toLowerCase() || cell === val;
        case "!=":
        case "<>":
          return String(cell).toLowerCase() !== String(val).toLowerCase();
        case ">":
          return cell > val;
        case "<":
          return cell < val;
        case ">=":
          return cell >= val;
        case "<=":
          return cell <= val;
        case "like":
          return String(cell)
            .toLowerCase()
            .includes(String(val).replace(/%/g, "").toLowerCase());
        default:
          throw new Error("Unsupported operator: " + op);
      }
    });
  }

  function result(columns, rows, message) {
    return { columns: columns, rows: rows, message: message };
  }

  function query(sql) {
    const raw = String(sql || "").trim().replace(/;+\s*$/, "");
    if (!raw) throw new Error("Empty statement");
    const head = raw.split(/\s+/)[0].toUpperCase();

    if (head === "HELP") {
      return result(
        ["command", "syntax"],
        [
          { command: "SELECT", syntax: "SELECT *|col,... FROM table [WHERE cond] [ORDER BY col [DESC]] [LIMIT n]" },
          { command: "INSERT", syntax: "INSERT INTO table (col, col) VALUES (val, val)" },
          { command: "UPDATE", syntax: "UPDATE table SET col = val [WHERE cond]" },
          { command: "DELETE", syntax: "DELETE FROM table [WHERE cond]" },
          { command: "TABLES", syntax: "SHOW TABLES" },
          { command: "DESCRIBE", syntax: "DESC table" },
          { command: "CONDITION", syntax: "col = v, col > v, col LIKE %text%" }
        ],
        "7 statement(s)"
      );
    }

    if (head === "SHOW" && raw.toUpperCase().includes("TABLES")) {
      return result(
        ["table_name", "columns", "rows"],
        tables().map((t) => ({ table_name: t, columns: Object.keys(SCHEMA[t]).length, rows: db[t].length })),
        tables().length + " table(s)"
      );
    }

    if (head === "DESC" || head === "DESCRIBE") {
      const t = raw.split(/\s+/)[1];
      if (!t) throw new Error("Usage: DESC table");
      const s = schema(t.toLowerCase());
      return result(
        ["column", "type"],
        Object.keys(s).map((k) => ({ column: k, type: s[k] })),
        Object.keys(s).length + " column(s)"
      );
    }

    if (head === "SELECT") {
      const m = raw.match(
        /^select\s+(.+?)\s+from\s+([a-zA-Z_]+)(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+([a-zA-Z_]+)(\s+desc|\s+asc)?)?(?:\s+limit\s+(\d+))?$/is
      );
      if (!m) throw new Error("Syntax error in SELECT statement");
      const colsRaw = m[1].trim();
      const table = m[2].toLowerCase();
      const where = m[3];
      const orderCol = m[4];
      const dir = (m[5] || " asc").toLowerCase().trim();
      const limit = m[6] ? Number(m[6]) : null;

      let rows = all(table);
      if (where) rows = rows.filter((r) => matchWhere(r, where));
      if (orderCol) {
        if (!(orderCol in SCHEMA[table])) throw new Error("Unknown column: " + orderCol);
        rows.sort((a, b) => {
          const av = a[orderCol];
          const bv = b[orderCol];
          if (av === bv) return 0;
          return (av > bv ? 1 : -1) * (dir === "desc" ? -1 : 1);
        });
      }
      if (limit) rows = rows.slice(0, limit);

      if (colsRaw === "*") {
        const cols = Object.keys(SCHEMA[table]);
        return result(cols, rows.map((r) => pick(r, cols)), rows.length + " row(s)");
      }
      const cols = colsRaw.split(",").map((c) => c.trim());
      cols.forEach((c) => {
        if (!(c in SCHEMA[table])) throw new Error("Unknown column: " + c);
      });
      return result(cols, rows.map((r) => pick(r, cols)), rows.length + " row(s)");
    }

    if (head === "INSERT") {
      const m = raw.match(/^insert\s+into\s+([a-zA-Z_]+)\s*\(([^)]+)\)\s*values\s*\((.+)\)$/is);
      if (!m) throw new Error("Syntax error in INSERT statement");
      const table = m[1].toLowerCase();
      schema(table);
      const cols = m[2].split(",").map((c) => c.trim());
      const vals = splitValues(m[3]);
      if (cols.length !== vals.length) throw new Error("Column / value count mismatch");
      const row = {};
      cols.forEach((c, i) => {
        if (!(c in SCHEMA[table])) throw new Error("Unknown column: " + c);
        row[c] = parseValue(vals[i]);
      });
      if (table === "students" && !row.joined) row.joined = today();
      const saved = insert(table, row);
      return result(["status"], [{ status: "OK", id: saved.id }], "1 row inserted");
    }

    if (head === "UPDATE") {
      const m = raw.match(/^update\s+([a-zA-Z_]+)\s+set\s+(.+?)(?:\s+where\s+(.+))?$/is);
      if (!m) throw new Error("Syntax error in UPDATE statement");
      const table = m[1].toLowerCase();
      schema(table);
      const sets = m[2].split(",").map((s) => s.trim());
      const patch = {};
      sets.forEach((s) => {
        const sm = s.match(/^([a-zA-Z_]+)\s*=\s*(.+)$/);
        if (!sm) throw new Error("Cannot parse SET clause: " + s);
        patch[sm[1]] = parseValue(sm[2]);
      });
      const where = m[3];
      let rows = all(table);
      if (where) rows = rows.filter((r) => matchWhere(r, where));
      rows.forEach((r) => update(table, r.id, patch));
      return result(["status"], [{ status: "OK" }], rows.length + " row(s) updated");
    }

    if (head === "DELETE") {
      const m = raw.match(/^delete\s+from\s+([a-zA-Z_]+)(?:\s+where\s+(.+))?$/is);
      if (!m) throw new Error("Syntax error in DELETE statement");
      const table = m[1].toLowerCase();
      schema(table);
      const where = m[2];
      let rows = all(table);
      if (where) rows = rows.filter((r) => matchWhere(r, where));
      rows.forEach((r) => remove(table, r.id));
      return result(["status"], [{ status: "OK" }], rows.length + " row(s) deleted");
    }

    throw new Error("Unknown statement: " + head);
  }

  function splitValues(str) {
    const out = [];
    let cur = "";
    let quote = null;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (quote) {
        if (ch === quote) quote = null;
        cur += ch;
      } else if (ch === "'" || ch === '"') {
        quote = ch;
        cur += ch;
      } else if (ch === ",") {
        out.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }

  function pick(row, cols) {
    const out = {};
    cols.forEach((c) => (out[c] = row[c]));
    return out;
  }

  function exportJSON() {
    return JSON.stringify(db, null, 2);
  }

  function importJSON(text) {
    const parsed = JSON.parse(text);
    if (!parsed.users || !parsed.students) throw new Error("Invalid backup file");
    db = parsed;
    migrate();
    save();
  }

  function reset() {
    seed();
  }

  function clearTable(table) {
    schema(table);
    db[table] = [];
    save();
  }

  boot();

  return {
    SCHEMA: SCHEMA,
    SUBJECTS: SUBJECTS,
    SECTIONS: SECTIONS,
    DEPARTMENTS: DEPARTMENTS,
    INST_OPTIONS: INST_OPTIONS,
    tables: tables,
    schema: schema,
    all: all,
    find: find,
    byId: byId,
    insert: insert,
    update: update,
    remove: remove,
    log: log,
    stats: stats,
    dayRate: dayRate,
    trend: trend,
    studentSummary: studentSummary,
    authenticate: authenticate,
    register: register,
    departments: departments,
    yearsFor: yearsFor,
    mentorAssignments: mentorAssignments,
    mentorNameFor: mentorNameFor,
    addMentor: addMentor,
    scopeFor: scopeFor,
    scopedStudents: scopedStudents,
    scopedStudentIds: scopedStudentIds,
    sectionLabel: sectionLabel,
    instLabel: instLabel,
    query: query,
    exportJSON: exportJSON,
    importJSON: importJSON,
    reset: reset,
    clearTable: clearTable,
    today: today
  };
})();

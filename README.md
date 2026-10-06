# Student Attendance Management System (SAMS)

A front-end attendance management portal built with **pure HTML, CSS and JavaScript** — no frameworks, no build step. Data lives in a client-side SQL engine on top of `localStorage`.

## Features

- **Registration for first-time users** — students and staff sign themselves up (auto sign-in after creating an account).
- **Four login layers** — Student, Staff/Mentor, Admin, Database (SQL console). Each layer rejects accounts from another layer.
- **Institutions** — School (Class 11–12), College – Autonomous, College – Engineering, each with departments and **sections A, B, C, D**.
- **Mentor-locked attendance portal** — roll call only opens for the mentor of that section (e.g. 12th-B students can only be marked by the 12th-B mentor). Admin keeps an override.
- **Preview before saving** — recheck the roster with present/absent/leave counts, then confirm.
- **Download** — attendance list, filtered records, student roster and history exported as CSV.
- **Admin tools** — student CRUD, department catalogue, mentor assignments, account governance, audit trail.
- **Database console** — `SELECT / INSERT / UPDATE / DELETE / SHOW / DESC` against the live store, table browser, JSON backup & restore.

## Live demo

https://student-attendance-management-system-38ubmllyh.vercel.app

## Quick start

Open `index.html` in a browser (or serve the folder with any static server).

### Demo credentials

| Layer | Username | Password |
|---|---|---|
| Student | `s001` | `student123` |
| Staff (B.Sc CS · Y2 · Sec B mentor) | `staff` | `staff123` |
| Staff (Class 12 Science · 12 · Sec A/B mentor) | `mentor` | `staff123` |
| Admin | `admin` | `admin123` |
| Database | `root` | `root123` |

## Structure

| File | Purpose |
|---|---|
| `index.html` | Portal, registration and app shell |
| `style.css` | 3D animated theme |
| `db.js` | Client-side SQL engine, schema, seed data, migrations |
| `app.js` | Auth, role navigation, dashboards, marking, preview, exports |

## Deploy

Static site — deploy the folder to any static host (Vercel, Netlify, GitHub Pages).

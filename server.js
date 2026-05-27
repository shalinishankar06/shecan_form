const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const fs         = require('fs');
const rateLimit  = require('express-rate-limit');
const initSqlJs  = require('sql.js');

const app  = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'data', 'submissions.db');

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 5,
  message: { success: false, error: 'Too many submissions. Please try again later.' }
});

// ── Database ─────────────────────────────────────────────────────────────────
let db;

async function initDB() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL,
      subject    TEXT    NOT NULL,
      message    TEXT    NOT NULL,
      status     TEXT    DEFAULT 'new',
      ip         TEXT,
      created_at TEXT    DEFAULT (datetime('now'))
    )
  `);
  saveDB();
}

function saveDB() {
  if (!fs.existsSync(path.join(__dirname, 'data')))
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function dbRun(sql, params = []) {
  db.run(sql, params);
  saveDB();
}

function dbAll(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) { rows.push(stmt.getAsObject()); }
  stmt.free();
  return rows;
}

function dbGet(sql, params = []) {
  return dbAll(sql, params)[0] || null;
}

// ── Validation ───────────────────────────────────────────────────────────────
function validate({ name, email, subject, message }) {
  const errors = [];
  if (!name    || name.trim().length < 2)    errors.push('Name must be at least 2 characters.');
  if (!email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.push('Enter a valid email address.');
  if (!subject || subject.trim().length < 3) errors.push('Subject must be at least 3 characters.');
  if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');
  if (message  && message.trim().length > 2000) errors.push('Message must be under 2000 characters.');
  return errors;
}

// ── Routes ───────────────────────────────────────────────────────────────────
app.post('/api/submit', submitLimiter, (req, res) => {
  const { name, email, subject, message } = req.body;
  const errors = validate({ name, email, subject, message });
  if (errors.length) return res.status(400).json({ success: false, errors });

  try {
    dbRun(
      `INSERT INTO submissions (name, email, subject, message, ip) VALUES (?, ?, ?, ?, ?)`,
      [name.trim(), email.trim().toLowerCase(), subject.trim(), message.trim(), req.ip]
    );
    const row = dbGet('SELECT last_insert_rowid() as id');
    res.json({ success: true, message: 'Form Submitted Successfully', id: row?.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error. Please try again.' });
  }
});

const ADMIN_TOKEN = 'shecan2024';
function adminAuth(req, res, next) {
  const t = req.headers['x-admin-token'] || req.query.token;
  if (t !== ADMIN_TOKEN) return res.status(401).json({ success: false, error: 'Unauthorized' });
  next();
}

app.get('/api/admin/submissions', adminAuth, (req, res) => {
  const { status, search, page = 1 } = req.query;
  const limit = 10, offset = (page - 1) * limit;

  let where = [];
  let params = [];
  if (status && status !== 'all') { where.push('status = ?'); params.push(status); }
  if (search) {
    where.push('(name LIKE ? OR email LIKE ? OR message LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  const wClause = where.length ? 'WHERE ' + where.join(' AND ') : '';

  const total = dbGet(`SELECT COUNT(*) as c FROM submissions ${wClause}`, params)?.c || 0;
  const rows  = dbAll(`SELECT * FROM submissions ${wClause} ORDER BY id DESC LIMIT ? OFFSET ?`, [...params, limit, offset]);

  res.json({ success: true, submissions: rows, total, page: +page, pages: Math.ceil(total / limit) });
});

app.patch('/api/admin/submissions/:id/status', adminAuth, (req, res) => {
  const { status } = req.body;
  if (!['new','reviewed','resolved'].includes(status))
    return res.status(400).json({ success: false, error: 'Invalid status' });
  dbRun('UPDATE submissions SET status = ? WHERE id = ?', [status, req.params.id]);
  res.json({ success: true });
});

app.delete('/api/admin/submissions/:id', adminAuth, (req, res) => {
  dbRun('DELETE FROM submissions WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

app.get('/api/admin/stats', adminAuth, (req, res) => {
  const total    = dbGet('SELECT COUNT(*) as c FROM submissions')?.c || 0;
  const newC     = dbGet("SELECT COUNT(*) as c FROM submissions WHERE status='new'")?.c || 0;
  const reviewed = dbGet("SELECT COUNT(*) as c FROM submissions WHERE status='reviewed'")?.c || 0;
  const resolved = dbGet("SELECT COUNT(*) as c FROM submissions WHERE status='resolved'")?.c || 0;
  const today    = dbGet("SELECT COUNT(*) as c FROM submissions WHERE date(created_at)=date('now')")?.c || 0;
  res.json({ success: true, stats: { total, new: newC, reviewed, resolved, today } });
});

// ── Start ────────────────────────────────────────────────────────────────────
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🌸 She Can Foundation server running!`);
    console.log(`   Form:        http://localhost:${PORT}`);
    console.log(`   Admin Panel: http://localhost:${PORT}/admin.html`);
    console.log(`   Password:    shecan2024\n`);
  });
});

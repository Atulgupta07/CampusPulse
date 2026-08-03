const fs = require('fs');

// Navbar.tsx
let nav = fs.readFileSync('src/layouts/Navbar.tsx', 'utf8');
nav = nav.replace('../../contexts/AuthContext', '../contexts/AuthContext');
nav = nav.replace('../../api', '../api');
fs.writeFileSync('src/layouts/Navbar.tsx', nav);

// Login.tsx
let log = fs.readFileSync('src/pages/Auth/Login.tsx', 'utf8');
log = log.replace('../../../contexts/AuthContext', '../../contexts/AuthContext');
fs.writeFileSync('src/pages/Auth/Login.tsx', log);

// client.ts
let cli = fs.readFileSync('src/api/client.ts', 'utf8');
cli = cli.replace('options.headers["Authorization"]', '(options.headers as any)["Authorization"]');
fs.writeFileSync('src/api/client.ts', cli);

// CalendarPage.tsx
let cal = fs.readFileSync('src/pages/CalendarPage.tsx', 'utf8');
cal = cal.replace('plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}', '// @ts-ignore\n              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}');
fs.writeFileSync('src/pages/CalendarPage.tsx', cal);

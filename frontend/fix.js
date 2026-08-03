const fs = require('fs');
const path = require('path');

const apiFiles = fs.readdirSync('src/api').filter(f => f.endsWith('.ts'));
for (const file of apiFiles) {
  const p = path.join('src/api', file);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]\.\.\/types['"];/g, 'import type { $1 } from "../types";');
  fs.writeFileSync(p, content);
}

const compFiles = ['src/components/Chatbot.tsx', 'src/pages/Approvals.tsx', 'src/pages/CalendarPage.tsx', 'src/pages/Dashboard.tsx', 'src/pages/Employees.tsx', 'src/pages/Notifications.tsx', 'src/pages/Reports.tsx', 'src/pages/Tasks.tsx', 'src/contexts/AuthContext.tsx'];
for (const file of compFiles) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]\.\.\/types['"];/g, 'import type { $1 } from "../types";');
  fs.writeFileSync(file, content);
}

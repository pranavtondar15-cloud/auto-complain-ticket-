auto assign complain ticket
TicketDesk — Complaint & Ticket Management System

## Stack
- **Backend**: Node.js + Express + PostgreSQL
- **Frontend**: React + Tailwind CSS
- **AI Classification**: OpenAI GPT-3.5 (falls back to rule-based if no API key)
- **Auth**: JWT
- **Email**: Nodemailer (SMTP)

---

## Setup

### 1. Database
Create a PostgreSQL database:
```sql
CREATE DATABASE ticketdb;
```

### 2. Backend
```bash
cd server
npm install
cp .env.example .env   # fill in your values
node src/config/migrate.js   # run schema migration
npm run dev
```

### 3. Frontend
```bash
cd client
npm install
npm start
```

---

## Environment Variables (`server/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing JWTs |
| `OPENAI_API_KEY` | OpenAI key (optional — falls back to rule-based) |
| `SMTP_HOST/PORT/USER/PASS` | Email credentials |
| `CLIENT_URL` | Frontend URL for CORS |

---

## Roles

| Role | Capabilities |
|---|---|
| `user` | Register, raise complaints, view own tickets, close resolved tickets |
| `incharge` | View department tickets, update status, add remarks |
| `admin` | Full access — manage users, departments, view all tickets & reports |

---

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/auth/me`

### Complaints
- `POST /api/complaints` — raise complaint (multipart/form-data)
- `GET  /api/complaints` — list (filtered by role)
- `GET  /api/complaints/:id` — detail + history
- `PATCH /api/complaints/:id/status` — update status (incharge/admin)
- `POST /api/complaints/classify` — AI preview classification

### Departments
- `GET  /api/departments`
- `POST /api/departments` (admin)
- `PUT  /api/departments/:id` (admin)
- `DELETE /api/departments/:id` (admin)

### Users
- `GET  /api/users/stats` — dashboard stats
- `GET  /api/users` (admin)
- `PUT  /api/users/:id` (admin)

### Admin
- `GET /api/admin/reports` — complaints grouped by dept/status/priority
- `GET /api/admin/overdue` — tickets open > 3 days

---

## Status Flow
```
New → Assigned → Accepted → In Progress → Resolved → Closed
```

## AI Classification
When a complaint is submitted, the description is sent to OpenAI to detect:
- **Department** (IT, HR, Electrical, Maintenance, Security, Housekeeping)
- **Category** (Network, Plumbing, HVAC, Payroll, etc.)
- **Priority** (Low, Medium, High, Critical)

If `OPENAI_API_KEY` is not set, a keyword rule-based fallback is used automatically.

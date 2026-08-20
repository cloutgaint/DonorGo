# DonorGO Full-Stack Project

A complete runnable blood-donation matching application inspired by the supplied DonorGO UI.

## Stack
- Frontend: React + Vite + React Router + Axios
- Backend: FastAPI + SQLAlchemy + SQLite
- Authentication: JWT
- Password hashing: bcrypt
- Database: SQLite for quick local setup

## Included Features
- Landing page
- Login
- Registration
- JWT authentication
- Donor profile
- Donor availability
- Blood requests
- Nearby/basic donor matching by blood group, city/state and availability
- Dashboard
- Subscription status
- Logout
- Protected API routes

## Run Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Swagger:
http://127.0.0.1:8000/docs

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:
http://127.0.0.1:5173

## Default API URL
Frontend uses:
http://127.0.0.1:8000

To change it, create `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

## Notes
This is a software demo/reference implementation. Blood compatibility, donor eligibility and emergency handling must be validated with medical and legal requirements before production deployment.

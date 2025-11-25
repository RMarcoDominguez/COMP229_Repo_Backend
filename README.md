# COMP229_Repo_Backend
COMP229 BACKEND NODEJS REPO

## Running the backend (development)

To run the backend locally:

```powershell
cd "c:\Users\marco\OneDrive\Escritorio\Semester 1\COMP229\COMP229_Repo_Backend"
npm install
node server.js
```

The server listens on port 3000 by default. The backend reads the MongoDB connection string from `config/MONGO_URI` (via `config/.env`). Create `config/.env` with:

```
MONGO_URI=your_mongo_connection_uri_here
```

I added a Postman collection in `postman/` and an npm script to run it with Newman (`npm run test:postman`). Do not commit `config/.env` to source control.

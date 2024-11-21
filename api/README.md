# Express API server

This is a simple express server that serves as a backend for the blocklet, utilizing SQLite as the database.

## APIs

- `GET /v1`: Health check endpoint with versioning.
- `GET /v1/profile`: Get profile information.
- `POST /v1/profile`: Create a profile.
- `PATCH /v1/profile`: Update profile information.

## Notes

The server implementation only support one profile for now as it is the requirement and it is easy to extend to support multiple profiles, after adding user system and authentication.

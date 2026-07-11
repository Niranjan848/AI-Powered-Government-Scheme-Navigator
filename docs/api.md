# API Documentation

Base URL: `/api`

## Authentication

### `POST /signup`

Creates a new user account.

Request body:
```json
{
  "email": "farmer@example.com",
  "password": "StrongPass123!",
  "role": "citizen"
}
```

### `POST /login`

Authenticates a user and returns a JWT token pair.

## Conversation

### `POST /chat`

Starts or continues an AI conversation.

Request body:
```json
{
  "message": "I am a small farmer in Maharashtra. What schemes can help me?",
  "conversation_id": "optional-id"
}
```

Response includes structured answer, recommended schemes, checklist items, and memory updates.

## Documents

### `POST /upload-pdf`

Uploads a government scheme PDF for parsing and indexing.

## Recommendations

### `GET /recommendations`

Returns personalized scheme recommendations for the active user.

## History

### `GET /history`

Returns recent conversations, recommendations, and actions.

## Profile

### `GET /profile`

Returns the authenticated user's profile, completion state, and readiness score.

## Bookmarks

### `POST /bookmark`

Saves a scheme to the user's bookmarks.

## Notifications

### `GET /notifications`

Returns system and admin notifications for the user.

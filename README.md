# Welcome to Auth with JWT!

JWT Auth is an authorization api using Json Web Tokens. For more information on JWT please see the following https://en.wikipedia.org/wiki/JSON_Web_Token. This will allow the user to enter their username and password once (within a specified period of time) and continue to use APIs that are restricted and not public to all users.

# Installation

`npm install`

# Running Node Server

`npm start`

# Game Plan for Creating Authentication API.

 1. Database - Create database to house user data and tokens/uuid.

    A. User DB - Userid, username, password, email etc. Use hash+salt to encrypt passwords in database, NO PLAIN TEXT!

    B. Token DB - UUID/Refresh Token, userid, creation date, expiration date.

2. Authentication - Create api to return JWT Access Token and Refresh Token for use in protected routes. (sent to client and saved in local storage and session storage)
   
   A. Public Routes - Create public route for login, token refresh, and other public routes (this may be turned into a separate api/microservice for authentication and token exchange only).

	    1. Login - provides access and refresh token upon successful authentication.
            
            a. Match sent username and password to db (mocked).
            
            b. If username and passwords match, continue, else send error message.

                (1) Generate Access token - it will have expiration of 15 min and payload with userid, username, firstName, lastName, etc.

                (2) Generate Refresh token/uuid - it will be a UUID that is stored in the token db with userid, created at, expires at, etc.

                (3) Send tokens to the client.
                
        2. Refresh - Create a refresh route where a refresh token can be sent to obtain a new access and refresh token. Refresh tokens will consist of a UUID and be stored in the database. This will be validated. Instead of a JWT refresh token, the UUID will allow for revocation of refresh token, blacklisting, and overall access control. Userid, username, and other info may be saved with the UUID/refresh token. The client can check the JWT to determine if it has expired or not. If the access token is expired, send refresh token to refresh endpoint to obtain new token and then proceed with previous request.

            a. Check UUID/refresh token in db.

            b. If it exists, continue with validation, else return error. Ask user to re-login.

	            (1) If expiration date has passed, return error and ask user to re-login.

                (2) If expiration date has not passed, token is valid, continue.

                    (a) Use userid to get user payload info from db (userid, username, firstName, lastName, etc)

                    (b) Remove/expire/invalidate refresh token in token db.

                    (c) Generate access token with payload.

                    (d) Generate refresh token and update token database.

                    (e) Send tokens to client.
                    
    B. Protected Routes - Add authentication layer to capture routes (for this example /user/ -> /user/:action et. al). If the JWT and headers are valid, continue with request, otherwise send error status.

    1. Create protected routes for updating password, profile information, email etc. A JWT will need to be sent in order to post to these routes.

    2. Add authentication layer to other apis with JWT secret to validate.
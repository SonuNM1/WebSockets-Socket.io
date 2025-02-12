
#### Protected Route logic 

- Extract the JWT token from cookies or Authorization header 

- Verify the token using jwt.verify()

- If valid, retrieve the user from the database 

- If the user exists, attach the user object to req.user and proceed 


#### Storing JWT Token in Authorization header Vs. Cookies 

 - Use Authorization Header (Bearer Token) if: (Authorization: Bearer <jwt_token>)

         You are building a REST API or GraphQL API.

         You want a stateless, scalable system.

         You are making mobile apps or single-page applications (SPAs) (React, Vue, Angular).


- Use Cookies (httpOnly) if:

         You are building a traditional web app (Express, Django, Laravel, etc.).

         Security (XSS protection) is a top priority.
        
         You want automatic authentication handling without manually adding tokens.


#### Cloudinary image upload (logic)


        Extract 'img' from req.body and userId from req.user 

        Check if 'img' is missing

        Upload 'img' to cloudinary (optionally resize it )

        Update the user's details in database 

        Return the updated user in the response 
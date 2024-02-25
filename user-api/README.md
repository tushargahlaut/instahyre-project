This API Service is done as the assignment for Instahyre - Full Stack Engineer Role by Tushar Gahlaut.

To run this service, please run the following commands:

npm install
npm run dev

Database: sqlite
Tech Stack: Node.js, Typescript, Express

End Points:

Method: POST
/api/v1/auth/login
/api/v1/auth/register

For Login, Register, Make sure to get a token from these endpoints and set it as "authorization":"Bearer token" to execute other APIs. Passwords are hashed using bcrypt

Method: GET
/api/v1/contact/contacts
Get Contacts for a logged in user

Method: POST
/api/v1/contact/contact
Add Contact for logged in user

Method: POST
/api/v1/spam
Add Spam mobile number

Method: GET
/api/v1/spam
Get List of spammers sorted by the times people have marked them as spam

Method: GET
/api/v1/search/listbyname?name="query"
Get list of all registered users and their contacts given that they match contain "query" in their names, as well as their spam count, the list is sorted in the manner as it was assigned in the assignment.

Method: GET
/api/v1/search/listbyphone?phone=1234
Get a particular user details if it exists as a registered user, otherwise get all the entries in the contacts where the phone number is matched with "1234"

Method: GET
/api/v1/search/details?id="abc"
This is used to view the details like email address, spam count etc for a registered user given that the registered user has added current user in their contact list.

If there are any questions, reach out to me on tushargahlaut74@gmail.com

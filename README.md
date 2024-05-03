# Moment 4 Backend-baserad webbutveckling
Anne-Lii Hansen
anha2324@student.miun.se

Detta repo innehåller kod till ett API för autentisering och sessionshantering med JWT. Det finns funktionalitet för att kunna registrera en användare som lagras i en MongoDB databas hostad på Atlas. Men den registrerade användaren är det möjligt att logga in på sidan och komma åt den skyddade routen Mina Sidor där det finns en knapp för att logga ut igen och användaren hamnar återigen på inloggningssidan. JSON Web Tokens (JWT) används för att hantera sessioner och förhindra obehörig åtkomst. 
APIet är publicerat på render.com. https://backend-m4-api.onrender.com/api 


## Installerade Paket
express
body-parser
dotenv
jsonwebtoken
Mongoose
bcrypt
router

## Installation
`git clone https://github.com/Anne-Lii/backend_m4_api.git` källkod från github
`npm install`

skapa en .env fil med följande variabler:

PORT=3000
DB_CONNECTION_STRING=your_database_connection_string
JWT_SECRET=your_jwt_secret

## Användning
**Skapa användarkonto**
`POST /api/register`
Skapa en ny användare genom en POST-förfrågan med användarnamn, lösenord och email

{
  "username": "nyttanvandarnamn",
  "password": "lösenord123",
  "email": "minmail@hej.se"
}

**Logga in**
`POST /api/login`
Logga in genom en POST-förfrågan med användarnamn och lösenord.

{
  "username": "nyttanvandarnamn",
  "password": "lösenord123"
}

**Autentisering med JWT**
Efter en lyckad inloggning kommer en JWT att skapat och skickas till klientsidan. Denna token används för att autentisera användaren vid varje anrop till en skyddad route.

**Skyddad route**
`GET /api/mypages`
Mina sidor (mypages.html) är en skyddad route med autentisering.
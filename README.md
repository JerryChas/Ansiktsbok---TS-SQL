# Användarhantering API ฅᨐฅ

Detta projekt är en Node.js-applikation som tillhandahåller ett RESTful API för att hantera användare. Du kan visa, skapa, uppdatera och radera användare i en databas. Applikationen är skriven i TypeScript och använder `express` som webbramverk och `pg` för att ansluta till en PostgreSQL-databas.

## Förkrav

För att köra detta projekt, se till att du har följande installerat på din maskin:

- [Node.js](https://nodejs.org/) (version 14 eller senare)
- [npm](https://www.npmjs.com/) (Node Package Manager, kommer med Node.js)
- [PostgreSQL](https://www.postgresql.org/) (version 12 eller senare)

1. **Kör applikationen:**

   Starta servern med följande kommando:

```bash
   npm run dev
```

   Servern kommer nu att köras på `http://localhost:3000`.

## API-endpoints

Här är en lista över alla API-endpoints som finns tillgängliga i detta projekt:

### 1. Hämta alla användare

- **URL:** `/api/users`
- **Metod:** `GET`
- **Beskrivning:** Hämtar alla användare från databasen.

### 2. Skapa en ny användare

- **URL:** `/api/users`
- **Metod:** `POST`
- **Beskrivning:** Skapar en ny användare med namn och e-post.
- **Body:**
  ```json
  {
    "name": "Ditt Namn",
    "email": "din.email@example.com"
  }
  ```

### 3. Uppdatera en användare

- **URL:** `/api/users/:id`
- **Metod:** `PUT`
- **Beskrivning:** Uppdaterar en användare baserat på användar-ID.
- **Parametrar:**
  - `id`: Användarens ID som ska uppdateras.
- **Body:**
  ```json
  {
    "name": "Nytt Namn",
    "email": "ny.email@example.com"
  }
  ```

### 4. Radera en användare

- **URL:** `/api/users/:id`
- **Metod:** `DELETE`
- **Beskrivning:** Raderar en användare baserat på användar-ID.
- **Parametrar:**
  - `id`: Användarens ID som ska raderas.

## Felhantering

- Om en felaktig begäran skickas till servern kommer ett lämpligt felmeddelande att returneras tillsammans med en statuskod som indikerar felet.

## Licens

Detta projekt är licensierat under MIT-licensen. Se filen [LICENSE](LICENSE) för mer information.

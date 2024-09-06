# GraphQL API för CRUD på Users och Posts

Detta är ett enkelt GraphQL API för att hantera CRUD-operationer (Create, Read, Update, Delete) för användare och inlägg (posts). API:et tillåter skapande, läsning, uppdatering och borttagning av användare och inlägg med PostgreSQL som databas.

## CRUD Funktioner 

### Queries (Läs data)

- **users** - Hämta alla användare.
- **user(id: Int)** - Hämta en specifik användare baserat på ID.
- **posts** - Hämta alla inlägg.
- **post(id: Int)** - Hämta ett specifikt inlägg baserat på ID.

### Mutations (Skapa, Uppdatera och Radera data)

#### Users

- **createUser(user: UserInput)** - Skapa en ny användare.

  - Exempel:
    ```graphql
    mutation {
      createUser(user: {name: "Alice", email: "alice@example.com"}) {
        id
        name
        email
      }
    }
    ```
- **updateUser(id: Int, edits: UserEditInput)** - Uppdatera en användare baserat på ID.

  - Exempel:
    ```graphql
    mutation {
      updateUser(id: 1, edits: {name: "Alice Updated", email: "alice.new@example.com"}) {
        id
        name
        email
      }
    }
    ```
- **deleteUser(id: Int)** - Radera en användare baserat på ID.

  - Exempel:
    ```graphql
    mutation {
      deleteUser(id: 1) {
        id
        name
      }
    }
    ```

#### Posts

- **createPost(post: PostInput)** - Skapa ett nytt inlägg.

  - Exempel:
    ```graphql
    mutation {
      createPost(post: {title: "New Post", description: "Description of the post", user_id: 1, nsfw: false}) {
        id
        title
        description
      }
    }
    ```
- **updatePost(id: Int, edits: PostEditInput)** - Uppdatera ett inlägg baserat på ID.

  - Exempel:
    ```graphql
    mutation {
      updatePost(id: 1, edits: {title: "Updated Post", description: "Updated description", nsfw: false}) {
        id
        title
        description
      }
    }
    ```
- **deletePost(id: Int)** - Radera ett inlägg baserat på ID.

  - Exempel:
    ```graphql
    mutation {
      deletePost(id: 1) {
        id
        title
      }
    }
    ```

## Databasstruktur

### Users

| Fält     | Typ          |
| --------- | ------------ |
| `id`    | Integer (PK) |
| `name`  | Text         |
| `email` | Text         |

### Posts

| Fält           | Typ          |
| --------------- | ------------ |
| `id`          | Integer (PK) |
| `title`       | Text         |
| `description` | Text         |
| `user_id`     | Integer (FK) |
| `nsfw`        | Boolean      |

## Installation och Användning

1. **Klona repot** och installera beroenden:

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   npm install
   ```
2. **Kör servern**:

   ```bash
   npm start
   ```

Du kan nu använda en GraphQL-klient som [Insomnia](https://insomnia.rest/) eller [Apollo Client](https://www.apollographql.com/docs/react/) för att göra CRUD-förfrågningar till ditt API.

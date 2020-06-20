## Checklist
### Server Requirements
1. MongoDB Models
2. TypeDefs (Schemas)
3. Resolvers (Controller)


## Client
### Dependencies
- react
- react router
- material ui 
- React player
- Jest 

### Routes
- Landing Page (check if already loggedin, local storage)
- Main App

## Server 
### Dependencies
- express
- bcrypt
- mongodb/mongoose
- dotenv
- apollo-server-express
- graphql

### Endpoints
- CHECK GRAPHQL STUFF

### Database

#### Models

##### Users Schema:
- User ID (auto)
- Username
- Password
- Email
- Playlists = [Playlist's ids]

##### Playlist Schema:
- Creator ID 
- Playlist Name
- Description
- Urls = [URLS to render on front end]

## Post MVP Features:
- Embeded Youtube Search feature or subwindow modal?

## Notes For Future Reference:
- Resolver = like a controller, handling the logic
    - Uses the models, user & playlist to work with the database
- TypeDefs (Schema) = like routes, defines the queries & mutations 
- Models = defining the data to be used 
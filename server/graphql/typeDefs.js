import { buildSchema } from "graphql";

module.exports = buildSchema(`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String
        playlists: [Playlist]
    }

    type Playlist {
        _id: ID!
        playlistName: String!
        description: String
        urls: [String]
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type RootQuery {
        login(username: String!, password: String!): AuthData!
        users: [User]
        playlists: [Playlist]
    }

    input UserInputData {
        username: String!
        password: String!
        email: String!
    }

    input PlaylistInputData {
        playlistName: String!
        description: String
    }

    type RootMutation {
        registerUser(userInput: UserInputData): User
        createPlaylist(playlistInput: PlaylistInputData): Playlist
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

// export const typeDefs = gql`
//   type User {
//     _id: ID!
//     username: String!
//     email: String!
//     password: String
//     playlists: [Playlist]
//   }

//   type Playlist {
//     _id: ID!
//     playlistName: String!
//     description: String!
//     urls: [String]
//   }

//   type RootQuery {
//     test: String!
//     users: [User]
//     playlists: [Playlist]
//   }

//   input UserInputData {
//     username: String!
//     password: String!
//     email: String!
//   }

//   type RootMutation {
//     registerUser(userInput: UserInputData): User
//   }

//   schema {
//     query: RootQuery
//     mutation: RootMutation
//   }
// `;

// type User {
//     _id: ID!
//     username: String!
//     email: String!
//     password: String
//     playlists: [Playlist]
//   }

//   type Playlist {
//     _id: ID!
//     playlistName: String!
//     description: String!
//     urls: [String]
//   }

//   type Query {
//     users: [User]
//     playlists: [Playlist]
//   }

//   input UserInputData {
//     username: String!
//     password: String!
//     email: String!
//   }

//   type Mutation {
//     registerUser(userInput: UserInputData): User
//   }

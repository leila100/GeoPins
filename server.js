require("dotenv").config();

const cors = require("cors");
const express = require("express");
// const { ApolloServer } = require("apollo-server");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { findOrCreateUser } = require("./controllers/userController");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => console.error(err));

// const corsOptions = {
//   origin: "https://geopins-leila.netlify.com",
//   credentials: true
// };

const app = express();
app.use(cors());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  // introspection: true,
  // playground: true,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        // find or create user
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (err) {
      console.error(`Unable to authenticate user with token ${authToken}`);
    }
    return { currentUser };
  }
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log("Apollo Server on http://localhost:4000/graphql");
});
// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
//   console.log(`Server is listening on ${url}`);
// });

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const port = 3001;



const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// app.use(cors()); // Enable CORS for all origins

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  // db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  // })
  };
  

// Start of new Knowledgebase Code
const fs = require('fs');


app.get('/search', (req, res) => {

  const query = req.query.q;
  // console.log(__dirname)
  // let location = "C:\ExampleKnowledgebase"
  let location = "C:\\ExampleKnowledgebase"
  // const query = "Test1.txt"

  const results = searchFiles(query, location);

  res.send(results);
});

// function searchFiles( searchText, dir) {
//   // console.log(`Search: ${searchText} Dir: ${dir}`)
//   const results = [];
//   fs.readdir(dir, (err, files) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     files.forEach((file) => {
//       const filePath = path.join(dir, file);

//       fs.stat(filePath, (err, stat) => {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         if (stat.isDirectory()) {
//           searchFiles(filePath, searchText);
//         } else {
//           fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//               console.error(err);
//               return;
//             }

//             if (data.indexOf(searchText) !== -1) {
//               results = `Found '${searchText}' in file '${filePath}'`
//               return results
//               // console.log(`Found '${searchText}' in file '${filePath}'`);

//             }
//           });
//         }
//       });
//     });
//   });
// }


//Text found in file name WORKS

function searchFiles(query, dir) {
  const files = fs.readdirSync(dir);
  const results = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results.push(...searchFiles(query, filePath));
    } else if (file.includes(query)) {
      results.push(filePath);
    }
  }

  return results;
}

// function searchFiles(dir, searchText, results) {
//   results = results || [];

//   fs.readdir(dir, (err, files) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     files.forEach((file) => {
//       const filePath = path.join(dir, file);

//       fs.stat(filePath, (err, stat) => {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         if (stat.isDirectory()) {
//           searchFiles(filePath, searchText, results);
//         } else {
//           fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//               console.error(err);
//               return;
//             }

//             if (data.indexOf(searchText) !== -1) {
//               console.log(`Found '${searchText}' in file '${filePath}'`);
//               results.push(filePath);
//             }
//           });
//         }
//       });
//     });
//   });
// }


// function searchFiles(query, location) {
//   const results = [];
// console.log(`Test1 ${location}`)
//   fs.readdirSync(query).forEach((file) => {
//     const filePath = path.join(query, file);

//     if (fs.statSync(filePath).isDirectory()) {
//       results.push(...searchFiles(filePath, location));
//     } else {
//       const fileContent = fs.readFileSync(filePath, 'utf8');
//       if (fileContent.includes(location)) {
//         results.push(filePath);
//       }
//     }
//   });

//   return results;
// }



// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
 

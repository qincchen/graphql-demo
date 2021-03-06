import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import { BookService } from './services';

var schema = buildSchema(`
  type Query {
    hello: String,
    book(id: Int!): Book,
    bookReturnError(id: Int!): Book,
    bookPromise(id: Int): Book,
    author(id: Int!): Author
  }
  
  type Mutation {
    createBook(id: ID!, title: String!, authorName: String): Book
  }
  
  # this is a comment for Book objet
  type Book {
    # comment for title of a book
    title: String@deprecated,
    id: Int,
    author: Author
  }
  
  # this is a comment for Author objet
  type Author {
    id: Int,
    name: String        
  }
`);

var root = {
  hello: () => 'Hello world!',
  book: ({ id }) => BookService.getBook(id),
  bookReturnError: ({ id }) => BookService.getBookReturnError(id),
  bookPromise: ({ id }) => BookService.getBookPromise(id),
  createBook: input => BookService.createBook(input),
  author: ({ id }) => BookService.getAuthor(id)
};

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.get('/book/:id', (req, res) => {
  const {
    id
  } = req.params;

  res.json(BookService.getBook(id));
});

app.get('/author/:id', (req, res) => {
  const {
    id
  } = req.params;

  res.json(BookService.getAuthor(id));
});

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

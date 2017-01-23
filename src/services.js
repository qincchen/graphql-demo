const books = {
  5: {
    title: 'lord of the ring',
    id: 5,
    author: {
      name: 'tolkien'
    }
  }
};

export const BookService = {

  getBook(id) {
    if (!books[id]) throw `book with id ${id} does not exist`;

    return books[id];
  },

  getBookPromise(id) {
    const self = this;

    // return Promise.resolve(self.getBook(id));

    // TODO: figure out why setTimeout will crash the app with error
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          try {
            resolve(self.getBook(id))
          } catch (err) {
            // reject(err);
          } finally {
            reject('something bad happend');
          }
        },
        500
      );
    });
  },

  getBookReturnError(id) {
    if (!books[id]) return `book with id ${id} does not exist`;

    return books[id];
  },

  createBook({
    id,
    title,
    authorName
  }) {
    console.log(
      id,
      title,
      authorName
    );
    const newBook = {
      id,
      title,
      author: {
        name: authorName
      }
    };

    if (books[id]) throw `book with id ${id} is already created`;

    books[id] = newBook;

    return newBook;
  }


};


let authors = [
  { name: "Tolkien Martin", born: 1952 },
  { name: "G.R.R Martin", born: 1963 },
];

let books = [
  { title: "LOTR", author: "Tolkien Martin", published: 2008 },
  { title: "GOT", author: "G.R.R Martin", published: 1999 },
];

export const resolvers = {
  Query: {
    allAuthors: () => {
      return authors.map((author) => ({
        ...author,
        bookCount: books.filter((book) => book.author === author.name).length,
      }));
    },
    allBooks: () => books,
  },
  Mutation: {
    addBook: (parent, args) => {
      console.log("Received args for addBook:", args);
      const { title, author, published, genres = [] } = args;

      let existingAuthor = authors.find((a) => a.name === author);

      if (!existingAuthor) {
        existingAuthor = { name: author, born: null };
        authors.push(existingAuthor);
      }

      const newBook = {
        title,
        author,
        published: parseInt(published, 10),
        genres: genres.length > 0 ? genres : [],
      };
      books.push(newBook);

      return newBook;
    },
    editAuthor: (parent, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) return null;

      author.born = args.setBornTo;
      return author;
    },
  },
};

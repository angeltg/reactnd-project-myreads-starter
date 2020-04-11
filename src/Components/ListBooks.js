import React from "react";
import Book from "./Book";

const ListBooks = props => {
  const { books, handleChangeBookToShelf } = props;
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.length > 0 &&
          books.map(book => (
            <Book
              key={book.id}
              book={book}
              handleChangeBookToShelf={handleChangeBookToShelf}
            />
          ))}
      </ol>
    </div>
  );
};

export default ListBooks;

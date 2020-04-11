import React from "react";
import { Link } from "react-router-dom";

import Shelf from "./Shelf";

const MainPage = props => {
  const filterBooksByShelf = (shelfCode, myBooks) => {
    const booksByShelf = myBooks.filter(book => {
      return book.shelf === shelfCode;
    });
    return booksByShelf;
  };

  const { shelves, handleChangeBookToShelf, myBooks } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(shelf => {
            return (
              <Shelf
                key={shelf.code}
                shelfTitle={shelf.title}
                shelfCode={shelf.code}
                books={filterBooksByShelf(shelf.code, myBooks)}
                handleChangeBookToShelf={handleChangeBookToShelf}
              />
            );
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default MainPage;

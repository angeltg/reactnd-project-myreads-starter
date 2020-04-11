import React from "react";

import SelectShelf from "./SelectShelf";
import Author from "./Author";

const Book = props => {
  const bookImage = imageLinks => {
    const bookImageThumbnail = imageLinks && imageLinks.smallThumbnail;
    return "url(" + bookImageThumbnail + ")";
  };
  const { book, handleChangeBookToShelf } = props;
  const handleChangeShelf = e => {
    handleChangeBookToShelf(book, e.target.value);
  };
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: bookImage(book.imageLinks)
            }}
          />
          <div className="book-shelf-changer">
            <SelectShelf
              bookShelf={book.shelf}
              handleChangeShelf={handleChangeShelf}
            />
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors &&
            book.authors.length > 0 &&
            book.authors.map(author => (
              <Author key={author + book.id} author={author} />
            ))}
        </div>
      </div>
    </li>
  );
};

export default Book;

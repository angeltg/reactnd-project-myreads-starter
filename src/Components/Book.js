import React, { Component } from "react";

import SelectShelf from "./SelectShelf";

class Book extends Component {
  bookImage = (imageLinks) => {
    const bookImageThumbnail = imageLinks && imageLinks.smallThumbnail;
    return "url(" + bookImageThumbnail + ")";
  };
  listAuthors = (authors) => {
    let displayAuthors = "";
    if (authors) {
      displayAuthors = authors.map((author) => author);
    }
    return displayAuthors;
  };

  render() {
    const { book, handleChangeBookToShelf } = this.props;
    const handleChangeShelf = (e) => {
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
                backgroundImage: this.bookImage(book.imageLinks),
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
          <div className="book-authors">{this.listAuthors(book.authors)}</div>
        </div>
      </li>
    );
  }
}

export default Book;

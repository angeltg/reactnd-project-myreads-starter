import React, { Component } from "react";
import { Link } from "react-router-dom";
import { debounce } from "debounce";

import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  state = {
    booksForSearch: []
  };

  getSearchBooks = (query, myBooks) => {
    query &&
      BooksAPI.search(query.trim()).then(booksFound => {
        booksFound &&
          booksFound.length > 0 &&
          myBooks.map(book =>
            booksFound.map(bookFound => {
              if (bookFound.id === book.id) {
                bookFound.shelf = book.shelf;
                return bookFound;
              }
              return bookFound;
            })
          );
        this.setState({ booksForSearch: booksFound });
      });
    this.setState({ booksForSearch: [] });
  };

  setSearchTerm = debounce((query, myBooks) => {
    this.getSearchBooks(query, myBooks);
  }, 500);

  render() {
    const { handleChangeBookToShelf, myBooks } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => {
                this.setSearchTerm(event.target.value, myBooks);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksForSearch &&
              this.state.booksForSearch.length > 0 &&
              this.state.booksForSearch.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  handleChangeBookToShelf={handleChangeBookToShelf}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

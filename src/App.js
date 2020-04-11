import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import MainPage from "./Components/MainPage";
import SearchBooks from "./Components/SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  getMyBooks = () => {
    BooksAPI.getAll().then(books => {
      books &&
        this.setState({
          books: books
        });
    });
  };

  existBookInMyShelves = bookForSearch => {
    const bookState = this.state.books;
    const bookInMyShelves = bookState.filter(book => {
      return book.id === bookForSearch.id;
    });
    return bookInMyShelves && bookInMyShelves.length > 0;
  };

  changeBookToShelf = (bookForChange, shelfTo) => {
    return this.state.books.map(book => {
      if (book.id === bookForChange.id) {
        book.shelf = shelfTo;
        return book;
      }
      return book;
    });
  };

  addBookToMyLibrary = (bookForChange, shelfTo) => {
    bookForChange.shelf = shelfTo;
    return [...this.state.books, bookForChange];
  };

  handleChangeBookToShelf = (bookForChange, shelfTo) => {
    const booksUdated = this.existBookInMyShelves(bookForChange)
      ? this.changeBookToShelf(bookForChange, shelfTo)
      : this.addBookToMyLibrary(bookForChange, shelfTo);
    this.setState({ books: booksUdated });
    BooksAPI.update(bookForChange, shelfTo);
  };

  componentDidMount() {
    this.getMyBooks();
  }

  render() {
    const shelves = [
      {
        title: "Currently Reading",
        code: "currentlyReading"
      },
      {
        title: "Want to Read",
        code: "wantToRead"
      },
      {
        title: "Read",
        code: "read"
      }
    ];

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage
              shelves={shelves}
              handleChangeBookToShelf={this.handleChangeBookToShelf}
              myBooks={this.state.books}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBooks
              handleChangeBookToShelf={this.handleChangeBookToShelf}
              myBooks={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

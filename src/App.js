import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import MainPage from "./Components/MainPage";
import SearchBooks from "./Components/SearchBooks";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    booksForSearch: []
  };

  //Shearch Page
  getSearchBooks = query => {
    console.log(query.trim());
    query &&
      BooksAPI.search(query.trim()).then(booksFound => {
        booksFound &&
          booksFound.length > 0 &&
          this.state.books.map(book =>
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

  handleChangeShowSearchPage = () => {
    this.setState({ showSearchPage: false });
    this.getMyBooks();
  };

  //Main page
  getMyBooks = () => {
    BooksAPI.getAll().then(books => {
      books &&
        this.setState({
          books: books
        });
    });
  };

  filterBooksByShelf = shelfCode => {
    const stateBooks = this.state.books;
    const booksByShelf = stateBooks.filter(book => {
      return book.shelf === shelfCode;
    });
    return booksByShelf;
  };

  existBookInMyShelves = bookForSearch => {
    const bookState = this.state.books;
    const bookInMyShelves = bookState.filter(book => {
      return book.id === bookForSearch.id;
    });
    return bookInMyShelves && bookInMyShelves.length > 0 ? true : false;
  };

  changeBookToShelf = (bookForChange, shelfTo, listBooks) => {
    return listBooks.map(book => {
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
      ? this.changeBookToShelf(bookForChange, shelfTo, this.state.books)
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
              filterBooksByShelf={this.filterBooksByShelf}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBooks
              handleChangeShowSearchPage={this.handleChangeShowSearchPage}
              handleChangeBookToShelf={this.handleChangeBookToShelf}
              updateQuery={this.getSearchBooks}
              searchBooksResult={this.state.booksForSearch}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

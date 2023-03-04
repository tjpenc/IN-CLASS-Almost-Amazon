import {
  getAuthors, getSingleAuthor, createAuthor, updateAuthor
} from '../api/authorData';
import {
  getBooks, deleteBook, getSingleBook, createBook, updateBook
} from '../api/bookData';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import { getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship } from '../api/mergedData';
import viewBook from '../pages/viewBook';
import viewAuthor from '../pages/viewAuthor';
import { getGoogleBooks, addGoogleBookToLibrary } from '../api/googleBooksAPI';
import renderToDOM from '../utils/renderToDom';

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(() => {
          getBooks(user.uid).then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      console.warn('ADD BOOK');
      addBookForm(user);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      console.warn('VIEW BOOK', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');
      getBookDetails(firebaseKey).then(viewBook);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');

        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors(user.uid).then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleAuthor(firebaseKey).then((authObj) => addAuthorForm(authObj));
    }

    if (e.target.id.includes('view-author-btn')) {
      console.warn('VIEW AUTHOR');
      const [, firebaseKey] = e.target.id.split('--');
      getAuthorDetails(firebaseKey, user).then(viewAuthor);
    }

    if (e.target.id.includes('google-search-button')) {
      const searchValue = document.querySelector('#google-search-value').value;
      getGoogleBooks(searchValue).then((bookTitles) => {
        renderToDOM('#store', bookTitles);
      });
    }

    if (e.target.id.includes('add-google-book')) {
      const [, googleId] = e.target.id.split('--');
      let authorId = '';

      addGoogleBookToLibrary(googleId, user).then((payloadObj) => {
        createAuthor(payloadObj.authorPayload).then(({ name }) => {
          const patchPayload = { firebaseKey: name };

          updateAuthor(patchPayload).then(() => {
            authorId = name;
          });
        });
        createBook(payloadObj.bookPayload).then(({ name }) => {
          const patchPayload = {
            firebaseKey: name,
            author_id: authorId
          };

          updateBook(patchPayload).then(() => {
            getBooks(user.uid).then(showBooks);
          });
        });
      });
    }
  });
};

export default domEvents;

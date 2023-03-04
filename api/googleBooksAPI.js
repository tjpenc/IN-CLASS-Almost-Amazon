const apiKey = 'AIzaSyD7yPVR_bCKcKmOziKruYAc3aStTBeqe3w';
const url = 'https://www.googleapis.com/books/v1/volumes?q=';

const getGoogleBooks = (searchValue) => new Promise((resolve, reject) => {
  fetch(`${url}"${searchValue}"&key=${apiKey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let domString = '';
      data.items.forEach((book) => {
        domString += `
        <div class="card">
          <img class="card-img-top" src=${book.volumeInfo.imageLinks.thumbnail} alt=${book.volumeInfo.title} style="height: 400px;">
          <div class="card-body" style="height: 180px;">
            <h5 class="card-title">${book.volumeInfo.title}</h5>
              <p class="card-text bold">${typeof book.saleInfo.saleability === 'number' ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${book.saleInfo.saleability}` : 'No Price Available'}</p>
              <hr>
              <i class="btn btn-success fas fa-eye" id="add-google-book--${book.id}">Add Book to Library</i>
          </div>
        </div>`;
        console.warn(book);
      });
      resolve(domString);
    })
    .catch(reject);
});

// Fetch Request for specific book
// Grab book title, image, author (first author if multiple)
// render book into library like other books, add to firebase with firebase key
// Add author to firebase with firebase key

const addGoogleBookToLibrary = (googleBookId, user) => new Promise((resolve, reject) => {
  fetch(`${url}"${googleBookId}"&key=${apiKey}`, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const names = data.items[0].volumeInfo.authors[0].split(' ');
      const firstName = names[0];
      const lastName = names[1];
      const author = {
        first_name: firstName,
        last_name: lastName,
        email: 'Not Provided',
        favorite: false,
        uid: user.uid,
      };
      const book = {
        title: data.items[0].volumeInfo.title,
        description: data.items[0].volumeInfo.description,
        image: data.items[0].volumeInfo.imageLinks.thumbnail,
        price: 'Not Provided',
        sale: false,
        uid: user.uid,
      };
      const payloadObj = {
        authorPayload: author,
        bookPayload: book
      };
      resolve(payloadObj);
    })
    .catch(reject);
});

export { getGoogleBooks, addGoogleBookToLibrary };

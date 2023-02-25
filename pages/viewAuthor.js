import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();
  let domString = '';
  domString += `
  <div class="text-white ms-5 details">
  <h5>${obj.booksObject.title} by ${obj.authorObject.first_name} ${obj.authorObject.last_name} ${obj.authorObject.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
  Author Email: <a href="mailto:${obj.authorObject.email}">${obj.authorObject.email}</a>
  <p>${obj.description || ''}</p>
  <hr>
  <p>${obj.sale ? `<span class="badge bg-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> 
    $${obj.price}` : `$${obj.price}`}</p>      
   </div>
 </div>`;

  renderToDOM('#view', domString);
};

export default viewAuthor;

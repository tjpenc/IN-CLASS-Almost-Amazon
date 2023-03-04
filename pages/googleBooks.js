import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const showGoogleForm = () => {
  clearDom();

  const domString = `
  <div>
    <form id="google-form">
      <label for="google-search-value">Enter your search</label>
      <input type="text" id="google-search-value"></input> 
      <button type="reset" for="google-form" id="google-search-button">Search!</button>
    </form>
  </div>
  `;

  renderToDOM('#form-container', domString);
};

export default showGoogleForm;

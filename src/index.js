import { GluonElement, html } from '../node_modules/gluonjs/gluon.js';
import './pages/accounts.js';

class AppElement extends GluonElement {
  get template() {
    return html`
      <accounts-page></accounts-page>
    `;
  }
}

customElements.define(AppElement.is, AppElement);

import { GluonElement, html } from '../node_modules/gluonjs/gluon.js';
import './pages/accounts.js';
import './pages/authenticate.js';

import '../components/appNavigation.js';

class AppElement extends GluonElement {
  get template() {
    return html`
      <app-navigation>
        <authenticate-page></authenticate-page>
        <accounts-page class="main"></accounts-page>
      </app-navigation>
    `;
  }
}

customElements.define(AppElement.is, AppElement);

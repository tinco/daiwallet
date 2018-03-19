import { GluonElement, html } from '../../node_modules/gluonjs/gluon.js';
import { navigateEvent } from '../components/appNavigation.js';

class AuthenticatePage extends GluonElement {
  get template() {
    return html`
      <style>
      </style>
      <h1>Log in</h1>
      <button id="authenticate">Ok</button>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.authenticate.addEventListener('click', e => this.authenticateClicked(e));
  }

  authenticateClicked() {
    this.dispatchEvent(navigateEvent(".main")); //TODO maybe navigate to something else?
  }

}

customElements.define(AuthenticatePage.is, AuthenticatePage);

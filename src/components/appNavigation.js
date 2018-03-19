import { GluonElement, html } from '../../node_modules/gluonjs/gluon.js';

class AppNavigation extends GluonElement {
  get template() {
    return html`
      <style>
        ::slotted(*) {
          display: none;
        }

        ::slotted(.active) {
          display: block;
        }
      </style>
      <slot></slot>
    `;
  }


  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("navigate", e => this.onNavigate(e));
    this.navigate(".main");
  }

  onNavigate(e) {
    this.navigate(e.navigationTarget);
  }

  navigate(selector) {
    this.querySelectorAll("*").forEach(e => e.classList.remove("active"));
    const navigatee = this.querySelector(selector);
    if (navigatee) {
      navigatee.classList.add("active");
    } else {
      console.log(`Tried to navigate to: ${selector}, but it does not exist.`, this);
    }
  }
}

export const navigateEvent = target => new Event("navigate", navigationTarget: target);

customElements.define(AppNavigation.is, AppNavigation);

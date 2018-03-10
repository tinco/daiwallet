import { GluonElement, html } from '../../node_modules/gluonjs/gluon.js';
import { repeat } from '../../node_modules/lit-html/lib/repeat.js';

import * as mnemonic from '../lib/mnemonic/mnemonic.js';

class MnemonicInput extends GluonElement {
  constructor() {
    super();
    this.options = [];
    this.mnemonic = [];
  }
  get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
        .option {
          padding: 3px 5px;
          background: lightblue;
          border-radius: 5px;
        }

        #mnemonic {
          min-height: 40px;
        }

        #mnemonic span {
          padding: 3px 5px;
          background: lightblue;
          border-radius: 5px;
        }
      </style>
      <div id="mnemonic">
        ${repeat(
          this.mnemonic,
          option => html`
            <span>${option}</span>
          `
        )}
      </div>
      <input autocomplete="off" type="text" id="input"></input>
      <div id="options">
        ${repeat(
          this.options,
          option => option,
          option => html`
            <button class="option">${option}</button>
          `
        )}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.input.addEventListener('input', () => this.inputChanged());
    this.$.input.addEventListener('keydown', e => this.keydown(e));
    this.$.options.addEventListener('click', e => this.optionClicked(e));
  }

  inputChanged() {
    this.$.input.value = this.$.input.value.toLowerCase();
    let options = [];
    const input = this.$.input.value;
    if (input !== '') {
      const matches = mnemonic.match(input);
      if (matches.length < 7) {
        options = matches;
      }
      if (matches.length === 1) {
        this.mnemonic.push(matches.pop());
        this.$.input.value = '';
      }
    }
    this.options = options;
    this.render();
  }

  optionClicked(e) {
    this.mnemonic.push(e.target.innerText);
    this.$.input.value = '';
    this.options = [];
    this.$.input.focus();
    this.render();
  }

  keydown(e) {
    // Remove the last selection if backspace is pressed in an empty input box
    if (e.key === 'Backspace' && this.$.input.value === '') {
      this.mnemonic.pop();
      this.render();
    }
    // Add the key pressed is Enter and the input is a complete option
    if (e.key === 'Enter' && this.$.input.value === this.options[0]) {
      this.mnemonic.push(this.$.input.value);
      this.$.input.value = '';
      this.render();
    }
  }
}

customElements.define(MnemonicInput.is, MnemonicInput);

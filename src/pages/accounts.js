import { GluonElement, html } from '../../node_modules/gluonjs/gluon.js';
import { repeat } from '../../node_modules/lit-html/lib/repeat.js';

import '../components/blockie.js';
import '../components/mnemonicInput.js';

import * as accounts from '../lib/accounts.js';
import * as blockies from '../lib/blockies.js';

accounts.add('0x5B9880B7DAAC20Ae719B2c7D8D0228a435F2DA5f');
accounts.add('0x2a65Aca4D5fC5B5C859090a6c34d164135398226');
accounts.own('0x2a65Aca4D5fC5B5C859090a6c34d164135398226', 'supersecretprivkey');

class AccountsPage extends GluonElement {
  get template() {
    return html`
      <style>
        .address {
          font-family: monospace;
        }
      </style>
      <h1>Accounts</h1>
      <div>
        ${repeat(
          accounts.list(),
          account => account.address,
          account => html`
            <div>
              <ethereum-blockie address=${account.address}></ethereum-blockie> <span class="address">${account.address}${account.owned ? ' 🔓' : ''}</span> 
            </div>
          `
        )}
      </div>
      <mnemonic-input></mnemonic-input>
    `;
  }
}

customElements.define(AccountsPage.is, AccountsPage);

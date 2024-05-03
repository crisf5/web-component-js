class AlertMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          font-family: sans-serif;
        }

        .alert-modal {
          margin-top: 20px;
          padding: 20px;
          box-shadow: -2px 6px 32px -5px rgba(0,0,0,0.75);
          border-radius: 5px; 
          text-align: center;
        }

        .message-container {
          margin-bottom: 10px;
        }

        .message {
          margin: 0;
        }

        .alert-modal button {
          display: inline-block;
          margin-top: 10px;
          padding: 5px 10px;
          background-color: #dadddd;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }
      </style>

      <div class="alert-modal" hidden>
        <div class="message-container">
          <p class="message"></p>
        </div>
        <button id="button">Cerrar</button>
      </div>
    `;

    this.shadowRoot.querySelector("#button").addEventListener("click", () => this.hideModal());

    this.messageElement = this.shadowRoot.querySelector(".message");
  }

  static get observedAttributes() {
    return ["type", "message"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "message") {
      this.messageElement.innerHTML = newValue;
    }

    if (name === "type") {
      this.shadowRoot.querySelector(".alert-modal").style.backgroundColor = this.getBackgroundColor(newValue);
    }

    if (this.messageElement.innerHTML !== "") {
      this.showModal();
    }
  }

  getBackgroundColor(type) {
    switch (type) {
      case "success":
        return "#c5ecaa";
      case "warning":
        return "#dca25b";
      case "error":
        return "#e48e85";
      case "info":
        return "#c4e4f3";
      default:
        return "#efefef";
    }
  }

  showModal() {
    this.shadowRoot.querySelector(".alert-modal").hidden = false;
  }

  hideModal() {
    this.shadowRoot.querySelector(".alert-modal").hidden = true;
  }
}

customElements.define("alert-message", AlertMessage);

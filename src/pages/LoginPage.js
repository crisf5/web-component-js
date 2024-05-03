class LoginPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = /*html*/ `
            <style>
              :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 100vh;
              }
            </style>
            <user-login></user-login>
            <alert-message type="" message=""></alert-message>
        `;
    
    this.alertMessage = this.shadowRoot.querySelector("alert-message");
    
    this.addEventListener("login-result", this.handleLogin.bind(this));
  }

  handleLogin(event){
    const {type, message} = event.detail;

    this.alertMessage.setAttribute('type', type);
    this.alertMessage.setAttribute('message', message)
  }

}

customElements.define("login-page", LoginPage);

class UserLogin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
        <form id="loginForm">
            <div>
                <label for="username">Usuario:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Iniciar Sesion</button>
        </form>
        <style>
          :host{
            font-family: sans-serif;
            font-size: 14px;
            color: black;
          }

          #loginForm {
            display: flex;
            flex-direction: column; 
            align-items: center; 
            margin: 50px auto; 
            width: 300px; 
            border: 1px solid #ddd; 
            border-radius: 5px; 
            padding: 20px;
          }

          #loginForm label {
            display: block;
            margin-bottom: 5px;
          }

          #loginForm input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
            margin-bottom: 15px;
          }

          #loginForm button {
            background-color: #4bc71b;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        </style>
        `;

    this.shadowRoot
      .getElementById("loginForm")
      .addEventListener("submit", this.submitForm.bind(this));
  }

  submitForm(event) {
    event.preventDefault();
  
    const usernameInput = this.shadowRoot.getElementById("username");
    const passwordInput = this.shadowRoot.getElementById("password");
  
    let username = usernameInput.value;
    let password = passwordInput.value;
  
    let type;
    let message;
    if (username === "cristian" && password === "1234") {
      type = "success";
      message = "Login correcto!.";
    } else {
      type = "error";
      message = "Usuario o Password incorrecto, intente nuevamente.";
    }
  
    this.dispatchEvent(
      new CustomEvent("login-result", {
        detail: { type, message },
        composed: true,
      })
    );
  
    usernameInput.value = "";
    passwordInput.value = "";
  }
}

customElements.define("user-login", UserLogin);

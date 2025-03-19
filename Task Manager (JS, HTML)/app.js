class TaskManager {
  constructor() {
    this.baseUrl = "http://localhost:3000";
    this.app = document.getElementById("app");
    this.token = localStorage.getItem("token");
    this.setupEventListeners();
    this.updateLoginStatus();
    this.showWelcome();
  }

  setupEventListeners() {
    document.querySelector("nav").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const page = e.target.dataset.page;
        if (page) this.navigate(page);
      }
    });
  }

  showWelcome() {
    this.app.innerHTML = `
            <div class="welcome">
                <h1>Task Manager Pro</h1>
                <p>Hier kannst du deine Aufgaben verwalten</p>
                <br>
                <div class="welcome-buttons">
                    ${
                      !this.token
                        ? `
                        <button onclick="taskManager.showLoginForm()">Login</button>
                        <button onclick="taskManager.showRegisterForm()">Register</button>
                    `
                        : `
                        <button onclick="taskManager.loadTasks()">Aufgaben anzeigen</button>
                    `
                    }
                </div>
            </div>
        `;
  }

  updateLoginStatus() {
    const statusElement = document.getElementById("loginStatus");
    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");

    if (this.token) {
      statusElement.textContent = `${localStorage.getItem(
        "username"
      )} (Eingeloggt)`;
      loginLink.textContent = "Logout";
      registerLink.style.display = "none";
    } else {
      statusElement.textContent = "";
      loginLink.textContent = "Login";
      registerLink.style.display = "inline";
    }
  }

  navigate(page) {
    switch (page) {
      case "tasks":
        if (!this.token) {
          this.showError("Bitte erst einloggen!");
          this.showLoginForm();
        } else {
          this.loadTasks();
        }
        break;
      case "create":
        if (!this.token) {
          this.showError("Zum Erstellen musst du eingeloggt sein!");
          this.showLoginForm();
        } else {
          this.showCreateForm();
        }
        break;
      case "login":
        if (this.token) {
          this.logout();
        } else {
          this.showLoginForm();
        }
        break;
      case "register":
        this.showRegisterForm();
        break;
      case "home":
        this.showWelcome();
        break;
    }
  }

  async loadTasks() {
    try {
      const response = await fetch(`${this.baseUrl}/data/tasks`);
      if (!response.ok) throw new Error("Laden fehlgeschlagen.");
      const allTasks = await response.json();
      const userTasks = allTasks.filter(
        (task) => task.userId === localStorage.getItem("username")
      );
      this.displayTasks(userTasks);
    } catch (error) {
      this.showError("Keine Aufgaben gefunden.");
      this.displayTasks([]);
    }
  }

  displayTasks(tasks) {
    this.app.innerHTML = `
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold text-gray-900">Deine Aufgaben</h1>
                    <button onclick="taskManager.showCreateForm()" class="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m-7-7h14" />
                        </svg>
                        Neue Aufgabe
                    </button>
                </div>
    
                <div class="grid gap-4">
                    ${
                      tasks.length === 0
                        ? '<p class="text-gray-500 text-center py-8">Keine Aufgaben vorhanden.</p>'
                        : tasks
                            .map(
                              (task) => `
                            <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow min-h-[120px] relative">
                                <div class="pr-20"> <!-- Platz für Buttons reservieren -->
                                    <h3 class="font-semibold text-lg text-gray-900 mb-2">${task.title}</h3>
                                    <p class="text-gray-600 mb-3">${task.description}</p>
                                    <div class="flex items-center gap-2 text-gray-500">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span class="text-sm">Fällig: ${task.dueDate}</span>
                                    </div>
                                </div>
                                <div class="absolute right-4 top-4 flex flex-col gap-2">
                                    <button onclick="taskManager.editTask('${task.id}')" class="p-2 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button onclick="taskManager.deleteTask('${task.id}')" class="p-2 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        `
                            )
                            .join("")
                    }
                </div>
            </div>
        `;
  }

  showCreateForm(taskId = null, taskData = null) {
    this.app.innerHTML = `
            <div class="form-container">
                <h2>${taskId ? "Aufgabe bearbeiten" : "Neue Aufgabe"}</h2>
                <form id="taskForm">
                    <div class="form-group">
                        <label>Titel der Aufgabe:</label>
                        <input type="text" id="title" value="${
                          taskData ? taskData.title : ""
                        }" 
                               placeholder="Titel" required>
                    </div>
                    <div class="form-group">
                        <label>Beschreibung:</label>
                        <textarea id="description" placeholder="Beschreibung" required>${
                          taskData ? taskData.description : ""
                        }</textarea>
                        </textarea>
                    </div>
                    <div class="form-group">
                        <label>Fälligkeitsdatum:</label>
                        <input type="date" id="dueDate" value="${
                          taskData ? taskData.dueDate : ""
                        }" required>
                    </div>
                    <button type="submit">${
                      taskId ? "Aktualisieren" : "Erstellen"
                    }</button>
                    <button type="button" class="backbutton" onclick="taskManager.loadTasks()">Zurück</button>
                </form>
            </div>
        `;

    document.getElementById("taskForm").addEventListener("submit", (e) => {
      e.preventDefault();
      if (taskId) {
        this.updateTask(taskId);
      } else {
        this.createTask();
      }
    });
  }

  async createTask() {
    const task = {
      id: "t" + Date.now(),
      userId: localStorage.getItem("username"),
      title: document.getElementById("title").value.trim(),
      description: document.getElementById("description").value.trim(),
      dueDate: document.getElementById("dueDate").value,
    };

    if (!this.validateTask(task)) return;

    try {
      const response = await fetch(`${this.baseUrl}/data/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) throw new Error("Erstellen fehlgeschlagen");
      this.showSuccess("Neue Aufgabe erstellt.");
      this.loadTasks();
    } catch (error) {
      this.showError("Fehler: Das hat nicht geklappt.");
    }
  }

  async editTask(id) {
    try {
      const response = await fetch(`${this.baseUrl}/data/tasks/${id}`);
      if (!response.ok) throw new Error("Laden fehlgeschlagen.");
      const task = await response.json();
      this.showCreateForm(id, task);
    } catch (error) {
      this.showError("Fehler: Konnte die Aufgabe nicht laden.");
    }
  }

  async updateTask(id) {
    const task = {
      id: id,
      userId: localStorage.getItem("username"),
      title: document.getElementById("title").value.trim(),
      description: document.getElementById("description").value.trim(),
      dueDate: document.getElementById("dueDate").value,
    };

    if (!this.validateTask(task)) return;

    try {
      const response = await fetch(`${this.baseUrl}/data/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) throw new Error("Update fehlgeschlagen.");
      this.showSuccess("Aufgabe aktualisiert.");

      const tasksResponse = await fetch(`${this.baseUrl}/data/tasks`);
      if (!tasksResponse.ok) throw new Error("Laden fehlgeschlagen.");
      const tasks = await tasksResponse.json();
      const userTasks = tasks.filter(
        (task) => task.userId === localStorage.getItem("username")
      );
      this.displayTasks(userTasks);
    } catch (error) {
      this.showError("Fehler: Konnte die Aufgabe nicht speichern.");
    }
  }

  async deleteTask(id) {
    if (!confirm("Willst du diese Aufgabe wirklich löschen?")) return;

    try {
      const response = await fetch(`${this.baseUrl}/data/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) throw new Error("Löschen fehlgeschlagen.");
      this.showSuccess("Aufgabe gelöscht.");
      this.loadTasks();
    } catch (error) {
      this.showError("Fehler: Konnte die Aufgabe nicht löschen.");
    }
  }

  validateTask(task) {
    let isValid = true;
    let errors = [];

    if (!task.title || task.title.length < 3) {
      errors.push("Der Titel muss mindestens 3 Zeichen lang sein!");
      isValid = false;
    }

    if (!task.description || task.description.length < 6) {
      errors.push("Die Beschreibung muss mindestens 6 Zeichen lang sein!");
      isValid = false;
    }

    if (!task.dueDate) {
      errors.push("Bitte wähle ein Fälligkeitsdatum! 📅");
      isValid = false;
    }

    if (!isValid) {
      this.showError(errors.join("\n"));
    }

    return isValid;
  }

  async login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    this.app.innerHTML = `
            <div class="loading">
                <h2>Laden...</h2>
            </div>
        `;

    try {
      const response = await fetch(`${this.baseUrl}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login fehlgeschlagen");
      }

      const token = await response.text();
      this.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      this.showSuccess("Login erfolgreich");
      this.updateLoginStatus();
      this.loadTasks();
    } catch (error) {
      this.showError("Login fehlgeschlagen");
      this.showLoginForm();
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem("token");
    this.updateLoginStatus();
    this.showWelcome();
    this.showSuccess("Erfolgreich ausgeloggt.");
  }

  showLoginForm() {
    this.app.innerHTML = `
            <div class="auth-form">
                <h2>Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label>Username:</label>
                        <input type="text" id="username" required>
                    </div>
                    <div class="form-group">
                        <label>Passwort:</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit">Einloggen</button>
                    <p>Neu hier? <a href="#" onclick="taskManager.showRegisterForm()">Registrieren</a></p>
                </form>
            </div>
        `;

    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.login();
    });
  }

  showRegisterForm() {
    this.app.innerHTML = `
            <div class="auth-form">
                <h2>Neues Konto erstellen</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <label>Username:</label>
                        <input type="text" id="username" required 
                               placeholder="Username">
                    </div>
                    <div class="form-group">
                        <label>Passwort:</label>
                        <input type="password" id="password" required
                               placeholder="mind. 6 Zeichen">
                    </div>
                    <button type="submit">Registrieren</button>
                    <p>Schon registriert? <a href="#" onclick="taskManager.showLoginForm()">Login</a></p>
                </form>
            </div>
        `;

    document.getElementById("registerForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.register();
    });
  }

  async register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (password.length < 6) {
      this.showError("Das Passwort muss mindestens 6 Zeichen lang sein!");
      return;
    }

    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Registration fehlgeschlagen.");
      }

      this.showSuccess("Registrierung erfolgreich.");
      this.showLoginForm();
    } catch (error) {
      this.showError("Fehler: " + error.message);
    }
  }

  showSuccess(message) {
    const successDiv = document.createElement("div");
    successDiv.className = "success";
    successDiv.textContent = message;
    this.app.insertBefore(successDiv, this.app.firstChild);
    setTimeout(() => successDiv.remove(), 3000);
  }

  showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = message;
    this.app.insertBefore(errorDiv, this.app.firstChild);
    setTimeout(() => errorDiv.remove(), 3000);
  }
}

const taskManager = new TaskManager();

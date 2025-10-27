// ==================== AUTHENTICATION UTILITIES ====================

const signupUser = (userData) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find((u) => u.email === userData.email);
  if (exists) throw new Error("User already exists!");
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  return { message: "Signup successful!" };
};

const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) throw new Error("Invalid credentials!");
  localStorage.setItem("token", "mock-token-123");
  return { message: "Login successful!", token: "mock-token-123" };
};

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const logoutUser = () => {
  localStorage.removeItem("token");
};

// ==================== TOAST NOTIFICATION SYSTEM ====================

const showToast = (message, type = "success") => {
  const toast = document.createElement("div");
  toast.className = `fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  toast.textContent = message;
  toast.style.transform = "translateX(400px)";
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = "translateX(0)";
  }, 100);
  
  setTimeout(() => {
    toast.style.transform = "translateX(400px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// ==================== LOGIN PAGE LOGIC ====================

const initLogin = () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    emailError.classList.add("hidden");
    passwordError.classList.add("hidden");

    if (!email) {
      emailError.classList.remove("hidden");
      return;
    }
    
    if (!password) {
      passwordError.classList.remove("hidden");
      return;
    }

    try {
      loginUser(email, password);
      showToast("Login successful!", "success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      showToast(err.message, "error");
    }
  });
};

// ==================== SIGNUP PAGE LOGIC ====================

const initSignup = () => {
  const form = document.getElementById("signupForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    nameError.classList.add("hidden");
    emailError.classList.add("hidden");
    passwordError.classList.add("hidden");

    if (!name) {
      nameError.classList.remove("hidden");
      return;
    }
    
    if (!email) {
      emailError.classList.remove("hidden");
      return;
    }
    
    if (!password) {
      passwordError.classList.remove("hidden");
      return;
    }

    try {
      signupUser({ name, email, password });
      showToast("Signup successful!", "success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      showToast(err.message, "error");
    }
  });
};

// ==================== DASHBOARD PAGE LOGIC ====================

const initDashboard = () => {
  // Redirect unauthenticated users
  if (!isAuthenticated()) {
    window.location.href = "/login";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const lastUser = users[users.length - 1];
  
  const userNameEl = document.getElementById("userName");
  if (userNameEl && lastUser) {
    userNameEl.textContent = lastUser.name;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    logoutUser();
    window.location.href = "/login";
  });

  const calculateStats = () => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "open").length;
    const inProgress = tickets.filter((t) => t.status === "in-progress").length;
    const resolved = tickets.filter((t) => t.status === "resolved").length;

    document.getElementById("totalTickets").textContent = total;
    document.getElementById("openTickets").textContent = open;
    document.getElementById("inProgressTickets").textContent = inProgress;
    document.getElementById("resolvedTickets").textContent = resolved;
  };

  calculateStats();

  // Sync stats in real-time
  window.addEventListener("storage", calculateStats);
  
  // Poll for updates every second
  const interval = setInterval(calculateStats, 1000);
  
  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    clearInterval(interval);
  });
};

// ==================== TICKETS PAGE LOGIC ====================

const initTickets = () => {
  // Redirect if not authenticated
  if (!isAuthenticated()) {
    window.location.href = "/login";
    return;
  }

  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  let editingIndex = null;

  const form = document.getElementById("ticketForm");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const statusSelect = document.getElementById("status");
  const submitBtn = document.getElementById("submitBtn");
  const ticketsContainer = document.getElementById("ticketsContainer");

  const saveTickets = (updated) => {
    localStorage.setItem("tickets", JSON.stringify(updated));
    tickets = updated;
    renderTickets();
  };

  const renderTickets = () => {
    if (tickets.length === 0) {
      ticketsContainer.innerHTML = `
        <p class="text-gray-500 col-span-full">
          No tickets found. Create your first ticket above!
        </p>
      `;
      return;
    }

    ticketsContainer.innerHTML = tickets
      .map(
        (ticket, index) => `
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md text-left hover:scale-105 transition-transform">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">${ticket.title}</h3>
        <p class="text-gray-600 mb-4">${ticket.description}</p>
        <span class="inline-block px-3 py-1 rounded-full text-sm font-medium ${
          ticket.status === "open"
            ? "bg-green-100 text-green-800"
            : ticket.status === "in-progress"
            ? "bg-amber-100 text-amber-800"
            : "bg-blue-100 text-blue-800"
        }">
          ${ticket.status}
        </span>
        <div class="flex justify-end gap-3 mt-4">
          <button onclick="editTicket(${index})" class="text-blue-500 hover:underline">Edit</button>
          <button onclick="deleteTicket(${index})" class="text-red-500 hover:underline">Delete</button>
        </div>
      </div>
    `
      )
      .join("");
  };

  window.editTicket = (index) => {
    editingIndex = index;
    const ticket = tickets[index];
    titleInput.value = ticket.title;
    descriptionInput.value = ticket.description;
    statusSelect.value = ticket.status;
    submitBtn.textContent = "Update Ticket";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.deleteTicket = (index) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      const updated = tickets.filter((_, i) => i !== index);
      saveTickets(updated);
      showToast("Ticket deleted!", "success");
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const status = statusSelect.value;

    if (!title || !description) {
      showToast("Please fill in all fields!", "error");
      return;
    }

    let updatedTickets;
    if (editingIndex !== null) {
      updatedTickets = tickets.map((t, i) =>
        i === editingIndex ? { ...t, title, description, status } : t
      );
      showToast("Ticket updated!", "success");
      editingIndex = null;
      submitBtn.textContent = "Create Ticket";
    } else {
      updatedTickets = [...tickets, { title, description, status, id: Date.now() }];
      showToast("Ticket created!", "success");
    }

    saveTickets(updatedTickets);
    form.reset();
  });

  // Sync with localStorage if changed elsewhere
  window.addEventListener("storage", () => {
    tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    renderTickets();
  });

  renderTickets();
};

// ==================== PAGE INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  switch (page) {
    case "login":
      initLogin();
      break;
    case "signup":
      initSignup();
      break;
    case "dashboard":
      initDashboard();
      break;
    case "tickets":
      initTickets();
      break;
  }
});
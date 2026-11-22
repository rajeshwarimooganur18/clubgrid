const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getToken = () =>
  localStorage.getItem("clubgridToken") || localStorage.getItem("token");

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("clubgridToken", token);
  } else {
    localStorage.removeItem("clubgridToken");
    localStorage.removeItem("token");
  }
};

export const getCurrentUser = () => {
  try {
    const currentUser = localStorage.getItem("clubgridUser");
    const legacyUser = !currentUser && localStorage.getItem("student");
    const raw = currentUser || legacyUser;
    const user = raw ? JSON.parse(raw) : null;
    return user && legacyUser ? { ...user, loggedIn: true } : user;
  } catch (e) {
    return null;
  }
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem("clubgridUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("clubgridUser");
    localStorage.removeItem("student");
  }
};

export const logout = () => {
  localStorage.removeItem("clubgridToken");
  localStorage.removeItem("clubgridUser");
  localStorage.removeItem("token");
  localStorage.removeItem("student");
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
};

// AUTH API
export const authAPI = {
  login: (email, password, role) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    }),

register: (formData) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData (including boundary)
    }),

  forgotPassword: (email) =>
    apiFetch("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  getProfile: () => apiFetch("/auth/profile"),

  updateProfile: (profileData) =>
    apiFetch("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),
};

// CLUBS API
export const clubsAPI = {
  getAll: () => apiFetch("/clubs"),
  getById: (id) => apiFetch(`/clubs/${id}`),
  getTeams: (clubId) => apiFetch(`/clubs/${clubId}/teams`),
};
// TEAMS API
export const teamsAPI = {
  getActive: () => apiFetch("/teams/active"),
};

// APPLICATIONS API
export const applicationsAPI = {
  submit: (applicationData) =>
    apiFetch("/applications", {
      method: "POST",
      body: JSON.stringify(applicationData),
    }),

  getMy: () => apiFetch("/applications/my"),

  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/applications${query ? `?${query}` : ""}`);
  },

  updateStatus: (id, status) =>
    apiFetch(`/applications/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  delete: (id) =>
    apiFetch(`/applications/${id}`, {
      method: "DELETE",
    }),
};

// EVENTS API
export const eventsAPI = {
  getAll: () => apiFetch("/events"),
  create: (eventData) =>
    apiFetch("/events", {
      method: "POST",
      body: JSON.stringify(eventData),
    }),
  update: (id, eventData) =>
    apiFetch(`/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    }),
  delete: (id) =>
    apiFetch(`/events/${id}`, {
      method: "DELETE",
    }),
};

// ANNOUNCEMENTS API
export const announcementsAPI = {
  getAll: () => apiFetch("/announcements"),
  create: (announcementData) =>
    apiFetch("/announcements", {
      method: "POST",
      body: JSON.stringify(announcementData),
    }),
  delete: (id) =>
    apiFetch(`/announcements/${id}`, {
      method: "DELETE",
    }),
};

// ADMIN API

export const adminAPI = {
  getStats: () => apiFetch("/admin/stats"),
  getStudents: () => apiFetch("/admin/students"),

  uploadStudentMaster: (formData) =>
    apiFetch("/admin/student-master/upload", {
      method: "POST",
      body: formData,
    }),

promoteStudentToTeamAdmin: (studentId, data = {}) =>
    apiFetch(`/teams/promote-student/${studentId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};


export const submitTeamApplication = async (formData, clubName, teamName, clubId) => {
  const user = getCurrentUser();
  const payload = {
    name: formData.name,
    usn: formData.usn,
    department: formData.department,
    year: formData.year,
    reason: formData.reason,
    clubName,
    teamName,
    email: user ? user.email : undefined,
    ...(clubId !== undefined ? { clubId } : {}),
  };
  return await applicationsAPI.submit(payload);
};

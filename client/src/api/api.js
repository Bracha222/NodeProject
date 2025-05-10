const baseUrl = "http://localhost:5000/api";

// הוספת נתונים (POST)
export const addData = async (endpoint, data) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${errorText}`);
        }

        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            throw new Error('Unexpected content type');
        }

    } catch (err) {
        console.error("Error adding data:", err);
        throw err;
    }
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error adding data:", error);
  //   throw error;
  // }
};

// עדכון נתונים (PUT)
export const updateData = async (endpoint, data) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// מחיקת נתונים (DELETE)
export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
};

// שליפת נתונים (GET)
export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`);
    if (!response.ok) throw new Error("Fetch failed");
    return await response.json();
  } catch (error) {
    console.error("Error getting data:", error);
    return [];
  }
};

// שמירת משתמש מקומי
export function saveCurrentUserInLS(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// קבלת משתמש נוכחי
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// ניקוי משתמש מהזיכרון
export function logoutUser() {
  localStorage.removeItem("currentUser");
}
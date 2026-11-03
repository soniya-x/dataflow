
const API_URL = "https://jsonplaceholder.typicode.com";

// Read data from LocalStorage
export const getLocalData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? null : JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return null;
  }
};

// Save data in LocalStorage
export const saveLocalData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Load initial API data only when LocalStorage has no saved data
export const getOrSeedData = async (key, endpoint) => {
  const savedData = getLocalData(key);

  if (savedData !== null) {
    return savedData;
  }

  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const data = await response.json();

  saveLocalData(key, data);

  return data;
};

// Generate a new local ID
export const getNextId = (data) => {
  return data.length
    ? Math.max(...data.map((item) => Number(item.id))) + 1
    : 1;
};

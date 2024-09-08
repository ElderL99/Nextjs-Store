const API_URL = "https://dummyjson.com";

export async function getAllProducts() {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  return data.products;
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  const data = await response.json();
  return data;
}

export async function Login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  return data.token;
}

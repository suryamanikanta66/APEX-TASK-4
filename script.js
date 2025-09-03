// ================= To-Do List =================
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="deleteTask(${i})">❌</button>`;
    list.appendChild(li);
  });
}
function addTask() {
  const input = document.getElementById("taskInput");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (input.value.trim() !== "") {
    tasks.push(input.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    loadTasks();
  }
}
function deleteTask(i) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// ================= Product Listing =================
const products = [
  { name: "Smartphone", category: "electronics", price: 200 },
  { name: "T-Shirt", category: "fashion", price: 25 },
  { name: "Laptop", category: "electronics", price: 800 },
  { name: "Novel Book", category: "books", price: 15 },
  { name: "Shoes", category: "fashion", price: 50 }
];

function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: $${p.price}</p>
      </div>`;
  });
}
function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  let filtered = category === "all" ? products : products.filter(p => p.category === category);
  displayProducts(filtered);
}
function sortProducts() {
  const sort = document.getElementById("sortFilter").value;
  let sorted = [...products];
  if (sort === "priceLow") sorted.sort((a, b) => a.price - b.price);
  if (sort === "priceHigh") sorted.sort((a, b) => b.price - a.price);
  displayProducts(sorted);
}

// ================= API Integration =================
// Weather API (OpenWeatherMap - Free API Key needed)
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "8b9bc0bbffcdb79883005b9fdf8e1508"; // replace with your OpenWeatherMap key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === 200) {
      document.getElementById("weatherResult").innerText =
        `🌍 ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
    } else {
      document.getElementById("weatherResult").innerText = "City not found!";
    }
  } catch (err) {
    document.getElementById("weatherResult").innerText = "Error fetching weather.";
  }
}

// Joke API
async function getJoke() {
  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    document.getElementById("jokeResult").innerText = `${data.setup} 😂 ${data.punchline}`;
  } catch (err) {
    document.getElementById("jokeResult").innerText = "Error fetching joke.";
  }
}

// ================= Init =================
window.onload = () => {
  loadTasks();
  displayProducts(products);
};

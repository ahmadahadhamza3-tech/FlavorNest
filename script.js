const recipes=[
{id:1,name:"Spicy Chicken Biryani",category:"Pakistani",time:"60 min",difficulty:"Medium",rating:"4.9",image:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85",description:"Fragrant basmati rice, tender chicken and bold Pakistani spices.",ingredients:["Chicken — 500g","Basmati rice — 500g","Onions — 2","Tomatoes — 2","Yogurt — 1 cup","Biryani masala — 2 tbsp","Ginger garlic paste — 1 tbsp","Oil — 4 tbsp"],steps:["Soak the rice for 20 minutes.","Fry sliced onions until golden.","Add chicken, tomatoes, yogurt and spices; cook until tender.","Parboil the rice separately.","Layer rice over the chicken mixture.","Cover and cook on low heat for 15 minutes.","Gently mix and serve hot with raita."]},
{id:2,name:"Chicken Karahi",category:"Chicken",time:"45 min",difficulty:"Easy",rating:"4.8",image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",description:"A rich, spicy tomato chicken curry made in classic karahi style.",ingredients:["Chicken — 500g","Tomatoes — 4","Green chilies — 4","Ginger — 1 tbsp","Garlic — 1 tbsp","Oil — 4 tbsp","Red chili powder — 1 tsp"],steps:["Heat oil in a karahi.","Add chicken and fry lightly.","Add ginger and garlic.","Add tomatoes and spices.","Cook until the tomatoes break down and chicken is tender.","Finish with green chilies and ginger."]},
{id:3,name:"Classic Cheeseburger",category:"Fast Food",time:"25 min",difficulty:"Easy",rating:"4.7",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",description:"Juicy homemade burger with melted cheese and fresh vegetables.",ingredients:["Burger buns — 2","Beef patties — 2","Cheese slices — 2","Lettuce","Tomato","Onion","Mayonnaise","Ketchup"],steps:["Cook the beef patties on a hot pan.","Add cheese during the final minute.","Toast the buns.","Spread sauces and add vegetables.","Place the patty inside and serve."]},
{id:4,name:"Chocolate Cake",category:"Dessert",time:"50 min",difficulty:"Medium",rating:"4.9",image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",description:"Soft, rich chocolate cake for birthdays, tea time or dessert cravings.",ingredients:["Flour — 1½ cups","Cocoa powder — ½ cup","Sugar — 1 cup","Eggs — 2","Milk — 1 cup","Butter — 100g","Baking powder — 1 tsp"],steps:["Preheat oven to 180°C.","Mix flour, cocoa and baking powder.","Beat eggs, sugar and butter.","Add milk and dry ingredients.","Pour into a greased pan.","Bake for 35–40 minutes and cool before serving."]},
{id:5,name:"Fresh Green Salad",category:"Healthy",time:"10 min",difficulty:"Easy",rating:"4.6",image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",description:"Crisp vegetables with lemon for a fresh and healthy side.",ingredients:["Cucumber — 1","Tomatoes — 2","Lettuce","Onion — 1","Lemon juice — 1 tbsp","Salt — to taste"],steps:["Wash all vegetables.","Chop cucumber, tomatoes and onion.","Add lettuce.","Season with lemon juice and salt.","Toss and serve fresh."]},
{id:6,name:"Fluffy Pancakes",category:"Breakfast",time:"20 min",difficulty:"Easy",rating:"4.8",image:"https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85",description:"Soft, fluffy pancakes made for a perfect breakfast.",ingredients:["Flour — 1 cup","Milk — 1 cup","Egg — 1","Sugar — 2 tbsp","Baking powder — 1 tsp","Butter — 2 tbsp"],steps:["Mix flour, sugar and baking powder.","Add milk and egg; whisk until smooth.","Heat a pan with butter.","Pour batter and cook both sides until golden.","Serve with honey or syrup."]},
{id:7,name:"Creamy Garlic Pasta",category:"Fast Food",time:"30 min",difficulty:"Easy",rating:"4.7",image:"https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85",description:"Creamy garlic pasta with cheese for a quick comfort dinner.",ingredients:["Pasta — 250g","Cream — 1 cup","Cheese — ½ cup","Garlic — 2 cloves","Butter — 1 tbsp","Black pepper"],steps:["Boil pasta until tender.","Melt butter and sauté garlic.","Add cream and black pepper.","Stir in cheese.","Add pasta and toss until coated.","Serve immediately."]},
{id:8,name:"Chicken Tikka",category:"Chicken",time:"40 min",difficulty:"Medium",rating:"4.8",image:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85",description:"Smoky, spicy grilled chicken with a delicious charred finish.",ingredients:["Chicken pieces — 500g","Yogurt — ½ cup","Tikka masala — 2 tbsp","Lemon juice — 2 tbsp","Ginger garlic paste — 1 tbsp","Oil — 2 tbsp"],steps:["Mix yogurt, tikka masala, lemon and ginger garlic.","Marinate chicken for at least 30 minutes.","Thread onto skewers.","Grill until cooked and lightly charred.","Brush with butter or oil and serve hot."]}
];

const grid=document.getElementById("recipeGrid"),search=document.getElementById("searchInput"),modal=document.getElementById("recipeModal"),modalContent=document.getElementById("modalContent"),toast=document.getElementById("toast");

function render(list=recipes){
  grid.innerHTML="";
  if(!list.length){grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:55px;color:var(--muted)"><h3>No recipes found</h3><p>Try another search or category.</p></div>';return}
  list.forEach(r=>{
    const card=document.createElement("article");card.className="recipe-card";
    card.innerHTML=`<div class="recipe-photo"><img src="${r.image}" alt="${r.name}" loading="lazy"><button class="favorite" aria-label="Favorite">♡</button></div><div class="recipe-body"><h3>${r.name}</h3><p>${r.description}</p><div class="recipe-meta"><span>⏱ ${r.time}</span><span>★ ${r.rating}</span><span>${r.difficulty}</span></div><button class="recipe-button">View recipe</button></div>`;
    card.querySelector(".favorite").addEventListener("click",e=>{e.stopPropagation();const b=e.currentTarget;b.classList.toggle("active");b.textContent=b.classList.contains("active")?"♥":"♡";});
    card.querySelector(".recipe-button").addEventListener("click",()=>openRecipe(r.id));
    grid.appendChild(card);
  });
}
function filter(q){
  q=q.toLowerCase().trim();
  const list=recipes.filter(r=>(r.name+" "+r.category+" "+r.description).toLowerCase().includes(q));
  render(list);document.getElementById("recipes").scrollIntoView({behavior:"smooth"});
}
document.getElementById("searchBtn").onclick=()=>filter(search.value);
search.addEventListener("keydown",e=>{if(e.key==="Enter")filter(search.value)});
document.querySelectorAll("[data-search]").forEach(b=>b.onclick=()=>{search.value=b.dataset.search;filter(search.value)});
document.querySelectorAll("[data-category]").forEach(b=>b.onclick=()=>{render(recipes.filter(r=>r.category===b.dataset.category));document.getElementById("recipes").scrollIntoView({behavior:"smooth"})});
document.getElementById("clearFilter").onclick=()=>{search.value="";render(recipes);document.getElementById("recipes").scrollIntoView({behavior:"smooth"})};

function openRecipe(id){
  const r=recipes.find(x=>x.id===id);if(!r)return;
  modalContent.innerHTML=`<div class="modal-hero"><img src="${r.image}" alt="${r.name}"></div><div class="eyebrow">${r.category.toUpperCase()} • ★ ${r.rating} • ${r.time}</div><h2>${r.name}</h2><p style="color:var(--muted);margin-top:7px">${r.description}</p><h3>Ingredients</h3><ul>${r.ingredients.map(x=>`<li>${x}</li>`).join("")}</ul><h3>How to make it</h3><ol>${r.steps.map(x=>`<li>${x}</li>`).join("")}</ol><button class="copy-btn" onclick="copyRecipe(${r.id})">Copy recipe</button>`;
  modal.classList.add("show");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.getElementById("closeModal").onclick=closeModal;
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
function copyRecipe(id){
  const r=recipes.find(x=>x.id===id);
  const text=`${r.name}\n\nIngredients:\n${r.ingredients.join("\n")}\n\nInstructions:\n${r.steps.map((x,i)=>`${i+1}. ${x}`).join("\n")}`;
  navigator.clipboard?.writeText(text).then(()=>showToast("Recipe copied!"));
}
function showToast(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200)}

document.getElementById("themeBtn").onclick=()=>{
  document.body.classList.toggle("dark");
  const dark=document.body.classList.contains("dark");
  document.getElementById("themeBtn").textContent=dark?"☀":"☾";
  localStorage.setItem("flavorDark",dark?"1":"0");
};
if(localStorage.getItem("flavorDark")==="1"){document.body.classList.add("dark");document.getElementById("themeBtn").textContent="☀"}

document.getElementById("menuBtn").onclick=()=>document.getElementById("navLinks").classList.toggle("active");
document.querySelectorAll(".nav-links a").forEach(a=>a.onclick=()=>document.getElementById("navLinks").classList.remove("active"));

document.getElementById("newsletterForm").onsubmit=e=>{
  e.preventDefault();document.getElementById("emailInput").value="";showToast("Thanks for subscribing! ♥");
};

render();

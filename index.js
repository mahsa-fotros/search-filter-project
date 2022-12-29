const searchInput=document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");
const buttons=document.querySelectorAll(".btn");

let allProducts = [];
let filters = {
  searchedItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((response) => {
      allProducts = response.data;
      renderedProducts(response.data, filters);
    })
    .catch((error) => {
      console.log(error);
    });
});

function renderedProducts(products, filter) {
  let filteredProducts = products.filter((p) => {
    return p.title.toLowerCase().includes(filter.searchedItems.toLowerCase());
  });
  productsDOM.innerHTML="";
  filteredProducts.forEach(item => {
    let productDiv=document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `<div class="image-container">
            <img src=${item.image} alt=${item.title} class="product-img">
        </div>
        <div class="product-description">
            <p class="product-title">${item.title}</p>
            <p class="product-price">$${item.price}</p>
        </div>`;
    productsDOM.appendChild(productDiv);
  });
}
searchInput.addEventListener('input',(e)=>{
    filters.searchedItems=e.target.value;
    renderedProducts(allProducts,filters);
})

// filtered by category
buttons.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        filters.searchedItems=e.target.dataset.filter;
        renderedProducts(allProducts,filters);
    })
})
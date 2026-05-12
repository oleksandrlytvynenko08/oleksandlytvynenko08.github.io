var productsData = [
  { id: 1, name: "Purple Stripe Garlic", desc: "Hardneck, rich and complex flavor", image: "images/garlic1.jpg" },
  { id: 2, name: "Elephant Garlic", desc: "Large cloves, mild onion-like flavor", image: "images/garlic2.jpg" },
  { id: 3, name: "Porcelain Garlic", desc: "Hardneck, sharp and pungent taste", image: "images/garlic3.jpg" },
  { id: 4, name: "Artichoke Garlic", desc: "Softneck, easy to braid, mild flavor", image: "images/garlic4.jpg" },
  { id: 5, name: "Silverskin Garlic", desc: "Softneck, long shelf life, strong taste", image: "images/garlic5.jpg" },
  { id: 6, name: "Rocambole Garlic", desc: "Hardneck, deep full-bodied flavor", image: "images/garlic6.jpg" },
];

var app = new Vue({
  el: "#app",
  data: {
    products: productsData,
    cart: [],
    selectedProduct: null,
    contactFields: {
      name: "",
      company: "",
      position: "",
      city: "",
      country: "",
      phone: "",
      email: "",
      type: "seed producer",
      other: "",
      interest: "",
    },
    orderSubmitted: false,
  },
  methods: {
    getCart: function () {
      var savedCartIds = JSON.parse(localStorage.getItem("cart")) || [];
      this.cart = this.products.filter(function (product) {
        return savedCartIds.includes(product.id);
      });
    },

    addToCart: function (productId) {
      var savedCartIds = JSON.parse(localStorage.getItem("cart")) || [];
      if (!savedCartIds.includes(productId)) {
        savedCartIds.push(productId);
        localStorage.setItem("cart", JSON.stringify(savedCartIds));
        this.getCart();
        alert("Часник додано до кошика!");
      } else {
        alert("Цей товар вже у кошику!");
      }
    },

    removeFromCart: function (id) {
      this.cart = this.cart.filter(function (item) {
        return item.id !== id;
      });
      var newCartIds = this.cart.map(function (item) {
        return item.id;
      });
      localStorage.setItem("cart", JSON.stringify(newCartIds));
    },

    makeOrder: function () {
      this.orderSubmitted = true;
      this.cart = [];
      localStorage.removeItem("cart");
    },

    selectProduct: function (id) {
      localStorage.setItem("selectedProductId", id);
      window.location.href = "garlic-one.html";
    },

    loadSelectedProduct: function () {
      var selectedId = localStorage.getItem("selectedProductId");
      if (selectedId) {
        var foundProduct = this.products.find(function (p) {
          return p.id == selectedId;
        });
        if (foundProduct) {
          this.selectedProduct = foundProduct;
        }
      }
    },
  },
  mounted: function () {
    this.getCart();

    if (window.location.pathname.includes("garlic-one.html")) {
      this.loadSelectedProduct();
    }
  },
});

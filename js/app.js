var app = new Vue({
  el: "#app",
  data: {
    products: [
      { id: 1, name: "TAG 1000 (TAG 853)", desc: "Tomato Determinate Red Standard Round", image: "images/tomato1.jpg" },
      { id: 2, name: "TAG 1001 (TAG 855)", desc: "Tomato Determinate Red Standard Round", image: "images/tomato2.jpg" },
      { id: 3, name: "TAG 1002 (TAG 809)", desc: "Tomato Determinate Red Standard Round", image: "images/tomato3.jpg" },
    ],
    cart: [],
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
  },
  mounted: function () {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([1, 2]));
    }
    this.getCart();
  },
});

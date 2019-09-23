<template>
  <div class="wrapper">
    <div class="footer">
      <div class="d-flex flex-lg-nowrap flex-wrap flex-row container">
        <div class="w-100">
          <div class="flex-column">
            <div class="pl-3 footer-header">Category</div>
            <div class="footer-menu">
              <div class="sub-menu">Destination</div>
              <div class="sub-menu">Source</div>
              <div class="sub-menu">Recipient</div>
              <div class="sub-menu">Admin</div>
            </div>
          </div>
        </div>
        <div class="w-100 h-100">
          <div class="pt-0 mt-0 flex-column">
            <div class="pl-3 footer-header">help</div>
            <div class="footer-menu">
              <div class="sub-menu">Track Item</div>
              <div class="sub-menu">Returns</div>
              <div class="sub-menu">Shipping</div>
              <div class="sub-menu">FAQs</div>
            </div>
          </div>
        </div>
        <div class="w-100">
          <div class="flex-column">
            <div class="pl-3 footer-header">Get In Touch</div>
            <div class="w-100 p-2 pl-1 footer-menu sub-menu">
              Any questions? Let us know.,
              White House, Usa
            </div>
          </div>
        </div>
        <div class="w-100">
          <div class="flex-column">
            <div class="pl-3 footer-header">NEWSLETTER</div>
            <div class="footer-menu">
              <input type="text" placeholder="email" class="form-control">
              <div class="submit mt-4">
                <a href="#" class="footer-link">subscribe</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 100%;
  background-color:grey;
}
.footer {
  padding: 5rem 0;
}
.footer-header {
  font: 900;
  font-family: Montserrat-Bold;
  font-size: 1rem;
  text-transform: uppercase;
  color: #fff;
}
.footer-menu {
  padding: 1rem;
  color: #f7f7f7;
}
.sub-menu {
  color: fff;
  padding: 0.3rem 0;
  font: 400;
  font-size: 1rem;
  font-family: "Times New Roman", Times, serif;
}
.footer-link {
  text-decoration: none;
  color: whitesmoke;
  background-color: #398370;
  padding: 0.9rem 2.8rem;
  border-radius: 2rem;
  font: 700;
  text-transform: uppercase;
  font-family: "Times New Roman", Times, serif;
  font-size: 1rem;
}
</style>
<template>
  <div class="hero">
    <!-- Full Page Intro -->
    <div
      class="view"
      style="background-image: url('http://www.agileinnov.com/img/iStock-513446710.jpg'); background-repeat: no-repeat; background-size: cover; background-position: center center;"
    >
      <!-- Mask & flexbox options-->
      <div class="mask rgba-black-light align-items-center">
        <!-- Content -->
        <div class="container">
          <!--Grid row-->
          <div class="row">
            <u-animate-container>
              <u-animate
                name="fadeIn"
                delay="0.5s"
                duration="3s"
                :iteration="1"
                :offset="0"
                animateClass="animated"
                :begin="false"
              >
                <!--Grid column-->
                <div class="text-center col-md-12 mb-4">
                  <h1
                    class="h1-reponsive text-black-50 font-weight-bold mb-0 pt-md-5 pt-5"
                  >
                    <strong>agile Innovation Labs</strong>
                  </h1>
                  <hr class="hr-light my-4" />
                  <h3 class="mb-4 text-black-50">
                    <strong
                      >CRUD services for Events Calendar and Blogs Pages</strong
                    >
                  </h3>
                </div>
                <!--Grid column-->
              </u-animate>
            </u-animate-container>
          </div>
          <!--Grid row-->
        </div>
        <!-- Content -->
      </div>
      <!-- Mask & flexbox options-->
    </div>
    <!-- Full Page Intro -->
  </div>
</template>

<!--<template>-->
<!--<div class="hero">-->
<!--&lt;!&ndash; Full Page Intro &ndash;&gt;-->
<!--<div-->
<!--class="view"-->
<!--style="background-image: url('http://www.agileinnov.com/img/iStock-513446710.jpg'); background-repeat: no-repeat; background-size: cover; background-position: center center;"-->
<!--&gt;-->
<!--&lt;!&ndash; Mask & flexbox options&ndash;&gt;-->
<!--<div class="mask rgba-black-light align-items-center">-->
<!--&lt;!&ndash; Content &ndash;&gt;-->
<!--<div class="container">-->
<!--&lt;!&ndash;Grid row&ndash;&gt;-->
<!--<div class="row">-->
<!--&lt;!&ndash;Grid column&ndash;&gt;-->
<!--<div class="col-md-12 mb-4 text-center">-->
<!--<h1-->
<!--class="h1-reponsive text-black-50 font-weight-bold mb-0 pt-md-5 pt-5 wow fadeInDown"-->
<!--data-wow-delay="0.3s"-->
<!--&gt;-->
<!--<strong>agile Innovation Labs</strong>-->
<!--</h1>-->
<!--<hr class="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s" />-->
<!--<h3-->
<!--class="mb-4 text-black-50 wow fadeInDown"-->
<!--data-wow-delay="0.4s"-->
<!--&gt;-->
<!--<strong-->
<!--&gt;CRUD services for Events Calendar and Blog Pages</strong-->
<!--&gt;-->
<!--</h3>-->
<!--</div>-->
<!--&lt;!&ndash;Grid column&ndash;&gt;-->
<!--</div>-->
<!--&lt;!&ndash;Grid row&ndash;&gt;-->
<!--</div>-->
<!--&lt;!&ndash; Content &ndash;&gt;-->
<!--</div>-->
<!--&lt;!&ndash; Mask & flexbox options&ndash;&gt;-->
<!--</div>-->
<!--&lt;!&ndash; Full Page Intro &ndash;&gt;-->
<!--</div>-->
<!--</template>-->

<script>
import { UAnimateContainer, UAnimate } from "vue-wow";

export default {
  components: {
    UAnimateContainer,
    UAnimate
  }
};
</script>

<style>
.hero {
  height: 100vh;
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hero .lead {
  font-weight: 200;
  font-size: 1.5rem;
}
html,
body,
header,
.view {
  height: 100%;
}

@media (max-width: 740px) {
  html,
  body,
  header,
  .view {
    height: 100vh;
  }
}

.top-nav-collapse {
  background-color: #78909c !important;
}

/*.navbar:not(.top-nav-collapse) {*/
/*background: transparent !important;*/
/*}*/

@media (max-width: 991px) {
   {
    background: #78909c !important;
  }
}

h1 {
  letter-spacing: 8px;
}

h5 {
  letter-spacing: 3px;
}

.hr-light {
  border-top: 3px solid #fff;
  width: 550px;
}
</style>

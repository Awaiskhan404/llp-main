import React from 'react';

function Thankyou() {
  return (
    <div>
      <header class="site-header" id="header">
        <h1 class="site-header__title" data-lead-id="site-header-title">
          THANK YOU!
        </h1>
      </header>

      <div class="main-content">
        <i class="fa fa-check main-content__checkmark" id="checkmark"></i>
        <p class="main-content__body" data-lead-id="main-content-body">
          You will recieve confirmation reciept through email very soon..!
        </p>
      </div>

      <footer class="site-footer" id="footer">
        <p class="site-footer__fineprint" id="fineprint"></p>
      </footer>
    </div>
  );
}

export default Thankyou;

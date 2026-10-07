/* =========================================================
   CLEAN DESIGN UK
   GLOBAL COMPONENT LOADER
========================================================= */


document.addEventListener(
  'DOMContentLoaded',
  async () => {

    await Promise.all([
      loadComponent(
        '#site-navbar',
        '/components/navbar.html'
      ),

      loadComponent(
        '#site-footer',
        '/components/footer.html'
      )
    ]);


    initialiseNavigation();

  }
);


/* =========================================================
   LOAD COMPONENT
========================================================= */

async function loadComponent(
  selector,
  file
) {

  const container =
    document.querySelector(selector);


  if (!container) {
    return;
  }


  try {

    const response =
      await fetch(file);


    if (!response.ok) {

      throw new Error(
        `Could not load ${file}`
      );

    }


    container.innerHTML =
      await response.text();

  }

  catch (error) {

    console.error(error);

  }

}


/* =========================================================
   NAVIGATION
========================================================= */

function initialiseNavigation() {

  const navbar =
    document.querySelector(
      '.site-navbar'
    );


  const toggle =
    document.querySelector(
      '.site-menu-toggle'
    );


  const navigation =
    document.querySelector(
      '.site-navigation'
    );


  if (
    !navbar ||
    !toggle ||
    !navigation
  ) {

    return;

  }


  /* ---------------------------------------------
     MOBILE MENU
  --------------------------------------------- */

  toggle.addEventListener(
    'click',
    () => {

      const open =
        navbar.classList.toggle(
          'menu-open'
        );


      toggle.setAttribute(
        'aria-expanded',
        String(open)
      );


      document.body.classList.toggle(
        'menu-is-open',
        open
      );

    }
  );


  /* ---------------------------------------------
     CLOSE MENU WHEN LINK IS PRESSED
  --------------------------------------------- */

  navigation
    .querySelectorAll('a')
    .forEach(link => {

      link.addEventListener(
        'click',
        () => {

          navbar.classList.remove(
            'menu-open'
          );


          toggle.setAttribute(
            'aria-expanded',
            'false'
          );


          document.body.classList.remove(
            'menu-is-open'
          );

        }
      );

    });


  /* ---------------------------------------------
     SCROLL NAVIGATION STYLE
  --------------------------------------------- */

  function updateNavbar() {

    navbar.classList.toggle(
      'is-scrolled',
      window.scrollY > 20
    );

  }


  updateNavbar();


  window.addEventListener(
    'scroll',
    updateNavbar,
    {
      passive: true
    }
  );


  /* ---------------------------------------------
     ACTIVE PAGE
  --------------------------------------------- */

  const path =
    window.location.pathname;


  const links =
    navbar.querySelectorAll(
      '.site-nav-link'
    );


  links.forEach(link => {

    const href =
      link.getAttribute('href');


    const home =
      href === '/' &&
      (
        path === '/' ||
        path.endsWith('/index.html')
      );


    const internal =
      href !== '/' &&
      path.endsWith(href);


    if (
      home ||
      internal
    ) {

      link.classList.add(
        'is-active'
      );


      link.setAttribute(
        'aria-current',
        'page'
      );

    }

  });

}
<template>
  <div class="nuxt-site min-h-screen flex flex-col">
    <!-- Backdrop overlay for mobile menu -->
    <div v-if="mobileMenuOpen" class="menu-backdrop fixed inset-0 bg-black bg-opacity-50 z-20" @click="closeMobileMenu">
    </div>

    <header class="sticky-header fixed top-0 left-0 w-full py-1 bg-zinc-900 z-30 transition-all duration-200"
      :class="{ 'scrolled': isScrolled }">
      <div class="w-11/12 max-w-screen-lg my-0 mx-auto py-0 px-2">
        <div class="flex justify-between items-center py-1">
          <div class="logo">
            <NuxtLink to="/">
              <NuxtImg src="/images/flux-inc-logo-color.png" width="150" height="48" alt="Company Inc logo"
                class="text-lg my-1 mx-0 transition-all duration-200" densities="x1 x2" />
            </NuxtLink>
          </div>
          <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav class="main-nav" :class="{ 'is-open': mobileMenuOpen }">
            <ul class="nav-list">
              <li class="nav-item">
                <NuxtLink to="/" @click="mobileMenuOpen = false" :class="{ 'active-link': $route.path === '/' }">Home
                </NuxtLink>
              </li>
              <li class="nav-item relative group" :class="{ 'productsMenuOpen': productsMenuOpen }">
                <div class="flex items-center cursor-pointer">
                  <NuxtLink to="/products" @click="mobileMenuOpen = false"
                    :class="{ 'active-link': $route.path === '/products' || $route.path.startsWith('/products/') }">
                    Products</NuxtLink>
                  <button @click.prevent="toggleProductsMenu" class="ml-1 text-xs">
                    <span class="arrow-down">▼</span>
                  </button>
                </div>
                <ul class="products-submenu" :class="{ 'is-visible': productsMenuOpen }">
                  <li class="submenu-item">
                    <NuxtLink to="/products/product-sample" @click="mobileMenuOpen = false; productsMenuOpen = false"
                      :class="{ 'active-link': $route.path === '/products/product-sample' }">Product Sample</NuxtLink>
                  </li>
                </ul>
              </li>
              <li class="nav-item relative group" :class="{ 'infoMenuOpen': infoMenuOpen }">
                <div class="flex items-center cursor-pointer">
                  <NuxtLink to="#" @click.prevent="toggleInfoMenu"
                    :class="{ 'active-link': $route.path === '/components' || $route.path === '/blog' || $route.path.startsWith('/case-studies') }">
                    Resources</NuxtLink>
                  <button @click.prevent="toggleInfoMenu" class="ml-1 text-xs">
                    <span class="arrow-down">▼</span>
                  </button>
                </div>
                <ul class="products-submenu" :class="{ 'is-visible': infoMenuOpen }">
                  <li class="submenu-item">
                    <NuxtLink to="/blog" @click="mobileMenuOpen = false; infoMenuOpen = false"
                      :class="{ 'active-link': $route.path === '/blog' || $route.path.startsWith('/posts') }">Blog
                    </NuxtLink>
                  </li>
                  <li class="submenu-item">
                    <NuxtLink to="/components" @click="mobileMenuOpen = false; infoMenuOpen = false"
                      :class="{ 'active-link': $route.path === '/components' }">UI Components</NuxtLink>
                  </li>
                  <li class="submenu-item">
                    <NuxtLink to="/case-studies" @click="mobileMenuOpen = false; infoMenuOpen = false"
                      :class="{ 'active-link': $route.path.startsWith('/case-studies') }">Case Study</NuxtLink>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <NuxtLink to="/about" @click="mobileMenuOpen = false"
                  :class="{ 'active-link': $route.path === '/about' }">About</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/contact" @click="mobileMenuOpen = false"
                  :class="{ 'active-link': $route.path === '/contact' }">Contact</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main class="site-main px-0 w-full flex-grow" :style="{ paddingTop: isScrolled ? '60px' : '72px' }">
      <div class="w-11/12 max-w-screen-lg mx-auto my-0 ">
        <slot />
      </div>
    </main>

    <footer class="site-footer bg-zinc-900 text-zinc-400 text-center text-sm py-6 mt-16">
      <div class="max-w-screen-lg mx-auto my-0 relative z-10">
        <p>&copy; {{ new Date().getFullYear() }} Company Name. All rights reserved.</p>
        <div class="footer-links mt-2">
          <NuxtLink to="/contact" class="text-zinc-400 hover:text-zinc-200 ">Contact Us</NuxtLink> &dash;
          <NuxtLink to="/privacy-policy" class="text-zinc-400 hover:text-zinc-200">Privacy Policy</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false);
const productsMenuOpen = ref(false);
const infoMenuOpen = ref(false);
const isDesktop = ref(false);
const isScrolled = ref(false);
const route = useRoute();

// Handle scroll events to modify header appearance
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

// Watch for route changes to reset mobile menu and restore scrolling
watch(() => route.path, () => {
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
    document.body.style.overflow = '';
  }
  productsMenuOpen.value = false;
  infoMenuOpen.value = false;
  // Ensure we're scrolled to the top of the new page
  window.scrollTo(0, 0);
});

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial scroll position
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
  window.removeEventListener('scroll', handleScroll);
  // Ensure we clean up any overflow changes when component is unmounted
  document.body.style.overflow = '';
});

const checkScreenSize = () => {
  isDesktop.value = window.innerWidth > 768;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const toggleProductsMenu = (event) => {
  event.stopPropagation();
  productsMenuOpen.value = !productsMenuOpen.value;
};

const toggleInfoMenu = (event) => {
  event.stopPropagation();
  infoMenuOpen.value = !infoMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
};
</script>
<style scoped>
.nuxt-site {
  flex-direction: column;
}

.site-footer {
  position: relative;
  overflow: hidden;
}

.sticky-header {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  transition: all 0.3s ease;
  height: auto;
}

.sticky-header.scrolled {
  @apply py-0 shadow-lg bg-zinc-900/90;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.sticky-header.scrolled .logo img {
  @apply my-1;
  height: 38px; /* Slightly smaller logo when scrolled */
  width: auto;
}

.sticky-header .logo img {
  height: 45px;
  width: auto;
  transition: all 0.3s ease;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.mobile-menu-toggle span {
  @apply bg-primary-50;
  width: 100%;
  height: 3px;
  transition: all 0.3s ease;
}

/* Improved Nav List Styling */
.main-nav .nav-list {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin: 0;
  padding: 0;
}

.main-nav .nav-item {
  @apply list-none;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
}

.main-nav .nav-item a {
  @apply text-zinc-50;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.03em;
  font-size: 0.8rem;
  line-height: 1;
  padding: 0.5rem 0;
  display: inline-block;
  text-align: left;
  white-space: nowrap;
}

/* Products Menu specific styles */
.main-nav .nav-item.relative.group .flex.items-center {
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
}

.main-nav .nav-item.relative.group .flex.items-center a {
  padding: 0.5rem 0;
  text-align: left;
}

/* Products Submenu Styles - Base & Desktop */
.products-submenu {
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  z-index: 40;
  display: flex;
  flex-direction: column;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, transform 0.2s ease-in-out;
  margin: 0;
  padding: 0.5rem 0;

  /* Desktop specific styles */
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #18181b;
  /* bg-zinc-900 */
  border: 1px solid #3f3f46;
  /* border-zinc-700 */
  border-radius: 0.5rem;
  transform: translateY(-10px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.products-submenu.is-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

@media (min-width: 769px) {
  .group:hover .products-submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

.products-submenu .submenu-item {
  width: 100%;
  display: block;
  margin: 0;
}

.products-submenu .submenu-item a {
  @apply text-zinc-50;
  display: block;
  padding: 0.5rem 1rem;
  white-space: nowrap;
  text-transform: none;
  letter-spacing: normal;
  font-weight: normal;
  width: 100%;
  text-align: left;
  line-height: 1.5;
  margin: 0;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.products-submenu a:hover {
  @apply bg-zinc-800 text-primary-500;
}

.arrow-down {
  transition: transform 0.2s ease;
}

.is-visible .arrow-down {
  transform: rotate(180deg);
}

/* Hide dropdown arrows in desktop view */
@media (min-width: 769px) {
  .arrow-down {
    display: none;
  }
}

/* Mobile Menu Styles */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
    z-index: 40;
  }

  /* Menu backdrop should fill the entire screen and be behind the menu */
  .menu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }

  .main-nav {
    @apply bg-zinc-900/95;
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    max-width: 320px;
    height: 100vh;
    padding: 5rem 1.5rem 2rem;
    transition: right 0.3s ease;
    z-index: 40;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
  }

  .main-nav.is-open {
    right: 0;
  }

  .main-nav .nav-list {
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
    width: 100%;
  }

  .main-nav .nav-item {
    margin: 0;
    padding: 0;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .main-nav .nav-item:last-child {
    border-bottom: none;
  }

  .main-nav a {
    display: block;
    font-size: 1rem;
    padding: 1rem 0;
    width: 100%;
  }

  /* Mobile submenu styles */
  .nav-item.relative.group {
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
  }

  .nav-item.relative.group .flex.items-center {
    width: 100%;
    justify-content: space-between;
    padding: 0;
  }

  .nav-item.relative.group .flex.items-center a {
    flex: 1;
  }

  .products-submenu {
    position: static;
    background-color: rgba(255, 255, 255, 0.05);
    border: none;
    width: 100%;
    padding: 0;
    margin: 0;
    box-shadow: none;
    max-height: 0;
    overflow: hidden;
    transform: none;
    transition: max-height 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
    z-index: 41;
  }

  .products-submenu.is-visible {
    max-height: 500px;
    opacity: 1;
    visibility: visible;
    padding: 0.5rem 0;
    margin: 0.25rem 0 0.5rem;
  }

  .products-submenu .submenu-item {
    padding: 0;
    margin: 0;
  }

  .products-submenu a {
    padding: 0.75rem 1rem 0.75rem 1.5rem;
    font-size: 0.9rem;
  }

  .products-submenu a:hover,
  .products-submenu a:active,
  .products-submenu a:focus {
    @apply bg-zinc-800 text-primary-500;
  }
}

/* Active link styling */
.main-nav .nav-list .nav-item a.active-link {
  @apply text-primary-500;
  font-weight: 600;
  position: relative;
}

@media (min-width: 769px) {
  .main-nav .nav-list .nav-item a.active-link::after {
    display: none;
  }
}

/* Hide underline when submenu is open */
.productsMenuOpen .flex.items-center .active-link::after,
.nav-item.relative.group:has(.products-submenu.is-visible) .active-link::after,
.main-nav a:hover::after {
  display: none;
}

/* Products submenu active link styling */
.products-submenu .submenu-item a.active-link {
  @apply text-primary-500 font-semibold bg-zinc-800;
}

.products-submenu .active-link::after {
  display: none;
}
</style>

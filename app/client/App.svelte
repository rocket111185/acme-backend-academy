<script>
  import { Router, Route } from 'svelte-routing';
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'sveltestrap/src';
  import RouterLink from './components/NavLink.svelte';
  import Home from './routes/Home.svelte';
  import About from './routes/About.svelte';
  import Blog from './routes/Blog.svelte';

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = '/';

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Router url="{url}">
  <Navbar color="light" light expand="sm">
    <NavbarBrand>
      <RouterLink color="primary" to="/">OSF Project</RouterLink>
    </NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="sm" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem>
          <NavLink>
            <RouterLink to="about">About</RouterLink>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <RouterLink to="blog">Blog</RouterLink>
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
  <div>
    <Route path="about" component="{About}" />
    <Route path="blog/*" component="{Blog}" />
    <Route path="/" component="{Home}" />
  </div>
  The link is {url}
</Router>

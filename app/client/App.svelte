<script>
  import { Router, Route } from "svelte-routing";
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'sveltestrap';
  import RouterLink from "./components/NavLink.svelte";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Blog from "./routes/Blog.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<svelte:head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
</svelte:head>

<Router url="{url}">
  <Navbar color="light" light expand="md">
    <NavbarBrand>
      <RouterLink to="/">OSF Project</RouterLink>
    </NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
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
  <!--
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="about">About</NavLink>
    <NavLink to="blog">Blog</NavLink>
  </nav>
  -->
  <div>
    <Route path="about" component="{About}" />
    <Route path="blog/*" component="{Blog}" />
    <Route path="/" component="{Home}" />
  </div>
</Router>

<script>
  import { Link } from "svelte-routing";
  import { Button } from 'sveltestrap';

  export let to = "";
  let color = 'light';

  function getProps({ href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ?
      isCurrent :
      isPartiallyCurrent || isCurrent;

    color = (isActive) ? 'danger': 'light';
    const linkClass = `navlink ${(isActive) ? 'navlink-active' : ''}`;
    return { class: linkClass };
  }
</script>

<style>
  :global(.navlink) {
    color: black;
    text-decoration: none;
  }

  :global(.navlink-active){
    color: white;
  }
</style>

<Button {color}>
  <Link to="{to}" getProps="{getProps}">
    <slot />
  </Link>
</Button>
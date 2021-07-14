<script>
  import { Link } from "svelte-routing";
  import { Button } from 'sveltestrap/src';

  export let to = "";
  export let color = "light";
</script>

<style>
  :global(.navlink) {
    text-decoration: none;
  }
</style>

<Link to="{to}" class="navlink">
  <Button {color} block>
    <slot />
  </Button>
</Link>

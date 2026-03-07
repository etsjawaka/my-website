<script lang="ts">
  let visible = false;

  // action that forwards intersection entries to a callback
  function observe(node: HTMLElement) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        visible = true;
        observer.unobserve(node);
      }
    });

    observer.observe(node);

    return {
      destroy() {
        observer.unobserve(node);
      }
    };
  }
</script>

<div use:observe class:visible={visible}>
  <slot />
</div>

<style>
  div {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
  }
  .visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
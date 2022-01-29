<template>
  <div>
    <Toast />

    <h5>Inline</h5>
    <Menu :model="items" />

    <h5>Overlay</h5>
    <Button type="button" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
  </div>
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
    const menu = ref();
    const items = ref([
      {
        label: 'DataTableFilterDemo',
        to: '/DataTableFilterDemo'
      },
      {
        label: 'StockArne',
        to: '/DataTableStockArne'
      },
      {
        label: 'DataTableStateDemo',
        to: '/DataTableStateDemo'
      }
    ]);

    const toggle = (event) => {
      menu.value.toggle(event);
    };

    return {items, menu, toggle}
  }
}
</script>


<template>
  <div class="card">
    <div class="container">
      <div class="icon">
        <i :class="icon"></i>
      </div>
      <div class="infov">
        <span class="info">
          <slot></slot>
        </span>
        <span class="valor">{{valor}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["valor", "icon"],
};
</script>

<style>
.card {
  height: 120px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  overflow: auto;
  min-width: 300px; 
  max-width: 300px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

span {
  display: block;
}

.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.infov {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}
.valor {
  color: white;
  font-family: "Roboto";
  font-weight: 400;
  font-size: 1.2em;
}
.info {
  color:white;
  font-weight: 300;
  font-size: 1.2em;
}
.icon {
  color: #e0e2db;
  border-right: 2px dashed white;
  height: 120px;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
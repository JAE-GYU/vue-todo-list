<template>
  <div id="app">    
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./assets/style/normalize.css";

#app {
  width: 100%;
  height: 100%;
}

* {
  font-size: 14px;
}

html, body {
  height: 100%;    
}

body {
  overflow: hidden;
}

.flex-container { 
  display: flex;    
  flex-direction: row;
}
</style>

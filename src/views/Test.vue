<template>
  <div>
    test
    <div class="outer">
      <div class="t-hover">
        <span>鼠标放在我上面</span>

        <ul class="t-ul">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.outer {
  position: relative;
}

.t-hover {
  position: relative;
}

.t-ul {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100px;
  display: none;
}
.outer ul li {
  height: 28px;
  line-height: 30px;
  border: 1px solid red;
}
.t-hover:hover .t-ul {
  display: block !important;
}
</style>
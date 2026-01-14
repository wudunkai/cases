<template>
  <div>
    {{ isDark }}
    <button @click="toggleDark()">切换外观</button>
    <p>移动鼠标查看坐标（使用 @vueuse/core 的 useMouse）：</p>
    <div
      style="
        height: 300px;
        border: 1px dashed #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <div>
        <div>X: {{ x.toFixed(0) }}</div>
        <div>Y: {{ y.toFixed(0) }}</div>
      </div>
    </div>
    <input type="text" />
    <div>当前页面可见性状态: {{ visibility }}</div>
    <div v-if="visibility === 'hidden'">用户已切换到其他标签页</div>
    <div ref="el" :style="style" style="position: fixed">
      Drag me! I am at {{ x }}, {{ y }}
    </div>
  </div>
</template>

<script setup lang="ts">
import * as user from "@/api";
// const { x, y } = useMouse();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const activeElement = useActiveElement();
watch(activeElement, (el) => {
  console.log("focus changed to", el);
});

const visibility = useDocumentVisibility();
const isVisible = computed(() => visibility.value === "visible");
const isHidden = computed(() => visibility.value === "hidden");
watch(visibility, (newVal) => {
  if (newVal === "visible") {
    console.log("用户回到页面");
    // 恢复轮询、动画等
  } else if (newVal === "hidden") {
    console.log("用户离开页面");
    // 暂停耗性能的操作
  }
});

const el = useTemplateRef("el");
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
});

const data = user.useUserList();
// data.execute()

</script>

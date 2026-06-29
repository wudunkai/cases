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
    <div ref="el1" :style="style" style="position: fixed">
      Drag me! I am at {{ x }}, {{ y }}
    </div>
    <input
      type="file"
      accept="image/*"
      @change="(e) => (selectedFile = e.target.files?.[0])"
    />
    <img
      v-if="previewUrl"
      :src="previewUrl"
      alt="Preview"
      style="max-width: 300px; margin-top: 10px"
    />
    <div ref="el2" style="width: 300px; height: 200px; background: #f0f0f0">
      滑动我！
    </div>
    <a-input v-model:value="name" />
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

const el1 = useTemplateRef("el1");
const { x, y, style } = useDraggable(el1, {
  initialValue: { x: 40, y: 40 },
});

const data = user.useUserList();
// data.execute()

const injectedValue = injectLocal("MyInjectionKey");
console.log(injectedValue); // injectedValue === 1

const selectedFile = ref(null);
const previewUrl = useObjectUrl(selectedFile);

const el2 = ref<HTMLElement | null>(null);
const {
  isSwiping,
  direction, // 'left' | 'right' | 'up' | 'down'
  lengthX, // X 轴滑动距离（带符号）
  lengthY, // Y 轴滑动距离（带符号）
  stop, // 停止监听（可选）
} = useSwipe(el2, {
  threshold: 50, // 滑动超过 50px 才触发方向判定
  onSwipe(e) {
    console.log("正在滑动:", direction.value);
  },
  onSwipeEnd(e) {
    console.log("滑动结束，方向:", direction.value);
    if (direction.value === "left") {
      // 左滑逻辑
    }
  },
});

const props = defineProps({
  name: String,
});
const emit = defineEmits(["update:name"]);
// ✅ 核心：自动创建可写的 refs
const { name } = useVModels(props, emit);
</script>

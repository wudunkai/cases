import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  // hostname: "https://mister-hope.github.io",
  author: {
    name: "20200124",
    url: "/",
  },
  iconAssets: "iconfont",
  logo: "/logo.webp",
  repo: "wudunkai/cases/blog",
  repoId: "MDEwOlJlcG9zaXRvcnkzNjQ3OTc1Mzg=",
  category: "General",
  categoryId: "DIC_kwDOFb5eYs4CUuYR",
  docsDir: "blog",
  blog: {
    medias: {
      GitHub: "https://github.com/wudunkai",
    },
  },
  darkmode: "toggle",
  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "你已经到达了世界的尽头",

      displayFooter: true,

      blog: {
        description: "一个不对劲的前端开发者",
        intro: "/",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },
  plugins: {
    blog: true,

    comment: {
      // @ts-ignore
      provider: "Giscus",
    },

    // Disable features you don’t want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});

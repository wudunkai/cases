import { message } from "ant-design-vue";

const CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "/base",
  timeout: 10000,
};

interface UseApiOptions extends Omit<RequestInit, "body"> {
  immediate?: boolean;
  showErrorMsg?: boolean;
  params?: Record<string, any>;
  data?: Record<string, any> | any[]; // 用于 body
}

export function useApi<T = any>(url: string, options: UseApiOptions = {}) {
  const {
    params,
    data,
    immediate = true,
    showErrorMsg = true,
    headers: customHeaders = {},
    method = data !== undefined ? "POST" : "GET",
    ...rest
  } = options;

  // 构建 URL with params
  let fullUrl = `${CONFIG.baseURL}${url.startsWith("/") ? url : "/" + url}`;
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    fullUrl += `?${searchParams.toString()}`;
  }

  // 注入 token
  const token = localStorage.getItem("token");
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const headers = {
    ...customHeaders,
    ...authHeader,
  };

  // ✅ 核心：根据 method 动态调用链式方法
  let fetcher = useFetch(fullUrl, {
    immediate,
    headers,
    timeout: CONFIG.timeout,
    afterFetch(ctx) {
      if (typeof ctx.data === "string") {
        try {
          ctx.data = JSON.parse(ctx.data);
        } catch {}
      }
      return ctx;
    },
    onFetchError() {
      if (showErrorMsg) {
        message.error("请求失败");
      }
    },
  })

  // 👇 关键：不能用字符串 method，必须用具体方法
  if (method.toUpperCase() === "GET") {
    fetcher = fetcher.get();
  } else if (method.toUpperCase() === "POST") {
    fetcher = data !== undefined ? fetcher.post(data) : fetcher.post();
  } else if (method.toUpperCase() === "PUT") {
    fetcher = data !== undefined ? fetcher.put(data) : fetcher.put();
  } else if (method.toUpperCase() === "DELETE") {
    fetcher = fetcher.delete();
  } else {
    // fallback: 默认 GET
    fetcher = fetcher.get();
  }

  // 响应按 JSON 解析
  fetcher = fetcher.json();

  return {
    data: fetcher.data as Ref<T | null>,
    error: fetcher.error,
    loading: fetcher.isFetching,
    execute: fetcher.execute,
    abort: fetcher.abort,
  };
}

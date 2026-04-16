import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const isProd = import.meta.env.PROD;

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (isProd ? "https://basogolhive.com/" : "http://127.0.0.1:8000");

const API_PREFIX = import.meta.env.VITE_API_PREFIX ?? "";

export const api = (path) => `${API_BASE}${API_PREFIX}${path}`;

export const toQueryString = (params = {}) => {
  const sp = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return;
    }

    if (Array.isArray(value)) {
      sp.set(key, value.join(","));
    } else {
      sp.set(key, String(value));
    }
  });

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
};

const parseJsonSafe = async (res) => {
  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  const text = await res.text();
  return text || null;
};

const memoryCache = new Map();

export function useFetchQuery(url, options = {}) {
  const {
    params,
    deps = [],
    keepPreviousData = true,
    debounceMs = 0,
    select,
    fetchInit,
    enabled = true,
    onSuccess,
    onError,
  } = options;

  const key = useMemo(() => {
    return `${url}${toQueryString(params)}`;
  }, [url, params]);

  const [state, setState] = useState({
    data: keepPreviousData && memoryCache.has(key) ? memoryCache.get(key) : null,
    loading: enabled ? !memoryCache.has(key) : false,
    error: null,
  });

  const abortRef = useRef(null);
  const timerRef = useRef(null);

  const run = useCallback(async () => {
    if (!enabled || !url) return;

    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    if (!keepPreviousData || !memoryCache.has(key)) {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));
    }

    try {
      const response = await fetch(`${url}${toQueryString(params)}`, {
        headers: {
          Accept: "application/json",
          ...(fetchInit?.body instanceof FormData
            ? {}
            : { "Content-Type": "application/json" }),
          ...(fetchInit?.headers || {}),
        },
        ...fetchInit,
        signal: controller.signal,
      });

      const raw = await parseJsonSafe(response);

      if (!response.ok) {
        const message =
          raw?.message ||
          raw?.detail ||
          raw?.error ||
          `HTTP ${response.status}`;
        throw new Error(message);
      }

      const data = select ? select(raw) : raw;

      memoryCache.set(key, data);

      setState({
        data,
        loading: false,
        error: null,
      });

      onSuccess?.(data);
    } catch (error) {
      if (error?.name === "AbortError") return;

      const message = error?.message || "Une erreur est survenue";

      setState((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }));

      onError?.(message);
    }
  }, [
    enabled,
    url,
    params,
    keepPreviousData,
    key,
    select,
    fetchInit,
    onSuccess,
    onError,
  ]);

  const refetch = useCallback(() => {
    memoryCache.delete(key);
    run();
  }, [key, run]);

  useEffect(() => {
    if (!enabled || !url) {
      abortRef.current?.abort();
      if (timerRef.current) clearTimeout(timerRef.current);
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    if (debounceMs > 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(run, debounceMs);
    } else {
      run();
    }

    return () => {
      abortRef.current?.abort();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [run, debounceMs, enabled, url, ...deps]);

  return { ...state, refetch };
}

/* =========================================================
   API HELPERS
========================================================= */

export async function postJson(path, payload) {
  const response = await fetch(api(path), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(
      data?.message || data?.detail || data?.error || `HTTP ${response.status}`
    );
  }

  return data;
}

/* =========================================================
   CONTACT
========================================================= */

export async function sendContactMessage(payload) {
  return postJson("/api/contact/", payload);
}

/* =========================================================
   NEWSLETTER
========================================================= */

export async function subscribeNewsletter(payload) {
  return postJson("/api/newsletter/", payload);
}
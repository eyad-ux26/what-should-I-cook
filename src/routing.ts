import { useSyncExternalStore } from "react";

/**
 * Tiny shared path store so more than one part of the app (the router in
 * Root, the language provider) can react to the current URL. pushState does
 * not fire any event, so navigation goes through navigate() which notifies
 * subscribers; Back/Forward comes in via popstate.
 */

const listeners = new Set<() => void>();
let popstateAttached = false;

/** "/ar/" and "/ar" are the same page; "/" stays "/". */
export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function notify(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (!popstateAttached) {
    window.addEventListener("popstate", notify);
    popstateAttached = true;
  }
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): string {
  return normalizePath(window.location.pathname);
}

export function navigate(url: string): void {
  window.history.pushState(null, "", url);
  notify();
}

export function usePathname(): string {
  return useSyncExternalStore(subscribe, getSnapshot, () => "/");
}

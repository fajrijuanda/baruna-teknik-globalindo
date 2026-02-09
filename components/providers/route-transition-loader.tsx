"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoadingScreen } from "@/components/ui/loading-screen";

const MIN_VISIBLE_MS = 420;

export function RouteTransitionLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const routeKey = `${pathname}?${searchParams.toString()}`;

    const [isVisible, setIsVisible] = useState(false);
    const mountedRef = useRef(false);
    const visibleSinceRef = useRef<number>(0);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevRouteKeyRef = useRef(routeKey);

    const showLoader = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }

        setIsVisible((current) => {
            if (!current) visibleSinceRef.current = Date.now();
            return true;
        });
    };

    const hideLoaderWithMinimumDuration = () => {
        const elapsed = Date.now() - visibleSinceRef.current;
        const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => {
            setIsVisible(false);
            hideTimerRef.current = null;
        }, remaining);
    };

    useEffect(() => {
        const onDocumentClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
            if (!anchor) return;

            if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

            const href = anchor.getAttribute("href");
            if (!href) return;
            if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

            const nextUrl = new URL(anchor.href, window.location.origin);
            if (nextUrl.origin !== window.location.origin) return;

            const currentKey = `${window.location.pathname}?${window.location.search.replace("?", "")}`;
            const nextKey = `${nextUrl.pathname}?${nextUrl.search.replace("?", "")}`;

            if (currentKey !== nextKey) showLoader();
        };

        const onPopState = () => showLoader();

        document.addEventListener("click", onDocumentClick, true);
        window.addEventListener("popstate", onPopState);
        return () => {
            document.removeEventListener("click", onDocumentClick, true);
            window.removeEventListener("popstate", onPopState);
        };
    }, []);

    useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true;
            prevRouteKeyRef.current = routeKey;
            return;
        }

        if (prevRouteKeyRef.current !== routeKey) {
            prevRouteKeyRef.current = routeKey;

            if (!isVisible) showLoader();
            hideLoaderWithMinimumDuration();
        }
    }, [routeKey, isVisible]);

    useEffect(() => {
        return () => {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, []);

    if (!isVisible) return null;

    return <LoadingScreen />;
}

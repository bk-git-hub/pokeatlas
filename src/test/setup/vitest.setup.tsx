import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import type { AnchorHTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

import { server } from "@/test/msw/server";

type NextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  href: string | { pathname?: string } | undefined;
};

type NextImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string | { src?: string };
};

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

vi.mock("next/link", () => ({
  default: function MockLink({ children, href, ...props }: NextLinkProps) {
    const resolvedHref =
      typeof href === "string" ? href : href?.pathname ?? "";

    return (
      <a href={resolvedHref} {...props}>
        {children}
      </a>
    );
  },
}));

vi.mock("next/image", () => ({
  default: function MockImage({ src, alt = "", ...props }: NextImageProps) {
    const resolvedSrc = typeof src === "string" ? src : src.src ?? "";

    return <img alt={alt} src={resolvedSrc} {...props} />;
  },
}));

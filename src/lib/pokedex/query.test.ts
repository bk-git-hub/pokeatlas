import { describe, expect, it } from "vitest";

import { parseBrowsePage, parseBrowseQuery, parseBrowseType } from "./query";

describe("parseBrowsePage", () => {
  it("returns the requested page when it is a positive integer", () => {
    expect(parseBrowsePage({ page: "3" })).toBe(3);
  });

  it("falls back to page one for invalid values", () => {
    expect(parseBrowsePage({ page: "0" })).toBe(1);
    expect(parseBrowsePage({ page: "abc" })).toBe(1);
    expect(parseBrowsePage({ page: ["2", "3"] })).toBe(2);
  });
});

describe("parseBrowseQuery", () => {
  it("normalizes the browse query string", () => {
    expect(parseBrowseQuery({ q: "  PiKa  " })).toBe("pika");
    expect(parseBrowseQuery({})).toBe("");
  });
});

describe("parseBrowseType", () => {
  it("returns a normalized type filter when it is supported", () => {
    expect(parseBrowseType({ type: " Electric " })).toBe("electric");
  });

  it("falls back to null for unsupported or missing values", () => {
    expect(parseBrowseType({ type: "shadow" })).toBeNull();
    expect(parseBrowseType({ type: ["water", "fire"] })).toBe("water");
    expect(parseBrowseType({})).toBeNull();
  });
});

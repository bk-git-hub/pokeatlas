import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

function significantViolations(
  violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"],
) {
  return violations.filter(
    (violation) =>
      violation.impact === "serious" || violation.impact === "critical",
  );
}

test("home page and empty team builder route render as expected", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /a sharper pokeapi explorer with enough personality to feel like a real product/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /browse the pokedex/i }),
  ).toBeVisible();

  const homeA11yScan = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();

  expect(significantViolations(homeA11yScan.violations)).toEqual([]);

  await page.goto("/team-builder");

  await expect(
    page.getByRole("heading", {
      name: /draft a six-slot team/i,
    }),
  ).toBeVisible();
  await expect(page.getByText(/no pokemon added yet\./i)).toBeVisible();
  await expect(page.getByText(/6 slots/i)).toBeVisible();

  const teamBuilderA11yScan = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();

  expect(significantViolations(teamBuilderA11yScan.violations)).toEqual([]);
});

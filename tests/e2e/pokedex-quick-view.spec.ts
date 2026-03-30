import { expect, test } from "@playwright/test";

test("quick view opens as a modal from the pokedex grid", async ({ page }) => {
  await page.goto("/pokedex");

  await page.getByRole("link", { name: "Quick view" }).first().click();

  await expect(page.locator('[role="dialog"]')).toBeVisible();
  await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
  await expect(page).toHaveURL(/\/pokedex\?.*quick-view=/);
});

test("quick view closes back to the pokedex via button, escape, and backdrop", async ({
  page,
}) => {
  await page.goto("/pokedex");

  await page.getByRole("link", { name: "Quick view" }).first().click();
  await expect(page.locator('[role="dialog"]')).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  await expect(page).toHaveURL(/\/pokedex$/);

  await page.getByRole("link", { name: "Quick view" }).first().click();
  await expect(page.locator('[role="dialog"]')).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  await expect(page).toHaveURL(/\/pokedex$/);

  await page.getByRole("link", { name: "Quick view" }).first().click();
  await expect(page.locator('[role="dialog"]')).toBeVisible();

  await page.locator('[role="dialog"]').locator("xpath=..").click({
    position: { x: 4, y: 4 },
  });
  await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  await expect(page).toHaveURL(/\/pokedex$/);
});

test("open profile and direct hits still render the full detail page", async ({
  page,
}) => {
  await page.goto("/pokedex");

  await page.getByRole("link", { name: "Open profile" }).first().click();

  await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  await expect(page).toHaveURL(/\/pokedex\/[^/]+$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.goto("/pokedex/bulbasaur");

  await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  await expect(page).toHaveURL(/\/pokedex\/bulbasaur$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Bulbasaur" }),
  ).toBeVisible();
});

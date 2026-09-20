import { expect, test } from "@playwright/test";

test("scroll reveals settle without hiding content or retaining transforms", async ({ page }) => {
  await page.goto("/");
  const tile = page.locator('[aria-labelledby="community-heading"] [data-scroll-reveal="rise"]').last();
  await tile.scrollIntoViewIfNeeded();
  await expect(tile).toBeVisible();
  await expect.poll(() => tile.evaluate((node) => node.getAnimations().length)).toBe(0);
  await expect(tile).toHaveCSS("opacity", "1");
  await expect(tile).toHaveCSS("transform", "none");
  expect(await page.locator("body").evaluate((node) => node.scrollWidth <= innerWidth)).toBe(true);
});

test("gallery finishes rapid changes and removes outgoing images", async ({ page }) => {
  await page.goto("/products/mulberry-silk");
  await page.getByRole("button", { name: "Tampilkan gambar 2", exact: true }).click();
  await page.getByRole("button", { name: "Tampilkan gambar 1", exact: true }).click();
  await page.getByRole("button", { name: "Tampilkan gambar 2", exact: true }).click();
  await expect(page.getByRole("img", { name: /gambar 2/ })).toBeVisible();
  await expect(page.locator('[data-presence="exiting"]')).toHaveCount(0);
  await expect(page.getByRole("img", { name: /gambar 1/ })).toHaveCount(0);
});

test("cart removals finish and focus survives the empty-state transition", async ({ page }) => {
  await page.goto("/products/mulberry-silk");
  await page.getByRole("button", { name: "Tambah ke Keranjang", exact: true }).click();
  await expect(page.getByRole("button", { name: "Keranjang, 1 barang" })).toBeVisible();
  await page.getByRole("radio", { name: "Soft Beige", exact: true }).click();
  await page.getByRole("button", { name: "Tambah ke Keranjang", exact: true }).click();
  await expect(page.getByRole("button", { name: "Keranjang, 2 barang" })).toBeVisible();
  await page.goto("/cart");
  await page.getByRole("button", { name: "Hapus", exact: true }).first().click();
  await expect(page.locator('[data-presence="exiting"]')).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Hapus", exact: true })).toHaveCount(1);
  await page.getByRole("button", { name: "Hapus", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Cerita Anda dimulai di sini" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Keranjang Anda", exact: true })).toBeFocused();
  await expect(page.locator('[data-presence="exiting"]')).toHaveCount(0);
});

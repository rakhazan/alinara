import { expect, test } from "@playwright/test";

test("sidebar traps focus, expands nested navigation, and restores trigger", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Buka menu navigasi" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Jelajahi Alinara" });
  await expect(dialog).toBeVisible();
  const category = dialog.getByRole("button", { name: /Kategori Pilihan/ });
  await category.click();
  await expect(category).toHaveAttribute("aria-expanded", "true");
  await expect(dialog.getByRole("link", { name: /Semua Kategori/ })).toBeVisible();
  for (let i = 0; i < 15; i++) await page.keyboard.press("Tab");
  expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.locator("body").evaluate((node) => node.scrollWidth <= window.innerWidth)).toBe(true);
});

test("product radio, accordion, toast and cart popup work together", async ({ page }) => {
  await page.goto("/products/mulberry-silk");
  const radio = page.getByRole("radio", { name: "Soft Beige" });
  await radio.click();
  await expect(radio).toBeChecked();
  await page.getByRole("button", { name: "Panduan Perawatan" }).click();
  await expect(page.getByText("Ikuti petunjuk pada label produk.", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Tambah ke Keranjang", exact: true }).click();
  await expect(page.getByText("Produk ditambahkan ke keranjang.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Keranjang, 1 barang" }).click();
  const popup = page.getByRole("dialog", { name: "Ringkasan keranjang" });
  await expect(popup).toBeVisible();
  await expect(popup.getByText("Soft Beige · 1 pcs")).toBeVisible();
  await popup.getByRole("link", { name: "Lihat Semua (1)" }).click();
  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.getByRole("heading", { name: "Keranjang Anda" })).toBeVisible();
});

test("tabs support keyboard and filters use native form controls", async ({ page }) => {
  await page.goto("/");
  const all = page.getByRole("tab", { name: "Semua", exact: true });
  await all.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Pashmina", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toBeVisible();
  await page.goto("/products");
  await page.getByLabel("Cari produk").fill("Voal");
  await page.getByRole("checkbox", { name: "Hanya produk tersedia" }).check();
  await expect(page.getByRole("checkbox")).toBeChecked();
  await expect(page.getByText("2 karya ditemukan")).toBeVisible();
});

test("admin dialog saves fields and delete confirmation restores focus", async ({ page }) => {
  await page.goto("/admin/categories");
  const add = page.getByRole("button", { name: "+ Tambah Data" });
  await add.click();
  const dialog = page.getByRole("dialog", { name: "Tambah Kategori" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Judul / Nama *", { exact: true }).fill("Kategori UI Test");
  await dialog.getByLabel("Deskripsi", { exact: true }).fill("Konten untuk pengujian UI");
  await dialog.getByRole("button", { name: "Simpan", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(add).toBeFocused();
  const action = page.getByRole("button", { name: "Aksi Kategori UI Test", exact: true });
  await action.click();
  await page.getByRole("menuitem", { name: "Hapus / Arsipkan" }).click();
  const confirmation = page.getByRole("alertdialog");
  await expect(confirmation).toBeVisible();
  await confirmation.getByRole("button", { name: "Batal", exact: true }).click();
  await expect(confirmation).not.toBeVisible();
  await expect(action).toBeFocused();
  await action.click();
  await page.getByRole("menuitem", { name: "Hapus / Arsipkan" }).click();
  await page.getByRole("alertdialog").getByRole("button", { name: "Hapus", exact: true }).click();
  await expect(page.getByRole("button", { name: "Kategori UI Test", exact: true })).toHaveCount(0);
});

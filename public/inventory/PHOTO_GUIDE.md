# Inventory Photo Guide

Use **`data/inventory-photo-manifest.ts`** (and the CSV export below) as the single source of truth for inventory photos.

## Rules

1. **One photo per catalog item** — do not reuse the same file for multiple items.
2. **Use the exact filename from the manifest** — names are generated from the item title so nothing gets mixed up.
3. **Put each file in the correct category folder** under `public/inventory/`.
4. **Preferred format:** `.jpg` (`.png` and `.webp` also work if the slug matches).
5. **Do not rename items in the catalog** without updating the manifest / re-exporting the CSV.

## Folder structure

```
public/inventory/
├── av-equipment/
├── stage-and-power/
├── bar-equipment/
├── catering-equipment/
├── chairs-and-lounge/
├── dishware-and-glassware/
├── flooring/
├── lighting/
├── linens/
├── tables/
├── decor-and-structures/
└── tents/
```

## Example

| Item | Folder | Filename |
|------|--------|----------|
| Darkwood Chiavari Chair | `chairs-and-lounge/` | `darkwood-chiavari-chair.jpg` |
| 60" Round Table | `tables/` | `60-round-table.jpg` |
| Speaker Set | `av-equipment/` | `speaker-set.jpg` |

Full path on disk:

`public/inventory/chairs-and-lounge/darkwood-chiavari-chair.jpg`

## Checklist file

Regenerate the spreadsheet-friendly checklist anytime inventory changes:

```bash
node scripts/export-inventory-photo-checklist.mjs
```

This writes **`data/inventory-photo-checklist.csv`** — open in Excel or Google Sheets and mark rows as you upload photos.

## After uploading

1. Drop files into the paths listed in the CSV.
2. Commit the new images in `public/inventory/`.
3. Push to deploy — the site picks them up automatically (no code change needed if filenames match).

If a photo must use a different filename, set `image: "/inventory/..."` on that item in `data/inventory.ts` instead of renaming the catalog item.

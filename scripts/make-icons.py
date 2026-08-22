"""Rasterise the Edison mark into favicon, app icons and Open Graph image."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
BRAND = PUBLIC / "brand"
ASSETS = Path(
    r"C:\Users\2\.cursor\projects\c-Users-2-edison-law\assets"
    r"\c__Users_2_AppData_Roaming_Cursor_User_workspaceStorage"
    r"_d6366e02ac99fe52aac8cee3c8e7a948_images_edison-law-favicon"
    r"-2927f73c-0f8d-4ad8-afb3-7f5ead8fcb3c.png"
)

INK = (10, 32, 40, 255)
PAPER = (241, 246, 244, 255)
SIGNAL = (0, 141, 122, 255)


def load_mark() -> Image.Image:
    if ASSETS.exists():
        img = Image.open(ASSETS).convert("RGBA")
        return img
    # Fallback: draw the evidence-path E.
    img = Image.new("RGBA", (512, 512), INK)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((0, 0, 511, 511), radius=64, fill=INK)
    stroke = 32
    x = 104
    draw.rectangle((x, 80, x + stroke, 432), fill=PAPER)
    draw.rectangle((x, 96, 360, 96 + stroke), fill=PAPER)
    draw.rectangle((x, 240, 320, 240 + stroke), fill=PAPER)
    draw.rectangle((x, 384, 360, 384 + stroke), fill=PAPER)
    for cx, cy in ((376, 112), (336, 256), (376, 400)):
        draw.ellipse((cx - 20, cy - 20, cx + 20, cy + 20), fill=(56, 198, 176, 255))
    return img


def cover(src: Image.Image, size: int) -> Image.Image:
    src = src.convert("RGBA")
    ratio = max(size / src.width, size / src.height)
    resized = src.resize((round(src.width * ratio), round(src.height * ratio)), Image.Resampling.LANCZOS)
    out = Image.new("RGBA", (size, size), INK)
    out.alpha_composite(resized, ((size - resized.width) // 2, (size - resized.height) // 2))
    return out


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    mark = load_mark()

    sizes = {
        "favicon-16.png": 16,
        "favicon-32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }
    rasters = {}
    for name, size in sizes.items():
        img = cover(mark, size)
        dest = PUBLIC / name
        img.save(dest, "PNG")
        rasters[size] = img.convert("RGBA")
        print(f"wrote {name}")

    ico = PUBLIC / "favicon.ico"
    rasters[32].save(
        ico,
        format="ICO",
        sizes=[(16, 16), (32, 32)],
    )
    print("wrote favicon.ico")

    # Open Graph 1200x630 — midnight field, mark, wordmark area as geometry.
    og = Image.new("RGBA", (1200, 630), INK)
    draw = ImageDraw.Draw(og)
    tile = cover(mark, 220)
    og.alpha_composite(tile, (80, 205))
    # Quiet evidence rings
    cx, cy = 930, 315
    for r in (90, 150, 210):
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(0, 141, 122, 90), width=2)
    for pt in ((cx + 210, cy), (cx - 40, cy - 148), (cx - 130, cy + 120)):
        draw.ellipse((pt[0] - 7, pt[1] - 7, pt[0] + 7, pt[1] + 7), fill=SIGNAL)
    draw.rectangle((340, 250, 900, 258), fill=PAPER)
    draw.rectangle((340, 300, 780, 308), fill=PAPER)
    draw.rectangle((340, 350, 640, 358), fill=(169, 191, 186, 255))
    og.convert("RGB").save(PUBLIC / "og-image.png", "PNG", quality=95)
    print("wrote og-image.png")

    # Copy SVG favicon to web root name
    src_svg = BRAND / "edison-law-favicon.svg"
    if src_svg.exists():
        (PUBLIC / "favicon.svg").write_text(src_svg.read_text(encoding="utf-8"), encoding="utf-8")
        print("wrote favicon.svg")


if __name__ == "__main__":
    main()

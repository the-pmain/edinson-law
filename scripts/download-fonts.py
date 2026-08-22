"""Download self-hosted Latin WOFF2 files for Edison Law."""
from __future__ import annotations

import re
from pathlib import Path
from urllib.request import Request, urlopen

OUT = Path(__file__).resolve().parents[1] / "public" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

CSS_URL = (
    "https://fonts.googleapis.com/css2"
    "?family=Newsreader:opsz,wght@6..72,400;6..72,500"
    "&family=Manrope:wght@400;500;600"
    "&family=IBM+Plex+Mono:wght@400;500"
    "&display=swap"
)

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)

FAMILY_FILE = {
    "Newsreader": "newsreader-latin.woff2",
    "Manrope": "manrope-latin.woff2",
    "IBM Plex Mono": {
        "400": "ibm-plex-mono-400.woff2",
        "500": "ibm-plex-mono-500.woff2",
    },
}


def fetch(url: str) -> bytes:
    req = Request(url, headers={"User-Agent": UA})
    with urlopen(req, timeout=30) as res:
        return res.read()


def main() -> None:
    css = fetch(CSS_URL).decode("utf-8")
    blocks = re.split(r"(?=@font-face)", css)
    written: set[str] = set()

    for block in blocks:
        if "@font-face" not in block:
            continue
        if "latin" not in block or "latin-ext" in block:
            # Keep only the latin slice, not latin-ext.
            if not re.search(r"unicode-range:\s*U\+0000-00FF", block):
                continue

        family = re.search(r"font-family:\s*'([^']+)'", block)
        weight = re.search(r"font-weight:\s*([^;]+);", block)
        url = re.search(r"src:\s*url\(([^)]+)\)", block)
        if not family or not url:
            continue

        name = family.group(1)
        href = url.group(1).strip("'\"")
        mapping = FAMILY_FILE[name]
        if isinstance(mapping, dict):
            key = (weight.group(1).strip() if weight else "400").split()[0]
            filename = mapping.get(key)
        else:
            filename = mapping
        if not filename or filename in written:
            continue

        dest = OUT / filename
        dest.write_bytes(fetch(href))
        written.add(filename)
        print(f"wrote {dest.name} ({dest.stat().st_size} bytes)")

    expected = {
        "newsreader-latin.woff2",
        "manrope-latin.woff2",
        "ibm-plex-mono-400.woff2",
        "ibm-plex-mono-500.woff2",
    }
    missing = expected - written
    if missing:
        raise SystemExit(f"missing font files: {missing}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Convert ff-source JPEGs to WebP for forge-future.com."""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/images/ff-source"
OUT = ROOT / "public/images"

# src, out, w, h, quality, y_focus (0=top, 0.5=center)
SPECS: list[tuple[str, str, int, int, int, float]] = [
    ("IMG_2170.jpeg", "ivan-founder-800.webp", 800, 800, 85, 0.0),
    ("ivan-pointing.jpeg", "ivan-pointing-600.webp", 600, 900, 88, 0.35),
    ("IMG_2170.jpeg", "og-forge-future-1200x630.webp", 1200, 630, 82, 0.12),
    ("IMG_2148.jpeg", "gallery/event-1.webp", 640, 400, 80, 0.2),
    ("IMG_2160.jpeg", "gallery/event-2.webp", 640, 400, 80, 0.15),
    ("IMG_2155.jpeg", "gallery/event-3.webp", 640, 400, 80, 0.1),
]


def cover_crop(
    im: Image.Image, target_w: int, target_h: int, y_focus: float = 0.5
) -> Image.Image:
    im = ImageOps.exif_transpose(im)
    src_w, src_h = im.size
    scale = max(target_w / src_w, target_h / src_h)
    nw, nh = int(src_w * scale), int(src_h * scale)
    resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = max(0, (nw - target_w) // 2)
    top = int((nh - target_h) * y_focus)
    top = max(0, min(top, nh - target_h))
    return resized.crop((left, top, left + target_w, top + target_h))


def main() -> None:
    for src_name, out_name, w, h, quality, y_focus in SPECS:
        src_path = SRC / src_name
        if not src_path.exists():
            raise FileNotFoundError(src_path)
        out_path = OUT / out_name
        with Image.open(src_path) as im:
            cropped = cover_crop(im, w, h, y_focus=y_focus)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            cropped.save(out_path, "WEBP", quality=quality, method=6)
            print(
                f"{src_name} -> {out_path.relative_to(ROOT)} "
                f"({w}x{h}, y={y_focus})"
            )


if __name__ == "__main__":
    main()

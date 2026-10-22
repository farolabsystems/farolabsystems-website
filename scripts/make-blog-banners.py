"""Editorial blog banners in the site palette. No stock photos."""
from PIL import Image, ImageDraw

W, H = 1600, 900
GREEN = (0, 210, 134, 255)
GREEN_DEEP = (0, 156, 99, 255)
CREAM = (243, 241, 235, 255)
INK = (51, 51, 51, 255)
WHITE = (255, 255, 255, 255)
SOFT = (237, 233, 226, 255)
TEAL = (8, 148, 158, 255)
OUT = r"c:\workspace\demo-website\public\assets\covers"


def canvas(color):
    return Image.new("RGBA", (W, H), color)


def glow(base, center, radius, color):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    cx, cy = center
    steps = 28
    for i in range(steps, 0, -1):
        t = i / steps
        r = int(radius * t)
        alpha = int(color[3] * (1 - t) ** 2)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(color[0], color[1], color[2], alpha))
    return Image.alpha_composite(base, layer)


def save(image, name):
    image.convert("RGB").save(f"{OUT}\\{name}", "PNG", optimize=True)


def banner_ai():
    im = canvas((28, 32, 31, 255))
    im = glow(im, (1180, 220), 520, (0, 210, 134, 90))
    im = glow(im, (280, 720), 280, (8, 148, 158, 50))
    draw = ImageDraw.Draw(im)
    nodes = [(980, 180), (1180, 280), (1320, 160), (1080, 460), (1280, 520), (1460, 360), (900, 640)]
    for a, b in [(0, 1), (1, 2), (1, 3), (3, 4), (4, 5), (3, 6), (0, 3)]:
        draw.line([nodes[a], nodes[b]], fill=(0, 210, 134, 180), width=3)
    for x, y in nodes:
        draw.ellipse((x - 14, y - 14, x + 14, y + 14), fill=GREEN)
        draw.ellipse((x - 6, y - 6, x + 6, y + 6), fill=WHITE)
    draw.rounded_rectangle((72, 72, 220, 84), radius=6, fill=GREEN)
    save(im, "banner-1.png")


def banner_scale():
    im = canvas(CREAM)
    im = glow(im, (1280, 160), 360, (0, 210, 134, 70))
    draw = ImageDraw.Draw(im)
    panels = [
        (860, 180, 1460, 760, SOFT),
        (940, 250, 1500, 700, WHITE),
        (1020, 330, 1420, 640, GREEN),
    ]
    for box in panels:
        draw.rounded_rectangle(box[:4], radius=36, fill=box[4])
    draw.rounded_rectangle((72, 72, 220, 84), radius=6, fill=GREEN_DEEP)
    save(im, "banner-2.png")


def banner_modernize():
    im = canvas(CREAM)
    draw = ImageDraw.Draw(im)
    draw.rectangle((0, 0, 760, H), fill=INK)
    for col in range(4):
        for row in range(5):
            x = 120 + col * 140 + (row % 2) * 18
            y = 140 + row * 130
            draw.rounded_rectangle((x, y, x + 72, y + 72), radius=8, outline=(243, 241, 235, 90), width=3)
    for col in range(3):
        for row in range(3):
            x = 980 + col * 150
            y = 220 + row * 170
            fill = GREEN if (col + row) % 2 == 0 else GREEN_DEEP
            draw.rounded_rectangle((x, y, x + 110, y + 110), radius=18, fill=fill)
    draw.polygon([(700, 420), (860, 360), (860, 480)], fill=GREEN)
    save(im, "banner-3.png")


def banner_mvp():
    im = canvas(CREAM)
    im = glow(im, (1200, 700), 420, (0, 210, 134, 60))
    draw = ImageDraw.Draw(im)
    heights = [280, 400, 520, 660]
    colors = [GREEN_DEEP, GREEN, (0, 210, 134, 160), (0, 210, 134, 90)]
    for i, height in enumerate(heights):
        x = 860 + i * 160
        y = 760 - height
        draw.rounded_rectangle((x, y, x + 120, 760), radius=24, fill=colors[i])
    draw.ellipse((888, 760 - 280 - 70, 952, 760 - 280 - 6), fill=INK)
    draw.rounded_rectangle((72, 72, 220, 84), radius=6, fill=GREEN_DEEP)
    save(im, "banner-4.png")


def banner_stack():
    im = canvas((32, 36, 35, 255))
    im = glow(im, (200, 800), 300, (0, 210, 134, 40))
    draw = ImageDraw.Draw(im)
    layers = [
        (820, 150, 1480, 270, CREAM),
        (860, 300, 1460, 420, GREEN),
        (900, 450, 1440, 570, TEAL),
        (940, 600, 1420, 720, WHITE),
    ]
    for box in layers:
        draw.rounded_rectangle(box[:4], radius=28, fill=box[4])
    draw.rounded_rectangle((72, 72, 220, 84), radius=6, fill=GREEN)
    save(im, "banner-5.png")


def banner_roadmap():
    im = canvas(CREAM)
    draw = ImageDraw.Draw(im)
    draw.line((900, 450, 1460, 450), fill=GREEN_DEEP, width=8)
    points = [900, 1080, 1260, 1460]
    for i, x in enumerate(points):
        r = 46 if i < 3 else 58
        fill = GREEN if i == 2 else INK
        draw.ellipse((x - r, 450 - r, x + r, 450 + r), fill=fill)
        inner = 16
        draw.ellipse((x - inner, 450 - inner, x + inner, 450 + inner), fill=CREAM if i != 2 else WHITE)
    draw.rounded_rectangle((72, 72, 220, 84), radius=6, fill=GREEN_DEEP)
    save(im, "banner-6.png")


if __name__ == "__main__":
    banner_ai()
    banner_scale()
    banner_modernize()
    banner_mvp()
    banner_stack()
    banner_roadmap()
    print("wrote 6 banners")

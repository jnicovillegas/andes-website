from PIL import Image, ImageEnhance
import sys

try:
    img = Image.open('assets/hero-bg-raw.jpg').convert('RGB')
    
    # 1. Desaturate heavily (almost B&W, but keep a tiny bit of color)
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(0.1)
    
    # 2. Darken the image
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(0.4)
    
    # 3. Increase contrast for that dramatic look
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.5)
    
    # 4. Shift color balance towards cool blue/cyan (cinematic)
    # Fast way: split channels and modify them slightly
    r, g, b = img.split()
    r = r.point(lambda i: i * 0.9)  # Less red
    b = b.point(lambda i: min(255, i * 1.1))  # More blue
    img = Image.merge('RGB', (r, g, b))
    
    img.save('assets/hero-bg-cinematic.jpg', quality=90)
    print("Success")
except Exception as e:
    print("Error:", e)

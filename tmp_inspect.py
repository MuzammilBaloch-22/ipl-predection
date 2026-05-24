from pathlib import Path
p = Path("dist/client/assets/index-DuwhFiw5.js")
text = p.read_text(encoding="utf8", errors="ignore")
print(text[41327:41327+300])

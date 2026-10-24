"""Subset a font to the given characters and rename it, writing WOFF2.

Usage: python3 scripts/subset_font.py SOURCE.ttf CHARS.txt OUT.woff2 "Family Name"
"""
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

source, chars_file, out, family = sys.argv[1:5]
font = TTFont(source)
options = subset.Options()
options.flavor = "woff2"
options.layout_features = ["*"]
options.name_IDs = ["*"]
subsetter = subset.Subsetter(options)
with open(chars_file, encoding="utf-8") as f:
    subsetter.populate(text=f.read())
subsetter.subset(font)
# A derived font may not carry the original name (IPA Font License 3.1.4).
name = font["name"]
for record in list(name.names):
    if record.nameID in (1, 3, 4, 6, 16, 17, 18, 21, 22):
        name.removeNames(nameID=record.nameID)
postscript = family.replace(" ", "") + "-Regular"
for name_id, value in {
    1: family,
    2: "Regular",
    3: postscript,
    4: family + " Regular",
    6: postscript,
}.items():
    name.setName(value, name_id, 3, 1, 0x409)
    name.setName(value, name_id, 1, 0, 0)
subset.save_font(font, out, options)

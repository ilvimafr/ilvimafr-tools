# Installation
```bash
npm install -g ./ilvimafr-tools/
```

# Rename multiple files using RegEx
Preview without renaming:
```bash
regex-rename "\[\d+?\](.+?)\.jpg" "#1.jpg"
```
Actual rename with flag `-replace`:
```bash
regex-rename "\[\d+?\](.+?)\.jpg" "#1.jpg" -replace
```
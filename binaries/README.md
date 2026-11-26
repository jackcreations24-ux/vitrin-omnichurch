# 📦 Dosye Fichye Enstalasyon OmniChurch (Binaries)

Mete fichye konpile aplikasyon w yo nan dosye sa a anvan w pibliye yon nouvo vèsyon sou GitHub:
- **`OmniChurch.apk`** (oswa nenpòt fichye `.apk` pou Android)
- **`OmniChurch-Setup-x64.exe`** (oswa nenpòt fichye `.exe` pou Windows PC)

Lè workflow GitHub Actions **`create_release.yml`** lanse:
1. Li konpile pwojè a (`npm run build`).
2. Li analize mesaj commit yo pou kreye yon **Changelog** otomatik.
3. Li atache tout fichye `.apk` ak `.exe` ki nan dosye sa a dirèkteman kòm **Assets** nan nouvo GitHub Release la.

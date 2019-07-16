# C9Media.net

A cross platform app to manage pictures on your computer and view them remotely using devices like a Pi + Display.

Built using [ElectronJS](https://electronjs.org/)
## Features

### Client

- Use Azure blob storage SAS tokens
- Cache images from Blob storage
- Create slideshow of cached images
- Swap Bootstrap carousel with [Slick](https://kenwheeler.github.io/slick/) *TBD*
- Run on start (of Raspberry Pi) *TBD*
- Apply `Ken Burns` effect to images that don't fit aspect ratio *TBD*


### Server (*Planned TBD*)

- Setup folders to watch out for image drops (e.g. `Downloads` folder)
- Run Apple script to convert images from HEIC to JPEG (Optional)
- Move converted images from drop folders to local upload folder
- Setup target Azure Blob storage location using SAS tokens
- Maintain a SQLite DB/JSON record of all files uploaded to Azure Blob storage
- Auto create albums based on Dates and allow renaming of albums
- Extract geo-location out of images and remove exif information if possible

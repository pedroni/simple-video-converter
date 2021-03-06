# Simple video converter


## Installation
```
npm install
```

### For MacOS
```sh
brew install ffmpeg
```
### For Windows
1. Download the binaries at https://www.ffmpeg.org/download.html
2. Extract the files to `C:\ffmpeg`
3. Make sure `C:\ffmpeg\bin` is present and contains the `ffmpeg.exe` file inside
4. Add to the PATH environment variables

## Usage example
```sh
npm run convert -- --from=avi --to=mp4 --folder=/Volumes/Disk/Videos
```

This will take all `.avi` files from `/Volumes/Disk/Videos` and convert them into `.mp4` there'll be a new folder `/Volumes/Disk/Videos/mp4` with all of the converted files.

> Make sure the path is absolute and not relational. Also you must have write access to the folder.
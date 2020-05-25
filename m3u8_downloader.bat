@echo off
:work
title M3U8 DOWNLOADER
set /p M3_URL=«Î ‰»Îm3u8µÿ÷∑:
title EXECUTING...
ffmpeg -i "%M3_URL%" -c  copy out.mp4
goto work
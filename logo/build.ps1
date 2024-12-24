& magick emblem_1920x1920.png -define icon:auto-resize="256,128,96,64,48,32,16" favicon.ico
& magick emblem_1920x1920.png -define icon:auto-resize="32" favicon_32x32.ico

& magick emblem_round_1920x1920.png -define icon:auto-resize="256,128,96,64,48,32,16" favicon_round.ico
& magick emblem_round_1920x1920.png -define icon:auto-resize="32" favicon_round_32x32.ico

& magick emblem_dark_1920x1920.png -define icon:auto-resize="256,128,96,64,48,32,16" favicon_dark.ico
& magick emblem_dark_1920x1920.png -define icon:auto-resize="32" favicon_dark_32x32.ico

& magick emblem_dark_round_1920x1920.png -define icon:auto-resize="256,128,96,64,48,32,16" favicon_dark.ico
& magick emblem_dark_round_1920x1920.png -define icon:auto-resize="32" favicon_dark_32x32.ico

# resize png to 1920x1920 to 512x512, 256x256, 192x192, 180x180, 152x152, 144x144, 120x120, 114x114, 96x96, 72x72, 60x60, 57x57, 48x48, 36x36, 32x32, 24x24, 16x16
ResizeImage -baseName "emblem" -originalResolution 1920 -targetResolutions 512,256,192,180,152,144,120,114,96,72,60,57,48,36,32,24,16

. ..\powershell.ps1

$resolutions = @(512, 256, 192, 180, 152, 144, 120, 114, 96, 72, 60, 57, 48, 36, 32, 24, 16)
$images = @(
    @{source="emblem_1920x1920.png"; target="emblem"},
    @{source="emblem_round_1920x1920.png"; target="emblem_round"},
    @{source="emblem_dark_1920x1920.png"; target="emblem_dark"},
    @{source="emblem_dark_round_1920x1920.png"; target="emblem_dark_round"}
)

foreach ($image in $images) {
    & magick $image.source -define icon:auto-resize="256,128,96,64,48,32,16" "$($image.target).ico"
    & magick $image.source -define icon:auto-resize="32" "$($image.target)_32x32.ico"
    ResizeImage -sourcePath $image.source -targetPathBase $image.target -targetResolutions $resolutions
}
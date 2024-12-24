Add-Type -AssemblyName System.Drawing
function ResizeImage {
    param (
        [string]$rootPath = (Get-Location).Path,
        [string]$baseName,
        [int]$originalResolution,
        [int[]]$targetResolutions
    )

    $file = Get-ChildItem -Path $rootPath -File -Filter "$($baseName)_${originalResolution}x${originalResolution}.png"
    
    foreach ($targetResolution in $targetResolutions) {
        $destination = Join-Path -Path $rootPath -ChildPath "$($baseName)_${targetResolution}x${targetResolution}.png"
        $image = [System.Drawing.Image]::FromFile($file.FullName)
        $newImage = $image.GetThumbnailImage($targetResolution, $targetResolution, $null, [System.IntPtr]::Zero)
        $newImage.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
        $newImage.Dispose()
    }
    
    $image.Dispose()
}
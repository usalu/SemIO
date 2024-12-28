Add-Type -AssemblyName System.Drawing
function ResizeImage {
    param (
        [string]$sourcePath,
        [string]$targetPathBase,
        [int[]]$targetResolutions
    )
    
    foreach ($targetResolution in $targetResolutions) {
        $image = [System.Drawing.Image]::FromFile($sourcePath)
        $newImage = $image.GetThumbnailImage($targetResolution, $targetResolution, $null, [System.IntPtr]::Zero)
        $targetPath = $targetPathBase + "_$targetResolution" + "x" + "$targetResolution.png"
        $newImage.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $image.Dispose()
        $newImage.Dispose()
    }
}
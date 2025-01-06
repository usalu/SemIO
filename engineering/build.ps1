# Create value list for Grasshopper MIME types

# Turns:
# Extension, MIME, Name
# .glb, GLTF Binary, Graphics Library Transmission Format Binary
# .gltf, GLTF JSON, Graphics Library Transmission Format JSON
# into:
# .glb     = "model/gltf-binary"
# .gltf    = "model/gltf+json"

$buildDir = ".\build"
if (-not (Test-Path -Path $buildDir)) {
    New-Item -ItemType Directory -Path $buildDir
}
$csv = Import-Csv -Path .\mimes.csv
$outputFilePath = Join-Path -Path $buildDir -ChildPath "mimes.txt"
$csv | ForEach-Object {
    $line = "$($_.Extension) = `"$($_.MIME)`""
    Write-Output $line
} | Out-File -FilePath $outputFilePath
# Create value list for Grasshopper MIME types and licenses

# Turns:
# Extension, MIME, Name
# .glb, GLTF Binary, Graphics Library Transmission Format Binary
# .gltf, GLTF JSON, Graphics Library Transmission Format JSON
# into:
# .glb     = "model/gltf-binary"
# .gltf    = "model/gltf+json"

# Turns:
# License, Name
# MIT, MIT License
# GPL-3.0, GNU General Public License v3.0
# into:
# MIT      = "MIT License"
# GPL-3.0  = "GNU General Public License v3.0"

$buildDir = ".\build"
if (-not (Test-Path -Path $buildDir)) {
    New-Item -ItemType Directory -Path $buildDir
}

# Process MIME types
$mimesCsv = Import-Csv -Path "..\..\meta\mimes.csv"
$mimeOutputFilePath = Join-Path -Path $buildDir -ChildPath "mimes.txt"
$mimesCsv | ForEach-Object {
    $line = "$($_.Extension) = `"$($_.MIME)`""
    Write-Output $line
} | Out-File -FilePath $mimeOutputFilePath

# Process licenses
$licensesCsv = Import-Csv -Path "..\..\meta\licenses.csv"
$licensesOutputFilePath = Join-Path -Path $buildDir -ChildPath "licenses.txt"
$licensesCsv | ForEach-Object {
    $line = "$($_.Name) = `"$($_.SPDX)`""
    Write-Output $line
} | Out-File -FilePath $licensesOutputFilePath
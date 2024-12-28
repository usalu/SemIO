$prefix = $args[0]
$newPrefix = $args[1]
#rename all files in the files that start with $prefix to $newPrefix
$files = Get-ChildItem -Path . -File -Filter "$prefix*"
foreach ($file in $files) {
    $newFileName = $file.Name -replace $prefix, $newPrefix
    Move-Item -Path $file.FullName -Destination $newFileName -Force
}
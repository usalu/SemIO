. ..\powershell.ps1

# build script for icons generated by https://www.favicongenerator.io/ and placed in temp folder and renamed.
$tempFolder = ".\temp"
if (Test-Path -Path $tempFolder) {
    $root = (Get-Item -Path $tempFolder).Parent

    # clear non-zip files in temp folder
    $files = Get-ChildItem -Path $tempFolder -Exclude *.zip
    foreach ($file in $files) {
        Remove-Item -Path $file.FullName -Recurse -Force
    }

    # extract all zip files inside temp folder
    $zipFiles = Get-ChildItem -Path $tempFolder -Filter *.zip
    foreach ($zipFile in $zipFiles) {
        $destinationFolder = Join-Path -Path $tempFolder -ChildPath ($zipFile.BaseName)
        Expand-Archive -Path $zipFile.FullName -DestinationPath $destinationFolder
    }

    # remove root folder FOLDERNAME\favicongenerator.io\** to FOLDERNAME\**
    $folders = Get-ChildItem -Path $tempFolder -Directory
    foreach ($folder in $folders) {
        $subFolders = Get-ChildItem -Path $folder.FullName -Directory
        foreach ($subFolder in $subFolders) {
            $files = Get-ChildItem -Path $subFolder.FullName -File
            foreach ($file in $files) {
                $destination = Join-Path -Path $folder.FullName -ChildPath $file.Name
                Move-Item -Path $file.FullName -Destination $destination -Force
            }
            Remove-Item -Path $subFolder.FullName -Recurse -Force
        }
    }

    # move all files that start with favicon to \..\.. folder and change favicon prefix to FOLDERNAME
    $folders = Get-ChildItem -Path $tempFolder -Directory
    foreach ($folder in $folders) {
        $files = Get-ChildItem -Path $folder.FullName -File -Filter "favicon*"
        foreach ($file in $files) {
            # replace - with _ in file name
            $newFileName = $file.Name -replace "-", ""
            #remove favicon prefix and prefix with folder .name
            $newFileName = $newFileName.Substring(7)
            if (-not $newFileName.StartsWith(".")) {
                $newFileName = $folder.Name + "_" + $newFileName
            }
            else {
                $newFileName = $folder.Name + $newFileName
            }
            $destination = Join-Path -Path $root.FullName -ChildPath $newFileName
            Move-Item -Path $file.FullName -Destination $destination -Force
        }
        Remove-Item -Path $folder.FullName -Recurse -Force
        $baseName = Join-Path -Path $root.FullName -ChildPath $folder.Name
        ResizeImage -sourcePath "$($baseName)_512x512.png" -targetPathBase $baseName -targetResolutions 256, 32, 24
    }
}


# copy all files with 24x24.png suffix to ..\dotnet\Semio.Grasshopper\Resources
$files = Get-ChildItem -Path $root.FullName -File -Filter "*_24x24.png"
foreach ($file in $files) {
    $destination = Join-Path -Path $root.Parent.FullName -ChildPath "dotnet\Semio.Grasshopper\Resources"
    Copy-Item -Path $file.FullName -Destination $destination -Force
}
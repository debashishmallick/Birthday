# Generates premium-toned placeholder JPGs — replace files in public/images with your personal photos (same filenames).
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot '..\public\images'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$names = @(
  'lockScreen', 'hero', 'intro', 'letter', 'finale', 'music', 'gift', 'scratch',
  'timeline-01', 'timeline-02', 'timeline-03', 'timeline-04',
  'gallery-01', 'gallery-02', 'gallery-03', 'gallery-04', 'gallery-05', 'gallery-06', 'gallery-07', 'gallery-08',
  'polaroid-01', 'polaroid-02', 'polaroid-03', 'polaroid-04',
  'collage-01', 'collage-02', 'collage-03', 'collage-04', 'collage-05', 'collage-06',
  'quiz-01', 'quiz-02', 'quiz-03', 'easter-egg', 'voice'
)

$palettes = @(
  @{ A = [System.Drawing.Color]::FromArgb(255, 18, 12, 28); B = [System.Drawing.Color]::FromArgb(255, 88, 42, 58) },
  @{ A = [System.Drawing.Color]::FromArgb(255, 22, 18, 32); B = [System.Drawing.Color]::FromArgb(255, 120, 90, 72) },
  @{ A = [System.Drawing.Color]::FromArgb(255, 12, 20, 36); B = [System.Drawing.Color]::FromArgb(255, 180, 140, 110) }
)

function New-PlaceholderImage($path, $label, $index) {
  $w = 1200
  $h = 1600
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $pal = $palettes[$index % $palettes.Count]
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    (New-Object System.Drawing.Rectangle 0, 0, $w, $h),
    $pal.A, $pal.B,
    [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
  )
  $g.FillRectangle($brush, 0, 0, $w, $h)
  $font = New-Object System.Drawing.Font('Segoe UI', 36, [System.Drawing.GraphicsUnit]::Pixel)
  $sub = New-Object System.Drawing.Font('Segoe UI', 18, [System.Drawing.GraphicsUnit]::Pixel)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 245, 236, 228))
  $muted = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(160, 245, 236, 228))
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString($label, $font, $textBrush, (New-Object System.Drawing.RectangleF 80, ($h/2 - 60), ($w - 160), 80), $sf)
  $g.DrawString('Replace with your photo', $sub, $muted, (New-Object System.Drawing.RectangleF 80, ($h/2 + 20), ($w - 160), 40), $sf)
  $g.Dispose()
  $brush.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bmp.Dispose()
}

$i = 0
foreach ($name in $names) {
  $file = Join-Path $outDir "$name.jpg"
  New-PlaceholderImage $file $name $i
  $i++
  Write-Host "Created $file"
}

Write-Host "Done. Drop your personal photos into public/images using the same filenames."

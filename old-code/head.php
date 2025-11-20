<!DOCTYPE html>
<html lang='en'>
<head>
  <title><?php if (isset($title)) { echo $title; } else { echo 'MacyMouse Projects';} ?></title>
  <meta charset='utf-8'>
  <link rel='stylesheet' href='<?php echo URLPATH; ?>css/style.css'>
  <script>
    var urlPath = '<?php echo URLPATH; ?>';
  </script>
  <script src='<?php echo URLPATH; ?>js/script.js'></script>
  <link rel="icon" href="<?php echo URLPATH; ?>images/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Varela Round -->
  <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" rel="stylesheet">
  <?php if (isset($headAdditions)) { echo $headAdditions; }?>
</head>

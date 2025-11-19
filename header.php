<header>
  <img src='<?php echo URLPATH; ?>images/logo.png' alt='logo' id='logo' onmouseout="logoHoverOff();" onmouseover="logoHoverOn();">
  <h1>MacyMouse Projects</h1>
  <nav>
    <ul>
      <li><a title='Projects Hub' href='<?php echo URLPATH; ?>' <?php if ($title == 'Project HUB Portal') { echo "id='current-page'";} ?>>HUB</a>
      </li><li><a title='17 Sustainable Goals' href='<?php echo URLPATH; ?>projects/goals/seventeen-goals.php' <?php if ($title == '17 Sustainable Goals') { echo "id='current-page'";} ?>>17 Goals</a>
      </li><li><a title='Tasks List' href='<?php echo URLPATH; ?>projects/tasks/tasks-page.php' <?php if ($title == 'Tasks') { echo "id='current-page'";} ?>>Tasks</a></li>
    </ul>
  </nav>
</header>

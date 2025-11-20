<?php
define('PATH', strstr($_SERVER['SERVER_NAME'], 'localhost') ? $_SERVER['DOCUMENT_ROOT'].'/PHP/projects/HUB/' : '/home/sl8/S3897118/public_html/mouse/');
define('URLPATH', strstr($_SERVER['SERVER_NAME'], 'localhost') ? 'http://localhost/PHP/projects/HUB/' : 'https://jupiter.csit.rmit.edu.au/~s3897118/mouse/');

//// include html <head>
$headAdditions = "<link rel='stylesheet' href='includes/style.css'><script src='includes/script.js'></script>";
$title = 'Tasks';
require_once(PATH.'includes/head.php');

echo "<body onload='startTime();'>";

//// include header (includes navigation links)
require_once(PATH.'includes/header.php');

include('database/config.php');
include('database/dbController.php');
$conn = new dbController(HOST, USER, PASS, DB);

echo '<main>';
?>
<div class='sticky'>
  <form method="post" action='tasks-page.php'>
    <label for='list'>Add new list: </label>
    <input type='text' name='list'>
    <input type='submit' value='+'>
  </form>
</div>
<?php
if (isset($_POST['list'])) {
  $newList = $_POST['list'];
  $sql = "INSERT INTO TaskList (Title) Values (?);";
  $conn->newList($sql, $newList);
} else if (isset($_POST['task']) && isset($_GET['id'])) {
  $newTask = $_POST['task'];
  $inList = $_GET['id'];
  $sql = "INSERT INTO TaskItem (ListID, ItemName) Values (?, ?)";
  $conn->newTask($sql, $inList, $newTask);
} else if (isset($_GET['confirm']) && isset($_GET['item'])) {
  $deleteItem = $_GET['item'];
  $sql = "DELETE FROM TaskItem WHERE ID = ?";
  $conn->deleteRecord($sql, $deleteItem, 0);
} else if (isset($_GET['confirm']) && isset($_GET['list'])) {
  $deleteList = $_GET['list'];
  $sql = "DELETE FROM TaskList WHERE ID = ?";
  $conn->deleteRecord($sql, $deleteList, 1);
  $sql = "DELETE FROM TaskItem WHERE ListID = ?";
  $conn->deleteRecord($sql, $deleteList, 0);
} else if (isset($_GET['list']) && isset($_GET['position']) && ctype_digit($_GET['list'])) {
  $listID = $_GET['list'];
  $position = $_GET['position'];
  $conn->moveList($listID, $position);
}
// Generate this from records in a database
$sql = "select * from TaskList order by priority";
$taskResults = $conn->getAllRecords($sql);
if ($taskResults) {
  echo '<br>';
  $taskCount = count($taskResults);
  $count = 0;
  foreach ($taskResults as $taskList) {
    $count+=1;
    $sql = "select * from TaskItem where listid = {$taskList['id']}";
    $listItems = $conn->getAllRecords($sql);
    if ($listItems) {
      $noItems=false;
    } else {
      $noItems=true;
    }
    ?>
    <section>
      <div class='flex-title'>
        <div>
          <h2 id='<?php echo 'list-'.$taskList['id']; ?>'><?php echo $taskList['title']; ?></h2>
          <?php
          if ($noItems) {
            echo "<i class='bi bi-backspace' title='Remove list' onclick=\"openListConfirmationBox('{$taskList['id']}');\"></i>";
          }
          if ($count != 1) {
            echo "<a alt='Move up' title='Move up' href='tasks-page.php?list={$taskList['priority']}&position=up#list-{$taskList['id']}'><i class='bi bi-arrow-up-circle'></i></a>";
          } else {
            echo "<i class='bi bi-circle'></i>";
          }
          if ($count!=$taskCount) {
            echo "<a alt='Move down' title='Move down' href='tasks-page.php?list={$taskList['priority']}&position=down#list-{$taskList['id']}'><i class='bi bi-arrow-down-circle'></i></a>";
          } else {
            echo "<i class='bi bi-circle'></i>";
          }
          ?>
        </div>
        <form method="post" action='tasks-page.php?id=<?php echo $taskList['id']; ?>'>
          <label for='task'>Add task: </label>
          <input type='text' name='task'>
          <input type='submit' value='+'>
        </form>
      </div>
    <?php
    // $sql = "select * from TaskItem where listid = {$taskList['id']}";
    // $listItems = $conn->getAllRecords($sql);
    if ($listItems) {
      echo "<ul class='flex-list'>";
      foreach ($listItems as $taskItem) {
        echo "<li id='task-{$taskItem['id']}' title='Click to remove' onclick=\"openConfirmationBox('{$taskItem['id']}');\">{$taskItem['itemname']}</li>";
      }
      echo '</ul>';
    } else {
      echo('<p>Add tasks to view them here!</p>');
    }
      echo "</section>";
    }
  } else {
    echo('<p>Create a new list to view tasks here!</p>');
  }
  ?>
    <div id="confirmation-box" style="display:none;">
      <div class='grey-bubble'>
        <h2 id='question-delete'>Delete ...</h2>
        <div class='flex-confirmation'>
          <a id='no-delete' href='#' onclick="closeConfirmationBox();return false;">No</a>
          <a id='yes-delete' href='onclickcss.php?item=task-1&list=this'>Yes</a>
        </div>
      </div>
    </div>
  </main>
  <footer>
    <span id='time'>time</span>
    <span id="discordtag">discord: macymouse#9804</span>
  </footer>
</body>
</html>

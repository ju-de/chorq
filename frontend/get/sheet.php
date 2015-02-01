<?PHP
	require_once("../structures.php");
	$id = $mysqli->real_escape_string($_GET["sheet"]);

	$q = $mysqli->query("SELECT * FROM sheets WHERE id='$id' ORDER BY id ASC");

	echo json_encode($q->fetch_assoc());
?>
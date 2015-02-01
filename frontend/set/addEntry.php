<?PHP
	require("../structures.php");

	$stackid = $mysqli->real_escape_string($_GET["stack"]);
	$sheetid = $mysqli->real_escape_string($_GET["sheet"]);
	$title = $mysqli->real_escape_string($_GET["title"]);
	$artist = $mysqli->real_escape_string($_GET["artist"]);

	$mysqli->query("INSERT INTO entries (stack,sheet,title,artist) VALUES ('$stackid','$sheetid','$title','$artist')");

	$res = array("id"=>$sheetid,"title"=>$title,"artist"=>$artist);
	echo json_encode($res);
?>
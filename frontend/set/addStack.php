<?PHP
	require("../structures.php");

	$name = $mysqli->real_escape_string($_GET["title"]);

	$mysqli->query("INSERT INTO stacks (token,title) VALUES ('$token','$name')");
	$id = $mysqli->insert_id;

	$res = array("id"=>$id,"title"=>$name,"entries"=>array());
	echo json_encode($res);
?>
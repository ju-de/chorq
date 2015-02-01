<?PHP

require("../structures.php");

$res = array("entries"=>array());

$query = $mysqli->real_escape_string($_GET["q"]);

$q = $mysqli->query("SELECT * FROM sheets WHERE title LIKE '%$query%' OR artist LIKE '%$query%'");

while($row = $q->fetch_assoc()) {
	$entry = $entryTemplate;
	$entry["id"] = $row["id"];
	$entry["title"] = $row["title"];
	$entry["artist"] = $row["artist"];
	$res["entries"][] = $entry;
}

echo json_encode($res);

?>
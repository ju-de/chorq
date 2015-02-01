<?PHP

require("../structures.php");


$stackid = $mysqli->real_escape_string($_GET["id"]);

$stack = $mysqli->query("SELECT * FROM stacks WHERE id='$stackid'");
$res = $stack->fetch_assoc();

$r = $mysqli->query("SELECT * FROM entries WHERE stack='$stackid' ORDER BY id ASC");
while($e = $r->fetch_assoc()) {
	$entry = $entryTemplate;
	$entry["id"] = $e["sheet"];
	$entry["title"] = $e["title"];
	$entry["artist"] = $e["artist"];
	$res["entries"][] = $entry;
}

echo json_encode($res);

?>
<?PHP
	require_once("../structures.php");
	$res = array();


	$q = $mysqli->query("SELECT * FROM stacks WHERE token='$token' ORDER BY id ASC");

	while($row = $q->fetch_assoc()) {
		$ins = $stackTemplate;
		$ins["id"]=$row["id"];
		$ins["title"]=$row["title"];
		$r = $mysqli->query("SELECT * FROM entries WHERE stack='$row[id]' ORDER BY id ASC");
		while($e = $r->fetch_assoc()) {
			$entry = $entryTemplate;
			$entry["id"] = $e["id"];
			$entry["title"] = $e["title"];
			$entry["artist"] = $e["artist"];
			$ins["entries"][] = $entry;
		}
		$res[]=$ins;
	}

	echo json_encode($res);
?>
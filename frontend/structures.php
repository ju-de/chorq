<?PHP

$mysqli = new mysqli("localhost", "artfrost_chorq", "chorqpass", "artfrost_chorq");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if(array_key_exists('token', $_GET))
	$token = $mysqli->real_escape_string($_GET['token']);

$stackTemplate = array(
	"id"=>0,
	"title"=>"",
	"entries"=>array()
);
$entryTemplate = array(
	"id"=>0,
	"title"=>"",
	"artist"=>""
);

?>
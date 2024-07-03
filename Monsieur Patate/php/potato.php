<?php
header("Content-type: text/plain");
// ...

$accessoires = "";
$nouveau = false;

if(isset($_POST['accessoires'])){
    $accessoires = $_POST['accessoires'];
}

if(isset($_POST['nouv'])){
    $nouveau = $_POST['nouv'];
}

if($nouveau){
    file_put_contents("potato.txt",$accessoires);
    $nouveau = false;
}


echo "he is wearing : ".file_get_contents("potato.txt");
?>
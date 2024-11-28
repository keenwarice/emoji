<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $uploadsDir = 'uploads/';
    $fileName = basename($_FILES['image']['name']);
    $targetFile = $uploadsDir . $fileName;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
        echo 'file uploaded successfully! i will review this image soon to check for problems.';
    } else {
        echo 'file upload had a skill issue, try again later.';
    }
}
//this is solely for if the user had a problem generating an image, in which they can choose to upload it to my servers.
?>

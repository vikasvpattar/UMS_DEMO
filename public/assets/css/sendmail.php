<?php
$to = 'abhishekbadiger333@gmail.com';
$subject = 'test mail';
$message = 'hi'; 
$from = 'nexenstial@gmail.com';
 
// Sending email
if(mail($to, $subject, $message)){
    echo 'Your mail has been sent successfully.';
} else{
    echo 'Unable to send email. Please try again.';
}
?>
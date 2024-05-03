<?php

    // POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]); 
        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "error";
            exit;
        }
        // your email address.
        $recipient = "test@example.com ";
        //  email content.
        $email_content = "Name: $name\n";
        $email_content .= "Message:\n$message\n"; 
        $email_content = "Phone number: $phone\n";
        // email headers.
        $email_headers = "From: $name  <$email>";
        // Send the email.
        if (mail($recipient, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "your message send";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "no.";
        }
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "no";
    }

?>
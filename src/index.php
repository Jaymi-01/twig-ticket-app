<?php
require_once __DIR__ . '/../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader, [
    'cache' => __DIR__ . '/../cache/twig',
    'auto_reload' => true,
]);

// Simple case based router: Add your routes here
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Add cases for different routes and pass variables to the templates as needed
switch($path) {
    case '/':
    case '/home':
    case '/landing':
        echo $twig->render('landing.twig', [
            'title' => "Welcome - Afuni's Tickets App",
        ]);
        break;
    
    case '/login':
        echo $twig->render('login.twig', [
            'title' => "Login - Afuni's Tickets App",
        ]);
        break;
    
    case '/signup':
        echo $twig->render('signup.twig', [
            'title' => "Sign Up - Afuni's Tickets App",
        ]);
        break;
    
    case '/dashboard':
        echo $twig->render('dashboard.twig', [
            'title' => "Dashboard - Afuni's Tickets App",
        ]);
        break;
    
    case '/tickets':
        echo $twig->render('ticket.twig', [
            'title' => "Ticket Management - Afuni's Tickets App",
        ]);
        break;
    
    default:
        http_response_code(404);
        echo $twig->render('404.twig', [
            'title' => "404 Not Found - Afuni's Tickets App",
        ]);
        break;
}
?>
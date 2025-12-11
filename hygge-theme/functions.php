<?php
function hygge_scripts() {
    wp_enqueue_style( 'hygge-style', get_stylesheet_uri() );
    // Font Awesome
    wp_enqueue_style( 'font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' );
    // Google Fonts
    wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap' );
    
    wp_enqueue_script( 'hygge-script', get_template_directory_uri() . '/js/script.js', array(), '1.0', true );
    
    // Pass template directory to JS if needed (for dynamic image loading)
    wp_localize_script( 'hygge-script', 'hyggeTheme', array(
        'themeUrl' => get_template_directory_uri()
    ) );
}
add_action( 'wp_enqueue_scripts', 'hygge_scripts' );

function hygge_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'hygge_setup' );
?>

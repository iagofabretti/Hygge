<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Preload hero images -->
    <link rel="preload" as="image" href="<?php echo get_template_directory_uri(); ?>/Fotos/DSC06843.jpg">
    <link rel="preload" as="image" href="<?php echo get_template_directory_uri(); ?>/Fotos/DSC06834.jpg">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <!-- Loader -->
    <div class="loader" id="loader">
        <div class="loader-content">
            <img src="<?php echo get_template_directory_uri(); ?>/Logos/hy.gge-logo (1).png" alt="Hy.gge Logo" class="loader-logo">
            <div class="loader-spinner"></div>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="#home" class="nav-logo">
                <img src="<?php echo get_template_directory_uri(); ?>/Logos/hy.gge-logo (1).png" alt="Hy.gge Urban Salon">
            </a>
            <div class="nav-menu" id="nav-menu">
                <a href="#home" class="nav-link active">Início</a>
                <a href="#about" class="nav-link">Sobre</a>
                <a href="#services" class="nav-link">Serviços</a>
                <a href="#gallery" class="nav-link">Galeria</a>
                <a href="#contact" class="nav-link">Contato</a>
            </div>
            <div class="nav-toggle" id="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

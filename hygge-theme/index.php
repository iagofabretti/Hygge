<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 */

get_header(); ?>

<main id="primary" class="site-main">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="container" style="padding-top: 120px; padding-bottom: 60px;">
                    <header class="entry-header">
                        <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                    </header>

                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>
                </div>
            </article>
            <?php
        endwhile;
    else :
        ?>
        <div class="container" style="padding-top: 120px; padding-bottom: 60px;">
            <p>Nenhum conteúdo encontrado.</p>
        </div>
        <?php
    endif;
    ?>
</main>

<?php
get_footer();

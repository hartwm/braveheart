<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package understrap
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

get_header();

if (is_front_page()) {
	get_template_part('global-templates/hero', 'home');
} else {
	get_template_part('global-templates/hero');
}

?>

<div class="wrapper" id="page-wrapper">

    <div class="container-full" id="content" tabindex="-1">

        <main class="site-main" id="main">

            <?php while (have_posts()) : the_post(); ?>

            <?php get_template_part('loop-templates/content-page', $post->post_name); ?>

            <?php endwhile; ?>

        </main><!-- #main -->

    </div><!-- #content -->

</div><!-- #page-wrapper -->

<?php get_footer(); ?>

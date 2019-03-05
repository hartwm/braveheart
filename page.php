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

?>

<div class="wrapper" id="page-wrapper">

    <div class="" id="content" tabindex="-1">

        <div class="row">

            <main class="site-main" id="main">

                <?php while (have_posts()) : the_post(); ?>

                <?php get_template_part('loop-templates/content', 'page'); ?>

                <?php endwhile; ?>

            </main><!-- #main -->

        </div><!-- .row -->

    </div><!-- #content -->

</div><!-- #page-wrapper -->

<?php get_footer(); ?>

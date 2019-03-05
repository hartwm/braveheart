<?php
/**
 * The template for displaying search results pages.
 *
 * @package understrap
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

get_header();


?>

<div class="wrapper" id="search-wrapper">

    <div class="" id="content" tabindex="-1">

        <div class="row">

            <main class="site-main" id="main">

                <?php if (have_posts()) : ?>

                <header class="page-header">

                    <h1 class="page-title">
                        <?php
												printf(
													/* translators: %s: query term */
													esc_html__('Search Results for: %s', 'understrap'),
													'<span>' . get_search_query() . '</span>'
												);
												?>
                    </h1>

                </header><!-- .page-header -->

                <?php  /* Start the Loop */ ?>
                <?php while (have_posts()) : the_post(); ?>

                <?php
								/**
						 * Run the loop for the search to output the results.
						 * If you want to overload this in a child theme then include a file
						 * called content-search.php and that will be used instead.
						 */
								get_template_part('loop-templates/content', 'search');
								?>

                <?php endwhile; ?>

                <?php else : ?>

                <?php get_template_part('loop-templates/content', 'none'); ?>

                <?php endif; ?>

            </main><!-- #main -->

            <!-- The pagination component -->
            <?php understrap_pagination(); ?>


        </div><!-- .row -->

    </div><!-- #content -->

</div><!-- #search-wrapper -->

<?php get_footer(); ?>

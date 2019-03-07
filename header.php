<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package understrap
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,700,700i|Playfair+Display:400,700" rel="stylesheet">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <div class="hidden" hidden>
        <?php get_template_part('svg/sprite.svg'); ?>
    </div>


    <div class="site" id="page">

        <!-- ******************* The Navbar Area ******************* -->
        <div id="wrapper-navbar" itemscope itemtype="http://schema.org/WebSite">

            <a class="skip-link sr-only sr-only-focusable" href="#content"><?php esc_html_e('Skip to content', 'understrap'); ?></a>

            <nav class="navbar navbar-expand-md navbar-dark bg-primary">

                <div class="container">

                    <div class="row justify-content-between align-items-center">

                        <div class="col">
                            <a href="/" class="logo-link" title="<?= get_bloginfo('name') ?>" alt="<?= get_bloginfo('url') ?>">
                                <svg alt="<?= get_bloginfo('name') ?> - Logo" class="logo-svg">
                                    <use xlink:href="#site-logo"></use>
                                </svg>
                            </a>
                        </div>

                        <div class="col">
                            <a href="#" id="toggle" class="toggle-menu" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle navigation', 'understrap'); ?>"><span></span></a>


                            <!-- The WordPress Menu goes here -->
                            <?php wp_nav_menu(
								array(
									'theme_location'  => 'primary',
									'container_class' => 'closed-nav main-nav',
									'container_id'    => '',
									'menu_class'      => 'horizontal-nav',
									'fallback_cb'     => '',
									'menu_id'         => 'main-menu',
									'depth'           => 2,
									'walker'          => new Understrap_WP_Bootstrap_Navwalker(),
								)
							); ?>
                        </div>

                    </div>

                </div><!-- .container -->

            </nav><!-- .site-navigation -->

        </div><!-- #wrapper-navbar end -->

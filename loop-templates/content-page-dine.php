<?php 
echo '<div class="row">';

// WP_Query arguments
$args = array(
	'post_type'              => array('dine'),
	'posts_per_page'         => '-1',
	'order'                  => 'DESC',
	'orderby'                => 'order',
);

// The Query
$query = new WP_Query($args);

// The Loop
if ($query->have_posts()) :
	echo '<div class="dining-nav-wrapper">';
	echo '<ul class="dining-nav">';
	while ($query->have_posts()) :
		$query->the_post();

		echo '<li><a href="#' . $post->post_name . '"><span>' . get_the_title() . '</span></a></li>';

	endwhile;
	echo '</ul>';
	echo '</div>';
endif;
wp_reset_query();
if ($query->have_posts()) :
	echo '<div class="col">';
	echo '<div id="fullpage">';
	while ($query->have_posts()) : 
		$query->the_post();

		get_template_part('loop-templates/single', 'dine');
 
	endwhile;
	echo '</div>';
	echo '</div>';
endif;
wp_reset_postdata();

echo '</div>'; 
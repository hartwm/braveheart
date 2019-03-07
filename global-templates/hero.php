<?php

$img = "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";
if (has_post_thumbnail()) {
	$img = get_the_post_thumbnail_url($post->ID, 'hero');
}
?>

<div class="hero">
    <img class="hero-img" src="<?= $img ?>">
</div>

<div class="hero-text">
    <div class="row">
        <div class="col-auto">
            <div class="hero-text-inner">
                <h2><?php the_field('intro_headline'); ?></h2>
                <p><?php the_field('intro_text'); ?></p>
            </div>
        </div>
    </div>
</div>

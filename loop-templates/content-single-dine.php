<?php
$hotelID = get_field('hotel');
$hotel = get_the_title($hotelID);
?>
<div class="dine-single" id="<?= $post->post_name ?>">

    <div class="container">

        <div class="row">
            <div class="col">
                <img src="<?php the_post_thumbnail_url('hero') ?>">
            </div>
            <div class="col">
                <?php the_title('<h2 class="h2">', '</h2>'); ?>
                <?php the_content(); ?>
                <a class="btn" href="<?php the_field('url'); ?>">Visit the Website</a>
            </div>
        </div>

        <div class="row">
            <div class="col">

                <div class="item">
                    <img src="" alt="">
                    <h5 class="h5">Hours</h5>
                    <p>
                        <?php if (have_rows('hours')) : ?>

                        <ul>

                            <?php while (have_rows('hours')) : the_row(); ?>

                            <li> <?php the_sub_field('description'); ?> : <?php the_sub_field('hours'); ?></li>

                            <?php endwhile; ?>

                        </ul>

                        <?php endif; ?>
                    </p>
                </div>
                <div class="item">
                    <img src="" alt="">
                    <h5 class="h5">Cuisine</h5>
                    <p><?php the_field('cuisine'); ?></p>
                </div>
                <div class="item">
                    <img src="" alt="">
                    <h5 class="h5">On Site</h5>
                    <p><?= $hotel ?></p>
                </div>

            </div>
            <div class="col">
                <?php the_field('reservations'); ?>
            </div>
        </div>
    </div><!-- /.container -->



    <?php
		$image_ids = get_field('gallery', false, false);
		if ($image_ids) {
			$shortcode = '[' . 'gallery ids=" ' . implode(', ', $image_ids) . ' "]';
			// echo do_shortcode($shortcode);
		}
		?>

</div> <!-- /.dine-content -->

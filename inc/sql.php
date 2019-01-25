
<?php
function propertyClean()
{
  global $wpdb;

  $properties = $wpdb->get_results(
    "
			SELECT  ID, post_title, meta_value
			FROM $wpdb->posts as p1
			INNER JOIN $wpdb->postmeta AS m1 ON(p1.ID = m1.post_id)
			WHERE p1.post_type = 'property'
			AND p1.post_status = 'publish'
			AND m1.meta_key = 'image_to_attach'
			GROUP BY ID
		"
  );

  $newArr = array();
  foreach ($properties as $property) {
    $str = $property->meta_value;
    $arr = array_filter(explode(",", $str));
    $serial = serialize($arr);
    $i = 0;
    foreach ($arr as $img) {
      $wpdb->insert($wpdb->postmeta, array(
        'meta_value' => $img,
        'post_id' => $property->ID,
        'meta_key' => 'property_gallery',
      ));

      $wpdb->insert('wpah_podsrel', array(
        'related_item_id' => $img,
        'item_id' => $property->ID,
        'pod_id' => 26804,
        'field_id' => 26813,
        'related_field_id' => 0,
        'related_pod_id' => 0,
        'weight' => $i,
      ));
      $i++;
    }

    $wpdb->insert($wpdb->postmeta, array(
      'meta_value' => $serial,
      'post_id' => $property->ID,
      'meta_key' => '_pods_property_gallery',
    ));


  }
  return $properties;

}


function addUnits()
{
  global $wpdb;



// bedroom_available_spring	NO
// bedroom_available_summer_only	NO

// bedroom_available_immediately	
// bedroom_available_18-19_school_year	
// property_available_spring	

// property_available_summer_only	NO

// property_available_immediately	
// property_available_18-19_school_year	

  $properties = $wpdb->get_results(
    "
			SELECT  ID, post_title
			FROM $wpdb->posts as p1
			INNER JOIN $wpdb->postmeta AS m1 ON(p1.ID = m1.post_id)
			INNER JOIN $wpdb->postmeta AS m2 ON(p1.ID = m2.post_id)
			WHERE p1.post_type = 'property'
			AND p1.post_status = 'publish'
      AND ( m1.meta_key = 'prop_featured' or m1.meta_key = 'bedroom_available_immediately' )
			AND m1.meta_value = 1
			AND m2.meta_key = 'property_price' 
      GROUP BY ID
		"
  );

  // $properties = $wpdb->get_results(
  //   "
	// 		SELECT  ID, post_title, m2.meta_value as price, m1.meta_value as unit
	// 		FROM $wpdb->posts as p1
	// 		INNER JOIN $wpdb->postmeta AS m1 ON(p1.ID = m1.post_id)
	// 		INNER JOIN $wpdb->postmeta AS m2 ON(p1.ID = m2.post_id)
	// 		WHERE p1.post_type = 'property'
	// 		AND p1.post_status = 'publish' 
	// 		AND m1.meta_key = 'units' 
	// 		AND m2.meta_key = 'property_price' 
  //     GROUP BY ID
	// 	"
  // );



  $table = $wpdb->prefix . 'pods_unit';
  // $availability = 'now';
  // $type = 'room';
  $availability = 'next_year';
  $type = 'full_unit';

  echo count($properties);
  $newArr = array();
  foreach ($properties as $property) {

//     $price = $property->price;
//     $title = $property->post_title;
//     $name = '$' . $price . ': ' . strtoupper($availability) . ' - ' . strtoupper($type) . ' - ' . $title;

//     // Add Unit
//     $wpdb->insert($table, array(
//       'name' => $name,
//       'price' => $price,
//       'availability' => $availability,
//       'type' => $type,
//     ));


//     $unit = $wpdb->insert_id;  
//     // Add Postmeta
//     $wpdb->insert($wpdb->postmeta, array(
//       'meta_value' => $unit,
//       'post_id' => $property->ID,
//       'meta_key' => 'units',
//     ));

//     $meta = $wpdb->insert_id;


// // Relationship for Property
//     $wpdb->insert($wpdb->prefix . 'podsrel', array(
//       'related_item_id' => $unit,
//       'item_id' => $property->ID,
//       'pod_id' => 26804,
//       'field_id' => 26932,
//       'related_field_id' => 26996,
//       'related_pod_id' => 26924,
//       'weight' => 0,
//     ));

// // Relationship for Unit
//     $wpdb->insert($wpdb->prefix . 'podsrel', array(
//       'related_item_id' => $property->ID,
//       'item_id' => $unit,
//       'pod_id' => 26924,
//       'field_id' => 26996,
//       'related_field_id' => 26932,
//       'related_pod_id' => 26804,
//       'weight' => 0,
//     ));



//     $arr = [$property->ID];
//     $serial = serialize($arr);
//     $wpdb->insert($wpdb->postmeta, array(
//       'meta_value' => $serial,
//       'post_id' => $property->ID,
//       'meta_key' => '_pods_units',
//     ));



  }

 



  // return $newArr;
  return $properties;

}

function priceLabel()
{
  global $wpdb;

  $properties = $wpdb->get_results(
    "
			SELECT  ID, post_title, m1.meta_value as label
			FROM $wpdb->posts as p1
			INNER JOIN $wpdb->postmeta AS m1 ON(p1.ID = m1.post_id) 
			WHERE p1.post_type = 'property'
			AND p1.post_status = 'publish'
			AND m1.meta_key = 'property_label' 
			AND upper(m1.meta_value) LIKE '%WAS%' 
      GROUP BY ID
		"
  );



  echo count($properties);
  $newArr = array();
  foreach ($properties as $property) {

    $old_price = str_ireplace("was $", "", $property->label);
    
    // Add Postmeta
    $wpdb->insert($wpdb->postmeta, array(
      'meta_value' => $old_price,
      'post_id' => $property->ID,
      'meta_key' => 'old_price',
    ));

    $property->old_price = $old_price;
    $newArr[] = $property;

  }

  // return $newArr;
  return $properties;

}
function updateStuff()
{
  global $wpdb;


// bedroom_available_spring	
// bedroom_available_summer_only	
// bedroom_available_immediately	
// bedroom_available_18-19_school_year	
// property_available_spring	
// property_available_summer_only	
// property_available_immediately	
// property_available_18-19_school_year	

// newly_renovated	
// deck	
// washer-dryer
// off-street_parking	
// porch	
// back_yard	

  // $properties = $wpdb->get_results(
  //   "
	// 		SELECT  ID, post_title, m1.meta_value as label
	// 		FROM $wpdb->posts as p1
	// 		INNER JOIN $wpdb->postmeta AS m1 ON(p1.ID = m1.post_id) 
	// 		WHERE p1.post_type = 'property'
	// 		AND p1.post_status = 'publish'
	// 		AND m1.meta_key = 'property_features'  
	// 		AND m1.meta_value = 1
  //     GROUP BY ID
	// 	"
  // );
  

  // _pods_property_features
  echo count($properties);
  $newArr = array();
  foreach ($properties as $property) {

    $features = get_post_meta($property->ID, 'property_features');

    // // var_dump($features);
    // $serial = serialize($features);
    // $wpdb->insert($wpdb->postmeta, array(
    //   'meta_value' => $serial,
    //   'post_id' => $property->ID,
    //   'meta_key' => '_pods_property_features',
    // ));


    // $newArr[] = $property;

  }

  // return $newArr;
  return $properties;

}



function propertyAll()
{
  global $wpdb;

  $properties = $wpdb->get_results(
    "
        SELECT  ID, post_title, meta_value
          FROM $wpdb->posts as p1
          INNER JOIN $wpdb->postmeta AS m1 ON(p1.ID = m1.post_id)
          WHERE p1.post_type = 'property'
		  AND p1.post_status = 'publish'
		  AND m1.meta_key = 'property_gallery'
		  GROUP BY ID
       "
  );

  return $properties;

}

function propertyChange()
{
  global $wpdb;

  $wpdb->query(
    "
	UPDATE $wpdb->posts as p1
	SET p1.post_type = 'property'
	WHERE p1.post_type = 'estate_property'
	"
  );

}


add_action('rest_customer_query', 'customer_override_per_page');
/*
 * params is the query array passed to WP_Query
 */
function customer_override_per_page($params)
{
  if (isset($params) and isset($params['posts_per_page'])) {
    $params['posts_per_page'] = 128;
  }
  return $params;
}


add_action('rest_api_init', 'myplugin_register_routes');
function myplugin_register_routes()
{
  register_rest_route('davis/property', 'all', array(
    'methods' => WP_REST_Server::READABLE,
    'callback' => 'propertyAll'
  ));
}

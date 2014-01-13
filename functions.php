<?php

add_action('wp_enqueue_scripts', 'scripts');
function scripts(){
	wp_enqueue_style('test-style', get_stylesheet_directory_uri().'/assets/css/master.css', true);
}
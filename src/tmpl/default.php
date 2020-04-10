<?php 
/**
 * @package     mod_ipheionsites
 * @author      Pierre Veelen, www.pvln.nl
 * @copyright   Copyright (C) 2020 Pierre Veelen. All rights reserved.
 * @license     GNU General Public License version 2 or later.
 *
 * default.php  Used to output the data to html page. Therefore a lot of html code is included.  
 *
 */

defined('_JEXEC') or die;

$document = JFactory::getDocument();
$document->addScript('https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js');
$document->addStyleSheet('https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css');
?>

<!-- Get the module class suffix-->
<div class="<?php echo $params->get("moduleclass_sfx");?>">

	<!-- Get the text to be displayed before the module-->
	<div> <?php echo $params->get("pretext");?> </div>

	<div id='map-sites' style='width: 100%; height: 600px;'></div>
	
	    <!-- set required js vars -->
	    <script>
		mapboxgl.accessToken = <?php echo '"'.$params->get("mapbox_accesstoken").'"' ?>;
		map_container_name = 'map-sites';
		map_center_longitude = <?php echo $params->get("window_longitude") ?>;
		map_center_latitude = <?php echo $params->get("window_latitude") ?>;
		sites_data_url = <?php echo "'".$params->get("sites_data_url")."'" ?>;
		</script>
		
		<!-- load the map -->
		<script src="./media/mod_ipheionsites/js/sites.js"></script>
	
	<!-- Get the text to be displayed after the module-->	
	<div><?php echo $params->get("posttext");?></div>

</div>

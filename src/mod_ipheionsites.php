<?php 
/**
 * @package     mod_ipheionsites
 * @author      Pierre Veelen, www.pvln.nl
 * @copyright   Copyright (C) 2020 Pierre Veelen. All rights reserved.
 * @license     GNU General Public License version 2 or later.
 */

defined('_JEXEC') or die;

/* Include dependencies; include helper.php */
	require_once __DIR__ . '/helper.php';

/**
 * Retrieve the installed extensions of the Joomla! website in $list
 *
 * @params	An object containing the module parameters as set in the back-end for the module;
 * 			Not used in this one yet (for future use).
 *
 */
	$list = ModIpheionSitesHelper::getItems($params);
 	
/**
 * Get layout values from back-end setting tab advanced in $params 
 * This retrieves the 'layout' parameter. Note the second part
 * which states to use a default value of 'default' if the parameter 'layout' cannot be
 * retrieved for some reason
 * 
 */
	$layout = $params->get('layout','default');
	
/**
 * This method returns the path to the layout file for the module.
 * Output depends if the layout has not been overridden or not. 
 * 
 */
	require JModuleHelper::getLayoutpath('mod_ipheionsites', $layout);
	
?>

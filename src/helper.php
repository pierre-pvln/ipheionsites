<?php 
/**
 * @package     mod_ipheionsites
 * @author      Pierre Veelen, www.pvln.nl
 * @copyright   Copyright (C) 2020 Pierre Veelen. All rights reserved.
 * @license     GNU General Public License version 2 or later.
 */
 
defined('_JEXEC') or die;

/**
 * Helper for mod_ipheionsites
 */

abstract class ModIpheionSitesHelper
{
    /**
     * The class ModIpheionSitesHelper gets a list of all installed extensions of this Joomla! website
     *
     **/
	 
    public static function getItems(&$params)
    {
    	/**
    	 * Retrieves a list of all installed extensions
    	 * 
    	 * @params	An object containing the module parameters as set in the back-end for the module; 
    	 * 			Not used in this function yet (For future use). 
    	 * 
    	 * 			&$params: It's a pass by reference. 
    	 * 			The variable inside the function "points" to the same data as the variable from the calling context.	
    	 * 
    	 * @access	Public
    	 *
    	 **/
    	
		/* Get a db connection */
		$db = JFactory::getDbo();

		/* Create a new query object. */
		$query = $db->getQuery(true);

		/* Create the query to select the required records */
		$query =  "SELECT `name`,`type`,`enabled`,`access`,`manifest_cache` \n"
				. "FROM #__extensions \n"
				. "ORDER BY `name` ASC"
			    ;
			
		/* Reset the query using our newly populated query object. */
		$db->setQuery($query);
	 
		/* Returns an indexed array of PHP objects from the table records returned by the query. */ 
		$list = $db->loadObjectList();

		return $list;
    }
}
?>

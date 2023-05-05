<?php
namespace Medani\Prestashop\Utilities;

use PrestaShop\PrestaShop\Adapter\Entity\Db;

class ConfUtils {

    /**
     * Get all Configuration entries starting with $configurationName
     * 
     * @param string $configurationName
     * 
     * @return Array
     */
    public static function getConfigurationDataStartingWith(string $configurationName) : array
    {
        $sql = "SELECT name, value FROM " . _DB_PREFIX_ . "configuration WHERE name LIKE '$configurationName%'";
        $configurationData = Db::getInstance()->executeS($sql);

        if($configurationData) {
            $cleanedData = array();

            foreach($configurationData as $data) {
                $name = $data['name'];
                $value = $data['value'];

                $cleanedData[$name] = $value;
            }
            return $cleanedData;
        }

        return [];
    }

    /**
     * check if given feature has not only configured keys but has also values configure
     * 
     * @param string $configName
     * 
     * @return Boolean
     */
    public static function hasConfiguredValue(string $configName) : bool
    {
        $configData = self::getConfigurationDataStartingWith($configName);

        if (!empty($configData)) {
            foreach ($configData as $data) {
                if ($data != null) {
                    $jsonDecodedData = json_decode($data, true);
                    if(is_array($jsonDecodedData)) {
                        foreach($jsonDecodedData as $configuredData) {
                            if($configuredData && !empty($configuredData)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
}

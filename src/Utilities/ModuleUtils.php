<?php
namespace Medani\Prestashop\Utilities;

use ModuleCore;

class ModuleUtils {
    
    /**
     * Checks if a Module is installed and active
     *
     * @param string $moduleName
     * @return bool
     */
    public static function isModuleActive(string $moduleName): bool {
        $module = ModuleCore::getInstanceByName($moduleName);        
        if (!$module || !ModuleCore::isEnabled($moduleName)) {
            return false;
        }

        return true;
    }
}

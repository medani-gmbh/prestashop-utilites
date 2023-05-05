<?php

namespace Medani\Prestashop\Utilities;

use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Language as LanguageCore;
use ToolsCore;

class LanguageUtilites {

    public static function multiLangInputToArray(string $inputName): array
    {
        $inputArray = array();
        
        $activeLanguages = LanguageCore::getLanguages();

        if(self::shopHasMoreActiveLanguages()) {
            foreach($activeLanguages as $activeLanguage) {
                $idLang = $activeLanguage['id_lang'];
                $inputTmp = ToolsCore::getValue($inputName . '_' . $idLang);
                $inputArray[$idLang] = htmlspecialchars($inputTmp);
            }
        } else {
            $idLang = $activeLanguages[0]['id_lang'];
            $inputTmp = ToolsCore::getValue($inputName);
            if($inputTmp == false) {
                $inputTmp = ToolsCore::getValue($inputName . '_' . $idLang);
            }

            $inputArray[$idLang] = htmlspecialchars($inputTmp);
        }

        return $inputArray;
    }

    /**
     * Has the shop more than one active Language
     *
     * @return bool true|false
     */
    public static function shopHasMoreActiveLanguages() : bool
    {
        $activeLanguages = LanguageCore::getLanguages();
        return (count($activeLanguages) > 1);        
    }

    public static function multiLangInputToConfig(string $featureName, array $values)
    {
        if(count($values) > 1) {
            $jsonEncodedValues = json_encode($values);
        } else {
            // cause there is only one key we can get it like this
            $arrayKeyValues = array_keys($values);
            $arrayKey = $arrayKeyValues[0];

            $jsonEncodedValues = $values[$arrayKey];
        }

        Configuration::updateValue($featureName, $jsonEncodedValues, true);
    }
}

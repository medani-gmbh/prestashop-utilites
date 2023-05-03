<?php

namespace Medani\Prestashop\Utilities;

use PrestaShop\PrestaShop\Adapter\Tools;
use PrestaShopBundle\Entity\Lang as LanguageCore;

class Language {
    public static function multiLangInputToArray(string $inputName) : array
    {
        $inputArray = array();
        
        $activeLanguages = LanguageCore::getLanguages();
        if(self::shopHasMoreActiveLanguages()) {
            foreach($activeLanguages as $activeLanguage) {
                $idLang = $activeLanguage['id_lang'];
                $inputTmp = Tools::getValue($inputName . '_' . $idLang);
                $inputArray[$idLang] = htmlspecialchars($inputTmp);
            }
        } else {
            $idLang = $activeLanguages[0]['id_lang'];
            $inputTmp = Tools::getValue($inputName);
            if($inputTmp == false) {
                $inputTmp = Tools::getValue($inputName . '_' . $idLang);
            }

            $inputArray[$idLang] = htmlspecialchars($inputTmp);
        }

        return $inputArray;
    }

    public static function shopHasMoreActiveLanguages() : bool
    {
        $activeLanguages = Language::getLanguages();
        if(count($activeLanguages) > 1) {
            return true;
        }
        return false;
    }
}

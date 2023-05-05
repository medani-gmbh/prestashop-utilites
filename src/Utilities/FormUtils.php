<?php
namespace Medani\Prestashop\Utilities;

use ModuleAdminController;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Language as EntityLanguage;


class FormUtils {

    public static function getOptionsForFormSelectField(array $datas, string $idProperty = 'id', string $nameProperty = 'name') {
        $options = [];

        foreach ($datas as $data) {
            $options[] = [
                'id' => $data['id'],
                'name' => $data['name']
            ];
        }

        return $options;
    }

    public static function getDefaultHelperForm(ModuleAdminController $controller): HelperFormCore {

        $helper = new HelperFormCore();
        $helper->table = $controller->table;
        $helper->identifier = $controller->identifier;
        $lang = new EntityLanguage((int) Configuration::get('PS_LANG_DEFAULT'));
        $helper->default_form_language = $lang->id;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        return $helper;
    }
}

<?php
namespace Medani\Prestashop\Utilities;

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
}

<?php

namespace Medani\Prestashop\Utilities;

use Medani\Prestashop\Exceptions\ArrayHasTooManyDimensionsException;

class Db {

    public static function flattenResult(array $results, String $property): array {
        $return = [];
        foreach($results as $result) {
            if (is_array($result)) {
                throw new ArrayHasTooManyDimensionsException();
            }
            $return[] = $result[$property];
        }
        
        return $return;
    }

    public static function resultToSqlRange(array $values) {
        return '(' . implode(',', $values) . ')';
    }

}

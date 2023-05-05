<?php

namespace Medani\Prestashop\Utilities;

use Medani\Prestashop\Exceptions\IndexDoesNotExistInResultException;

class DbUtils {

    public static function flattenResult(array $results, string $property = null): array {
        $return = [];
        
        foreach($results as $result) {
            if (is_array($result) && $property && isset($result[$property])) {
                $return[] = $result[$property];
            }

            throw new IndexDoesNotExistInResultException($result, $property);
        }
        
        return $return;
    }

    public static function resultToSqlRange(array $values) {
        return '(' . implode(',', $values) . ')';
    }

}

<?php
namespace Medani\Prestashop\Utilities;

class StringUtils {

    /**
     * Fastest way to check if $value is valid JSON.
     *
     * @param any $value
     * @return bool true|false
     */
    public static function isJson($value): bool {

        // numeric strings are always valid JSON.
        if ( is_numeric( $value ) ) { 
            return true; 
        }
    
        // A non-string value can never be a JSON string.
        if ( ! is_string( $value ) ) { 
            return false; 
        }
    
        // Any non-numeric JSON string must be longer than 2 characters.
        if ( strlen( $value ) < 2 ) { 
            return false; 
        }
    
        // "null" is valid JSON string.
        if ( 'null' === $value ) { 
            return true; 
        }
    
        // "true" and "false" are valid JSON strings.
        if ( 'true' === $value ) { 
            return true; 
        }
        if ( 'false' === $value ) { 
            return true; 
        }
    
        // Any other JSON string has to be wrapped in {}, [] or "".
        if ( '{' != $value[0] && '[' != $value[0] && '"' != $value[0] ) { 
            return false; 
        }
    
        // Verify that the trailing character matches the first character.
        $last_char = $value[strlen($value) -1];
        if ( '{' == $value[0] && '}' != $last_char ) { 
            return false; 
        }
        if ( '[' == $value[0] && ']' != $last_char ) { 
            return false; 
        }
        if ( '"' == $value[0] && '"' != $last_char ) { 
            return false; 
        }
    
        // See if the string contents are valid JSON.
        return null !== json_decode( $value );
    }

    /**
     * Fast implementation of String::startsWith
     *
     * @param string $haystack where to look
     * @param string $needle   what to search for 
     * @return bool
     */
    public static function startsWith(string $haystack, string $needle): bool {
        return (0 === mb_strpos($haystack, $needle));
    }


     /**
     * Fast implementation of String::contains
     *
     * @param string $haystack where to look
     * @param string $needle   what to search for 
     * @return bool
     */
    public static function contains(string $haystack, string $needle): bool {
        return (false !== mb_strpos($haystack, $needle));
    }

    /**
     * Fast implementation of String::endsWith
     *
     * @param string $haystack where to look
     * @param string $needle   what to search for 
     * @return bool
     */
    public static function endsWith(string $haystack, string $needle): bool {
        return substr($haystack,-strlen($needle)) === $needle;
    }
}

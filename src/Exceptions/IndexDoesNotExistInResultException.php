<?php
namespace Medani\Prestashop\Exceptions;

class IndexDoesNotExistInResultException extends \Exception {
    private $result;
    private $index;

    public function __construct($result, $index) {
        parent::__construct("Index $index does not exist in result " . print_r($result));
    }

    public function getResult() {
        return $this->result;
    }

    public function getIndex() {
        return $this->index;
    }
}

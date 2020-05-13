<?php
declare(strict_types=1);

namespace App\Events;

use App\User;

class UserCreatedEvent
{
    /**
     * @var User
     */
    private $user;

    public function __construct(User $user)
    {
        //
        $this->user = $user;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cars>
 */
class CarsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'make' => $this->faker->word,
            'model' => $this->faker->word,
            'year' => $this->faker->year,
            'vin' => $this->faker->word,
            'shipping_status' => 'pending',
        ];
    }
}

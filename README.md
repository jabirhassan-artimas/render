# Ecommerce CMS Project

A fully dynamic ecommerce website and CMS system built with Laravel 10.

## Features

- **Monolithic Structure**: Admin and Frontend in one project.
- **Roles**: Admin and Customer.
- **Modules**: Products, Categories, Brands, Cart, Checkout, Orders.
- **Design**: Premium white theme with icons (Vanilla CSS).

## Setup Instructions

1.  **Database**:
    - The project is configured to use MySQL database `ecommerce_cms`.
    - User `root` (no password).
    - If you haven't created it, run: `php create_db.php`

2.  **Migrations & Seeding**:
    - Run `php artisan migrate:fresh --seed` to setup tables and dummy data.
    - **Admin Login**: `admin@example.com` / `password`
    - **Customer Login**: `customer@example.com` / `password`

3.  **Run Application**:
    - `php artisan serve`
    - Visit `http://localhost:8000`

## Admin Panel
- Login as Admin.
- Go to `/admin/dashboard` or click "Admin Panel" in the header.

## Tech Stack
- Laravel 10 (Installed via Composer)
- MySQL
- Blade Templates
- Vanilla CSS

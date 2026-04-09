<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CmsPage;
use Illuminate\Support\Str;

class CmsPageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'আমাদের কথা (About Us)',
                'slug' => 'about-us',
                'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600',
                'content' => '<h1>ঐতিহ্যের বাহার: বাংলার শিকড়ের সন্ধান</h1><p>ঐতিহ্যের বাহার একটি সামাজিক উদ্যোগ যা বাংলার হারিয়ে যাওয়া এবং অবহেলিত লোকশিল্প ও ঐতিহ্যকে বিশ্ব দরবারে নতুনভাবে উপস্থাপন করার লক্ষ্য নিয়ে যাত্রা শুরু করেছে। আমরা সরাসরি গ্রামের দক্ষ কারিগরদের কাছ থেকে পণ্য সংগ্রহ করি এবং তাদের ন্যায্য মূল্য নিশ্চিত করি।</p><h2>আমাদের উদ্দেশ্য</h2><ul><li>বাংলার কারিগরদের অর্থনৈতিক উন্নয়ন</li><li>ঐতিহ্যবাহী পণ্যের মান নিয়ন্ত্রণ</li><li>সারা বিশ্বের কাছে বাংলাদেশের লোকসংস্কৃতি তুলে ধরা</li></ul>',
                'meta' => ['title' => 'About Our Heritage', 'description' => 'Discover the story behind Oitijjer Bahar.'],
                'status' => true
            ],
            [
                'title' => 'গোপনীয়তা নীতি (Privacy Policy)',
                'slug' => 'privacy-policy',
                'image' => null,
                'content' => '<h1>গোপনীয়তা নীতি</h1><p>ঐতিহ্যের বাহার আমাদের গ্রাহকদের গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেয়। আপনার তথ্য আমাদের কাছে নিরাপদ এবং আমরা কখনোই তৃতীয় পক্ষের কাছে আপনার ব্যক্তিগত তথ্য বিনিময় করি না।</p>',
                'meta' => ['title' => 'Privacy Policy - Oitijjer Bahar'],
                'status' => true
            ],
            [
                'title' => 'ব্যবহারের শর্তাবলী (Terms of Service)',
                'slug' => 'terms-of-service',
                'image' => null,
                'content' => '<h1>ব্যবহারের শর্তাবলী</h1><p>আমাদের ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি আমাদের শর্তাবলীর সাথে একমত প্রকাশ করছেন। সকল পণ্যের স্বত্ব ঐতিহ্যের বাহার এবং সংশ্লিষ্ট কারিগরদের দ্বারা সংরক্ষিত।</p>',
                'meta' => ['title' => 'Terms of Service'],
                'status' => true
            ],
            [
                'title' => 'রিটার্ন ও রিফান্ড নীতি (Return Policy)',
                'slug' => 'returns',
                'image' => null,
                'content' => '<h1>রিটার্ন ও রিফান্ড নীতি</h1><p>যদি পন্যের কোনো ত্রুটি থাকে বা ভিন্ন পণ্য পৌঁছায়, তবে ৩ দিনের মধ্যে আমাদের সাথে যোগাযোগ করুন। আমরা পণ্যটি পরিবর্তন বা প্রয়োজনে রিফান্ড করে দেব।</p>',
                'meta' => ['title' => 'Returns & Support'],
                'status' => true
            ],
            [
                'title' => 'যোগাযোগ করুন (Contact Us)',
                'slug' => 'contacts',
                'image' => 'https://images.unsplash.com/photo-1543157145-f78c636d0231?auto=format&fit=crop&q=80&w=1600',
                'content' => '<h1>আমাদের সাথে যোগাযোগ করুন</h1><p>আপনার যেকোনো প্রশ্ন বা মতামতের জন্য আমাদের মেইল করুন অথবা সরাসরি কল করুন।</p><p>ফোন: +৮৮০ ১৭০০০০০০০০<br>ইমেইল: hello@oitijjerbahar.com</p>',
                'meta' => ['title' => 'Contact Us - Oitijjer Bahar'],
                'status' => true
            ]
        ];

        foreach ($pages as $page) {
            CmsPage::updateOrCreate(
                ['slug' => $page['slug']],
                $page
            );
        }
    }
}

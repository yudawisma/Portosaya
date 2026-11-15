<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function frames()
{
    $frames = [
        ['src' => 'frames/12.PNG', 'place' => '', 'year' => ''], // jadi foto hero
        ['src' => 'frames/1.jpeg',  'place' => '', 'year' => ''],
        ['src' => 'frames/2.jpeg',  'place' => '', 'year' => ''],
        ['src' => 'frames/3.jpeg',  'place' => '', 'year' => ''],
        ['src' => 'frames/4.jpeg',  'place' => '', 'year' => ''],
        ['src' => 'frames/5.jpeg',  'place' => '', 'year' => ''],
        ['src' => 'frames/6.jpeg',  'place' => '', 'year' => ''],
        ['src' => 'frames/7.jpeg',  'place' => '', 'year' => ''],
        ['src' => 'frames/8.jpeg',  'place' => '', 'year' => ''],
        ['src' => 'frames/9.jpeg',  'place' => '', 'year' => ''],
        ['src' => 'frames/11.jpeg', 'place' => '', 'year' => ''],
        ['src' => 'frames/14.jpeg',  'place' => '', 'year' => ''],
        ['src' => 'frames/15.jpeg', 'place' => '', 'year' => ''],
       
    ];

    return view('frames', compact('frames'));
}
}

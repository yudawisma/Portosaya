@extends('layouts.app')

@section('title', 'Yudha Wisma Wardani — Software Engineer')

@section('content')
    @include('partials.hero')

    @include('partials.projects')

    @include('partials.experience')

    @include('partials.about')

    @include('partials.skills')

    @include('partials.certificate')

    @include('partials.contact')
@endsection
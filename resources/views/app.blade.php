<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Salud Mejor - Ministerio de Salud</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js?'.date('y-m-d-h-i-s')) }}" defer></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <!-- AWS Kinesis -->
    <script src="{{ asset('js/kinesis.js') }}"></script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-137427289-1"></script>
    <script src="{{ asset('js/google-analytics.js') }}"></script>
    <!-- Instana -->
    <script src="{{ asset('js/instana.js') }}"></script>

    @yield('meta')
    <!-- Styles -->
    <link href="{{ asset('css/app.css?'.date('y-m-d-h-i-s')) }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">

</head>
<body>
    <div id="app" {{ 'data-user = '.json_encode(auth()->id()) }}>
        @guest
        <div id="navBar"></div>
        @endguest

        @auth
            <div id="navBarAuth"></div>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
         @endauth

        @yield('content')

        <div id="footer"></div>
    </div>
</body>
</html>

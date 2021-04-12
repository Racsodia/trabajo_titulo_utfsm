@extends('app')

@section('content')
    {{-- <div class="jumbotron bg10 h-200">
        <h1 class="text-center mt-5">
            Comparte
            <b class="c03">conocimientos </b>
        </h1>
        @guest
        <p class="text-center" style="background-color: ivory;"> Verifica tu perfil profesional para compartir </p>
        @endguest

    </div> --}}

    {{csrf_field()}}
    <div id="content"></div>
@endsection

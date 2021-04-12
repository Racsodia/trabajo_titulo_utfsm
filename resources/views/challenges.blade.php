@extends('app')

@section('content')

    {{-- <div class="jumbotron bg10 h-200 ">
        <h1 class="text-center mt-5">
             Plantea
            <b class="c03">desafíos</b>
        </h1>
        @guest
        <p class ="text-center" style="background-color: ivory;">Ingresa para plantear desafíos</p>
        @endguest

    </div>
    @guest

    @endguest --}}
    {{-- @auth
        {{csrf_field()}}
        <div id="createChallenge"></div>
    @endauth --}}
    {{csrf_field()}}
    <div id="content"></div>
@endsection

@extends('app')

@section('meta')
    <meta http-equiv="refresh" content="0;url = ../../muro">
@endsection

@section('content')
    <div id="getToken" data-token="{{$token}}" ></div>
    <div id="content"></div>
@endsection

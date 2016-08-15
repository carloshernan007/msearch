<?php

  require '../vendor/autoload.php';
  require  'Client.php';
  header('Content-Type: application/json');

  $client = new Client();
  $element = (string)$_POST['element'];

  switch ($element){

      case 'popular':
          $client->mostPopular();
          break;

      case 'genres':
          $client->genres();
          break;

      case 'lastmovie':
          $client->lastMovie();
          break;

      case 'searchPerson':
          $client->searchPerson($_POST['parameter'],$_POST['page']);
          break;

      case 'searchMovie':
          $client->searchMovie($_POST['parameter'],$_POST['page']);
          break;

      case 'getMovie':
          $client->getInfoMovie($_POST['parameter']);
          break;

      case 'person':
          $client->person($_POST['parameter']);
          break;

      case 'searchPersonAndMovie':
          $client->searchPersonAndMovie($_POST['parameter']);
          break;

      case 'popularPeole':
          $client->popularPeople($_POST['page']);
          break;

      case 'popularMovie':
          $client->popularMovie($_POST['page']);
          break;

  }



<?php

/**
 * Class client for process the petitions to api
 */

class Client {
    /**
     * @var string
     */
    protected $_path = 'https://api.themoviedb.org/3/';
    /**
     * @var string
     */
    protected $_key = 'bb92f24b10739a63ee863c947ada740f';
    /**
     * @var \Curl\Curl
     */
    protected $_curl;

    /**
     * Process constructor.
     */
    public function __construct(){
        $this->_curl = new Curl\Curl();
    }
    /**
     * return the most populars movies
     */
    public function mostPopular(){
        $this->_curl->get( $this->_path.'discover/movie',[
            'sort_by' => 'popularity.desc',
            'page' => 1,
            'year' => date('Y'),
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            echo $this->_curl->error_code;
        }
        else {
            echo $this->_curl->response;
        }
    }
    /**
     * return the genres
     */
    public function genres(){
        $this->_curl->get( $this->_path.'genre/movie/list',[
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            echo $this->_curl->error_code;
        }
        else {
            echo $this->_curl->response;
        }
    }
    /**
     * Search of all
     *
     * @param string$parameter
     * @param int $page
     */
    public function search($parameter,$page=1){
        $this->_curl->get( $this->_path.'search/multi',[
            'sort_by' => 'release_date.desc',
            'page' => $page,
            'query' => $parameter,
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            echo $this->_curl->error_code;
        }
        else {
            echo $this->_curl->response;
        }
    }
    /**
     * Search the person
     *
     * @param string $parameter
     * @param int $page
     * @param bool $json
     * @return int|null
     */
    public function searchPerson($parameter,$page=1,$json=true){
        $parameter = str_replace('t:person','',$parameter);
        $this->_curl->get( $this->_path.'search/person',[
            'page' => $page,
            'query' => $parameter,
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            if($json)
              echo $this->_curl->error_code;
            else
               return  $this->_curl->error_code;;
        }
        else {
            if($json)
               echo $this->_curl->response;
            else
               return  $this->_curl->response;
        }
    }

    /**
     * Search the movie
     *
     * @param string $parameter
     * @param int $page
     * @param bool $json
     * @return int|null
     */
    public function searchMovie($parameter,$page=1,$json=true){
        $this->_curl->get( $this->_path.'search/movie',[
            'page' => $page,
            'query' => $parameter,
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            if($json)
                echo $this->_curl->error_code;
            else
                return  $this->_curl->error_code;
        }
        else {
            if($json)
                echo $this->_curl->response;
            else
                return  $this->_curl->response;
        }
    }
    /**
     * Get the movies of person
     *
     * @param $person_id
     * @return null
     */
    public function getMovie($person_id){
        $this->_curl->get( $this->_path.'person/'.$person_id.'/movie_credits',[
            'id' => $person_id,
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            echo $this->_curl->error_code;
        }
        else {
            return $this->_curl->response;
        }
    }
    /**
     * Get the last movie
     */
    public function lastMovie(){
        $this->_curl->get( $this->_path.'discover/movie',[
            'sort_by' => 'release_date.desc',
            'page' => 1,
            'year' => date('Y'),
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            echo $this->_curl->error_code;
        }
        else {
            echo $this->_curl->response;
        }
    }
    /**
     * Get information of actor
     * @param int $person_id
     */
    public function person($person_id){
        $this->_curl->get( $this->_path.'person/'.$person_id,[
            'id' => $person_id,
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            echo $this->_curl->error_code;
        }
        else {
            $result = [
                'person' => json_decode($this->_curl->response),
                'movies' => json_decode($this->getMovie($person_id))
            ];
            echo json_encode($result);
        }
    }
    /**
     * Get information of movie
     * @param int $movie_id
     */
    public function getInfoMovie($movie_id){
        $this->_curl->get( $this->_path.'movie/'.$movie_id,[
            'id' => $movie_id,
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            echo $this->_curl->error_code;
        }
        else {
            $result = [
                'movie' => json_decode($this->_curl->response),
                'video' => json_decode($this->getvideoMovie($movie_id))
            ];
            echo json_encode($result);
        }
    }
    /**
     * Get the video of movie
     * @param $movie_id
     * @return int|null
     */
    public function getvideoMovie($movie_id){
        $this->_curl->get( $this->_path.'movie/'.$movie_id.'/video',[
            'id' => $movie_id,
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            return  $this->_curl->error_code;
        }
        else {
           return $this->_curl->response;
        }
    }
    /**
     * Search person and movies
     *
     * @param int $parameter
     */
    public function searchPersonAndMovie($parameter){


        $movie =  ['total_results' => 0];
        $type = 'person';

        if(strpos($parameter, 't:person') !== false){
            $parameter = str_replace('t:person','',$parameter);
            $person = json_decode($this->searchPerson($parameter,1,false),true);
        }else if(strpos($parameter, 't:movie') !== false){
            $person ['total_results'] = 0;
            $parameter = str_replace('t:movie','',$parameter);
            $movie = json_decode($this->searchMovie($parameter,1,false));
            $type = 'movie';
        }else{
            $person = json_decode($this->searchPerson($parameter,1,false),true);
            if(is_array($person) && array_key_exists('total_results',$person) && $person['total_results'] == 0){
                $movie = json_decode($this->searchMovie($parameter,1,false));
                $type = 'movie';
            }
        }

        echo json_encode(
            [
                'person' => $person,
                'movie' => $movie,
                'type' => $type
            ]
        );
    }

    /**
     * Get popular people
     *
     * @param int $page
     */
    public function popularPeople($page){
        $this->_curl->get( $this->_path.'person/popular',[
            'page' => $page,
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            echo $this->_curl->error_code;
        }
        else {
            echo $this->_curl->response;
        }
    }

    /**
     * Get popular movie
     *
     * @param $page
     */
    public function popularMovie($page){
        $this->_curl->get( $this->_path.'movie/popular',[
            'page' => $page,
            'api_key' => $this->_key
        ]);

        if ($this->_curl->error) {
            echo $this->_curl->error_code;
        }
        else {
            echo $this->_curl->response;
        }
    }



}


<?php

  echo "Testing on nodejs ....";
  // perform HTTP request to your nodejs server to fetch your data
  $raw_data = file_get_contents('http://localhost:3031/scrape');

  // PHP just sees your data as a JSON string, so we'll decode it
  $data = json_decode($raw_data, true);

  // ... do stuff with your data
  echo $data['result'];

?>
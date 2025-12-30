# TODO

## FIX

- `?q=web&location=New+York` returns error `No jobs found for: web`

  Correct response:

  ```json
  {
    "search_metadata": {
      "id": "69533c8802ab8cbefce33a92",
      "status": "Success",
      "json_endpoint": "https://serpapi.com/searches/5207db3214fadf61/69533c8802ab8cbefce33a92.json",
      "created_at": "2025-12-30 02:44:24 UTC",
      "processed_at": "2025-12-30 02:44:24 UTC",
      "google_jobs_url": "https://www.google.com/search?q=web&uule=w+CAIQICIWTmV3IFlvcmssVW5pdGVkIFN0YXRlcw&hl=en&gl=us&udm=8",
      "raw_html_file": "https://serpapi.com/searches/5207db3214fadf61/69533c8802ab8cbefce33a92.html",
      "total_time_taken": 2.25
    },
    "search_parameters": {
      "q": "web",
      "engine": "google_jobs",
      "location_requested": "New York, United States",
      "location_used": "New York,United States",
      "google_domain": "google.com",
      "hl": "en",
      "gl": "us"
    }
  }
  ```

  Error response:

  ```json
  {
    "search_metadata": {
      "id": "69533c56ac17659c3750f859",
      "status": "Success",
      "json_endpoint": "https://serpapi.com/searches/65be5ba33ce26616/69533c56ac17659c3750f859.json",
      "created_at": "2025-12-30 02:43:34 UTC",
      "processed_at": "2025-12-30 02:43:34 UTC",
      "google_jobs_url": "https://www.google.com/search?q=web&uule=w+CAIQICIWTmV3IFlvcmssVW5pdGVkIFN0YXRlcw&udm=8",
      "raw_html_file": "https://serpapi.com/searches/65be5ba33ce26616/69533c56ac17659c3750f859.html",
      "total_time_taken": 2.06
    },
    "search_parameters": {
      "q": "web",
      "engine": "google_jobs",
      "location_requested": "New York",
      "location_used": "New York,United States",
      "google_domain": "google.com"
    },
    "search_information": {
      "jobs_results_state": "Fully empty"
    },
    "error": "Google hasn't returned any results for this query."
  }
  ```

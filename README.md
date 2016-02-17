# Angular + Elasticsearch + D3 Example

This is an example project designed to show how you can use elasticsearch result with angular and D3JS.

## Prerequisites

In order to run this example, you will need to have the following installed and running
  1. [elasticsearch](https://www.elastic.co/products/elasticsearch)
  2. [logstash](https://www.elastic.co/products/logstash)
  3. [elasticsearch-express](https://github.com/rujiali/elasticsearch-express)
  4. [bower](http://bower.io/#install-bower)

You will need to have the sample data imported into elasticsarch
  1. Get the sample data and logstash config files from [toilet-map](https://github.com/elastic/lca2016presentation/tree/master/toilet-map)
  2. Import the sample data via logstash
  
  ```sh
  zcat PublicToilets.csv.gz | /path/to/logstash -f ./logstash.conf
  ```
  
  3. Test your elasticsearch-express (See README from elasticsearch-express)
  

## To run the example:
1. Clone this repo locally (or just download and unzip it)

  ```sh
  https://github.com/rujiali/ealsticsearch-angular-D3.git
  ```

2. Move into the project

  ```sh
  cd elasticsearch-angular-D3
  ```

3. Install the bower dependencies

  ```sh
  bower install
  ```
  
4. Start SimpleHTTPServer 
 
  ```sh
  python -m SimpleHTTPServer 8080
  ```

5. Open the index.html file in your browser.

<a href="https://wiki.dbpedia.org/downloads-2016-10"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F7%2F73%2FDBpediaLogo.svg%2F1200px-DBpediaLogo.svg.png&f=1&nofb=1" title="dbpedia" alt="dbpedia"></a>


# DBpedia person explorer


## What this project does
- Exposes an inerface for adding single/ multiple person <a href="http://downloads.dbpedia.org/preview.php?file=2016-10_sl_core-i18n_sl_en_sl_persondata_en.ttl.bz2">data</a> triples into <a href="https://github.com/cayleygraph/cayley" target="_blank">cayley</a>
- Exposes an interface to search for indexed person data by name, and lookup other persons by location


## Installation 
- Clone this repository
- Intall <a href="https://docs.docker.com/install/">docker</a>
- Pull the backend image, and build frontend image by
```bash
cd dbpedia_graph
./init.sh
```
- You should see logs indicating the backend server running at `http://localhost:64210` and the frontend server running at `http://localhost:5000`


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**


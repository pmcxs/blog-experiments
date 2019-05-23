
## Prepare data

cd data

wget https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_0_countries.zip

unzip ne_50m_admin_0_countries.zip

ogr2ogr -f GeoJSON -t_srs crs:84 world.geojson ne_50m_admin_0_countries.shp

geo2hexagon -input "ne_50m_admin_0_countries.shp" --inputtype Shapefile --hexagonsize 500 --targets country:iso_a2 --outputtype SQLite --output hexagons.sqlite

hexagon2map --input hexagons.sqlite --hexagonsize 500 --dataproperties country --outputtype Geojson --output hexagons.geojson

rm ne_50m*

## Create Vector Tiles

cd ..

cd server

./tippecanoe -o world.mbtiles -z6 --drop-densest-as-needed ../data/world.geojson ../data/hexagons.geojson


# Run Vector Tile Server

cd ..

cd server

tileserver-gl-light -c config.json


# Run HTTP Server

python -m http.server
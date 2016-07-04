drop schema public cascade;
create schema public;

-- add sql statements here


SELECT row_to_json(fc)
 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
 FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(geom)::json As geometry
    , row_to_json((SELECT l FROM (SELECT id, user_id, harassment, commentary, timestamp, safety) As l
      )) As properties
   FROM markers_geom As lg   ) As f )  As fc;



CREATE OR REPLACE FUNCTION save_marker(user_id integer, haras text, lat decimal, lng decimal, commentary text, ts timestamp, safety integer) RETURNS void AS $$
DECLARE
BEGIN 
  INSERT INTO 
    markers_geom ( user_id, harassment, geom, commentary, timestamp, safety )
    VALUES
        (user_id, haras, ST_SetSRID(ST_MakePoint(lng , lat),4326), commentary, ts, safety );
    RETURN;
END;

$$ language plpgsql;

select * from save_marker(10, 'test haras', -122.4144127965, 37.7760023304, 'comment','Jun 14 2016 20:58:11 ' ,4)


--function to get markers
CREATE or REPLACE FUNCTION getMarkers() RETURNS json AS $$
   DECLARE
   response json;

   BEGIN

   
   response := (SELECT row_to_json(fc)
	FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
	FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(geom)::json As geometry
    , row_to_json((SELECT l FROM (SELECT id, user_id, harassment, commentary, timestamp, safety) As l
      )) As properties
   FROM markers_geom As lg   ) As f )  As fc) as foo;

	return response;
   END;
   $$ language plpgsql;
::
:: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-test-cors.html
::
:: API: https://wwt4xdh9wb.execute-api.eu-central-1.amazonaws.com/default/current_site_status
::
SET restapi_id=wwt4xdh9wb
SET region=eu-central-1
SET stage_name=default
SET origin=http://dashboard.ipheion.eu

curl -v -X OPTIONS -H "Access-Control-Request-Method: POST" -H "Origin: %origin%" https://%restapi_id%.execute-api.%region%.amazonaws.com/%stage_name%/current_site_status

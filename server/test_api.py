import http.client

conn = http.client.HTTPSConnection("dev-xd7ykqvwbz8sm235.us.auth0.com")

payload = "{\"client_id\":\"bhvVvC7SNx4oJCGjkIZ3Koi4S49Q0WPf\",\"client_secret\":\"c0ENP6LXlOXR5H8aIsdgDnWE6-Hk4fyUiLWTQcgXDr2Ap6zYX5UDc3Dk9TPk_pXN\",\"audience\":\"http://localhost:5555/\",\"grant_type\":\"client_credentials\"}"

headers = { 'content-type': "application/json" }

conn.request("POST", "/oauth/token", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
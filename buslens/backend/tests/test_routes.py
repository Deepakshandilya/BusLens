import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_routes_validation_same_stop():
    r = client.post("/v1/routes/search", json={"from_stop": "A", "to_stop": "A"})
    assert r.status_code == 400

@pytest.mark.skip(reason="Requires local DB populated with routes + route_stops")
def test_routes_search():
    r = client.post("/v1/routes/search", json={"from_stop": "Kharar", "to_stop": "ISBT Sector 43"})
    assert r.status_code == 200
    assert isinstance(r.json(), list)

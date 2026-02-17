import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.mark.skip(reason="Requires local DB with stops table populated")
def test_stops_search():
    r = client.get("/v1/stops", params={"query": "ISBT", "limit": 5})
    assert r.status_code == 200
    assert "results" in r.json()

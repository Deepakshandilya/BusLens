import os 
from dataclasses import dataclass 
from dotenv import load_dotenv 

load_dotenv()


# _ func for the private function -> internals 
def _get_env(name: str, default: str | None = None ) -> str:
    val = os.getenv(name,default)
    if val is None: 
        raise RuntimeError(f"Missing Required env var : {name}")
    return val 


# list comprehensions 
def _parse_origins(raw: str) -> list[str]: 
    # "a,b,c" -> ["a","b","c"]
    items = [x.strip() for x in (raw or "").split(",")]
    return [x for x in items if x ]

@dataclass(frozen=True)
class Settings:
    app_env: str = _get_env("APP_ENV", "local")

    db_host: str = _get_env("DB_HOST","localhost")
    db_port: str = _get_env("DB_PORT","3306")
    db_name: str = _get_env("DB_NAME","buslens")
    db_user: str = _get_env("DB_USER","buslens_user")
    db_password: str = _get_env("DB_PASSWORD","buslens_password")

    cors_origins: list[str] = None  # set in __post_init__

    def __post__init(self):
        raw = os.getenv("CORS_ORIGINS", "https://localhost:5173")
        object.__setattr__(self,"cors_origins",_parse_origins(raw))

settings = Settings()


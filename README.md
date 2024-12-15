# Zdalny Wnuczek

## Opis

Nasza aplikacja wspiera seniorów w codziennych wyzwaniach, łącząc ich z wolontariuszami i oferując intuicyjne wsparcie za pomocą wizualnych instrukcji. Dzięki nowoczesnym technologiom, aplikacja zapewnia szybki i łatwy dostęp do pomocy, ułatwiając seniorom wykonywanie codziennych zadań.


## Jak uruchomić aplikacje lokalnie na kontenerach?

w folderze `backend/broker` dodaj plik `.env`:
```
GEMINI_API_KEY=AIzaSyBrZLeKPAclHKyMx9Lx8hIt0aOx4Yh1R5E
DB_USER=root
DB_PASSWORD=1234
DB_HOST=localhost
DB_PORT=3306
DB_NAME=icons
PORT=3000
```

w folderze `backend/volunteer` dodaj plik `.env`:
```
DB_USER=root
DB_PASSWORD=1234
DB_HOST=localhost
DB_PORT=3306
DB_NAME=icons
```

Następnie upewnij się, że masz dockera i uruchom komende z folderu root: 
`docker compose up --build`

## Zespół
* Patryk Kurek
* Piotr Zapiór
* Maciej Klimek
* Maciej Jurczyga
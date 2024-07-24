npm install
npm run start

Felvételi feladat - Jun / Med szoftverfejlesztő
Feladat leírása
Készíts egy REST API-t Node.js és MongoDB segítségével, amely lehetővé teszi a felhasználók számára,
hogy könyveket és azokhoz kapcsolódó review-kat kezeljenek.
Az API legyen képes kezelni a felhasználók, könyvek és review-k CRUD (Create, Read, Update, Delete)
műveleteit, és biztosítson néhány komplexebb backend logikát.
Követelmények

1. Node.js és Express használata az API készítéséhez.
2. MongoDB adatbázis használata az adatok tárolásához.
3. Mongoose használata az adatmodell definiálásához és kezeléséhez.
4. Felhasználók, Könyvek és Review-k entitások létrehozása.
5. Validáció: Biztosítani kell az adatok érvényességét, például egy könyv címének kötelező megadása,
   vagy egy review szövegének minimális hossza.
6. Autentikáció és Autorizáció: Alapvető autentikáció JWT (JSON Web Token) használatával, hogy
   biztosítsuk, hogy csak bejelentkezett felhasználók hozhatnak létre vagy módosíthatnak review-kat.
7. Kapcsolódások kezelése: Egy felhasználó több review-t is írhat különböző könyvekhez, és egy
   könyvhöz több review is tartozhat.
8. Komplex backend logika: Például egy review értékelésének (1-5 csillag) átlagszámításának
   biztosítása minden könyvnél.
9. Dokumentáció: Az API végpontjainak dokumentálása, például Swagger vagy egyéb dokumentációs
   eszköz segítségével.
   Példa API végpontok

1) Felhasználók
   ● POST /users: Új felhasználó létrehozása
   ● POST /users/login: Felhasználó bejelentkezése és JWT token generálása
   ● GET /users/me: Bejelentkezett felhasználó adatainak lekérdezése (autentikált végpont)
2) Könyvek
   ● POST /books: Új könyv létrehozása
   ● GET /books: Könyvek listájának lekérdezése
   ● GET /books/:id: Egy könyv részletes adatainak lekérdezése
   ● PATCH /books/:id: Egy könyv adatainak módosítása
   ● DELETE /books/:id: Egy könyv törlése
3) Review-k
   ● POST /books/:bookId/reviews: Új review létrehozása egy könyvhöz (autentikált végpont)
   ● GET /books/:bookId/reviews: Egy könyvhöz tartozó review-k listájának lekérdezése
   ● PATCH /reviews/:id: Egy review módosítása (autentikált végpont, csak a review írója)
   ● DELETE /reviews/:id: Egy review törlése (autentikált végpont, csak a review írója)

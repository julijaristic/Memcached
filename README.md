# Optimizacija performansi web aplikacije primenom Memcached sistema za keširanje podataka
Predstavljanje osnovnih koncepta keširanja i Memcached-a. Implementacija Memcached-a kao sistem za keširanje u web aplikaciji. Testiranje i analiza keširanja podataka sa ciljem poboljšanja performansi.

# Sadrzaj
- [Keširanje podataka](#keširanje-podataka)
- [Web keširanje](#web-keširanje)
- [Memcached](#memcached)
- [Projekat](#projekat)
- [Rezultati i analiza testiranja keširanja](#rezultati-i-analiza-testiranja-keširanja)

## Keširanje podataka
Keširanje podataka predstavlja proces skladištenja više kopija podataka 
ili fajlova na privremenu lokaciju za skladištenje, poznatu kao keš, radi bržeg pristupa tim 
podacima. Ovaj proces omogućava čuvanje podataka za softverske aplikacije, servere i web 
pregledače, čime se eliminiše potreba za ponovnim preuzimanjem informacija svaki put kada 
korisnici pristupaju sajtu ili aplikaciji. Shodno tome, ubrzava se učitavanje sajta i poboljšava 
korisničko iskustvo.  
Keširani podaci igraju ključnu ulogu u optimizaciji performansi i brzine učitavanja 
aplikacija i web stranica. Karakteristike kao što su automatsko skladištenje, brzo učitavanje, 
privremeno skladištenje, validacija i osvežavanje podataka, kao i redukcija mrežnog saobraćaja 
doprinose efikasnijem korišćenju resursa i poboljšanom korisničkom iskustvu.  
U osnovi keširanje memorije funkcioniše tako što se odvaja deo RAM-a koji će se 
koristiti kao keš. Kada aplikacija pokušava da pročita podatke, obično iz sistema za skladištenje 
podataka kao što je baza podataka, proverava da li željeni zapis već postoji u kešu. Ako postoji, 
aplikacija čita podatke iz keša, čime se eliminiše sporiji pristup bazi podataka. Ako željeni zapis 
nije u kešu, aplikacija čita zapis iz izvora. Kada preuzme te podatke, takodje ih upisuje u keš 
kako bi, kada aplikaciji ponovo zatrebaju isti podaci, mogla brzo da ih preuzme iz keša. Podaci 
se obično keširaju na dva načina: kroz keširanje pretraživača ili memorije, ili putem CDN-ova 
(Content Delivery Networks)

---

### Prednosti keširanja

1. Brži pristup sadržaju za aplikacije
2. Poboljšanje performansi aplikacija
3. Ubrzavanje preuzimanja podataka
4. Smanjenje latencije u upitima bazi podataka
5. Smanjenje opterećenja na backend uslugama
6. Smanjenje troškova baze podataka
7. Smanjenje korišćenja procesora
8. Omogućavanje predvidljivih performansi
9. Povećanje IOPS (Input/Output operacija po sekundi)
10. Poboljšanje korisničkog iskustva
11. Pristup sadržaju bez interneta
12. Ušteda energije na uređajima

### Mane keširanja

1. Potrošnja skladišta
2. Rizik od zastarelog sadržaja (stari podaci)
3. Netačni ili oštećeni keširani podaci
4. Bezbednosni rizik
5. Težak proces invalidacije keša
6. Dodatni troškovi i složenost
7. Gubitak keša pri isključivanju uređaja

---


## Web keširanje
Postoje dve vrste opcija za keširanje: 
1. Keširanje na strani servera  
   Keširanje na serverskoj strani je tehnika koja se koristi za skladištenje kopija 
podataka na serveru kako bi se poboljšale performanse web aplikacija i smanjilo opterećenje na 
pozadinske sisteme. Ova vrsta keširanja omogućava brže odgovore na zahteve korisnika, 
smanjuje potrošnju resursa i značajno unapreĎuje skalabilnost aplikacija. Keširani podaci se 
skladište na serveru, čime krajnji korisnici nemaju kontrolu nad ovim procesom, što je posebno 
korisno kod aplikacija sa velikim saobraćajem.   
Kada korisnik poseti web stranicu, njihov pretraživač zahteva podatke od servera. Server 
proverava da li su traženi podaci već pohranjeni u kešu. Ukoliko jesu, server ih odmah 
isporučuje korisniku, čime se smanjuje vreme obrade i omogućava brža isporuka stranica. U 
suprotnom, server pribavlja nove podatke, kešira ih za buduću upotrebu, a zatim ih šalje 
korisniku. Ova tehnika smanjuje potrebu za učestalim upitima prema bazi podataka i poboljšava 
korisničko iskustvo.  
Postoji nekoliko podvrsta keširanja na serverskoj strani:
   - CDN keširanje
   - Keširanje objekata
   - Keširanje stranica
   - Fragmentno keširanje

2. Keširanje na strani klijenta  
     Keširanje na klijentskoj strani je tehnika koja se koristi za skladištenje podataka 
lokalno na ureĎaju korisnika kako bi se poboljšala performansa i efikasnost web aplikacija. 
Čuvanjem često pristupanih podataka na klijentskoj strani, aplikacije mogu smanjiti potrebu za 
ponovljenim zahtevima ka serveru, što vodi ka bržem učitavanju i boljem korisničkom iskustvu. 
Ova metoda je posebno korisna za aplikacije koje treba da pruže brze odgovore i mogu da 
funkcionišu sa povremenom mrežnom povezanošću.  
Postoji nekoliko tipova keširanja na klijentskoj strani koji omogućavaju optimizaciju 
performansi, u zavisnosti od potreba aplikacije. Neki od tipova su:
   -  Keširanje u pregledaču,
   -  Servisni radnici
   -  Lokalno skladištenje, skladištenje sesije i kolačići

---
## Memcached
### Šta je Memcached?  
Memcached je besplatan, otvorenog koda (open source), distribuirani sistem za keširanje podataka u memoriji koji služi za ubrzavanje dinamičkih web aplikacija. To postiže tako što smanjuje opterećenje na bazama podataka tako što privremeno čuva rezultate često korišćenih upita, podataka API poziva ili renderovanja stranica u brzoj memoriji (RAM).
Memcached je dizajniran da čuva male, proizvoljne podatke u obliku ključ-vrednost parova — najčešće stringove ili serijalizovane objekte.

### Kako Memcached radi?  
Memcached je jednostavan key-value skladište u RAM-u koje funkcioniše kao keš sloj između aplikacije i baze podataka.
Klijent šalje zahtev serveru sa ključem.
Server proverava da li ima podatak pod tim ključem u kešu.
Ako podatak postoji (cache hit), server vraća vrednost odmah.
Ako podatak ne postoji (cache miss), aplikacija obično ide direktno u bazu podataka, dobija podatak, i taj podatak se može dodatno sačuvati u Memcached da bi sledeći put bio dostupan brže.

### Komponente Memcached sistema  
- **Klijent** je deo koda u tvojoj aplikaciji koji zna za listu dostupnih Memcached servera i koristi hash algoritam da odluči na koji server da pošalje podatak ili zahtev za podatkom. Klijent upravlja kojim serverima se pristupa.
- **Server** je proces koji prima zahteve, čuva podatke u internoj heš tabeli u memoriji i vraća podatke klijentu. Server koristi LRU (Least Recently Used) algoritam za izbacivanje starih ili neaktivnih podataka kad ponestane memorije.
- **LRU algoritam** automatski briše najstarije (najduže neupotrebljavanje) podatke kako bi napravio mesto za nove podatke. Ovo sprečava keš da se pretrpa i da zastareli podaci zauzimaju memoriju.

### Dizajn i filozofija Memcached-a  
Sistem ključ-vrednost: Memcached ne interpretira podatke. Ti šalješ podatke već serijalizovane (npr. kao JSON ili bajtove).
Decentralizovan sistem: Serveri ne komuniciraju međusobno, nema replikacije podataka niti sinhronizacije.
Brzina: Sve operacije su dizajnirane da rade u O(1) vremenu (konstantno vreme izvršenja), što znači da su izuzetno brze i bez čekanja.
Zaboravljanje podataka je poželjno: Keš se sastoji od podataka sa vremenom isteka, kako bi se sprečilo vraćanje zastarelih informacija.

### Prednosti Memcached-a  
Visoke performanse: Brza memorijska operacija smanjuje vreme čekanja za često korišćene podatke.
Skalabilnost: Možeš dodavati više servera kako bi povećao ukupnu memoriju za keširanje.
Jednostavnost: Jednostavan API i lagana instalacija.
Podrška za više jezika: Ima dostupne klijentske biblioteke za Python, PHP, Java, Node.js, Ruby, C#, Go i mnoge druge.

### Ograničenja Memcached-a  
Nema trajnosti podataka: Ako server padne ili se restartuje, keširani podaci se gube.
Nema ugrađene replikacije ili sinhronizacije između servera.
Samo keširanje: Nije zamena za bazu podataka, već sloj koji ubrzava pristup podacima.
Klijent mora da zna listu servera i kako da rasporedi zahteve.

### Kako Memcached pomaže u aplikacijama?  
Recimo da imaš web aplikaciju koja prikazuje listu proizvoda iz baze podataka. Svaki put kada korisnik pristupi, aplikacija mora da napravi upit bazi i dobije te podatke. To može biti sporo i opterećujuće ako je mnogo korisnika.Uz Memcached, prvi put kada aplikacija povuče podatke iz baze, rezultat se upisuje u Memcached.Sledeći korisnici dobijaju podatke direktno iz memorije, što je mnogo brže.Time se smanjuje broj upita bazi i ubrzava vreme odziva aplikacije.

### Keširanje stranica i kombinacija sa Memcached-om
Keširanje stranica predstavlja tehniku u kojoj se ceo prikaz jedne HTML stranice – uključujući sadržaj, raspored i stil – čuva u keš memoriji. Kada korisnik ponovo zatraži istu stranicu, sadržaj se ne generiše iznova putem serverske logike, već se odmah isporučuje iz keša, čime se značajno ubrzava vreme odgovora aplikacije.

U ovoj aplikaciji, site keširanje je realizovano pomoću Memcached-a tako što se kompletan HTML odgovor stranice kešira pod ključem koji odgovara URL adresi (npr. /, /about, itd). Ova tehnika se pokazala posebno korisnom za statičnije stranice koje ne zavise od specifičnih korisničkih ulaza.

Mehanizam rada je sledeći:

Kada korisnik pristupi stranici, sistem proverava da li postoji keširani HTML sadržaj u Memcached-u za traženi URL.

Ako postoji – sadržaj se odmah isporučuje korisniku (cache hit).

Ako ne postoji – stranica se generiše, HTML sadržaj se sačuva u Memcached-u sa rokom trajanja od 5 minuta i zatim isporučuje korisniku (cache miss).

Ova kombinacija omogućava efikasno keširanje celokupnog sadržaja sajta, čime se značajno smanjuje broj renderovanja stranica i opterećenje servera, dok se korisnicima omogućava brže učitavanje stranica.

## Projekat
### 1. Pokretanje web aplikacije
Moraš imati instalirane Node.js i npm na svom računaru. Ovaj projekat je razvijen korišćenjem sledećih verzija:

* Node.js v16.14.0
* npm v8.3.1

Uđi u projektni direktorijum komandom `cd`, a zatim pokreni `npm install` kako bi preuzeo sve zavisnosti.
Izvrši sledeću komandu da pokreneš razvojni server:

```
npm run dev
```

Otvori u pregledaču adresu: [http://localhost:3000](http://localhost:3000).

### 2. Instalacija Memcached na Ubuntu  
   Ažuriraj listu paketa:  
  
   `sudo apt update`   

   Instaliraj Memcached:  

   `sudo apt install memcached`

   Proveri status Memcached servisa:  
   `sudo systemctl status memcached`

   Pokreni Memcached (ako nije već pokrenut):  
   `sudo systemctl start memcached` 
   
### 3. Testiranje performansi pomoću alata Artillery  
   Instalacija Artillery:
   ```
   npm install -g artillery
   ```
   Kreiranje Artillery.yml fajla:
   ```
   config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "Search HN for Programming content"
    flow:
      - get:
          url: "/search?q=Programming"
   ```
   Pokretanje aplikacije:
   ```
   npm run start
   ```
   Pokretanje testiranja:
   ```
   artillery run artillery.yml
   ```
   
## Rezultati i analiza testiranja keširanja
U cilju evaluacije performansi različitih strategija keširanja u web aplikaciji, korišćen je 
alat [Artillery](https://www.artillery.io/). Artillery je moćan alat otvorenog koda namenjen za testiranje opterećenja i 
performansi aplikacija, posebno onih zasnovanih na HTTP protokolima, RESTful API-jevima, i 
mikroservisima. Omogućava simulaciju velikog broja korisnika koji istovremeno pristupaju 
aplikaciji, što daje realističan uvid u to kako će aplikacija funkcionisati u produkcionom 
okruženju sa povećanim brojem zahteva. 

---

## Rezultati performansi
U nastavku su prikazani ključni rezultati za dva scenarija: **bez keširanja** , **Memcached** i **Memcached sa site keširanjem**.

---

### 🔁 Vreme odgovora

| Metrika               | Bez keširanja | Memcached | Memcached + site caching |
| --------------------- | ------------- | --------- | ------------------------ |
| Minimalno vreme (ms)  | 9 ms          | 8 ms      | 8 ms                     |
| Maksimalno vreme (ms) | 3545 ms       | 2619 ms   | 2157 ms                  |
| Prosečno vreme (ms)   | 1747.7 ms     | 58.2 ms   | 39.3 ms                  |

---

### 📈 Percentili vremena odgovora

| Percentil     | Bez keširanja | Memcached | Memcached + site caching |
| ------------- | ------------- | --------- | ------------------------ |
| 95. percentil | 2725 ms       | 2644.7 ms | 1224.4 ms                |
| 99. percentil | 3197.8 ms     | 1826.6 ms | 2179.4 ms                |

---

### ✅ HTTP kodovi odgovora

| HTTP Kod          | Bez keširanja | Memcached | Memcached + site caching |
| ----------------- | ------------- | --------- | ------------------------ |
| HTTP 200 (uspeh)  | 521           | 600       | 600                      |
| HTTP 500 (greška) | 79            | 0         | 0                        |

---

### ⏱️ Trajanje korisničkih sesija

| Metrika                  | Bez keširanja | Memcached | Memcached + site caching |
| ------------------------ | ------------- | --------- | ------------------------ |
| Maksimalno trajanje (ms) | 3545.3 ms     | 2644.7 ms | 2179.4 ms                |
| Minimalno trajanje (ms)  | 331.7 ms      | 10.9 ms   | 10.9 ms                  |
| Prosečno trajanje (ms)   | 1751.6 ms     | 62.5 ms   | 43.3 ms                  |

---

### Analiza performansi
Analiza performansi pokazuje da je keširanje značajno unapredilo efikasnost aplikacije u svim ključnim aspektima. Bez keširanja, maksimalno i prosečno vreme odgovora su bili znatno viši, što je rezultiralo sporijim odzivom sistema i lošijim korisničkim iskustvom. Uvođenjem keširanja pomoću Memcached-a, vremena odgovora su drastično smanjena, a pouzdanost sistema unapređena, što se ogleda i u eliminaciji HTTP 500 grešaka.

Keširanje pomoću Memcached-a značajno smanjuje prosečno i maksimalno vreme odgovora. Posebno se ističe kombinacija Memcached-a sa site keširanjem, koja je ostvarila najbolje ukupne rezultate.

U pogledu distribucije dužine sesija korisnika, Memcached sa site keširanjem se takođe pokazao kao superiorno rešenje, sa najnižim prosečnim i maksimalnim trajanjem sesija. Ova strategija obezbeđuje optimalnu kombinaciju stabilnosti, brzine odziva i smanjenja opterećenja servera.

Memcached sa site keširanjem se u ovoj studiji pokazao kao najefikasnija strategija keširanja, pružajući najbolje performanse i korisničko iskustvo. Rezultati potvrđuju da je implementacija keširanja od suštinskog značaja za optimizaciju modernih web aplikacija, naročito u scenarijima gde su brzina i stabilnost ključni faktori uspeha.

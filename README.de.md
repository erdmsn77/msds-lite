# MSDS-Lite: Arbeitsschutz-Assistent für Bootsbau & Kompositwerkstätten

> **Praxisorientierter, offlinefähiger mobiler Assistent für Chemikaliensicherheit und Notfallmaßnahmen**

[ 🇹🇷 Türkçe ](README.md) • [ 🇬🇧 English ](README.en.md) • [ 🇩🇪 Deutsch ](README.de.md)

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-22d3ee?style=flat-square&logo=pwa)](https://erdmsn77.github.io/msds-lite/)
[![Offline First](https://img.shields.io/badge/Offline-100%25-emerald?style=flat-square)](https://erdmsn77.github.io/msds-lite/)
[![Languages](https://img.shields.io/badge/Languages-TR%20%7C%20EN%20%7C%20DE-blue?style=flat-square)](https://erdmsn77.github.io/msds-lite/)
[![License](https://img.shields.io/badge/License-MIT%20%2F%20Open-orange?style=flat-square)](LICENSE)

* **Live-Anwendung:** [erdmsn77.github.io/msds-lite](https://erdmsn77.github.io/msds-lite/)  
* **Wichtiger Hinweis:** Diese Anwendung ersetzt kein offizielles herstellerseitiges Sicherheitsdatenblatt (SDB / SDS). Sie dient als praxisnahes Schnellreferenz-Werkzeug für Werkstätten und Werften, um bei Notfällen sekundenschnell lebensrettende Entscheidungen zu treffen.

---

## Motivation & Hintergrund

Als Auszubildender und Student im Bereich Faserverbund-Bootsbau und Komposittechnologie habe ich während meiner praktischen Werkstattausbildung und in Vorbereitung auf bevorstehende Werft-Praktika ein kritisches Sicherheitsrisiko erkannt: **die akute Panik und der erschwerte Informationszugang bei direktem Gefahrstoffkontakt oder Unfällen.**

Im modernen Komposit-Bootsbau (Vakuuminfusion, Handlaminieren, Vakuumpressen, Entformen und Finishing) wird täglich mit gefährlichen organischen Peroxiden, Beschleunigern und reaktiven Harzen hantiert. Tritt ein Zwischenfall ein (z. B. ein MEK-P-Spritzer ins Auge):
* Tragen Mitarbeiter oft klebrige Schutzhandschuhe oder sind mit Staub und Harz bedeckt.
* Das Suchen und Lesen in vielseitigen, dichten PDF-Sicherheitsdatenblättern auf dem Smartphone kostet wertvolle Minuten.
* In vielen Werfthallen, Werkstatträumen und Schiffsrümpfen gibt es kein stabiles Mobilfunknetz.

**MSDS-Lite** entstand als direkte Antwort auf dieses Problem: Völlig unabhängig von externen Servern oder Internetverbindungen liefert die App **die entscheidenden Sofortmaßnahmen der ersten 60 Sekunden** direkt auf das mobile Endgerät.

---

## Architektur & Benutzererlebnis (2-Stufen-Informationsmodell)

Um Reizüberflutung in extremen Stresssituationen zu vermeiden, setzt MSDS-Lite auf ein **2-Stufen-Kartenmodell**:

### Stufe 1: Werkstatt-Übersichtskarten (Card View)
Auf dem Startbildschirm lassen sich alle Gefahrstoffe rasch überblicken:
* **Stoffbezeichnung:** Handelsname, CAS-Nummer und chemische Stoffklasse.
* **Signalwort:** Internationales GHS-Signalwort (`GEFAHR` in Rot oder `ACHTUNG` in Gelb).
* **GHS-Piktogramme:** Vektorbasierte rote Gefahrensymbole (Entzündbar, Ätzend, Gesundheitsschädlich, Umwelt etc.).
* **Wesentliche H-Sätze:** Zentrale Gefahrenhinweise der Substanz.
* **Farbkodierte Risikobadges:** Schnelle Risikoprofile für Brand (Rot), Gesundheit (Blau) und Umwelt (Grün).
* **Spülzeit-Badge:** Die vorgeschriebene Mindestdauer für ununterbrochene Spülung (`⏱ Mindestens 15 Min. spülen`).

### Stufe 2: Schnelles Notfall-Panel (Slide-in Drawer)
Durch Antippen einer Gefahrstoffkarte öffnet sich ein Schiebepanel mit 4 Notfall-Tabs:
1. **Erste Hilfe (Die ersten 60 Sekunden):** Klare Handlungsanweisungen bei Kontakt mit Augen, Haut, Atemwegen oder Verschlucken. Ausgestattet mit einem prominenten **Augenspül-Timer** sowie Notruf-Hinweisen.
2. **Brand & Brandbekämpfung:** Zulässige Löschmittel, **STRIKT VERBOTENE Maßnahmen** (z. B. Hochdruckwasserstrahl, der brennendes Peroxid verteilt), thermische Zersetzungsrisiken und Flammpunkte (°C).
3. **PSA-Ausrüstung (Persönliche Schutzausrüstung):** Erforderliche Atemschutzfilter (z. B. A2-Organikdampffilter, P3-Partikelfilter), Gesichts-/Augenschutz und eine **Handschuh-Beständigkeitsmatrix** (Latex, Nitril, Butyl/Neopren).
4. **Lagerung & Unverträglichkeiten:** Ideale Lagertemperaturen und strikte Trennungsgebote (z. B. schwere Explosionsgefahr bei direktem Kontakt von MEK-P mit Kobaltbeschleuniger).
5. **Offizielle Prüfung & Quelle:** Direkte Verweise auf verifizierte Sicherheitsdatenblätter und ECHA-Stoffdossiers.

---

## Technische & Werkstatt-Ergonomie Highlights

* **☀️ Werkstatt- (Hell) & 🌙 Nachtmodus:** Lichtstarker Kontrast (`#F8FAFC` Hintergrund mit `#0F172A` Text) garantiert beste Lesbarkeit bei grellem Sonnenlicht in offenen Werfthallen. Umschaltbar auf augenschonenden Dunkelmodus für Nachtschichten (gespeichert in `localStorage`).
* **📱 Native Touch- & Wischgesten:** Im Vollbild-PWA-Modus schließt eine Wischbewegung vom Bildschirmrand oder die Zurück-Taste des Telefons sanft das Notfallpanel, anstatt die Anwendung zu beenden (`history.pushState` & `popstate`).
* **🌍 Dreisprachig (TR / EN / DE):** Vollständige Lokalisierung für Türkisch, Englisch und Deutsch. Abgestimmt auf die Fachterminologie in Werften und im Komposit-Bootsbau im europäischen Raum.
* **⚡ Null externe Abhängigkeiten (Pure Vanilla JS & CSS):** Keinerlei Fremdbibliotheken oder Frameworks (weder Tailwind noch Bootstrap, React oder Vue). Unter 150 KB Gesamtgröße – blitzschneller Start auch auf älteren Werkstatt-Smartphones.
* **📶 100% Offline-fähig (PWA):** Service-Worker-basiert. Funktioniert zuverlässig in Kellern, abgeschirmten Hallen oder auf See ohne Mobilfunkempfang.
* **🔗 Direktverlinkung (Deep-Linking):** Stoff-IDs können direkt an die URL angehängt werden (z. B. `/#mek-p`), ideal für QR-Code-Aufkleber an Chemikalienschränken.

---

## Abgedeckte Gefahrstoffe (11 Werkstatt-Kernsubstanzen)

Die 11 gefährlichsten und häufigsten Arbeitsstoffe in modernen Komposit-Werkstätten:

| Stoffname | Kategorie | CAS-Nr. | Risikostufe | Kritische Werkstatt-Vorsichtsmaßnahme |
|---|---|---|---|---|
| **MEK-P** (Methylethylketonperoxid) | Peroxid | 1338-23-4 | **KRITISCH** | Niemals direkt mit Kobaltbeschleuniger mischen (Explosionsgefahr). Gefahr dauerhaften Sehverlusts bei Augenkontakt; mindestens 15 Min. ununterbrochen drucklos spülen. |
| **Kobaltnaphthenat** (6%) | Beschleuniger | 61789-51-3 | **KRITISCH** | In separatem Schrank getrennt von Peroxiden lagern. Starker Hautsensibilisator; erfordert mindestens 20 Min. Spüldauer. |
| **Orthophthalsäure-Polyesterharz** | Harz | 25032-83-3 | **HOCH** | Enthält Styrolmonomer. Niemals Aceton zur Hautreinigung verwenden (Aceton transportiert Gefahrstoffe tief in die Poren). |
| **Vinylesterharz** | Harz | 36425-15-7 | **HOCH** | Sehr reaktionsfreudig. A2-Atemschutzfilter und chemikalienbeständige Nitrilhandschuhe sind zwingend erforderlich. |
| **Epoxidharz (DGEBA)** | Harz | 25068-38-6 | **HOCH** | Stark hautreizend; wiederholter Kontakt führt zu lebenslanger Kontaktdermatitis. Latexhandschuhe sind durchlässig; nur Nitril verwenden. |
| **Epoxidhärter (IPDA)** | Härter | 2855-13-2 | **KRITISCH** | Ätzendes aliphatisches Amin. Größere Mischmengen in tiefen Behältern führen zu gefährlicher exothermer Selbsterhitzung (Hitze & Rauchentwicklung). |
| **Technisches Aceton** | Lösungsmittel | 67-64-1 | **MITTEL** | Extrem niedriger Flammpunkt (-17°C). Strikt verboten zur Hautreinigung; ausschließlich zum Auswaschen von Pinseln und Werkzeugen bestimmt. |
| **Kohlefasern / CFK-Staub** | Staub & Fasern | 7440-44-0 | **HOCH** | Mikroskopische Fasern zerkratzen die Hornhaut bei Augenreiben. P3/FFP3-Partikelmaske Pflicht. Staub stets absaugen, niemals trocken fegen. |
| **Gelcoat (Isophthalsäure)** | Harz | 25032-83-3 | **HOCH** | Enthält Pigmente und Styrol. Beim Spritzauftrag ist eine Vollmaske mit kombiniertem A2P3-Filter vorgeschrieben. |
| **PVA-Folientrennmittel** | Trennmittel | 9002-89-5 | **MITTEL** | Alkoholträger kann entzündbare Dämpfe erzeugen. Lässt sich mit warmem Wasser rückstandslos von der Haut abwaschen. |
| **Trennwachs / Carnaubawachs** | Trennmittel | 64742-88-7 | **MITTEL** | Enthält Erdöldestillate. Beim Polieren großer Bootsrümpfe stets für ausreichende Querlüftung sorgen. |

---

## Installation & Lokale Ausführung

Da MSDS-Lite aus reinen statischen Dateien besteht, sind keine Build-Tools oder Paketmanager (`npm`, `yarn` etc.) erforderlich.

1. Repository klonen:
   ```bash
   git clone https://github.com/erdmsn77/msds-lite.git
   cd msds-lite
   ```
2. Lokalen HTTP-Server starten (erforderlich für Service Worker und Laden der JSON-Daten):
   ```bash
   # Mit Python:
   python -m http.server 4173

   # Oder mit Node.js:
   npx http-server . -p 4173
   ```
3. Im Browser öffnen:
   ```
   http://localhost:4173/index.html
   ```

---

## PWA auf dem Smartphone installieren

* **Android (Chrome):** [Live-Version](https://erdmsn77.github.io/msds-lite/) aufrufen, Menü (drei Punkte) öffnen und **„App installieren“** oder **„Zum Startbildschirm hinzufügen“** wählen.
* **iOS / iPhone (Safari):** Live-URL in Safari öffnen, auf das **Teilen-Symbol** tippen und **„Zum Home-Bildschirm“** auswählen.

---

## Datensicherheit & Synchronisation

* **Dual-Source-Sicherheit:** Alle Gefahrstoffdaten werden synchron in `data/chemicals.json` und dem `fallbackChemicals`-Array in `index.html` gepflegt. Das garantiert volle Funktionsfähigkeit auch bei lokalem Aufruf über das `file://`-Protokoll.
* **Fachliche Verlässlichkeit:** Daten basieren auf offiziellen Sicherheitsdatenblättern führender Hersteller, OSHA- und ECHA-Dossiers.

---

## Lizenz & Kontakt

Dieses Projekt ist Open Source unter der MIT-Lizenz.

Kontakt für Praktika, Kooperationen oder Projekte in den Bereichen Bootsbau, Yachtbau, Faserverbundwerkstoffe und Arbeitssicherheit (HSE):

* **Entwickler:** Erdem Doğan ([@erdmsn77](https://github.com/erdmsn77))
* **Live-Projekt:** [https://erdmsn77.github.io/msds-lite/](https://erdmsn77.github.io/msds-lite/)

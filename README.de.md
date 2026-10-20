# MSDS-Lite: Arbeitsschutz-Assistent für Bootsbau & Kompositwerkstätten

> **Praxisorientierter, offlinefähiger mobiler Assistent für Chemikaliensicherheit und Notfallmaßnahmen**

[ Türkçe ](README.md) • [ English ](README.en.md) • [ Deutsch ](README.de.md)

[![Version](https://img.shields.io/badge/Version-v1.8.2-orange?style=flat-square)](https://github.com/erdmsn77/msds-lite/releases)
[![Deploy](https://img.shields.io/github/actions/workflow/status/erdmsn77/msds-lite/deploy-pages.yml?branch=main&style=flat-square&label=Deploy&color=success)](https://github.com/erdmsn77/msds-lite/actions/workflows/deploy-pages.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-22d3ee?style=flat-square&logo=pwa)](https://erdmsn77.github.io/msds-lite/)
[![Offline First](https://img.shields.io/badge/Offline-100%25-emerald?style=flat-square)](https://erdmsn77.github.io/msds-lite/)
[![Languages](https://img.shields.io/badge/Languages-TR%20%7C%20EN%20%7C%20DE-blue?style=flat-square)](https://erdmsn77.github.io/msds-lite/)
[![License](https://img.shields.io/badge/License-MIT%20%2F%20Open-yellow?style=flat-square)](LICENSE)

---

<p align="center">
  <img src="docs/preview-mockup.jpg" alt="MSDS-Lite Werkstatt-Assistent Vorschau" width="100%" style="border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.12);" />
</p>

<p align="center">
  <a href="https://erdmsn77.github.io/msds-lite/">
    <img src="icons/qr-code.svg" width="130" height="130" alt="MSDS-Lite Mobile PWA QR-Code" style="background:#0b0f17; padding:8px; border-radius:12px; border:1px solid rgba(234, 88, 12, 0.35); box-shadow:0 4px 14px rgba(0,0,0,0.25);" />
  </a>
  <br>
  <sub>📲 <b>Mit dem Smartphone scannen:</b> Richten Sie Ihre Kamera auf den QR-Code, um die Live-PWA direkt zu öffnen oder auf dem Startbildschirm zu installieren: <a href="https://erdmsn77.github.io/msds-lite/">erdmsn77.github.io/msds-lite</a></sub>
</p>

---

## Motivation & Hintergrund

Als Student und Auszubildender im Bereich **Faserverbund-Bootsbau und Komposittechnologie an der Yalova Universität Berufsfachschule Çınarcık** habe ich während meiner praktischen Werkstattausbildung und in Vorbereitung auf Werft-Praktika ein wiederkehrendes Sicherheitsrisiko beobachtet: **die akute Panik und die Barriere beim Informationszugang bei Gefahrstoffkontakt oder Unfällen.**

Im modernen Bootsbau mit Faserverbundwerkstoffen (Vakuuminfusion, Handlaminieren, Vakuumpressen, Entformen und Finishing) wird täglich mit gefährlichen organischen Peroxiden, Beschleunigern und reaktiven Harzen gearbeitet. Tritt ein Zwischenfall ein (beispielsweise ein MEK-P-Spritzer ins Auge):
* Tragen Mitarbeiter oft klebrige Schutzhandschuhe oder sind mit Staub und Harz bedeckt.
* Das Suchen und Lesen in mehrseitigen, dichten PDF-Sicherheitsdatenblättern auf dem Smartphone kostet entscheidende Minuten.
* In vielen Werfthallen, Werkstatträumen und Schiffsrümpfen besteht kein stabiler Mobilfunkempfang.

**MSDS-Lite** entstand als direkte Antwort auf diese praktische Anforderung. Völlig unabhängig von externen Servern oder Internetverbindungen liefert die App **die entscheidenden Sofortmaßnahmen der ersten 60 Sekunden** direkt auf das mobile Endgerät.

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
* **Spülzeit-Badge:** Die vorgeschriebene Mindestdauer für ununterbrochene Spülung (beispielsweise: Mindestens 15 Minuten ununterbrochen spülen).

### Stufe 2: Schnelles Notfall-Panel (Slide-in Drawer)
Durch Antippen einer Gefahrstoffkarte öffnet sich ein Schiebepanel mit 4 Notfall-Tabs:
1. **Erste Hilfe (Die ersten 60 Sekunden):** Klare Handlungsanweisungen bei Kontakt mit Augen, Haut, Atemwegen oder Verschlucken. Ausgestattet mit einem prominenten **Augenspül-Hinweis** sowie Notruf-Leitfäden.
2. **Brand & Brandbekämpfung:** Zulässige Löschmittel, **strikt verbotene Maßnahmen** (beispielsweise Hochdruckwasserstrahlen, die brennendes Peroxid verteilen), thermische Zersetzungsrisiken und Flammpunkte (°C).
3. **PSA-Ausrüstung (Persönliche Schutzausrüstung):** Erforderliche Atemschutzfilter (A2-Organikdampffilter, P3-Partikelfilter), Gesichts- und Augenschutz sowie eine **Handschuh-Beständigkeitsmatrix** (Latex, Nitril, Butyl/Neopren).
4. **Lagerung & Unverträglichkeiten:** Ideale Lagertemperaturen und strikte Trennungsgebote (beispielsweise schwere Explosionsgefahr bei direktem Kontakt von MEK-P mit Kobaltbeschleuniger).
5. **Offizielle Prüfung & Referenzquellen:** Direkte Verweise auf verifizierte Sicherheitsdatenblätter und behördliche ECHA-Stoffdossiers.

---

## Technische & Werkstatt-Ergonomie Highlights

* **Werkstatt- und Nachtmodus:** Ein kontrastreicher Tageslichtmodus (`#F8FAFC` Hintergrund mit `#0F172A` Text) garantiert beste Lesbarkeit bei grellem Sonnenlicht in offenen Werfthallen. Umschaltbar auf einen augenschonenden Dunkelmodus für Nachtschichten (gespeichert im lokalen Speicher).
* **Native Touch- und Wischgesten:** Im Vollbild-PWA-Modus schließt eine Wischbewegung vom Bildschirmrand oder die Zurück-Taste des Telefons sanft das Notfallpanel, anstatt die Anwendung zu beenden (`history.pushState` und `popstate`).
* **Dreisprachig (TR / EN / DE):** Vollständige Lokalisierung für Türkisch, Englisch und Deutsch, abgestimmt auf die Fachterminologie in Werften und im europäischen Komposit-Bootsbau.
* **Keine schweren Framework-Abhängigkeiten (Pure Vanilla JS und CSS):** Keinerlei Fremdbibliotheken oder Frameworks (weder Tailwind noch Bootstrap, React oder Vue). Extrem schlanke und optimierte native Architektur für blitzschnellen Start auch auf älteren Werkstatt-Smartphones.
* **Hundert Prozent Offline-fähig (PWA):** Service-Worker-basiert. Funktioniert zuverlässig in Kellern, abgeschirmten Hallen oder auf See ohne Mobilfunkempfang.
* **Direktverlinkung (Deep-Linking):** Stoff-IDs können direkt an die URL angehängt werden (beispielsweise `/#mek-p`), ideal für QR-Code-Aufkleber an Chemikalienschränken.

---

## Abgedeckte Gefahrstoffe (11 Werkstatt-Kernsubstanzen)

Die 11 gefährlichsten und häufigsten Arbeitsstoffe in modernen Komposit-Werkstätten:

| Stoffname | Kategorie | CAS-Nr. | Risikostufe | Kritische Werkstatt-Vorsichtsmaßnahme |
|---|---|---|---|---|
| **MEK-P** (Methylethylketonperoxid) | Peroxid | 1338-23-4 | **KRITISCH** | Niemals direkt mit Kobaltbeschleuniger mischen (Explosionsgefahr). Gefahr dauerhaften Sehverlusts bei Augenkontakt; mindestens 15 Minuten ununterbrochen drucklos spülen. |
| **Kobaltnaphthenat** (6%) | Beschleuniger | 61789-51-3 | **KRITISCH** | In separatem Schrank getrennt von Peroxiden lagern. Starker Hautsensibilisator; erfordert mindestens 20 Minuten Spüldauer. |
| **Orthophthalsäure-Polyesterharz** | Harz | 100-42-5 (Styrol) / 25035-68-2 | **HOCH** | Enthält Styrolmonomer. Niemals Aceton zur Hautreinigung verwenden (Aceton transportiert Gefahrstoffe tief in die Poren). |
| **Vinylesterharz** | Harz | 100-42-5 (Styrol) / 36425-15-7 | **HOCH** | Sehr reaktionsfreudig. A2-Atemschutzfilter und chemikalienbeständige Nitrilhandschuhe sind zwingend erforderlich. |
| **Epoxidharz (DGEBA)** | Harz | 25068-38-6 | **HOCH** | Stark hautreizend; wiederholter Kontakt führt zu chronischer Kontaktdermatitis. Latexhandschuhe sind durchlässig; nur Nitril verwenden. |
| **Epoxidhärter (IPDA)** | Härter | 2855-13-2 (IPDA) / 9046-10-0 | **KRITISCH** | Ätzendes aliphatisches Amin. Größere Mischmengen in tiefen Behältern führen zu gefährlicher exothermer Selbsterhitzung (Hitze und Rauchentwicklung). |
| **Technisches Aceton** | Lösungsmittel | 67-64-1 | **MITTEL** | Extrem niedriger Flammpunkt (-17°C). Strikt verboten zur Hautreinigung; ausschließlich zum Auswaschen von Pinseln und Werkzeugen bestimmt. Butylkautschuk-Handschuhe erforderlich. |
| **Kohlefasern / CFK-Staub** | Staub & Fasern | 7440-44-0 (Kohlenstoff) | **HOCH** | Mikroskopische Fasern zerkratzen die Hornhaut bei Augenreiben. P3/FFP3-Partikelmaske Pflicht. Staub stets absaugen, niemals trocken fegen. |
| **Gelcoat (Isophthalsäure)** | Harz | 100-42-5 (Styrol) | **HOCH** | Enthält Pigmente und Styrol. Beim Spritzauftrag ist eine Vollmaske mit kombiniertem A2P3-Filter vorgeschrieben. |
| **PVA-Folientrennmittel** | Trennmittel | 9002-89-5 (PVA) / 67-63-0 (IPA) | **MITTEL** | Alkoholträger kann entzündbare Dämpfe erzeugen. Lässt sich mit warmem Wasser rückstandslos von der Haut abwaschen. |
| **Trennwachs / Carnaubawachs** | Trennmittel | 8015-86-9 (Carnauba) / 64742-48-9 | **MITTEL** | Enthält Erdöldestillate und Carnaubawachs. Beim Polieren großer Bootsrümpfe stets für ausreichende Querlüftung sorgen. |EL** | Enthält Erdöldestillate. Beim Polieren großer Bootsrümpfe stets für ausreichende Querlüftung sorgen. |

---

## PWA auf dem Smartphone installieren (Praxiseinsatz)

MSDS-Lite wurde speziell für den **mobilen Einsatz vor Ort** in Werfthallen und Kompositwerkstätten entwickelt. Es sind weder Terminalbefehle, Compiler noch Desktop-Software erforderlich; die Anwendung läuft direkt vom Smartphone-Startbildschirm mit voller nativer App-Leistung:

* **Android (Chrome):** [Live-Version](https://erdmsn77.github.io/msds-lite/) aufrufen, Menü (drei Punkte) öffnen und **„App installieren“** oder **„Zum Startbildschirm hinzufügen“** wählen.
* **iOS / iPhone (Safari):** Live-URL in Safari öffnen, auf das **Teilen-Symbol** tippen und **„Zum Home-Bildschirm“** auswählen.
* **Schnellinstallation per QR-Code:** Richten Sie Ihre Smartphone-Kamera direkt auf den folgenden QR-Code, um die App in Sekundenschnelle einsatzbereit zu haben:

<p align="center">
  <a href="https://erdmsn77.github.io/msds-lite/">
    <img src="icons/qr-code.svg" width="115" height="115" alt="MSDS-Lite Installations-QR-Code" style="background:#0b0f17; padding:6px; border-radius:10px; border:1px solid rgba(234, 88, 12, 0.35);" />
  </a>
</p>

---

## Datensicherheit & Synchronisation

* **Dual-Source-Sicherheit:** Alle Gefahrstoffdaten werden synchron in `data/chemicals.json` und dem `fallbackChemicals`-Array in `index.html` gepflegt. Das garantiert volle Funktionsfähigkeit auch bei lokalem Aufruf über das `file://`-Protokoll.
* **Fachliche Verlässlichkeit:** Daten basieren auf offiziellen Sicherheitsdatenblättern führender Hersteller, OSHA- und ECHA-Dossiers.

---

## Lizenz & Kontakt

Dieses Projekt ist Open Source unter der MIT-Lizenz.

Kontakt für Praktika, Kooperationen oder Projekte in den Bereichen Bootsbau, Yachtbau, Faserverbundwerkstoffe und Arbeitssicherheit (HSE):

* **Entwickler:** Erdem Doğan ([@erdmsn77](https://github.com/erdmsn77)) — Bootsbau & Verbundwerkstofftechnologien, Yalova Universität Berufsfachschule Çınarcık
* **Institution:** Yalova Universität Berufsfachschule Çınarcık (Bootsbau & Verbundwerkstofftechnologien)
* **Live-Projekt:** [https://erdmsn77.github.io/msds-lite/](https://erdmsn77.github.io/msds-lite/)

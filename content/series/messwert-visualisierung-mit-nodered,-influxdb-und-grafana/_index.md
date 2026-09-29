---
title: "Messwert-Visualisierung mit NodeRED, InfluxDB und Grafana"
description: "Zweiteilige Anleitung: Messwerte aus dem KNX-Smarthome mit NodeRED in InfluxDB speichern und in Grafana visualisieren, alles auf einem Raspberry Pi."
---

Unser Haus erfasst über KNX laufend Messwerte, von der Außentemperatur über
Helligkeit und Wind bis zum Regen. In dieser Anleitung zeige ich, wie ich sie
auf einem Raspberry Pi mitschreibe und sichtbar mache: Im ersten Teil
installiere ich InfluxDB, NodeRED und Grafana, im zweiten verbinde ich die
drei Systeme miteinander.

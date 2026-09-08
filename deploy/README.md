# Deployment auf den netcup VPS

Statische Seite hinter Caddy. Caddy terminiert TLS und reicht an den
nginx-Container weiter, der das vorgerenderte Angular-Build ausliefert.

Gebaut wird ausschließlich in GitHub Actions. Der Server holt sich neue
Versionen selbst: Watchtower prüft alle fünf Minuten die Registry und startet
den Frontend-Container neu, sobald ein neues Image vorliegt. Es gibt keinen
Deploy-Zugriff von GitHub auf den Server — die CI kennt den VPS nicht.

## Einmalig auf dem Server

Als root, direkt nach der Bestellung. Debian 12 vorausgesetzt.

```bash
apt update && apt upgrade -y
apt install -y ca-certificates curl git unattended-upgrades
curl -fsSL https://get.docker.com | sh
```

Benutzer anlegen (nicht als root betreiben):

```bash
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
```

SSH absichern — in `/etc/ssh/sshd_config`:

```
PermitRootLogin no
PasswordAuthentication no
```

Danach `systemctl restart ssh`. **Vorher** den eigenen Public Key in
`/home/deploy/.ssh/authorized_keys` hinterlegen und die Verbindung in einer
zweiten Session testen, sonst sperrst du dich aus.

Firewall:

```bash
apt install -y ufw
ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp && ufw allow 443/udp
ufw enable
```

Automatische Sicherheitsupdates:

```bash
dpkg-reconfigure -plow unattended-upgrades
```

## Repository klonen und starten

Als `deploy`:

```bash
git clone https://github.com/FerencoVonMatterhorn/therapiezentrum-horvay.git /opt/therapiezentrum-horvay
cd /opt/therapiezentrum-horvay/deploy
docker compose up -d
```

Caddy holt das Zertifikat automatisch. Das setzt voraus, dass der A-Record bei
Strato **schon** auf den VPS zeigt und Port 80 erreichbar ist.

## Package auf öffentlich stellen

Ein neu gepushtes ghcr-Package ist zunächst **privat**. Solange es das ist,
scheitert `docker compose pull` auf dem Server mit `denied`.

Nach dem ersten erfolgreichen Workflow-Lauf auf GitHub unter
*Profil → Packages → therapiezentrum-horvay-frontend → Package settings →
Change visibility* auf **public** stellen. Danach braucht der Server keine
Registry-Anmeldung, und es liegt kein Token auf der Maschine.

## Änderungen an Compose oder Caddyfile

Die verfolgt Watchtower nicht — es aktualisiert nur Images. Nach einer
Änderung an diesen Dateien einmal von Hand:

```bash
cd /opt/therapiezentrum-horvay && git pull
cd deploy && docker compose up -d
```

Änderungen am Website-Inhalt landen dagegen automatisch auf dem Server,
sobald der Workflow durchgelaufen ist.

## Testen vor der DNS-Umstellung

Damit die Seite steht, bevor der A-Record umgezogen wird: lokal in
`/etc/hosts` den VPS eintragen und die Domain aufrufen.

```
<VPS-IP>  therapiezentrum-horvay.de
```

Das Let's-Encrypt-Zertifikat kann Caddy so noch nicht ausstellen — dafür muss
der echte DNS-Eintrag stehen. Zum Prüfen der Seite selbst reicht es.

## Betrieb

```bash
docker compose logs -f caddy        # Zertifikatsprobleme
docker compose logs -f watchtower   # hat der Server das Update gezogen?
docker compose logs -f frontend     # Zugriffe (IPs gekuerzt)
docker compose pull && docker compose up -d   # manuell aktualisieren
```

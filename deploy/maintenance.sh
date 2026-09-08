#!/usr/bin/env bash
#
# Woechentliche Wartung des VPS. Wird per /etc/cron.d/tzh-maintenance als root
# ausgefuehrt. Ausgabe landet im Journal:
#
#   journalctl -t tzh-maintenance --since "2 weeks ago"
#
set -euo pipefail

COMPOSE_DIR="/opt/therapiezentrum-horvay/deploy"

# Bei Kernel- oder libc-Updates ist ein Neustart noetig, damit sie wirken.
# Die Container kommen durch "restart: unless-stopped" von allein wieder hoch.
# Auf "no" setzen, wenn du lieber selbst neu startest.
REBOOT_IF_REQUIRED="yes"

log() { logger -t tzh-maintenance -s -- "$*"; }

trap 'log "FEHLGESCHLAGEN in Zeile $LINENO"' ERR

log "=== Wartung gestartet ==="

# --- Betriebssystem ---------------------------------------------------------
# unattended-upgrades deckt nur Security-Updates ab; hier kommt der Rest.
# Die Dpkg-Optionen verhindern interaktive Rueckfragen zu geaenderten
# Konfigurationsdateien — ohne sie bliebe der Lauf haengen.
export DEBIAN_FRONTEND=noninteractive
log "apt update"
apt-get update -qq
log "apt dist-upgrade"
apt-get -y -qq \
  -o Dpkg::Options::=--force-confdef \
  -o Dpkg::Options::=--force-confold \
  dist-upgrade
log "apt aufraeumen"
apt-get -y -qq autoremove --purge
apt-get -y -qq autoclean

# --- Container --------------------------------------------------------------
# Holt neue Images fuer *alle* Dienste, also auch fuer Caddy und Watchtower.
# Watchtower selbst kuemmert sich nur um den gelabelten Frontend-Container.
cd "$COMPOSE_DIR"
log "docker compose pull"
docker compose pull --quiet
log "docker compose up -d"
docker compose up -d
log "verwaiste Images entfernen"
docker image prune -f >/dev/null

log "Status: $(docker compose ps --format '{{.Service}}={{.State}}' | tr '\n' ' ')"

# --- Neustart, falls noetig -------------------------------------------------
if [[ -f /var/run/reboot-required ]]; then
  if [[ "$REBOOT_IF_REQUIRED" == "yes" ]]; then
    log "Neustart erforderlich — starte in 1 Minute neu"
    shutdown -r +1 "Woechentliche Wartung"
  else
    log "ACHTUNG: Neustart erforderlich, aber deaktiviert"
  fi
fi

log "=== Wartung beendet ==="
